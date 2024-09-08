const Income = require('../models/income');
const Expense = require('../models/expense');

// Example controller functions
exports.renderAllFinance = async (req, res) => {
  try {
    const incomes = await Income.find();
    console.log(incomes) 
    res.render('teachers', { incomes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find();
    console.log(incomes)
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find();
    console.log(expenses)
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createIncome = async (req, res) => {
  try {
    let incomeData = req.body
    const income = new Income(incomeData);
    await income.save();
    console.log('Income created successfully:', income);
    res.json({status: true, message: "Présence de l'étudiant enregistrée avec succès"})
  } catch (error) {
    console.error('Error creating income:', error);
  }
};
exports.createExpense = async (req, res) => {
  try {
    let expenseData = req.body
    const expense = new Expense(expenseData);
    await expense.save();
    console.log('Expense created successfully:', expense);
    res.json({status: true, message: "Présence de l'étudiant enregistrée avec succès"})
  } catch (error) {
    console.error('Error creating Expense:', error);
  }
};



// Implement other controller functions similarly
