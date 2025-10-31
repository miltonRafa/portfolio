var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


var app = express();
app.set('view engine', 'ejs');


// Configurar Content Security Policy para permitir Google Translate
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "style-src 'self' 'unsafe-inline' https://www.gstatic.com; " +
        "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://translate.googleapis.com;"
    );
    next();
});

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//definindo novo caminho de views
app.set('views', './app/views');

consign().include('config/dbConnection.js')
	.then('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);


module.exports = app; 
	