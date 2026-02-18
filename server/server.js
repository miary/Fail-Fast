const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // In production, restrict this to your frontend URL
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection with Retry Logic for Docker
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/the-crucible');
    console.log('⚡ MongoDB Connected: The Crucible is Hot');
  } catch (err) {
    console.error('❌ Connection failed, retrying in 5s...', err.message);
    setTimeout(connectDB, 5000);
  }
};
connectDB();

// Models
const Submission = require('./models/Submission');

// Evaluate Logic (The Fail-Fast Engine)
app.post('/api/evaluate', async (req, res) => {
  try {
    const { name, timeToValue, risk, category } = req.body;
    
    // Architect's Weighted Logic
    let status = 'PROTOTYPE';
    let reason = 'High Viability';

    if (timeToValue > 12) {
      status = 'FAILED_FAST';
      reason = 'Velocity Threshold Exceeded (>12 weeks)';
    } else if (risk > 8) {
      status = 'FAILED_FAST';
      reason = 'Risk Tolerance Exceeded';
    }

    const newSubmission = await Submission.create({
      name, category, timeToValue, risk, status, failureReason: status === 'FAILED_FAST' ? reason : null
    });

    // Push real-time update to all connected clients (Funnel & Dashboard)
    io.emit('new_evaluation', newSubmission);

    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History Endpoint for the Graveyard
app.get('/api/history', async (req, res) => {
  const history = await Submission.find().sort({ createdAt: -1 }).limit(50);
  res.json(history);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Crucible Server ignited on port ${PORT}`));