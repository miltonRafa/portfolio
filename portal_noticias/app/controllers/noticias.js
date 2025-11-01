/**
 * Controller de Notícias Públicas
 * Gerencia listagem e visualização individual de notícias para visitantes
 */

/**
 * Lista todas as notícias publicadas
 * Busca todas as notícias do banco ordenadas por data decrescente
 * 
 * @param {Object} application - Instância da aplicação Express com dependências injetadas
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template noticias/noticias com array de notícias
 */
module.exports.noticias = function(application, req, res){
	var usuario = req.session.usuario;  // Recupera usuário da sessão
	var connection = application.config.dbConnection();
	var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

	NoticiasDAO.getNoticias(function(error, result){
		res.render("noticias/noticias", {
			usuario: usuario,
			noticias: result
		});
	});
}

/**
 * Exibe notícia específica para leitura completa
 * Busca notícia individual pelo ID fornecido via query string
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém query string ?id_noticia=X)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template noticias/noticia com dados da notícia
 */
module.exports.noticia = function(application, req, res){
	var id_noticia = req.query;  // Captura ?id_noticia=123
	var usuario = req.session.usuario;  // Recupera usuário da sessão

	var connection = application.config.dbConnection();
	var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

	NoticiasDAO.getNoticia(req.query, function(error, result){
		res.render("noticias/noticia", {
			usuario: usuario,
			noticia: result
		});
	});
}
