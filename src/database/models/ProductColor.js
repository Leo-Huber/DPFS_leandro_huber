// src/database/models/ProductColor.js
module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define('product_colors', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    color_id:   { type: DataTypes.INTEGER, primaryKey: true }
  }, {
    tableName: 'product_colors',
    timestamps: false,
    underscored: true
  });

  return ProductColor;
};
