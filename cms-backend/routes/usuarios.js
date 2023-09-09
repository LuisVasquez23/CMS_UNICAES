// routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // Importa el controlador

const Usuario = require('../models/Usuario'); 


router.get('/', usuarioController.listarUsuarios);


  module.exports = router;