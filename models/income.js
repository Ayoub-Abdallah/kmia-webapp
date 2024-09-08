const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, default: null },
    value: { type: Number, required: true },
    notes: { type: String, default: '' }
  });
  
  const Income = mongoose.model('Income', incomeSchema);
  module.exports = Income;