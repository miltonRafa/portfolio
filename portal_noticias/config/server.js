/**
 * Configuração do Servidor Express
 * 
 * Este arquivo configura toda a infraestrutura do servidor Express,
 * incluindo middleware, template engine, rotas e injeção de dependências.
 * 
 * Padrão MVC implementado com Consign para carregamento automático de módulos
 */

// Dependências principais
var express = require('express');          // Framework web para Node.js
var consign = require('consign');          // Injeção de dependências automática
var bodyParser = require('body-parser');   // Parser para dados de formulários
var expressValidator = require('express-validator'); // Validação de dados de entrada

// Inicialização da aplicação Express
var app = express();

// Configuração do template engine EJS para renderização server-side
app.set('view engine', 'ejs');

// Configuração de middleware
app.use(express.static('./app/public'));                    // Servir arquivos estáticos (CSS, JS, imagens)
app.use(bodyParser.urlencoded({extended: true}));           // Parser para dados de formulário (POST)
app.use(expressValidator());                                 // Habilitação de validação de dados

// Definindo diretório customizado para templates EJS
app.set('views', './app/views');

/**
 * Injeção de Dependências com Consign
 * 
 * Carrega automaticamente módulos na seguinte ordem:
 * 1. dbConnection.js - Configuração do banco de dados
 * 2. app/routes - Definições de rotas 
 * 3. app/models - Modelos de dados (DAO)
 * 4. app/controllers - Lógica de negócio
 */
consign().include('config/dbConnection.js')
	.then('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

// Exporta a instância configurada do Express
module.exports = app; 
	