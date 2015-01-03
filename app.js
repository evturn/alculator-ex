var application_root = __dirname,
    express = require('express'), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require('path'), //Utilities for dealing with file paths
    mongoose = require('mongoose'); //MongoDB integration

//Create server
var app = express();


app.get('/api', function( request, response) {
    response.send('API is running');
});

app.get('/api/rounds', function(request, response) {
  return RoundModel.find(function(err, rounds){
    if(!err) {
      return response.send(rounds);
    } else {
      return console.log(err);
    }
  })
})



//Where to serve static content
app.use( express.static( path.join( application_root, 'public') ) );
app.use(bodyParser());

//Start server
var port = 4711;

app.listen( port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env );
});

mongoose.connect('mongodb://localhost/alculator_db');

//Schema
var Round = new mongoose.Schema({
  sex: String,
  hours: Number,
  lbs: Number,
  drinks: Number,
  abv: Number,
  bac: Number,
  rate: Number
})

var RoundModel = mongoose.model('Round', Round);

//Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

