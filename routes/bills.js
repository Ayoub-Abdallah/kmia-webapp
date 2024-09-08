const express = require('express');
const router = express.Router();

// Define routes for bills
router.get('/', (req, res) => {
  res.send('List of bills');
});

// Add more routes as needed

module.exports = router;
