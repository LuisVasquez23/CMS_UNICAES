const express = require('express');
const router = express.Router();

// Middleware personalizado (si es necesario)
// router.use(miMiddleware);

// Ruta para obtener todas las publicaciones
router.get('/', (req, res) => {
  res.json({ message: 'funcionando correctamente' });
});

router.get('/users', (req, res) => {

  let users = [
    {nombre:"Luis"},
    {nombre:"Paolo"}
  ]

  res.json({ message: users });
});

// Otras rutas para crear, actualizar y eliminar publicaciones

module.exports = router;