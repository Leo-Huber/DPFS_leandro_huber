const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario.' });
  }
});

// Crear usuario
router.post('/', async (req, res) => {
  try {
    // Nota: agregar validaciones según el modelo y NO guardar la password sin encriptar si luego se usa login!
    const { firstName, lastName, email, image, category } = req.body;
    const nuevo = await User.create({ firstName, lastName, email, image, category });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario.' });
  }
});

// Editar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario.' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar usuario.' });
  }
});

module.exports = router;
