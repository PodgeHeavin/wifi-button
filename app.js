var express = require('express');
var app = express();

var buttonHit = false;

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/is-button-hit', function (req, res) {
	res.send(buttonHit);
	buttonHit=false;
});

app.get('/button-hit', function (req, res) {
	buttonHit = true;
	res.send("Hit Accepted");
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});