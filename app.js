const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://blogAdmin:enesabdmalk@blogcluster.hmrwt.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define the schema for the email data
const emailSchema = new mongoose.Schema({
  email: String,
  name: String,
  subscribedAt: Date
});

// Create a model based on the schema
const Email = mongoose.model('Email', emailSchema);

// Create and save an email (example)
const newEmail = new Email({
  email: 'user@example.com',
  name: 'John Doe',
  subscribedAt: new Date()
});

newEmail.save()
  .then(() => console.log('Email saved!'))
  .catch((err) => console.log('Error saving email:', err));
