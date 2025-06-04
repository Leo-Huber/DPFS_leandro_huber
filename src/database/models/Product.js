// src/database/models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name:        { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    image:       DataTypes.STRING,
    category:    DataTypes.STRING,
    price:       { type: DataTypes.DECIMAL(10,2), allowNull: false }
  }, {
    tableName: 'products',
    underscored: true
  });

  Product.associate = models => {
    Product.belongsToMany(models.Color, {
      through: 'product_colors',
      foreignKey: 'product_id',
      otherKey: 'color_id'
    });
  };

  return Product;
};
