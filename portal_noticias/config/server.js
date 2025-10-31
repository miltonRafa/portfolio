var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


var app = express();
app.set('view engine', 'ejs');


// Configurar CSP totalmente permissivo para projeto de portfólio
app.use((req, res, next) => {
    // Remove headers CSP existentes
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Security-Policy');
    res.removeHeader('X-WebKit-CSP');
    
    // Define CSP completamente permissivo
    res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
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
	