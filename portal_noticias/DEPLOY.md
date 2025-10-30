# Guia Completo de Deploy - Railway (Gratuito)

Este guia te leva passo a passo para colocar o Portal de Notícias online gratuitamente usando o Railway.

## Por que Railway?

- **100% gratuito** para projetos pequenos
- **Deploy automático** do GitHub
- **Banco MySQL incluído** 
- **URL pública** gerada automaticamente
- **Interface simples** em português

## Antes de começar

✅ Código deve estar no GitHub  
✅ Ter uma conta no GitHub  
✅ Ter o arquivo `.env.example` no projeto

## Passo 1: Acessar o Railway

1. Abra seu navegador
2. Acesse: https://railway.app
3. Clique no botão **"Login"** (canto superior direito)
4. Escolha **"Sign in with GitHub"**
5. Digite seu usuário e senha do GitHub
6. Clique em **"Authorize Railway"** (autorizar)

## Passo 2: Criar Projeto

1. Você verá o painel principal do Railway
2. Clique no botão roxo **"New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Procure pelo nome do seu repositório (ex: `portfolio`)
5. Clique no repositório para selecioná-lo
6. Se o repo tem várias pastas, escolha `portal_noticias`

⏱️ *Aguarde 30 segundos - o Railway vai analisar seu código*

## Passo 3: Adicionar Banco de Dados

1. No projeto criado, você verá uma caixa com o nome do seu app
2. Clique no botão **"New"** (ou sinal de +)
3. Selecione **"Database"**
4. Escolha **"Add MySQL"**
5. Aguarde 1-2 minutos para o banco ser criado

💡 *Você verá duas caixas: uma com seu app e outra com "MySQL"*

## Passo 4: Pegar Dados do Banco

1. Clique na caixa **"MySQL"**
2. Clique na aba **"Variables"** (Variáveis)
3. Você verá várias informações importantes:
   - `MYSQL_HOST` - endereço do banco
   - `MYSQL_USER` - usuário do banco
   - `MYSQL_PASSWORD` - senha do banco  
   - `MYSQL_DATABASE` - nome do banco
   - `MYSQL_PORT` - porta (geralmente 3306)

📝 *Deixe esta aba aberta - vamos usar estes dados no próximo passo*

## Passo 5: Configurar Variáveis do App

1. Clique na caixa do seu **aplicativo** (não o MySQL)
2. Clique na aba **"Variables"**
3. Clique em **"New Variable"** para cada uma:

### Variáveis que você deve adicionar:

| Nome | Valor | Exemplo |
|------|-------|---------|
| `PORT` | `3000` | 3000 |
| `DB_HOST` | *Copie o MYSQL_HOST* | monorail.proxy.rlwy.net |
| `DB_USER` | *Copie o MYSQL_USER* | root |
| `DB_PASS` | *Copie o MYSQL_PASSWORD* | senha-gerada-pelo-railway |
| `DB_NAME` | *Copie o MYSQL_DATABASE* | railway |

### Como adicionar cada variável:
1. Clique **"New Variable"**
2. No campo **"Variable Name"**, digite o nome (ex: `PORT`)
3. No campo **"Variable Value"**, digite o valor (ex: `3000`)
4. Clique **"Add"**
5. Repita para todas as 5 variáveis

## Passo 6: Aguardar o Deploy

1. Clique na aba **"Deployments"** (Deploys)
2. Você verá o status do deploy em tempo real
3. Aguarde aparecer **"SUCCESS"** (verde) - leva 2-3 minutos

🚨 **Se der erro:**
- Clique no deploy com erro
- Leia as mensagens vermelhas
- Geralmente é erro de variável mal configurada

## Passo 7: Criar Tabela no Banco

Seu app está online, mas o banco está vazio. Vamos criar a tabela:

### Opção A: Usar o cliente do Railway
1. Na caixa MySQL, clique em **"Connect"**
2. Copie o comando que aparece (algo como `mysql -h monorail.proxy...`)
3. Cole no seu terminal (precisa ter MySQL instalado)

### Opção B: Usar ferramenta online (mais fácil)
1. Acesse: https://www.adminer.org/
2. Use os dados do MySQL do Railway para conectar
3. Cole o SQL da tabela (veja abaixo)

### SQL para criar a tabela:
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

## Passo 8: Obter URL do Site

1. Volte para caixa do seu **aplicativo**
2. Clique na aba **"Settings"**
3. Procure por **"Domains"** (Domínios)
4. Clique em **"Generate Domain"**
5. Uma URL será criada (ex: `https://seu-app.up.railway.app`)

🎉 **Pronto! Seu site está online!**

## Testar o Site

1. Clique na URL gerada
2. Você deve ver a página inicial do Portal de Notícias
3. Teste criar uma notícia em `/formulario_inclusao_noticia`
4. Verifique se ela aparece na listagem

## Problemas Comuns

### ❌ **"Cannot connect to database"**
- Verifique se as variáveis DB_* estão corretas
- Confirme se copiou os valores exatos do MySQL

### ❌ **"Application failed to respond"**
- Verifique se PORT=3000 está configurado
- Olhe os logs na aba "Deployments"

### ❌ **"Table 'noticias' doesn't exist"**
- Execute o SQL para criar a tabela
- Confirme que está conectado no banco correto

## Custos

O Railway é gratuito para:
- ✅ Até 500 horas por mês (mais que suficiente)
- ✅ Projetos públicos
- ✅ Repositórios do GitHub

## Próximos Passos

1. **Adicione dados teste** - crie algumas notícias para demonstração
2. **Screenshot do site** - tire prints para o portfólio  
3. **Domínio personalizado** - Railway permite domínios próprios
4. **Backup do banco** - exporte os dados regularmente

---

💬 **Deu algum problema?** Releia o passo onde travou e confira se seguiu exatamente as instruções.

🎯 **Site funcionando?** Adicione a URL no seu LinkedIn e currículo!