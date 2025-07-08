const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario.' });
  }
});

// Crear usuario (para Dashboard)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) return res.status(400).json({ error: 'Faltan campos obligatorios' });

    // Si tu modelo requiere password, dale un valor por defecto.
    const newUser = await User.create({ firstName, lastName, email, password: 'defaultPassword123' });
    // No devuelvas el password
    const userOut = newUser.get({ plain: true });
    delete userOut.password;

    res.status(201).json(userOut);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
});

// Editar usuario
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    await user.update({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario.' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario.' });
  }
});

module.exports = router;
