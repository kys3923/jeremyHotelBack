const express = require('express');
const router = express.Router();

const { registerReservation } = require('../controllers/reservations');

router.route('/register').post(registerReservation);

module.exports = router;