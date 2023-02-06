const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  location: String,
  contactNumber: String,
  customerEmail: {
    type: String,
    unique: true,
  },
  checkIn: String,
  checkOut: String,
  reservatedRooms: [
    {
      adult: Number,
      kids: Number,
      typeOfRoom: String,
    },
  ],
  comment: String,
  status: String,
}, {timestamps: true})

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation