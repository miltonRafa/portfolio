-- Script SQL para criar tabela noticias no Railway
-- Execute este comando no MySQL do Railway

CREATE TABLE noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    noticia TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resumo TEXT,
    autor VARCHAR(100),
    data_noticia DATE
);

-- Inserir dados de teste
INSERT INTO noticias (titulo, noticia, resumo, autor, data_noticia) VALUES 
('Primeira Notícia do Portal', 'Esta é a primeira notícia publicada no portal em produção. Sistema funcionando perfeitamente!', 'Portal de notícias funcionando em produção', 'Milton', CURDATE()),
('Deploy Realizado com Sucesso', 'O deploy do portal de notícias foi realizado com sucesso no Railway. Todas as funcionalidades estão operacionais.', 'Deploy concluído no Railway', 'Milton', CURDATE());