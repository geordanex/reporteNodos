var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  app.use(express.static(__dirname + '/public'));
  
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example listen on port 3000');
});