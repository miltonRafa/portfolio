// Teste de variáveis de ambiente
console.log('=== TESTE DE VARIÁVEIS ===');
console.log('PORT:', process.env.PORT || '❌ NÃO DEFINIDA');
console.log('DB_HOST:', process.env.DB_HOST || '❌ NÃO DEFINIDA');
console.log('DB_USER:', process.env.DB_USER || '❌ NÃO DEFINIDA');
console.log('DB_PASS:', process.env.DB_PASS ? '✅ DEFINIDA' : '❌ NÃO DEFINIDA');
console.log('DB_NAME:', process.env.DB_NAME || '❌ NÃO DEFINIDA');
console.log('DB_PORT:', process.env.DB_PORT || '❌ NÃO DEFINIDA');
console.log('=========================');

// Teste de conexão
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '28032014Aa',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 3306
});

connection.connect(function(err) {
    if (err) {
        console.error('❌ ERRO DE CONEXÃO:', err.message);
        process.exit(1);
    } else {
        console.log('✅ CONEXÃO COM BANCO OK!');
        connection.end();
        
        // Inicia o app normal
        require('./app.js');
    }
});