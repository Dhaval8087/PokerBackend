const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 8082

const mongodb = require('mongodb')
const mongoose = require('mongoose')
const MongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://127.0.0.1:27017/chrisdb'
const inventory = require('./models/inventory');
const cards = require('./routes/cards');
//console.log('chris: ' + process.env.MONGO_ATLAS_PW)

//const uri = "mongodb://Benson:Fox1989%21@cluster0-shard-00-00-bs9px.mongodb.net:27017,cluster0-shard-00-01-bs9px.mongodb.net:27017,cluster0-shard-00-02-bs9px.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
//mongodb+srv://Benson:<password>@cluster0-bs9px.mongodb.net/test
const uri = encodeURI("mongodb+srv://Dhaval8087:Thomson123*@card-mrm6b.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {
    console.log('Connected to MongoDB');
    inventory.deleteMany({},(err,doc)=>{
       if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents deleted");
      }
    });
    const cardInfoRaw = fs.readFileSync('./cardData.json');
    
    inventory.insertMany(JSON.parse(cardInfoRaw), function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    })
    app.listen(port, () => console.log(`Example app listening on port ${port}`))
  },
  err => {
    console.log(`Error Connecting to MongoDB: ${err}`)
  }
);

// MongoClient.connect(t, { useNewUrlParser: true }, (err, client) => {
//   if (err) {
//   	console.log('Failed to connect: ' + err)
//   	return
//   }

//   console.log('Connected to mongo server!!!')
//   app.locals.db = client.db('chrisdb')

//   app.listen(port, () => console.log(`Example app listening on port ${port}`))
// })

app.use(express.json())
app.use(express.urlencoded())

app.use('/', require('cors')())
app.use('/cards',cards);
//app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  console.log('\nUniversal Handler')
  next()
})


app.use(function (err, req, res, next) {
  console.log('unhandled error detected: ' + err.message)
  res.send('500 - server error')
})

app.use(function (req, res) {
  console.log('route not handled')
  res.send('404 - not found')
})

//app.listen(port, () => console.log(`Example app listening on port ${port}`))

