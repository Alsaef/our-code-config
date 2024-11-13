// npm install express mongodb nodemailer crypto


// mongodb connection and node mailer
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

// MongoDB setup
const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri);
let usersCollection;

// Initialize MongoDB connection
client.connect().then(() => {
  const db = client.db("your_database_name");
  usersCollection = db.collection("users");
  console.log("Connected to MongoDB");
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});



// register api

app.post('/api/v1/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return res.status(400).send({ message: 'User already exists' });

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  // Save user with OTP and expiration
  const newUser = {
    name,
    email,
    password,
    otp,
    otpExpiresAt,
    isVerified: false
  };

  await usersCollection.insertOne(newUser);

  // Send OTP via email
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 10 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send({ message: 'Error sending OTP' });
    res.status(200).send({ message: 'OTP sent to email', userId: newUser._id });
  });
});

// 

// Verify OTP and complete registration
app.post('/api/v1/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db('DNK-ADVANCE-DB');
    const usersCollection = database.collection("users");

    // Find the user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    // Check if OTP is correct and not expired
    if (user.otp === otp && user.otpExpiresAt > Date.now()) {
      // Update user to verified status and remove OTP fields
      await usersCollection.updateOne(
        { email },
        { $set: { isVerified: true }, $unset: { otp: "", otpExpiresAt: "" } }
      );
      return res.status(200).send({ message: 'User verified successfully' });
    } else {
      return res.status(400).send({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send({ message: 'Server error during OTP verification' });
  } finally {
    // Ensure the client is closed after the operation
    await client.close();
  }
});
