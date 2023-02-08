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

    // TODO: send email to customer
    const preMessage = `
    <div style='font-family: sans-serif, helvetica; padding: 2em 4em;'>
      <div style='display: flex; justify-content: center; width: 100% '>
        <p style='font-weight: bold;'>Thank you for choosing Hilton</p>
      </div>
      <div style='display: flex, justify-content: start'>
        <p>Your reservation will be reviewed and answered in 24 hrs.</p>
        <p>Feel free to ask any questions.</p>
      </div>
      <div style='display: flex; flex-direction:column; width: 100%; align-items: center; border: 2px solid gray; margin-top: 4em; border-radius: 5px;'>
        <div style='width: 100%; display: flex; justify-content: center; border-bottom: 1px solid gray'>
          <p>reservation info</p>   
        </div>
        <div style='display: flex; flex-direction: row; width: 80%'>
            <p style='width: 30%'>name:</p>
            <p style='width: 70%'>${firstName} ${lastName}</p>
          </div>
          <div style='display: flex; flex-direction: row; width: 80%'>
            <p style='width: 30%'>email:</p>
            <p style='width: 70%'>${customerEmail}</p>
          </div>
          <div style='display: flex; flex-direction: row; width: 80%'>
            <p style='width: 30%'>Contact:</p>
            <p style='width: 70%'>${contactNumber}</p>
          </div>
          <div style='display: flex; flex-direction: row; width: 80%'>
            <p style='width: 30%'>Dates:</p>
            <p style='width: 70%'>${checkIn} ~ ${checkOut}</p>
          </div>
          ${reservatedRooms.map((room) => {
            return `<div style=\'border-radius: 5px; width: 90%; display: flex;\'><p style=\'width: 33%\'>room: ${room.typeOfRoom}</p><p style=\'width: 33%\'>adult: ${room.adult}</p><p style=\'width: 33%\'>kids: ${room.kids}</p></div>`
          })}
          <div style='display: flex; flex-direction: row; width: 80%'>
            <p style='width: 30%'>Comment:</p>
            <p style='width: 70%'>${comment}</p>
          </div>
      </div>
    </div>
    `

    await sendEmail({
      to: customerEmail,
      subject: 'Hilton reservation request',
      text: preMessage,
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

exports.denyReservation = async (req, res) => {
  let reservationId = req.params.id;

  let { firstName, lastName, customerEmail } = req.body
  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, {
      status: 'denied'
    })

    reservation.save();

    const preMessage = `
    <div style='font-family: sans-serif, helvetica; padding: 2em 4em;'>
      <div style='display: flex; justify-content: center; width: 100% '>
        <p style='font-weight: bold;'>Thank you for choosing Hilton</p>
      </div>
      <div style='display: flex, justify-content: start'>
        <p>Unfortunately, your request has been denied.</p>
        <p>Please contact customer service.</p>
        <p>Thank you for choosing hilton.</p>
      </div>
    </div>
    `

    await sendEmail({
      to: customerEmail,
      subject: 'Hilton reservation request has been denied',
      text: preMessage,
    })

    // send email to customer

    res.json({
      success: true,
      reservation
    })

  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error found at connecting to DB'
    })
  }
}

exports.confirmReservation = async (req, res) => {
  let reservationId = req.params.id;
  
  let { firstName, lastName, customerEmail } = req.body

  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, {
      status: 'confirmed'
    })

    reservation.save();

    // send email to customer
    const preMessage = `
    <div style='font-family: sans-serif, helvetica; padding: 2em 4em;'>
      <div style='display: flex; justify-content: center; width: 100% '>
        <p style='font-weight: bold;'>Thank you for choosing Hilton</p>
      </div>
      <div style='display: flex, justify-content: start'>
        <p>Congrats, your request has been confirmed.</p>
        <p>Please contact customer service.</p>
        <p>Thank you for choosing hilton.</p>
      </div>
    </div>
    `

    await sendEmail({
      to: customerEmail,
      subject: 'Hilton reservation request has been confirmed',
      text: preMessage,
    })

    res.json({
      success: true,
      reservation
    })

  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error found at connecting to DB'
    })
  }
}

exports.completeReservation = async (req, res) => {
  let reservationId = req.params.id;

  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, {
      status: 'completed'
    })

    reservation.save();

    res.json({
      success: true,
      reservation
    })

  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error found at connecting to DB'
    })
  }
}

exports.cancelDenialReservation = async (req, res) => {
  let reservationId = req.params.id;

  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, {
      status: 'new'
    })

    reservation.save();

    // send email to customer

    res.json({
      success: true,
      reservation
    })

  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error found at connecting to DB'
    })
  }
}

