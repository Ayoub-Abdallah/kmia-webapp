const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/', (req, res) => {
  res.render('sessions');
});

router.get('/groups', sessionController.getSessions);
router.get('/add-session', (req, res) => {
  res.render('addSession');
});


router.post('/save-schedule', (req, res) => {
  sessionController.createSession(req, res);
});
// router.get('/expense', sessionController.getExpense);
// router.post('/add-income', sessionController.createIncome);
// router.post('/add-expense', sessionController.createExpense);
// Add this route to your server
router.get('/weekly',  (req, res) => {
  sessionController.getWeekly(req, res);
});

// Add more routes as needed

module.exports = router;
