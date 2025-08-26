// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // <-- Import crypto
import pool from '../config/db.js';
import sendEmail from '../utils/sendEmail.js'; // <-- Import the email utility

// User Signup
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1. Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save the new user to the database with the token
    await pool.query(
      'INSERT INTO users (fullName, email, password, verification_token) VALUES ($1, $2, $3, $4) RETURNING *',
      [fullName, email, hashedPassword, verificationToken]
    );

    // 2. Send the verification email
    const verificationURL = `http://${req.headers.host}/api/auth/verify-email?token=${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Thank you for signing up! Please click the link below to verify your email address:</p>
      <a href="${verificationURL}" target="_blank">Verify Your Email</a>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
      email: email,
      subject: 'Email Verification',
      html: message,
    });

    // 3. Send a response to the frontend
    res.status(201).json({
      message: 'Signup successful! Please check your email to verify your account.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup process' });
  }
};

// NEW: Email Verification Controller
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('<h1>Error: Verification token is missing.</h1>');
    }

    // Find user by the verification token
    const userResult = await pool.query('SELECT * FROM users WHERE verification_token = $1', [token]);

    if (userResult.rows.length === 0) {
      return res.status(400).send('<h1>Error: Invalid or expired verification token.</h1>');
    }

    // Update user to be verified
    await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1',
      [token]
    );

    // Redirect user to the login page on the frontend
    // In a real app, you would redirect to your frontend URL
    res.redirect('http://localhost:3000/login?verified=true');

  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Server error during email verification.</h1>');
  }
};


// User Login (UPDATED)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // <-- CHECK IF VERIFIED -->
    if (!user.is_verified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Find the user by email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // IMPORTANT: For security, always send a success response, even if the user doesn't exist.
    // This prevents "user enumeration" attacks, where an attacker could guess which emails are registered.
    if (userResult.rows.length === 0) {
      return res.status(200).json({
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    const user = userResult.rows[0];

    // 2. Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3. Set an expiration date for the token (e.g., 10 minutes from now)
    const tenMinutes = 10 * 60 * 1000;
    const passwordResetExpires = new Date(Date.now() + tenMinutes);

    // 4. Save the token and expiry date to the user's record in the database
    await pool.query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3',
      [resetToken, passwordResetExpires, user.id]
    );

    // 5. Create the reset URL that points to your FRONTEND page
    // The frontend will be responsible for reading the token from the URL
    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 6. Send the email
    const message = `
      <h1>Password Reset Request</h1>
      <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste it into your browser to complete the process:</p>
      <a href="${resetURL}" target="_blank">Reset Your Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      html: message,
    });

    res.status(200).json({
      message: 'If an account with that email exists, a password reset link has been sent.',
    });

  } catch (error) {
    console.error('FORGOT PASSWORD ERROR:', error);
    // In case of a server error, we still want to avoid giving specific feedback
    res.status(500).json({ message: 'An error occurred while attempting to send the reset link.' });
  }
};


// NEW: Reset Password Controller
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: 'Token and new password are required.' });
    }

    // 1. Find the user by the reset token and check if it has not expired
    const userResult = await pool.query(
      'SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()',
      [token]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    const user = userResult.rows[0];

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Update the user's password and clear the reset token fields
    await pool.query(
      'UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2',
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: 'Password has been successfully reset.' });

  } catch (error) {
    console.error('RESET PASSWORD ERROR:', error);
    res.status(500).json({ message: 'An error occurred while resetting the password.' });
  }
};