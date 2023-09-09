// db.js

const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('cms_unicaes', 'root', '', {
  host: 'localhost', // Cambia esto a la dirección de tu servidor MySQL si es necesario
  dialect: 'mysql', // Tipo de base de datos que estás utilizando (MySQL en este caso)
  logging: false, // Desactiva el registro de consultas SQL (puedes cambiar esto para ver las consultas en la consola)
});

// Prueba la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = sequelize;
