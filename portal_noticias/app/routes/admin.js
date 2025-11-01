/**
 * Rotas Administrativas - CRUD de Notícias
 * 
 * Define endpoints para funcionalidades administrativas do portal.
 * ⚠️ ATENÇÃO: Em produção, implementar autenticação para estas rotas!
 * 
 * @param {Object} application - Instância Express com dependências injetadas via Consign
 * @returns {void} Define rotas no objeto application
 */

module.exports = function(application){
	function verificaAutenticacao(req, res, next) {
		var usuario = req.session.usuario;
		if(!usuario) {
			console.log('⚠️ Acesso não autorizado a rota administrativa:', req.originalUrl);
			return res.redirect('/admin/login');
		}
		next();
	}

	/**
	 * Formulário para criar nova notícia
	 * 
	 * @route GET /formulario_inclusao_noticia
	 * @access Público (⚠️ Deveria ser protegido)
	 * @returns {void} Renderiza admin/form_add_noticia
	 */
	application.get('/formulario_inclusao_noticia', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
	});

	/**
	 * Formulário para editar notícia existente
	 * 
	 * @route GET /formulario_update_noticia?id_noticia=X
	 * @access Público (⚠️ Deveria ser protegido)
	 * @param {string} id_noticia - ID da notícia via query string
	 * @returns {void} Renderiza admin/form_update_noticia ou redireciona
	 */
	application.get('/formulario_update_noticia', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.formulario_update_noticia(application, req, res);
	});

	/**
	 * Formulário para confirmar exclusão
	 * 
	 * @route GET /formulario_delete_noticia?id_noticia=X
	 * @access Público (⚠️ Deveria ser protegido)
	 * @param {string} id_noticia - ID da notícia via query string
	 * @returns {void} Renderiza admin/form_delete_noticia ou redireciona
	 */
	application.get('/formulario_delete_noticia', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.formulario_delete_noticia(application, req, res);
	});

	/**
	 * Processar criação de notícia
	 * 
	 * @route POST /noticias/salvar
	 * @access Público (⚠️ Deveria ser protegido)
	 * @param {Object} req.body - Dados do formulário (titulo, resumo, autor, data_noticia, noticia)
	 * @returns {void} Renderiza formulário com erros ou redireciona para /noticias
	 */
	application.post('/noticias/salvar', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.noticias_salvar(application, req, res);
	});

	/**
	 * Processar atualização de notícia
	 * 
	 * @route POST /noticias/update
	 * @access Público (⚠️ Deveria ser protegido)
	 * @param {Object} req.body - Dados do formulário incluindo id_noticia via hidden field
	 * @returns {void} Renderiza formulário com erros ou redireciona para /noticias
	 */
	application.post('/noticias/update', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.noticias_update(application, req, res);
	});

	/**
	 * Processar exclusão de notícia
	 * 
	 * @route POST /noticias/delete
	 * @access Público (⚠️ Deveria ser protegido)
	 * @param {Object} req.body - Dados incluindo id_noticia via hidden field
	 * @returns {void} Redireciona para /noticias após exclusão
	 */
	application.post('/noticias/delete', verificaAutenticacao, function(req, res){
		application.app.controllers.admin.noticias_delete(application, req, res);
	});

	/**
	 * Formulário de login administrativo
	 * 
	 * @route GET /admin/login
	 * @access Público
	 * @returns {void} Renderiza admin/form_login
	 */
	application.get('/admin/login', function(req, res){
		res.render("admin/form_login", { validacao: [] });
	});

	/**
	 * Processar login administrativo
	 * 
	 * @route POST /admin/login
	 * @access Público
	 * @param {Object} req.body - Dados do formulário (email, senha)
	 * @returns {void} Autentica e redireciona ou mostra erro
	 */
	application.post('/admin/login', function(req, res){
		application.app.controllers.admin.login_logar(application, req, res);
	});
};