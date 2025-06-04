// src/database/models/index.js
const fs   = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config    = require('../config.js').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = { sequelize, Sequelize };

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Relaciones
Object.keys(db).forEach(name => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

module.exports = db;
