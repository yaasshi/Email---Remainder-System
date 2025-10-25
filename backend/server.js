const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const schedule = require('node-schedule');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GMAIL_USER = "yashikamohanraj62@gmail.com";       
const GMAIL_APP_PASSWORD = "ngaz vrfg hdoh mnop";   

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

app.post("/set-reminder", async (req, res) => {
  const { email, subject, message, date } = req.body;
  console.log("Received reminder:", req.body);

  if (!email || !subject || !message || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sendDate = new Date(date);

  if (sendDate < new Date()) {
    return res.status(400).json({ message: "Cannot schedule a reminder in the past" });
  }

  try {
    schedule.scheduleJob(sendDate, async () => {
  try {
    await transporter.sendMail({
      from: "yashikamohanraj62@gmail.com", 
      to: email,
      subject,
      text: message,
    });
    console.log(Scheduled email sent to ${email} at ${sendDate});
  } catch (err) {
    console.error("Error sending scheduled email:", err);
  }
});

    console.log(Reminder scheduled for: ${sendDate});
    res.json({ message: "Reminder scheduled successfully!" });

  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ message: "Failed to schedule reminder" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
