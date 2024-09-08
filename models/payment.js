const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: { type: String, required: true, enum: ['credit_card', 'bank_transfer', 'cash'] }
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  module.exports = Payment;
  