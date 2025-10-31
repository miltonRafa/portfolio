/**
 * Rotas da Página Inicial
 * 
 * Define rota principal do portal que exibe homepage com últimas notícias.
 * 
 * @param {Object} application - Instância Express com dependências injetadas via Consign
 * @returns {void} Define rota principal no objeto application
 */

module.exports = function(application){
	/**
	 * Homepage com últimas notícias
	 * 
	 * @route GET /
	 * @access Público
	 * @returns {void} Renderiza home/index com 5 notícias mais recentes
	 */
	application.get('/', function(req, res){
		application.app.controllers.home.index(application, req, res);
	});
};
