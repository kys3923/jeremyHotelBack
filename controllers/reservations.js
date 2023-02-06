const Reservation = require('../models/Reservation');
const sendEmail = require('../utils/sendEmail');

exports.registerReservation = async (req, res) => {

  const { firstName, lastName, location, contactNumber, customerEmail, checkIn, checkOut, reservatedRooms, comment, status } = req.body

  try {
    const reservation = await Reservation.create({
      firstName,
      lastName,
      location,
      contactNumber,
      customerEmail,
      checkIn,
      checkOut,
      reservatedRooms,
      comment,
      status
    })

    res.json({
      success: true,
      reservation
    })
  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error at creating reservation in DB'
    })
  }
}

exports.getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find({})

    console.log(reservations)

    res.json({
      success: true,
      reservations
    })
  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error at getting reservations in DB'
    })
  }
}