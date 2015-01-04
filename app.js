// var bodyParser = require('body-parser'), 
path = require('path'), //Utilities for dealing with file paths
// var mongoose = require('mongoose'); 

///////////////////////////


express = require('express');
app = express();

logger = require('./logger');
  app.use(logger);

only_get = require('./only_get');
  app.use(only_get);

var blocks = {
  'Fixed': 'Gonna stay where it is',
  'Movable': 'Could be moved',
  'Rotating': 'Moving in a circle'
};

var locations = {
  'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
};

//Used for dynamic routing
app.param('name', function(request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  request.blockName = block;
  next();
});


app.get('/blocks', function(request, response) {
  response.json(Object.keys(blocks));  
});


app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.blockName];
  response.json(description);
  if(!description) {
    response.status(404).json('We aint got ' + request.params.name);
  } else {
    response.json(description);
  }
});


app.get('/locations/:name', function(request, response) {
  var location = locations[request.blockName];
  response.json(location);
  if(!location) {
    response.status(404).json('We aint got ' + request.params.name);
  } else {
    response.json(location);
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

