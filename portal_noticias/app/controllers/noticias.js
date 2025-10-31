/**
 * Controller de Notícias Públicas
 * 
 * Gerencia a exibição de notícias para visitantes do portal.
 * Responsável por renderizar páginas de listagem e visualização
 * individual de notícias com dados dinâmicos do banco.
 * 
 * Funcionalidades:
 * - Listagem completa de notícias publicadas
 * - Visualização individual de notícias específicas
 * - Interface pública de leitura do conteúdo
 */

/**
 * Lista todas as notícias publicadas
 * 
 * Busca e exibe todas as notícias cadastradas no sistema,
 * ordenadas por data de criação decrescente. Utilizada
 * pela página de arquivo/listagem completa.
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 */
module.exports.noticias = function(application, req, res){
	// Estabelece conexão com banco de dados
	var connection = application.config.dbConnection();
	var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

	// Busca todas as notícias e renderiza página de listagem
	NoticiasDAO.getNoticias(function(error, result){
		res.render("noticias/noticias", {
			noticias: result  // Dados para template de listagem
		});
	});
}

/**
 * Exibe notícia individual
 * 
 * Busca e renderiza uma notícia específica baseada no ID
 * fornecido via query string. Utilizada para visualização
 * completa do conteúdo de um artigo.
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém query string)
 * @param {Object} res - Objeto de resposta HTTP
 * 
 * @example
 * GET /noticia?id_noticia=1
 */
module.exports.noticia = function(application, req, res){
	// Estabelece conexão com banco de dados
	var connection = application.config.dbConnection();
	var NoticiasDAO = new application.app.models.NoticiasDAO(connection);

	// Extrai ID da notícia dos parâmetros de query string
	id_noticia = req.query;

	// Busca notícia específica e renderiza página individual
	NoticiasDAO.getNoticia(id_noticia, function(error, result){
		res.render("noticias/noticia", {
			noticia: result  // Dados da notícia específica para template
		});
	});
}