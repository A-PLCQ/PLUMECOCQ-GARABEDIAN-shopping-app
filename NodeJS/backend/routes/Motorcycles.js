const express = require('express');
const router = express.Router();
const controllers =
require('../controllers/Motorbike')

// Route pour récupérer un seul Motorcycle par ID
router.get('/Motorcycles', controllers.getMotorcycles);
router.get('/Motorbike/:id', controllers.getMotorbike);

module.exports = router;