const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    })
  : new Sequelize("Ficticia", "postgres", "Admin123", {
      host: "127.0.0.1",
      dialect: "postgres",
    });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };