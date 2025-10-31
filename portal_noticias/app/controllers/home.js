/**
 * Controller da Página Inicial
 * Gerencia homepage com as últimas notícias publicadas
 */

/**
 * Página inicial do portal
 * Busca as 5 notícias mais recentes e renderiza a homepage
 * 
 * @param {Object} application - Instância da aplicação Express com dependências injetadas
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template home/index com array de notícias
 */
module.exports.index = function(application, req, res){
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.get5UltimasNoticias(function(error, result){
		// Tratamento de erro de banco de dados
		if(error) {
			console.log('❌ Erro ao buscar notícias:', error);
			result = [];  // Array vazio para evitar crash do template
		}
		
		// Verificação se há notícias disponíveis
		if(!result || result.length === 0) {
			console.log('⚠️ Nenhuma notícia encontrada no banco de dados');
			result = [];  // Garante array vazio
		}
		
		console.log('📰 Notícias carregadas:', result.length);
		
		res.render("home/index", {
			noticias: result || []  // Sempre passa array (vazio ou com dados)
		});
	});
};