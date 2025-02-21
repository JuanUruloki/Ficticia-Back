const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Client = sequelize.define("Client", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  drives: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  wearsGlasses: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDiabetic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  otherDiseases: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "clients",
  timestamps: true,
});

module.exports = Client;