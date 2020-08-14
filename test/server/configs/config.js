module.exports = {
  name: 'boilerplate',
  port: 3040,
  allowedOrigins: [],
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    db: 'boilerplate',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};