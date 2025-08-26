// pages/training.tsx

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './Training.module.css';
import Head from 'next/head';

const TrainingPage = () => {
  // Replace with your actual Google Form URL
  const googleFormUrl = 'YOUR_GOOGLE_FORM_URL';

  return (
    <>
      <Head>
        <title>Training Application</title>
        <meta name="description" content="Apply for our training program" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Training Program Application
          </h1>

          <p className={styles.description}>
            Please use the link below or scan the QR code to complete your application.
          </p>

          <div className={styles.card}>
            <h2>Apply Now</h2>
            <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Go to Application Form
            </a>
          </div>

          <div className={styles.card}>
            <h2>Scan to Apply</h2>
            <div className={styles.qrCodeContainer}>
              {googleFormUrl !== 'YOUR_GOOGLE_FORM_URL' ? (
                <QRCodeSVG value={googleFormUrl} size={256} />
              ) : (
                <p>Please replace the placeholder URL to generate the QR code.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TrainingPage;