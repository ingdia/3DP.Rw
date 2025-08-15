// pages/contact.js (or app/contact/page.js)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { toast } from "react-hot-toast";

// Reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Stagger variant for parent containers
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Note: I've removed the TypeScript types for broader JS/TS compatibility.
  // You can add <FormData> back if you are in a .tsx file.
  const {
    register,
    handleSubmit,
    reset, // <-- Import reset
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully!");
      reset(); // <-- Reset the form fields
      setIsSubmitting(false);
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="bg-gray-800 text-white">
      {/* --- Hero Section --- */}
      <motion.div
        className="bg-white text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 py-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-black"
            variants={fadeInUp}
          >
            Get In Touch
          </motion.h1>
        </div>
      </motion.div>

      {/* --- Main Content: Form & Info --- */}
      <motion.section
        className="container mx-auto px-6 py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* --- Left Column: Contact Info --- */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer} // Stagger the children of this div
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-white"
            >
              Contact Information
            </motion.h2>

            {/* Address */}
            <motion.div
              variants={fadeInUp}
              className="flex items-start space-x-4"
            >
              <FiMapPin className="text-3xl text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-300">KG 7 Ave, Kigali, Rwanda</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={fadeInUp}
              className="flex items-start space-x-4"
            >
              <FiPhone className="text-3xl text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <a
                  href="tel:+250788382383"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  +250 788 382 383
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeInUp}
              className="flex items-start space-x-4"
            >
              <FiMail className="text-3xl text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <a
                  href="mailto:info@3dp.rw"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  info@3dp.rw
                </a>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -4 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -4 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -4 }}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FaGithub size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Contact Form --- */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            variants={fadeInUp}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  disabled={isSubmitting}
                />
                {typeof errors.name?.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  disabled={isSubmitting}
                />
                {typeof errors.email?.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  disabled={isSubmitting}
                />
                {typeof errors.subject?.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "Message is required" })}
                  className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  disabled={isSubmitting}
                ></textarea>
                {typeof errors.message?.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <button
                  type="submit"
                  className="bg-yellow-700  text-white hover:bg-yellow-500 font-bold py-3 px-8 rounded-full transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Map Section --- */}
      <motion.div
        className="max-w-5xl mx-auto px-6 pb-16" // <-- Centered and medium width
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.525568571063!2d30.06313881529603!3d-1.94246803723386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a4b654f5c9%3A0x673322d7168b4493!2sKG%207%20Ave%2C%20Kigali!5e0!3m2!1sen!2srw!4v1671542151656!5m2!1sen!2srw"
            width="100%"
            height="400" // <-- Slightly shorter height for better balance
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
