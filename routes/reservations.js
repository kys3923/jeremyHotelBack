const express = require('express');
const router = express.Router();

const { registerReservation, getAllReservation } = require('../controllers/reservations');

router.route('/register').post(registerReservation);
router.route('/all').get(getAllReservation);

module.exports = router;