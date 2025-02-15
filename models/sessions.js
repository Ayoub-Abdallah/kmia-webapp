const mongoose = require('mongoose');

// Define the schema for the Sessions collection
const sessionSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group', // Reference to the Group model (if applicable)
        required: true
    },
    months: {
        type: Number,
        required: true
    },
    selectedDays: {
        type: [String], // Array of strings (e.g., ['Sunday', 'Wednesday'])
        required: true
    },
    sessionDuration: {
        type: Number, // Duration in minutes (e.g., 180)
        required: true
    },
    sessionsPerWeek: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date, // Date object (e.g., '2025-02-14')
        required: true
    },
    time: {
        type: String, // Time in 'HH:mm' format (e.g., '09:00')
        required: true
    }
});

// Create the Mongoose model
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;