const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", registerUser);

// Ruta para hacer login
router.post("/login", loginUser);

// Ruta protegida (requiere autenticación)
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acceso autorizado", user: req.user });
});

module.exports = router;