const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const authMiddleware = require('../authMiddleware');


// Protect all routes
//uncoment this || after done - it's necessary for security reasons
//              V
// router.use(authMiddleware.ensureAuthenticated);
router.get('/', (req, res) => {
  res.render('finance');
});

router.get('/income', financeController.getIncome);
router.get('/expense', financeController.getExpense);
router.post('/add-income', financeController.createIncome);
router.post('/add-expense', financeController.createExpense);


// Add more routes as needed

module.exports = router;
