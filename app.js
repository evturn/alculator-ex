// var bodyParser = require('body-parser'), 
path = require('path'), //Utilities for dealing with file paths
// var mongoose = require('mongoose'); 

///////////////////////////


express = require('express');
app = express();

logger = require('./logger');
  app.use(logger);

app.get('/blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];
  if (request.query.limit >= 0) {
    response.json(blocks.slice(0, request.query.limit));
  } else {
  response.json(blocks);  
  }
});

var blocks = {
  'Fixed': 'Gonna stay where it is',
  'Movable': 'Could be moved',
  'Rotating': 'Moving in a circle'
};
app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.params.name];
  response.json(description);
  if (!description) {
    response.status(404).json('We aint got ' + request.params.name);
  } else {
    response.json(description);
  }
});




app.use(function(request, response, next){
  if (request.path === "/cities"){
    next();
  } else {
    response.status(404).json("Path requested does not exist");
  }
});
app.get('/cities', function(request, response){
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.json(cities);
});







app.get('/api', function( request, response) {
    response.send('API is running');
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function() {
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

