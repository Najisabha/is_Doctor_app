const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres', 
});

db.authenticate().then(() => {
  console.log('Connection to the database has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db;