-- Script SQL para criação da estrutura do banco de dados
-- Portal de Notícias

-- Criar banco de dados (opcional)
CREATE DATABASE IF NOT EXISTS portal_noticias;
USE portal_noticias;

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    resumo TEXT,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO noticias (titulo, resumo, conteudo, autor) VALUES 
(
    'Primeira Notícia do Portal',
    'Este é o resumo da primeira notícia publicada no portal.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Milton'
),
(
    'Tecnologia em 2025',
    'As principais tendências tecnológicas para este ano.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Milton'
),
(
    'Node.js e Express',
    'Como criar aplicações web modernas com Node.js.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Milton'
);