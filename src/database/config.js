require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'green_harvest_dev',
    host:     process.env.DB_HOST || '127.0.0.1',
    dialect:  'mysql',
    logging:  false,
    define: {
      underscored: true,
      timestamps:  true
    }
  },

  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST || 'green_harvest_test',
    host:     process.env.DB_HOST || '127.0.0.1',
    dialect:  'sqlite',
    storage:  ':memory:',
    logging:  false,
    define: {
      underscored: true,
      timestamps:  true
    }
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PROD,
    host:     process.env.DB_HOST_PROD,
    dialect:  'mysql',
    logging:  false,
    pool: {
      max:      5,
      min:      0,
      acquire:  30000,
      idle:     10000
    },
    define: {
      underscored: true,
      timestamps:  true
    }
  }
};
