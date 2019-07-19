const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./db.config');
const cards = require('./models/cards');
const cardRoutes = require('./routes/cardroutes');
const cardInfoRaw = require('./defaultData');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});


mongoose.Promise = global.Promise;
app.use(errorHandler)

// Connecting to the database
mongoose.connect(encodeURI(dbConfig.prod), {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
  cards.deleteMany({}, (err, doc) => {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents deleted");
    }
  });
  cards.insertMany(cardInfoRaw.defaultData, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  })
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
app.use('/cards', cardRoutes);
// listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port 3000");
});

function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}