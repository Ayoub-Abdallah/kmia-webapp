const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/', (req, res) => {
  res.render('sessions');
});

router.get('/groups', sessionController.getSessions);
// router.get('/expense', sessionController.getExpense);
// router.post('/add-income', sessionController.createIncome);
// router.post('/add-expense', sessionController.createExpense);


// Add more routes as needed

module.exports = router;
