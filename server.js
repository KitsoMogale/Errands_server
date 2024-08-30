const express = require('express');
const PickUp = require('./models/pickup');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

// Create an Express app
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB Atlas

const uri = "mongodb+srv://kitsomogale19:r5W6Ip0KFtsEAet9@cluster1.jynj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Use your MongoDB Atlas connection string here
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const wss = new WebSocket.Server({ port: 8080 });


// Handle new WebSocket connections
wss.on('connection', (ws) => {
  let clientId;

  // Listen for the initial message from the client to set the clientId
  ws.once('message', (message) => {
    try {
      const { id } = JSON.parse(message);
      if (id) {
        clientId = id;
        clients.set(clientId, ws);
        console.log(`Client connected with ID: ${clientId}`);

        // Acknowledge receipt of the client ID
        ws.send(JSON.stringify({ message: 'Client ID received', clientId }));

        // Handle further messages from this client
        ws.on('message', (message) => {
          const { targetClientId, data } = JSON.parse(message);

          // Forward the message to the target client
          const targetClient = clients.get(targetClientId);
          if (targetClient && targetClient.readyState === WebSocket.OPEN) {
            targetClient.send(JSON.stringify(data));
          }
        });

        // Handle client disconnect
        ws.on('close', () => {
          clients.delete(clientId);
          console.log(`Client with ID: ${clientId} disconnected`);
        });
      } else {
        ws.close(4000, 'Client ID is required');
      }
    } catch (error) {
      ws.close(4000, 'Invalid message format');
    }
  });
});

// API routes


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