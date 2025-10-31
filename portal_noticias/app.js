/**
 * Portal de Notícias - Aplicação Web Full Stack
 * 
 * Ponto de entrada da aplicação que inicializa o servidor Express
 * com configurações de middleware, rotas e conexão com banco de dados.
 * 
 * Tecnologias: Node.js, Express.js, MySQL, EJS
 * Padrão: MVC com injeção de dependências (Consign)
 * 
 * @author Milton Rafa
 */

// Importa a configuração do servidor Express com todas as dependências carregadas
var app = require('./config/server');

// Define a porta do servidor: Railway (produção) ou 3000 (desenvolvimento)
var port = process.env.PORT || 3000;

// Inicia o servidor HTTP na porta especificada
app.listen(port, function(){
	console.log("Servidor rodando com express na porta " + port);
});