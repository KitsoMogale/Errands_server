const express = require('express');
const PickUp = require('./models/pickup');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB Atlas

const uri = "mongodb+srv://kitsomogale19:r5W6Ip0KFtsEAet9@cluster1.jynj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Use your MongoDB Atlas connection string here
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
// app.get('/pickup', async (req, res) => {
//   const user = await User.find();
//   res.json(user);
// });

app.post('/pickup', async (req, res) => {
    const {  name, address, pickupDate,instructions } = req.body;
    const pickup = new PickUp({ name, address, pickupDate,instructions });
  
    try {
      const newpickup = await pickup.save();
      res.status(201).json(newpickup);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));