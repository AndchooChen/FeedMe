const mongoose = require('mongoose');

// Daily Intake Schema
const dailyIntakeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  foodName: [{
    type: String,
    required: true,
  }],
});

// Daily Intake Model
const DailyIntake = mongoose.model('DailyIntake', dailyIntakeSchema);

module.exports = DailyIntake;