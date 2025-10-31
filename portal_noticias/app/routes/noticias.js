/**
 * Rotas de Notícias Públicas
 * 
 * Define endpoints públicos para visualização de notícias pelos visitantes.
 * Permite acesso de leitura ao conteúdo do portal sem necessidade de autenticação.
 * 
 * Endpoints definidos:
 * - GET /noticias : Lista completa de notícias
 * - GET /noticia  : Visualização de notícia específica
 */

module.exports = function(application){
	
	/**
	 * Lista todas as notícias publicadas
	 * 
	 * Exibe página com listagem completa de notícias ordenadas por data.
	 * Permite aos visitantes navegar por todo o conteúdo disponível.
	 * 
	 * @route GET /noticias
	 * @description Listagem completa de notícias publicadas
	 * @access Público
	 */
	application.get('/noticias', function(req, res){
		application.app.controllers.noticias.noticias(application, req, res);
	});
	
	/**
	 * Visualiza notícia específica
	 * 
	 * Exibe conteúdo completo de uma notícia individual.
	 * Espera parâmetro id_noticia via query string.
	 * 
	 * @route GET /noticia
	 * @description Visualização de notícia específica
	 * @param {number} id_noticia - ID da notícia a ser exibida (query string)
	 * @access Público
	 * @example GET /noticia?id_noticia=1
	 */
	application.get('/noticia', function(req, res){
		application.app.controllers.noticias.noticia(application, req, res);
	});
};