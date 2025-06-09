// src/routes/api/usersApi.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Si aún usas JSON (Sprint 4/5/7), lee de users.json:
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

// Si en Sprint 6 migraste a Sequelize, reemplaza esta parte por tu modelo:
const { User } = require('../../database/models');

// → GET /api/users/   → lista de usuarios
router.get('/', async (req, res) => {
  try {
    // Opción A: JSON
    // const users = readUsers();
    // const response = {
    //   count: users.length,
    //   users: users.map(u => ({
    //     id: u.id,
    //     firstName: u.firstName,
    //     lastName: u.lastName,
    //     email: u.email,
    //     detail: `/api/users/${u.id}`
    //   }))
    // };
    // return res.json(response);

    // Opción B: Sequelize (si migraste)
    const allUsers = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'image'],
      order: [['createdAt', 'DESC']]
    });
    const response = {
      count: allUsers.length,
      users: allUsers.map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        image: u.image,
        detail: `/api/users/${u.id}`
      }))
    };
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al listar usuarios' });
  }
});

// → GET /api/users/:id  → detalle de un usuario
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Opción A: JSON
    // const users = readUsers();
    // const user = users.find(u => u.id == id);
    // if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    // return res.json({
    //   id: user.id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   image: user.image
    // });

    // Opción B: Sequelize
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'category']
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al obtener usuario' });
  }
});

module.exports = router;
