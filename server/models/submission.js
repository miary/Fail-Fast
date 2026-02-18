const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  timeToValue: Number,
  risk: Number,
  status: { type: String, enum: ['PROTOTYPE', 'FAILED_FAST'], default: 'PROTOTYPE' },
  failureReason: String,
  createdAt: { type: Date, default: Date.now }
});

// Indexing for high-performance dashboard queries
SubmissionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Submission', SubmissionSchema);