const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  birthdate: { type: Date, default: null },
  birthplace: { type: String, default: '' },
  sex: { type: String, enum: ['male', 'female'], required: true },
  phone: { type: String, default: '', required: true },
  email: { type: String },
  // group: { type: String, default: '' },
  group: { type: [String], default: [] },
  schoolyear: { type: String, default: '' },
  inscriptiondate: { type: Date, default: null },
  physicalproblem: { type: String, default: '' },
  mentalproblems: { type: String, default: '' },
  notes: { type: String, default: '' },
  salary: {
    type:[{
      date: { type: Date},
      groupId: {type: String},
      paymentType: {type: String},
      amount: { type: Number}
    }]
  }
})
  const Teacher = mongoose.model('Teacher', teacherSchema);
  module.exports = Teacher;
  