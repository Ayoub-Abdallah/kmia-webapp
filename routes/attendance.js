const express = require('express');
const router = express.Router();

// Define routes for teachers

// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);
router.get('/', (req, res) => {
  res.render('attendance');
});


// Add more routes as needed

module.exports = router;
