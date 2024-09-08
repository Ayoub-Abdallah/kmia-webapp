const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');


// Render login page
router.get('/', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/', AuthController.handleLogin);
router.get('/logout', AuthController.logout);

module.exports = router;
