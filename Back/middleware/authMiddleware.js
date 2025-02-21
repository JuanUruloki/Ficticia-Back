const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET || "mi-secreto";

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Obtiene el token del encabezado

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado, no se proporcionó un token" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findByPk(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authenticateToken;