const express = require('express');
const router = express.Router();

// Define routes for courses
router.get('/', (req, res) => {
  res.send('List of courses');
});

// Add more routes as needed

module.exports = router;
