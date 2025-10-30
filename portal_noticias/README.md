# Portal de Notícias

Aplicação web para visualização e gerenciamento de notícias. Sistema simples com interface para leitura e painel administrativo para inclusão de conteúdo.

## Screenshots

![Página inicial](./screenshots/home.png)
*Página inicial com listagem das últimas notícias*

![Visualização de notícia](./screenshots/noticia.png)
*Página de leitura completa da notícia*

![Visualização de todas as notícias](./screenshots/noticias.png)
*Página que  mostra todas da notícias*

![Formulário de inclusão](./screenshots/formulario.png)
*Painel administrativo para adicionar novas notícias*

## Stack tecnológica

- Node.js com Express.js
- Template engine EJS
- Banco de dados MySQL
- Express Validator para validação
- CSS customizado e jQuery

## Funcionalidades

- Listagem de notícias na página inicial
- Visualização completa de artigos individuais
- Formulário administrativo para criação de notícias
- Validação de dados no backend antes da persistência

## Arquitetura do projeto

```
portal_noticias/
├── app/
│   ├── controllers/     # lógica de negócio
│   ├── models/         # camada de acesso a dados (DAO)
│   ├── routes/         # definição de rotas
│   ├── views/          # templates EJS
│   └── public/         # assets estáticos
├── config/
│   ├── server.js       # configuração do Express
│   └── dbConnection.js # configuração do MySQL
└── app.js             # ponto de entrada
```

Implementa o padrão MVC com injeção de dependências via Consign para carregamento automático dos módulos.

## Instalação e execução

Pré-requisitos: Node.js e MySQL instalados.

1. Clone o repositório:
   ```bash
   git clone [url-do-repositorio]
   cd portal_noticias
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   - Crie um banco MySQL
   - Configure a conexão em `config/dbConnection.js`
   - Execute o script SQL para criar a tabela

4. Inicie o servidor:
   ```bash
   node app.js
   ```

5. Acesse: `http://localhost:3000`

## Schema do banco

```sql
CREATE TABLE noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    noticia TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resumo TEXT,
    autor VARCHAR(100),
    data_noticia DATE
);
```

## Principais Aprendizados

- **Arquitetura MVC:** Implementação de uma arquitetura organizada e escalável
- **Express.js:** Configuração de servidor web com middleware
- **Template Engine:** Renderização dinâmica de páginas com EJS
- **Banco de Dados:** Integração com MySQL usando padrão DAO
- **Validação:** Implementação de validação de dados no backend
- **Roteamento:** Organização de rotas em módulos separados

## Melhorias futuras

- [ ] Sistema de autenticação de usuários
- [ ] Categorização de notícias
- [ ] Paginação para grandes volumes de dados
- [ ] Upload e gerenciamento de imagens
- [ ] Funcionalidade de busca
- [ ] Migração para ES6+ com async/await
- [ ] Implementação de testes unitários
- [ ] Sistema de cache

## Endpoints da API

| Método | Rota | Funcionalidade |
|--------|------|----------------|
| `GET` | `/` | Página inicial com últimas notícias |
| `GET` | `/noticias` | Lista completa de notícias |
| `GET` | `/noticia/:id` | Detalhes de notícia específica |
| `GET` | `/formulario_inclusao_noticia` | Formulário para nova notícia |
| `POST` | `/noticias/salvar` | Persistência de nova notícia |


## Desenvolvedor

**Milton** - (https://linkedin.com/in/milton-r-dev) - miltonrs.dev@gmail.com

---

*Este projeto foi desenvolvido como parte do aprendizado de Node.js e desenvolvimento web full-stack.*