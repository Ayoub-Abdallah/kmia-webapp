
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const inscriptionSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ['pending', 'confirmed', 'rejected'] }
  });
  
  const Inscription = mongoose.model('Inscription', inscriptionSchema);
  module.exports = Inscription;
  