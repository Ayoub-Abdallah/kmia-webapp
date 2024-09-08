const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  inscription: { type: Boolean, required: true, default: false },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  birthdate: { type: Date, default: null },
  birthplace: { type: String, default: '' },
  parents: { type: String, default: '' },
  sex: { type: String, enum: ['male', 'female'], required: true },
  phone: { type: String, default: '', required: true },
  email: { type: String },
  mobile1: { type: String, default: '' },
  mobile2: { type: String, default: '' },
  group: { type: [String], default: [] },
  schoolyear: { type: String, default: '' },
  inscriptiondate: { type: Date, default: null },
  physicalproblem: { type: String, default: '' },
  mentalproblems: { type: String, default: '' },
  notes: { type: String, default: '' },
  presence: { 
    type: [{ 
      groupId: { type: String, default: "" }, 
      date: { type: Date, default: "" }
    }],
    default: [] 
  },
  payment: { 
    type: [{ 
      groupId: { type: String},
      payed: {
        type:[{
          date: { type: Date},
          value: { type: Number}
        }]
      },
      total: { type: Number }
    }]
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

