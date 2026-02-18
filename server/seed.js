/**
 * THE CRUCIBLE - SEED SCRIPT v1.0
 * Purpose: Populates MongoDB with diverse technology cases to test the 
 * "Fail-Fast" scoring logic and Funnel animations.
 */

const mongoose = require('mongoose');
const Submission = require('./models/Submission'); // Adjust path as necessary
require('dotenv').config();

const testSubmissions = [
  {
    name: "Rust Micro-Engine",
    category: "Infrastructure",
    timeToValue: 3,
    risk: 4,
    cost: 12000,
    status: "PROTOTYPE",
    failureReason: null
  },
  {
    name: "Legacy COBOL Wrapper",
    category: "Web",
    timeToValue: 24, // Trigger: High TTV
    risk: 9,
    cost: 85000,
    status: "FAILED_FAST",
    failureReason: "Velocity Threshold Exceeded: > 12 weeks"
  },
  {
    name: "Local LLM Wrapper",
    category: "AI",
    timeToValue: 2,
    risk: 2,
    cost: 5000,
    status: "PROTOTYPE",
    failureReason: null
  },
  {
    name: "Blockchain Auth Layer",
    category: "Security",
    timeToValue: 14,
    risk: 8, // Trigger: High Risk
    cost: 120000,
    status: "FAILED_FAST",
    failureReason: "Risk/Cost Ratio Unacceptable"
  },
  {
    name: "Serverless GraphQL API",
    category: "Web",
    timeToValue: 4,
    risk: 3,
    cost: 2000,
    status: "PROTOTYPE",
    failureReason: null
  },
  {
    name: "Proprietary ETL Tool",
    category: "Data",
    timeToValue: 18,
    risk: 7,
    cost: 45000,
    status: "FAILED_FAST",
    failureReason: "Complexity vs Value mismatch"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/the-crucible', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🚀 Connection established. Purging old data...");
    await Submission.deleteMany({});

    console.log("🧪 Injecting Fail-Fast test cases...");
    await Submission.insertMany(testSubmissions);

    console.log(`
✅ Success! 
- Total Inserted: ${testSubmissions.length}
- Target: Prototype Zone (${testSubmissions.filter(s => s.status === 'PROTOTYPE').length})
- Target: The Graveyard (${testSubmissions.filter(s => s.status === 'FAILED_FAST').length})
    `);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();