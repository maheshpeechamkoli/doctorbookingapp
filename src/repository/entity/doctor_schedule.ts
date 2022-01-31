import mongoose = require('mongoose');
require('./doctors');

const DoctorScheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: { type: Date, required: true },
    slots: [
      {
        start_time: { type: String, required: true },
        end_time: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DoctorSchedule', DoctorScheduleSchema);
