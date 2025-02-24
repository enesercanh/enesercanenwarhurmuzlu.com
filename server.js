const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS middleware
require('dotenv').config();  // To load environment variables from a .env file

// Initialize express
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to handle CORS
app.use(cors());  // This allows requests from different origins

// Use environment variables for sensitive information
const dbURI = process.env.MONGO_URI || '';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema for the email data
const emailSchema = new mongoose.Schema({
  email: String,
  subscribedAt: Date
});

// Create a model based on the schema
const Email = mongoose.model('Email', emailSchema);

// Route to handle email subscription
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if the email is already subscribed
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'This email is already subscribed.' });
    }

    // Save the email to the database
    const newEmail = new Email({
      email,
      subscribedAt: new Date()
    });

    await newEmail.save();
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Error saving email:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Start the server
const port = process.env.PORT || 5000;  // You can change the port using an environment variable
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/subscribe`);
});
