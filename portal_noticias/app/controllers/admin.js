/**
 * Controller Administrativo - Gerenciamento de Notícias
 * 
 * Funcionalidades CRUD:
 * - Formulários de criação, edição e exclusão
 * - Validação de dados com express-validator
 * - Persistência via NoticiasDAO
 */

const { noticias } = require("./noticias");

/**
 * Exibe formulário para nova notícia
 * 
 * @param {Object} application - Instância da aplicação Express com dependências injetadas
 * @param {Object} req - Objeto de requisição HTTP
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template admin/form_add_noticia
 */
module.exports.formulario_inclusao_noticia = function(application, req, res){
	res.render("admin/form_add_noticia", {
		validacao: {},  // Array vazio - sem erros na primeira carga
		noticia: {}     // Objeto vazio - formulário limpo
	});
}

/**
 * Exibe formulário para editar notícia existente
 * Busca dados da notícia pelo ID via query string
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém query string ?id_noticia=X)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template admin/form_update_noticia ou redireciona
 */
module.exports.formulario_update_noticia = function(application, req, res){
	var id_noticia = req.query;  // Captura ?id_noticia=123
	
	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);
	
	noticiasDAO.getNoticia(id_noticia, function(error, result){
		if(result.length > 0){
			res.render("admin/form_update_noticia", {
				validacao: {},          // Sem erros na primeira carga
				noticia: result[0]      // Dados da notícia para preencher formulário
			});
		} else {
			res.redirect('/noticias'); // Notícia não encontrada
		}
	});
}

/**
 * Exibe formulário para confirmar exclusão de notícia
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém query string ?id_noticia=X)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza template admin/form_delete_noticia ou redireciona
 */
module.exports.formulario_delete_noticia = function(application, req, res){
	var id_noticia = req.query;  // Captura ?id_noticia=123
	
	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);
	
	noticiasDAO.getNoticia(id_noticia, function(error, result){
		if(result.length > 0){
			res.render("admin/form_delete_noticia", {
				validacao: {},          // Sem erros na primeira carga
				noticia: result[0]      // Dados da notícia para confirmação
			});
		} else {
			res.redirect('/noticias'); // Notícia não encontrada
		}
	});
}

/**
 * Processa e salva nova notícia
 * Aplica validações e persiste no banco via DAO
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém dados do formulário via POST)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza formulário com erros ou redireciona para /noticias
 */
module.exports.noticias_salvar = function(application, req, res){
	var noticia = req.body;  // Todos os dados do formulário

	// Validações obrigatórias usando express-validator
	req.assert('titulo', 'Título é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor', 'Nome do autor é obrigatório').notEmpty();
	req.assert('data_noticia', 'Data da notícia é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Notícia é obrigatória').notEmpty();

	var erros = req.validationErrors();
	
	// Se há erros, reexibe formulário com dados preenchidos
	if(erros){
		res.render("admin/form_add_noticia", {
			validacao: erros,     // Array de erros para exibição
			noticia: noticia      // Mantém dados preenchidos
		});
		return;
	}

	// Sem erros: salva no banco e redireciona
	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.salvarNoticia(noticia, function(error, result){
		res.redirect('/noticias');  // Sucesso: vai para listagem
	});
}

/**
 * Processa e atualiza notícia existente
 * Aplica validações e atualiza via DAO usando ID do campo hidden
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém id_noticia via hidden field)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Renderiza formulário com erros ou redireciona para /noticias
 */
module.exports.noticias_update = function(application, req, res){
	var id = req.body.id_noticia;  // ID vem do campo hidden do formulário
	var noticia = {
		titulo: req.body.titulo,
		resumo: req.body.resumo, 
		autor: req.body.autor,
		data_noticia: req.body.data_noticia,
		noticia: req.body.noticia
	};

	// Validações obrigatórias usando express-validator
	req.assert('titulo', 'Título é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor', 'Nome do autor é obrigatório').notEmpty();
	req.assert('data_noticia', 'Data da notícia é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Notícia é obrigatória').notEmpty();

	var erros = req.validationErrors();
	
	// Se há erros, reexibe formulário com dados preenchidos
	if(erros){
		res.render("admin/form_update_noticia", {
			validacao: erros,     // Array de erros para exibição
			noticia: noticia      // Mantém dados preenchidos
		});
		return;
	}

	// Sem erros: atualiza no banco e redireciona
	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.updateNoticia(id, noticia, function(error, result){
		res.redirect('/noticias');  // Sucesso: vai para listagem
	});
}

/**
 * Processa e deleta notícia
 * Remove notícia do banco usando ID do campo hidden
 * 
 * @param {Object} application - Instância da aplicação Express
 * @param {Object} req - Objeto de requisição HTTP (contém id_noticia via hidden field)
 * @param {Object} res - Objeto de resposta HTTP
 * @returns {void} Redireciona para /noticias após exclusão
 */
module.exports.noticias_delete = function(application, req, res){
	var id = req.body.id_noticia;  // ID vem do campo hidden do formulário

	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.deleteNoticia(id, function(error, result){
		res.redirect('/noticias');  // Sucesso: vai para listagem
	});
}

module.exports.login_logar = function(application, req, res){
	var email = req.body.email;
	var senha = req.body.senha;

	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.logar(email, senha, function(error, result){
		if(result.length > 0){
			var usuario = result[0];
			req.session.usuario = usuario;  // Armazena na sessão
			res.redirect('/');  // Redireciona para homepage
			// Incrementa visitas após renderizar
			noticiasDAO.incrementarVisitas(function(error, result){
				if(error) {
					console.log('❌ Erro ao incrementar visitas:', error);
				}
			});
		} else {
			res.render("admin/form_login", {
				validacao: [{msg: "credenciais inválidas"}]
			});
		}
	});
};
