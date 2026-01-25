const nodemailer = require('nodemailer');
const config = require('../core/config');

// Create transporter (configure based on your email service)
const createTransporter = () => {
  // Validate email configuration
  if (!config.email.user || !config.email.password) {
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD in .env.local');
  }

  if (config.email.service === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.password, // Should be a Gmail App Password (16 characters)
      },
    });
  }
  
  // For other SMTP services, configure accordingly
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });
};

/**
 * Send OTP email
 * @param {string} to - Recipient email
 * @param {string} otp - OTP code
 * @returns {Promise<void>}
 */
const sendOTPEmail = async (to, otp) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: config.email.from,
    to,
    subject: 'Your Buildafeature Signup OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Buildafeature!</h2>
        <p>Thank you for signing up. Use the following OTP to complete your registration:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        <p style="color: #6b7280; font-size: 14px;">This OTP will expire in 10 minutes.</p>
        <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendOTPEmail,
};
