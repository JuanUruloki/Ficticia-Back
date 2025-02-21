const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes'); // Asegúrate de que esta ruta esté definida
const { connectDB, sequelize } = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
  console.log("Modelos sincronizados con la base de datos.");
}).catch((error) => {
  console.error("Error al sincronizar los modelos con la base de datos:", error);
});

// Configurar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de clients
app.use('/api/clients', clientRoutes);
app.use('/api/auth', authRoutes); // Asegúrate de que esta ruta esté definida

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Algo salió mal!" });
});

// Iniciar el servidor
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});