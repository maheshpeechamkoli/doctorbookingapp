import mongoose = require('mongoose');
require('./doctors');

const BookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    booking_id: { type: String, required: true },
    date: { type: Date, required: true },
    slot: {
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
    },
    duration_mins: { type: Number, required: true },
    patient_name: { type: String, required: true },
    patient_phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
