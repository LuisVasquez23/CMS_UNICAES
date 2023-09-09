const express = require('express');
const router = express.Router();
const usuariosRouter = require('./usuarios');


// Ruta para obtener todas las publicaciones
router.get('/', (req, res) => {
  res.json({ message: 'funcionando correctamente' });
});

router.use('/users', usuariosRouter);

// Otras rutas para crear, actualizar y eliminar publicaciones

module.exports = router;