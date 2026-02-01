require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log("Testing email with:");
console.log("User:", process.env.EMAIL_USER);
console.log(
  "Password:",
  process.env.EMAIL_PASSWORD
    ? "***" + process.env.EMAIL_PASSWORD.slice(-4)
    : "NOT SET",
);

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email configuration error:", error.message);
  } else {
    console.log("✅ Server is ready to send emails");

    // Send a test email
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: "Test Email",
        text: "If you receive this, your email is configured correctly!",
      },
      (err, info) => {
        if (err) {
          console.log("❌ Error sending test email:", err.message);
        } else {
          console.log("✅ Test email sent successfully!");
        }
      },
    );
  }
});
