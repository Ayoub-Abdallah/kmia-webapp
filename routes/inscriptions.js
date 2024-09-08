const express = require('express');
const router = express.Router();

// Define routes for inscriptions
router.get('/', (req, res) => {
  res.send('List of inscriptions');
});

// Add more routes as needed

module.exports = router;
