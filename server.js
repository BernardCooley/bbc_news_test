var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var app = express().use(express.static(
    path.join(__dirname, '')
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


console.log('Server running: http://localhost:8080')
app.listen(8080);
