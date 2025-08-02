const express = require('express');
require('dotenv').config();
const routes = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/db'); // Ensure this imports the database connection
const models = require('./models'); // Import the models

const port = process.env.PORT || 3000;
const app = express();

// app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', routes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

db.sync().then(() => {
    app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
    });
  });

