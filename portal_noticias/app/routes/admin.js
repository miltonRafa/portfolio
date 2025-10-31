/**
 * Rotas Administrativas
 * 
 * Define endpoints para funcionalidades administrativas do portal de notícias.
 * Gerencia criação e gestão de conteúdo.
 * 
 * ⚠️  NOTA DE SEGURANÇA: Estas rotas atualmente são públicas.
 * Em produção, devem ser protegidas com sistema de autenticação.
 * 
 * Endpoints definidos:
 * - GET  /formulario_inclusao_noticia : Formulário para criar notícia
 * - POST /noticias/salvar            : Processamento e persistência
 */

module.exports = function(application){
	
	/**
	 * Formulário de inclusão de notícia
	 * 
	 * Exibe interface administrativa para criação de nova notícia.
	 * Apresenta formulário com campos validados para entrada de dados.
	 * 
	 * @route GET /formulario_inclusao_noticia
	 * @description Formulário administrativo para criar notícia
	 * @access Público (⚠️ Deveria ser protegido)
	 * @todo Implementar autenticação administrativa
	 */
	application.get('/formulario_inclusao_noticia', function(req, res){
		application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
	});

	/**
	 * Processamento e salvamento de notícia
	 * 
	 * Recebe dados do formulário, aplica validações server-side
	 * e persiste nova notícia no banco de dados.
	 * 
	 * Campos esperados (POST):
	 * - titulo: string, obrigatório
	 * - resumo: string, 10-100 chars, obrigatório  
	 * - autor: string, obrigatório
	 * - data_noticia: date (YYYY-MM-DD), obrigatório
	 * - noticia: text, obrigatório
	 * 
	 * @route POST /noticias/salvar
	 * @description Validação e persistência de nova notícia
	 * @access Público (⚠️ Deveria ser protegido)
	 * @todo Implementar autenticação administrativa
	 */
	application.post('/noticias/salvar', function(req, res){
		application.app.controllers.admin.noticias_salvar(application, req, res);
	});
};