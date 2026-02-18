// server.js - Express Assessment Logic
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/evaluate', (req, res) => {
    const { name, timeToValue, risk, cost } = req.body;

    // Fail-Fast Logic: Reject if it takes too long or costs too much upfront
    let status = 'IN_REVIEW';
    const score = (10 - risk) + (10 - timeToValue);

    if (timeToValue > 12 || risk > 8) {
        status = 'FAILED_FAST';
    } else if (score > 15) {
        status = 'PROTOTYPE_CANDIDATE';
    }

    res.json({
        id: Date.now(),
        name,
        score,
        status,
        timestamp: new Date()
    });
});