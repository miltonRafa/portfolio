/**
 * Configuração de Conexão MySQL
 * Suporta ambiente de produção (Railway) e desenvolvimento local
 */

var mysql = require('mysql2');

var connMysql = function(){
    console.log('Conexão com banco de dados MySQL estabelecida');
    return mysql.createConnection({
		/*para desenvolvimento local*/
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'portal_app',
        password : process.env.DB_PASS || 'portal123',

		/*para produção no railway
        host     : process.env.DB_HOST || 'mysql.railway.app',
        user     : process.env.DB_USER || 'milton',
        password : process.env.DB_PASS || '28032014Aa',*/
        database : process.env.DB_NAME || 'railway',
        port     : process.env.DB_PORT || 3306
    });
};

module.exports = function(){
	console.log('Autoload carregou o módulo de conexão com banco de dados');
	return connMysql;
}
