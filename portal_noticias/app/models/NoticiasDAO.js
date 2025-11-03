/**
 * Data Access Object (DAO) para Notícias
 * 
 * Centraliza operações de banco de dados relacionadas às notícias.
 * Implementa padrão DAO para abstração da camada de dados MySQL.
 * 
 * @param {Connection} connection - Conexão ativa com banco MySQL via mysql2
 */
function NoticiasDAO(connection){
	this._connection = connection;  // Armazena conexão para uso nos métodos
}

/**
 * Lista todas as notícias ordenadas por data de criação
 * 
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com array de notícias ou erro
 */
NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query(
		'SELECT * FROM noticias ORDER BY data_criacao DESC', 
		callback
	);
}

/**
 * Busca notícia específica por ID
 * 
 * @param {Object} id - Objeto contendo propriedade id_noticia
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com dados da notícia ou erro
 */
NoticiasDAO.prototype.getNoticia = function(id, callback){
	this._connection.query(
		'SELECT * FROM noticias WHERE id_noticia = ' + id.id_noticia, 
		callback
	);
}

/**
 * Remove notícia por ID
 * 
 * @param {number} id - ID numérico da notícia a ser removida
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com resultado da operação DELETE
 */
NoticiasDAO.prototype.deleteNoticia = function(id, callback){
	this._connection.query(
		'DELETE FROM noticias WHERE id_noticia = ' + id, 
		callback
	);
}

/**
 * Atualiza notícia existente no banco
 * 
 * @param {number} id - ID numérico da notícia a ser atualizada
 * @param {Object} noticia - Objeto com dados atualizados da notícia
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com resultado da operação UPDATE
 */
NoticiasDAO.prototype.updateNoticia = function(id, noticia, callback){
	this._connection.query(
		'UPDATE noticias SET ? WHERE id_noticia = ' + id, 
		noticia, 
		callback
	);
}

/**
 * Insere nova notícia no banco
 * 
 * @param {Object} noticia - Objeto com dados da nova notícia
 * @param {string} noticia.titulo - Título da notícia
 * @param {string} noticia.resumo - Resumo da notícia (10-100 chars)
 * @param {string} noticia.autor - Nome do autor
 * @param {string} noticia.data_noticia - Data no formato YYYY-MM-DD
 * @param {string} noticia.noticia - Conteúdo completo da notícia
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com resultado da operação INSERT
 */
NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query(
		'INSERT INTO noticias SET ?', 
		noticia, 
		callback
	);
}

/**
 * Busca as 5 notícias mais recentes para homepage
 * 
 * @param {Function} callback - Função de callback (error, result)
 * @returns {void} Executa callback com array limitado a 5 notícias mais recentes
 */
NoticiasDAO.prototype.get5UltimasNoticias = function(callback){
	this._connection.query(
		'SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5', 
		callback
	);
}

/**
 * Exporta classe NoticiasDAO para injeção via Consign
 * 
 * @returns {Function} Construtor da classe NoticiasDAO
 */
module.exports = function(){
	return NoticiasDAO;
}

/**
 * Busca todas as notícias ordenadas por data de criação
 * 
 * Retorna lista completa de notícias cadastradas no sistema,
 * ordenadas da mais recente para a mais antiga.
 * 
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query(
		'SELECT * FROM noticias ORDER BY data_criacao DESC', 
		callback
	);
}

/**
 * Busca uma notícia específica pelo ID
 * 
 * Recupera dados completos de uma notícia individual
 * baseado no identificador único fornecido.
 * 
 * @param {Object} id - Objeto contendo id_noticia
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.getNoticia = function(id, callback){
	this._connection.query(
		'SELECT * FROM noticias WHERE id_noticia = ' + id.id_noticia, 
		callback
	);
}

/**
 * Deleta uma notícia específica pelo ID
 * 
 * Deleta uma notícia individual
 * baseado no identificador único fornecido.
 * 
 * @param {Object} id - Objeto contendo id_noticia
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.deleteNoticia = function(id, callback){
	this._connection.query(
		'DELETE FROM noticias WHERE id_noticia = ' + id, 
		callback
	);
}

/**
 * Atualiza uma notícia específica pelo ID
 * 
 * Atualiza dados completos de uma notícia individual
 * baseado no identificador único fornecido.
 * 
 * @param {Object} id - Objeto contendo id_noticia
 * @param {Object} noticia - Objeto com dados atualizados da notícia
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.updateNoticia = function(id, noticia, callback){
	this._connection.query(
		'UPDATE noticias SET ? WHERE id_noticia = ' + id, 
		noticia, 
		callback
	);
}

/**
 * Persiste nova notícia no banco de dados
 * 
 * Insere registro completo de notícia com todos os campos
 * validados previamente pelo controller administrativo.
 * 
 * Campos esperados no objeto noticia:
 * - titulo: Título da notícia
 * - resumo: Resumo/descrição breve  
 * - noticia: Conteúdo completo
 * - autor: Nome do autor
 * - data_noticia: Data de publicação
 * 
 * @param {Object} noticia - Objeto com dados da notícia a ser salva
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query(
		'INSERT INTO noticias SET ?', 
		noticia, 
		callback
	);
}

/**
 * Busca as 5 notícias mais recentes
 * 
 * Utilizada pela página inicial para exibir um preview
 * das últimas publicações, limitando a 5 registros.
 * 
 * @param {Function} callback - Função de callback (error, result)
 */
NoticiasDAO.prototype.get5UltimasNoticias = function(callback){
	this._connection.query(
		'SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5', 
		callback
	);
}

NoticiasDAO.prototype.logar = function(email, senha, callback){
	this._connection.query(
		'SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha],
		callback
	);
}

NoticiasDAO.prototype.incrementarVisitas = function(callback){
	this._connection.query(
		'INSERT INTO visitas (id, num_visitas) VALUES (1, 1) ON DUPLICATE KEY UPDATE num_visitas = num_visitas + 1',
		callback
	);
}

NoticiasDAO.prototype.getVisitas = function(callback){
	this._connection.query(
		'SELECT * FROM visitas WHERE id = 1',
		callback
	);
}

/**
 * Módulo exportado pelo Consign
 * 
 * Retorna a classe NoticiasDAO para ser instanciada pelos controllers
 * que necessitam realizar operações de banco de dados.
 * 
 * @returns {Function} Construtor da classe NoticiasDAO
 */
module.exports = function(){
	return NoticiasDAO;
}