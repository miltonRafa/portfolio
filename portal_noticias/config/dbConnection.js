var mysql = require('mysql');
var connMysql = function(){
	console.log('conexao com bd estabelecida');
	return mysql.createConnection({
		host : 'localhost',
		user : 'milton',
		password : '28032014@$Aa',
		database : 'portal_noticias'
	});
};
module.exports = function(){
	console.log('o autoload carregou o modulo de conexao com bd');
	return connMysql;
}
