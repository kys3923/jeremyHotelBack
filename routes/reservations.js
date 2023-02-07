const express = require('express');
const router = express.Router();

const { registerReservation, getAllReservation, denyReservation, confirmReservation, completeReservation } = require('../controllers/reservations');

router.route('/register').post(registerReservation);
router.route('/all').get(getAllReservation);
router.route('/deny/:id').put(denyReservation);
router.route('/confirm/:id').put(confirmReservation);
router.route('/complete/:id').put(completeReservation);

module.exports = router;