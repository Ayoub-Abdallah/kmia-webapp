const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, default: null },
    value: { type: Number, required: true },
    notes: { type: String, default: '' }
  });
  
  const Expense = mongoose.model('Expense', expenseSchema);
  module.exports = Expense;