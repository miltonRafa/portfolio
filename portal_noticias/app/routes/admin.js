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
	
	/**
	 * Formulário para criar nova notícia
	 * 
	 * @route GET /formulario_inclusao_noticia
	 * @access Público (⚠️ Deveria ser protegido)
	 * @returns {void} Renderiza admin/form_add_noticia
	 */
	application.get('/formulario_inclusao_noticia', function(req, res){
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
	application.get('/formulario_update_noticia', function(req, res){
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
	application.get('/formulario_delete_noticia', function(req, res){
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
	application.post('/noticias/salvar', function(req, res){
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
	application.post('/noticias/update', function(req, res){
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
	application.post('/noticias/delete', function(req, res){
		application.app.controllers.admin.noticias_delete(application, req, res);
	});
};