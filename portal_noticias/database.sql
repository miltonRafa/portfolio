-- ========================================
-- SCRIPT COMPLETO - PORTAL DE NOTÍCIAS
-- Database: portal_noticias
-- ========================================

-- Verificar tabelas existentes
SHOW TABLES;

-- ========================================
-- CRIAÇÃO DA TABELA NOTÍCIAS
-- ========================================

CREATE TABLE IF NOT EXISTS noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    noticia TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resumo TEXT,
    autor VARCHAR(100),
    data_noticia DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
COMMENT='Tabela principal de notícias do portal';

-- ========================================
-- CRIAÇÃO DA TABELA USUARIOS
-- ========================================

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL COMMENT 'Nome completo do usuário',
  `email` varchar(150) NOT NULL COMMENT 'Email único para login', 
  `senha` varchar(255) NOT NULL COMMENT 'Senha do usuário',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
COMMENT='Tabela de usuários administrativos do portal';

-- ========================================
-- CRIAÇÃO DA TABELA VISITAS
-- ========================================

CREATE TABLE IF NOT EXISTS `visitas` (
  `id` int NOT NULL PRIMARY KEY,
  `num_visitas` int NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
COMMENT='Tabela para contador de visitas do portal';

-- ========================================
-- INSERÇÃO DE DADOS DE TESTE - NOTÍCIAS
-- ========================================

INSERT IGNORE INTO noticias (titulo, noticia, resumo, autor, data_noticia) VALUES 
('Primeira Notícia do Portal', 'Esta é a primeira notícia publicada no portal. Sistema funcionando perfeitamente!', 'Portal de notícias funcionando', 'Milton', CURDATE()),
('Sistema de Autenticação Implementado', 'Foi implementado sistema completo de autenticação para administradores do portal, com login seguro e controle de sessões.', 'Autenticação admin funcionando', 'Milton', CURDATE()),
('Funcionalidades Completas', 'Portal de notícias com sistema CRUD completo, autenticação de usuários e interface responsiva.', 'Sistema completo e operacional', 'Milton', CURDATE());

-- ========================================
-- INSERÇÃO DE DADOS - USUÁRIO ADMIN
-- ========================================

INSERT IGNORE INTO `usuarios` (`nome`, `email`, `senha`) VALUES 
('Admin Portal', 'admin@portal.com', 'admin123');

-- ========================================
-- INSERÇÃO DE DADOS - CONTADOR VISITAS
-- ========================================

INSERT IGNORE INTO `visitas` (`id`, `num_visitas`) VALUES 
(1, 0);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'Script executado com sucesso!' as status;
SELECT 'TABELAS CRIADAS:' as info;
SHOW TABLES;

SELECT 'DADOS INSERIDOS - NOTÍCIAS:' as info;
SELECT id_noticia, titulo, autor, data_noticia FROM noticias;

SELECT 'DADOS INSERIDOS - USUÁRIOS:' as info;
SELECT id, nome, email, created_at FROM usuarios;

SELECT 'DADOS INSERIDOS - VISITAS:' as info;
SELECT id, num_visitas FROM visitas;

SELECT 'ESTRUTURA TABELA NOTÍCIAS:' as info;
DESCRIBE noticias;

SELECT 'ESTRUTURA TABELA USUÁRIOS:' as info;
DESCRIBE usuarios;

SELECT 'ESTRUTURA TABELA VISITAS:' as info;
DESCRIBE visitas;