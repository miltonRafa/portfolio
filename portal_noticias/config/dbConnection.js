/**
 * Configuração de Conexão MySQL
 * Suporta variáveis de ambiente ou desenvolvimento local
 */

var mysql = require('mysql2');

var connMysql = function(){
    console.log('Conexão com banco de dados MySQL estabelecida');
    return mysql.createConnection({
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'portal_app',
        password : process.env.DB_PASS || 'portal123',
        database : process.env.DB_NAME || 'portal_noticias',
        port     : process.env.DB_PORT || 3306
    });
};

module.exports = function(){
	console.log('Autoload carregou o módulo de conexão com banco de dados');
	return connMysql;
}
