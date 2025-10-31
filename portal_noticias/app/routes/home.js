/**
 * Rotas da Página Inicial
 * 
 * Define as rotas públicas relacionadas à homepage do portal de notícias.
 * Centraliza o roteamento para a página principal que exibe as últimas notícias.
 * 
 * Endpoints definidos:
 * - GET / : Página inicial com últimas notícias
 */

module.exports = function(application){

	/**
	 * Rota da página inicial
	 * 
	 * Endpoint principal do portal que exibe as 5 notícias mais recentes.
	 * Representa a landing page do site acessível por visitantes.
	 * 
	 * @route GET /
	 * @description Homepage com últimas notícias publicadas
	 * @access Público
	 */
	application.get('/', function(req, res){
		application.app.controllers.home.index(application, req, res);
	});
};
