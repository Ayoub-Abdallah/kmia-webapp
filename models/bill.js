const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//incomes & outcomes
const billSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['unpaid', 'paid', 'overdue'] },
  type: { type: String, required: true, enum: ['income', 'outcome'] },
  description: { type: String }
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
