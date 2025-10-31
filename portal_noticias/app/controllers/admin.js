/**
 * Controller Administrativo
 * 
 * Gerencia funcionalidades administrativas do portal de notícias,
 * incluindo formulários de criação e validação de dados.
 * 
 * Funcionalidades:
 * - Exibição de formulário para nova notícia
 * - Validação e persistência de notícias
 * - Tratamento de erros de validação
 */

/**
 * Exibe o formulário para inclusão de nova notícia
 * 
 * Renderiza a página administrativa com formulário limpo,
 * pronto para receber dados de uma nova notícia.
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 */
module.exports.formulario_inclusao_noticia = function(application, req, res){
	res.render("admin/form_add_noticia", {
		validacao: {},  // Objeto vazio para validações (formulário limpo)
		noticia: {}     // Objeto vazio para dados da notícia (formulário limpo)
	});
}

/**
 * Processa e salva uma nova notícia no banco de dados
 * 
 * Valida todos os campos obrigatórios usando express-validator,
 * em caso de erro reexibe o formulário com mensagens de validação,
 * caso contrário persiste os dados no banco via DAO.
 * 
 * Validações aplicadas:
 * - Título: obrigatório
 * - Resumo: obrigatório, 10-100 caracteres
 * - Autor: obrigatório  
 * - Data: obrigatória, formato YYYY-MM-DD
 * - Conteúdo: obrigatório
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém dados do formulário)
 * @param {Object} res - Objeto de resposta HTTP
 */
module.exports.noticias_salvar = function(application, req, res){
	// Extrai dados do formulário enviado via POST
	var noticia = req.body;

	// Aplicação de regras de validação usando express-validator
	req.assert('titulo', 'Título é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor', 'Nome do autor é obrigatório').notEmpty();
	req.assert('data_noticia', 'Data da notícia é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Notícia é obrigatória').notEmpty();

	// Coleta todos os erros de validação encontrados
	var erros = req.validationErrors();
	
	// Se houver erros, reexibe o formulário com mensagens de erro e dados preenchidos
	if(erros){
		res.render("admin/form_add_noticia", {
			validacao: erros,     // Erros para exibição no template
			noticia: noticia      // Dados preenchidos para manter no formulário
		});
		return;
	}

	// Se não há erros, procede com a persistência no banco de dados
	var connection = application.config.dbConnection();                      // Obtém conexão com MySQL
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);    // Instancia DAO para operações de banco

	// Salva a notícia e redireciona para listagem upon sucesso
	noticiasDAO.salvarNoticia(noticia, function(error, result){
		res.redirect('/noticias');  // Redirecionamento para página de listagem
	});
}