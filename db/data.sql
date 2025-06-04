-- data.sql (si quieres poblar con algunos registros)
USE green_harvest;

INSERT INTO colors (name) VALUES ('rojo'),('verde'),('marrón');

INSERT INTO products (name, description, image, category, price)
VALUES
  ('Manzanas Orgánicas','Manzanas sin pesticidas','/images/products/apples.jpg','Frutas',1.50),
  ('Pan Integral','Pan con harina integral','/images/products/bread.jpg','Panadería',2.75);

INSERT INTO product_colors (product_id,color_id) VALUES
  (1,1),(1,2),(2,3);
