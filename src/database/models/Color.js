// src/database/models/Color.js
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    tableName: 'colors',
    underscored: true
  });

  Color.associate = models => {
    Color.belongsToMany(models.Product, {
      through: 'product_colors',
      foreignKey: 'color_id',
      otherKey: 'product_id'
    });
  };

  return Color;
};
