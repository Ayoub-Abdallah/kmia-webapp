const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    schoolyear: { type: String, default: '' },
    teachers: { type: [Number], default: [] },
    notes: { type: String, default: '' }
  });
  
  const Group = mongoose.model('Group', groupSchema);
  module.exports = Group;