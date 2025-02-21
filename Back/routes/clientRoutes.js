const express = require("express");
const { createClient, getClients, getClientById, updateClient, deleteClient } = require("../controllers/clientController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas CRUD para clientes
router.post("/", authenticateToken, createClient);
router.get("/", authenticateToken, getClients);
router.get("/:id", authenticateToken, getClientById);
router.put("/:id", authenticateToken, updateClient);
router.delete("/:id", authenticateToken, deleteClient);

module.exports = router;