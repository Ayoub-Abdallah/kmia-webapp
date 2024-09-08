const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController')
const authMiddleware = require('../authMiddleware');

// Landing page accessible to everyone
router.get('/', (req, res) => {
  res.render('dashboard');
});

// Admin dashboard accessible only to authenticated users
// router.get('/admin', authMiddleware.ensureAuthenticated, (req, res) => {
//   res.render('dashboard');
// });
// temporary - remove after done and activate the above one
// router.get('/admin', (req, res) => {
//   res.render('dashboard');
// });

module.exports = router;
