const mongoose = require('mongoose');

// 课程表
const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['blue', 'red','green'],
    default: 'blue'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema); 