/**
 * Configuração do Servidor Express
 * Configura middleware, template engine e injeção de dependências via Consign
 */

var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

// Template engine EJS
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Middleware
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({
	secret: 'portal_noticias_secret_key',
	resave: false,
	saveUninitialized: true
}));

// Injeção de dependências com Consign
// Ordem: dbConnection → routes → models → controllers
consign().include('config/dbConnection.js')
	.then('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app; 
	