var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


var blocks = {
  'Fixed': 'Gonna stay where it is',
  'Movable': 'Could be moved',
  'Rotating': 'Moving in a circle'
};

router.route('/')
	.get(function(request, response) {

});
  .post(parseUrlencoded, function(request, response) {

});


module.exports = router;