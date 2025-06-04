// src/database/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName:  { type: DataTypes.STRING, allowNull: false },
    email:     { type: DataTypes.STRING, allowNull: false, unique: true },
    password:  { type: DataTypes.STRING, allowNull: false },
    category:  { type: DataTypes.STRING, allowNull: false, defaultValue: 'cliente' },
    image:     DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true
  });

  return User;
};
