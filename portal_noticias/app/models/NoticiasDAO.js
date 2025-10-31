/**
 * Data Access Object (DAO) para Notícias
 * 
 * Implementa o padrão DAO para centralizar todas as operações de banco de dados
 * relacionadas à entidade Notícia. Fornece uma camada de abstração entre
 * os controllers e o banco de dados MySQL.
 * 
 * Padrão de Projeto: DAO (Data Access Object)
 * Responsabilidades:
 * - Encapsular queries SQL
 * - Gerenciar conexões com banco de dados  
 * - Fornecer interface consistente para operações CRUD
 * 
 * @param {Connection} connection - Conexão ativa com banco MySQL
 */
function NoticiasDAO(connection){
	this._connection = connection;  // Armazena conexão MySQL para uso nas queries
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