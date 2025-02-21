const { Sequelize } = require("sequelize");
const config = require("./config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1); // Salir si la conexión falla
  }
};

module.exports = { sequelize, connectDB };