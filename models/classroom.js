const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    name: { type: String, required: true },
    notes: { type: String, default: '' }
  });
  
  const Classroom = mongoose.model('Classroom', classroomSchema);
  module.exports = Classroom;