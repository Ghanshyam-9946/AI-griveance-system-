const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Department', DepartmentSchema);
