var mysql = require('mysql');

var connMysql = function(){
    console.log('conexao com bd estabelecida');
    return mysql.createConnection({
        host : process.env.DB_HOST || 'localhost',
        user : process.env.DB_USER || 'milton',
        password : process.env.DB_PASS || '28032014Aa',
        database : process.env.DB_NAME || 'portal_noticias',
        port : process.env.DB_PORT || 3306
    });
};module.exports = function(){
	console.log('o autoload carregou o modulo de conexao com bd');
	return connMysql;
}
