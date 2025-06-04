-- structure.sql
CREATE DATABASE IF NOT EXISTS green_harvest;
USE green_harvest;

-- Tabla de Usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'cliente',
  image VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Productos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Colores
CREATE TABLE colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla pivote Productos-Colores (many-to-many)
CREATE TABLE product_colors (
  product_id INT NOT NULL,
  color_id INT NOT NULL,
  PRIMARY KEY (product_id,color_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES colors(id)   ON DELETE CASCADE
);
