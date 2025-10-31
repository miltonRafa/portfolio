/**
 * Configuração de Conexão MySQL
 * Suporta ambiente de produção (Railway) e desenvolvimento local
 */

var mysql = require('mysql2');

var connMysql = function(){
    console.log('Conexão com banco de dados MySQL estabelecida');
    return mysql.createConnection({
        host     : process.env.DB_HOST || 'localhost',
        user     : process.env.DB_USER || 'root',
        password : process.env.DB_PASS || '28032014Aa',
        database : process.env.DB_NAME || 'railway',
        port     : process.env.DB_PORT || 3306
    });
};

module.exports = function(){
	console.log('Autoload carregou o módulo de conexão com banco de dados');
	return connMysql;
}
