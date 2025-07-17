const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email (Kushal)
  const mailToMe = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "📩 New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  // Confirmation email to sender
  const mailToSender = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "✅ Thanks for reaching out – Kushal Gurung Portfolio",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #6552D0;">Thanks for contacting me, ${name}!</h2>
      <p>I’ve received your message:</p>
      <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px;">
        ${message}
      </blockquote>
      <p>I’ll get back to you as soon as possible.</p>
      <p>Best regards,<br><strong>Kushal Gurung</strong><br>
      <a href="https://www.kushalgurung.ca" target="_blank" style="color: #6552D0;">www.kushalgurung.ca</a></p>
    </div>
  `
};


  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(mailToMe),
      transporter.sendMail(mailToSender),
    ]);

    res.status(200).json({ message: "✅ Message sent and confirmation email delivered!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send message." });
  }
});


// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
