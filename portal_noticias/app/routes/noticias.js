/**
 * Rotas Públicas de Notícias
 * 
 * Define endpoints para visualização de notícias pelos visitantes.
 * Acesso de leitura ao conteúdo sem necessidade de autenticação.
 * 
 * @param {Object} application - Instância Express com dependências injetadas via Consign
 * @returns {void} Define rotas públicas no objeto application
 */

module.exports = function(application){
	
	/**
	 * Lista todas as notícias publicadas
	 * 
	 * @route GET /noticias
	 * @access Público
	 * @returns {void} Renderiza noticias/noticias com listagem completa
	 */
	application.get('/noticias', function(req, res){
		application.app.controllers.noticias.noticias(application, req, res);
	});
	
	/**
	 * Visualiza notícia específica
	 * 
	 * @route GET /noticia?id_noticia=X
	 * @access Público
	 * @param {string} id_noticia - ID da notícia via query string
	 * @returns {void} Renderiza noticias/noticia com dados da notícia individual
	 */
	application.get('/noticia', function(req, res){
		application.app.controllers.noticias.noticia(application, req, res);
	});
};