const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;
  