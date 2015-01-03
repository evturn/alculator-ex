// var bodyParser = require('body-parser'), 
path = require('path'), //Utilities for dealing with file paths
// var mongoose = require('mongoose'); 

///////////////////////////


express = require('express');
app = express();

logger = require('./logger');
  app.use(logger);


app.get('blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable']
})

app.get('/api', function( request, response) {
    response.send('API is running');
});



app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser());


var port = 3000;

app.listen( port, function() {
    console.log('Listening on 3000 \n');
});

// mongoose.connect('mongodb://localhost/alculator_db');

// //Schema
// var Round = new mongoose.Schema({
//   sex: String,
//   hours: Number,
//   lbs: Number,
//   drinks: Number,
//   abv: Number,
//   bac: Number,
//   rate: Number
// })

// var RoundModel = mongoose.model('Round', Round);

