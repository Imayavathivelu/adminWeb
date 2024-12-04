const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Mock Database
const users = [{ email: "user@example.com" }];

app.use(bodyParser.json());

// Forgot Password Route
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  // Check if email exists
  const user = users.find((u) => u.email === email);
  if (user) {
    // Send reset link (using nodemailer for demonstration)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: "Click the link below to reset your password:\n\nhttps://yourwebsite.com/reset-password",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to send email." });
      } else {
        res.json({ success: true, message: "Reset link sent." });
      }
    });
  } else {
    res.json({ success: false, message: "Email does not exist." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
