/**
 * Controller da Página Inicial
 * 
 * Gerencia a lógica de apresentação da homepage do portal de notícias,
 * responsável por exibir as notícias mais recentes para os visitantes.
 * 
 * Funcionalidades:
 * - Carregamento das últimas notícias publicadas
 * - Renderização da página inicial com dados dinâmicos
 */

/**
 * Página inicial do portal de notícias
 * 
 * Busca as 5 notícias mais recentes no banco de dados e renderiza
 * a homepage com esses dados, proporcionando aos visitantes uma
 * visão geral do conteúdo mais atual do portal.
 * 
 * Fluxo de dados:
 * 1. Estabelece conexão com banco de dados
 * 2. Instancia o DAO de notícias
 * 3. Busca as 5 últimas notícias publicadas
 * 4. Renderiza template da homepage com os dados
 * 
 * @param {Object} application - Instância da aplicação Express com dependências
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 */
module.exports.index = function(application, req, res){
	// Estabelece conexão com banco de dados MySQL
	var connection = application.config.dbConnection();
	
	// Instancia o modelo DAO para operações com notícias
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	// Busca as 5 notícias mais recentes e renderiza a página inicial
	noticiasModel.get5UltimasNoticias(function(error, result){
		res.render("home/index", {
			noticias: result  // Passa dados das notícias para o template EJS
		});
	});
};