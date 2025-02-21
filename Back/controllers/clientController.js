const Client = require("../models/Client");

// Crear un nuevo cliente
const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors && error.errors[0] && error.errors[0].path ? error.errors[0].path : 'identification';
      const message = `${field} ya registrado`;
      return res.status(409).json({ message, field }); // Cambiar a 409 Conflict
    }
    console.error("Error al crear el cliente:", error);
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
};

// Obtener todos los clientes
const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};

// Obtener un cliente por ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error });
  }
};

// Actualizar un cliente
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await client.update(req.body);
    res.status(200).json(client);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const message = `Cliente ya registrado`;
      return res.status(409).json({ message, field: 'identification' }); // Cambiar a 409 Conflict
    }
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ message: "Error al actualizar el cliente", error });
  }
};

// Eliminar un cliente
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await client.destroy();
    res.status(200).json({ message: "Cliente eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };