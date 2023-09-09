// controllers/usuarioController.js
const Usuario = require('../models/Usuario'); // Importa el modelo

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(); 
        res.json(usuarios); // Devuelve los registros como una respuesta JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar usuarios' , exception: error});
      }
  };