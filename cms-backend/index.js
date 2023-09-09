const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./db'); // Tu archivo de configuración de conexión a MySQL
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json());

// Define rutas para la API RESTful
app.use('/api', apiRoutes);

// Inicia el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});