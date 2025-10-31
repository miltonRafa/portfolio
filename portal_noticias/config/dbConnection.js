/**
 * Configuração de Conexão com Banco de Dados MySQL
 * 
 * Módulo responsável pela criação e gerenciamento de conexões com MySQL.
 * Suporta configuração via variáveis de ambiente para diferentes ambientes
 * (desenvolvimento local e produção na nuvem).
 * 
 * Driver: mysql2 - Compatível com MySQL 8.0+ e Railway
 */

var mysql = require('mysql2'); // Driver MySQL moderno com suporte a MySQL 8.0

/**
 * Factory para criação de conexões MySQL
 * 
 * Utiliza variáveis de ambiente quando disponíveis (produção),
 * caso contrário utiliza configurações padrão (desenvolvimento local).
 * 
 * Variáveis de ambiente esperadas:
 * - DB_HOST: Endereço do servidor MySQL
 * - DB_USER: Usuário do banco de dados
 * - DB_PASS: Senha de acesso
 * - DB_NAME: Nome da base de dados
 * - DB_PORT: Porta de conexão (padrão: 3306)
 * 
 * @returns {Connection} Instância de conexão MySQL configurada
 */
var connMysql = function(){
    console.log('Conexão com banco de dados MySQL estabelecida');
    return mysql.createConnection({
        host     : process.env.DB_HOST || 'localhost',    // Railway ou localhost
        user     : process.env.DB_USER || 'root',         // Usuário configurado
        password : process.env.DB_PASS || '28032014Aa',   // Senha de desenvolvimento
        database : process.env.DB_NAME || 'railway',      // Base de dados padrão
        port     : process.env.DB_PORT || 3306            // Porta MySQL padrão
    });
};

/**
 * Módulo exportado pelo Consign
 * 
 * Este módulo é carregado automaticamente pelo Consign e disponibilizado
 * para todos os controllers e models da aplicação.
 * 
 * @returns {Function} Factory de conexão MySQL
 */
module.exports = function(){
	console.log('Autoload carregou o módulo de conexão com banco de dados');
	return connMysql;
}
