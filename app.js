// Author: Ivan Bardon
// Mayo 2016


//Require de los modulos
var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var fs = require('fs');




//Configuración
app.set('view engine','pug');
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

// Rutas

app.get('/', function(req, res){
	res.render('index')
});


//Puerto para servir
http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});