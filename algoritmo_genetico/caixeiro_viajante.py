# Importa bibliotecas necessárias
import random
import math
import matplotlib.pyplot as plt
import time

# Parâmetros do algoritmo genético
tamanho_populacao = 300  # Número de indivíduos (rotas) na população
elitismo = 25  # Percentual dos melhores indivíduos preservados entre gerações (25%)
prob_mutacao = 1.0  # Probabilidade de aplicar mutação (100%)
prob_crossover = 1.0  # Probabilidade de aplicar crossover (100%)
par_sucesso = 0.00810272938734019  # Fitness alvo para considerar sucesso (ajuste conforme o problema)
geracoes100melhoria = 20  # Número de gerações sem melhoria para considerar convergência

coordenadas_iniciais = (0, 0)
nome_cidade_inicial = ''
print("\nEscolha uma cidade inicial fixa para todas as execuções\n")
nome_cidade_inicial = input("Digite o nome da cidade inicial: ")
coordenadas_str = input("Digite as coordenadas da cidade inicial no formato x,y: ")
print("\n")

# Converte a string de coordenadas para tupla de inteiros
x, y = coordenadas_str.split(',')
coordenadas_iniciais = (int(x.strip()), int(y.strip()))

cidades = { #indiviíduos do problema caixeiro viajante
    'A': (10, 10),
    'B': (20, 15),
    'C': (30, 10),
    'D': (25, 25),
    'E': (10, 30),
    'F': (5, 25),
    'G': (0, 10),
    'H': (10, 0),
    'I': (20, 5),
    'J': (30, 0)
}

# Se a cidade inicial não está no dicionário, adiciona ela
if nome_cidade_inicial not in cidades:
    cidades_lista = {nome_cidade_inicial: coordenadas_iniciais}  # Cria novo dicionário com cidade inicial
    cidades_lista.update(cidades)  # Adiciona todas as outras cidades
    cidades = cidades_lista  # Substitui o dicionário original
else:
    # Se a cidade já existe, remove a versão antiga e adiciona a nova com coordenadas atualizadas
    cidades_lista = cidades.copy()  # Cria cópia do dicionário
    del cidades_lista[nome_cidade_inicial]  # Remove a cidade antiga
    cidades_lista = {nome_cidade_inicial: coordenadas_iniciais, **cidades_lista}  # Adiciona cidade inicial no começo
    cidades = cidades_lista

num_cidades = len(cidades)
complexidade_problema = math.factorial(num_cidades-1) # Fatorial do número de cidades (complexidade do problema)
complexidade_simetria = complexidade_problema / 2  # Divide por 2 devido à simetria (A→B→C = C→B→A)
print(f"Complexidade do problema ({num_cidades-1}!/2): {complexidade_simetria:,.0f} rotas possíveis\n")
print("cidades:", cidades)

def gerar_percurso_aleatorio(cidades): # Gera um percurso aleatório entre as cidades
    cidades_lista = list(cidades.keys()) # Obtém a lista de cidades
    cidade_inicial = cidades_lista[0]  # Guarda a primeira cidade
    outras_cidades = cidades_lista[1:]  # Pega as outras
    random.shuffle(outras_cidades)  # Embaralha apenas as outras
    cidades_lista = [cidade_inicial] + outras_cidades  # Reconstrói com inicial no começo
    percurso = [cidades[cidade] for cidade in cidades_lista] # Constrói o percurso com as coordenadas das cidades
    return percurso

def gerar_populacao(cidades, tamanho_populacao): # Gera a população inicial
    return [gerar_percurso_aleatorio(cidades) for _ in range(tamanho_populacao)]

def calcular_distancia(percurso): # Calcula a distância total de um percurso
    distancia_total = 0
    for i in range(len(percurso) - 1):
        x1, y1 = percurso[i] # Coordenadas da cidade atual
        x2, y2 = percurso[i + 1] # Coordenadas da próxima cidade
        distancia_total += math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
     # Adiciona distância de volta à cidade inicial
    x1, y1 = percurso[-1] # Coordenadas da última cidade
    x2, y2 = percurso[0] # Coordenadas da primeira cidade
    distancia_total += math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return distancia_total

def selecionar_pais(populacao): # Seleciona dois pais da população usando torneio
    pai_1 = []
    pai_2 = []
    # Seleciona pares de pais usando torneio entre 4 indivíduos aleatórios
    for i in range(len(populacao)):
        # Sorteia 4 índices diferentes
        indices = random.sample(range(len(populacao)), 4)
        n1, n2, n3, n4 = indices[0], indices[1], indices[2], indices[3]
        # Calcula o fitness dos 4 sorteados
        fit_1 = fitness(populacao[n1])
        fit_2 = fitness(populacao[n2])
        fit_3 = fitness(populacao[n3])
        fit_4 = fitness(populacao[n4])
        # Seleciona o melhor entre n1 e n2 para pai_1
        if fit_1 > fit_2:
            pai_1.append(populacao[n1])
        else:
            pai_1.append(populacao[n2])
        # Seleciona o melhor entre n3 e n4 para pai_2
        if fit_3 > fit_4:
            pai_2.append(populacao[n3])
        else:
            pai_2.append(populacao[n4])
    return pai_1, pai_2

def mutacao(percurso, pm):
    """Mutação por SWAP com Hill Climbing: troca 2 cidades aleatórias e reverte se piorar"""
    valor = random.random()
    if valor < pm:
        # Seleciona 2 índices aleatórios (exclui cidade inicial)
        indice_mutacao1 = random.randint(1, len(percurso) - 1)
        indice_mutacao2 = random.randint(1, len(percurso) - 1)
        percurso_aux = percurso.copy()  # Guarda cópia antes da mutação
        # Troca as posições das 2 cidades
        percurso[indice_mutacao1], percurso[indice_mutacao2] = percurso[indice_mutacao2], percurso[indice_mutacao1]
        # Hill Climbing: reverte se piorou a distância
        if calcular_distancia(percurso_aux) < calcular_distancia(percurso):
            percurso = percurso_aux
    return percurso

def mutacao_inversao(percurso, pm):
    """Mutação por INVERSÃO com Hill Climbing: inverte segmento entre 2 pontos e reverte se piorar"""
    valor = random.random()
    if valor < pm:
        # Seleciona 2 pontos aleatórios (exclui cidade inicial)
        i1 = random.randint(1, len(percurso) - 2)
        i2 = random.randint(i1 + 1, len(percurso) - 1)
        percurso_aux = percurso.copy()  # Guarda cópia antes da mutação
        
        # Inverte o segmento entre i1 e i2 (preserva adjacências internas)
        percurso[i1:i2+1] = reversed(percurso[i1:i2+1])
        # Hill Climbing: reverte se piorou a distância
        if calcular_distancia(percurso_aux) < calcular_distancia(percurso):
            percurso = percurso_aux
    return percurso

def top_indices(populacao, elitismo):
    """Retorna os índices dos melhores indivíduos da população baseado no percentual de elitismo"""
    ind_preservados = elitismo * len(populacao) // 100  # Calcula quantidade a preservar
    fit_pop = calcula_fitness(populacao)  # Calcula fitness de todos
    # Ordena índices por fitness decrescente e pega os melhores
    top_indices = sorted(range(len(fit_pop)), key=lambda i: fit_pop[i], reverse=True)[:ind_preservados]
    return top_indices

def piores_indices(populacao, elitismo):
    """Retorna os índices dos piores indivíduos da população baseado no percentual de elitismo"""
    ind_excluidos = elitismo * len(populacao) // 100  # Calcula quantidade a excluir
    fit_pop = calcula_fitness(populacao)  # Calcula fitness de todos
    # Ordena índices por fitness crescente e pega os piores
    bottom_indices = sorted(range(len(fit_pop)), key=lambda i: fit_pop[i])[:ind_excluidos]
    return bottom_indices

def top_percent(populacao, percentual):
    """Retorna os melhores indivíduos da população baseado em um percentual (redução populacional na geração 1)"""
    fit_pop = calcula_fitness(populacao)  # Calcula fitness de todos
    top_count = int(len(populacao) * percentual)  # Percentual da população
    # Ordena por fitness decrescente e pega os melhores
    top_indices = sorted(range(len(fit_pop)), key=lambda i: fit_pop[i], reverse=True)[:top_count]
    top_individuos = [populacao[i] for i in top_indices]
    return top_individuos

def crossover(pai_1, pai_2, populacao, pm, pc):
    """Realiza crossover entre pais e aplica mutação nos filhos gerados"""
    filho = populacao.copy()
    for i in range(len(pai_1)):
        valor = random.random()
        individuo_pai2 = pai_2[i]
        individuo_pai1 = pai_1[i]
        if valor < pc:  # Aplica crossover
            # Define pontos de corte (exclui índice 0 para preservar cidade inicial)
            indices_possiveis = list(range(1, len(pai_1[i]) - 1))
            corte1, corte2 = sorted(random.sample(indices_possiveis, 2))
            
            # Sempre começa com a cidade inicial (índice 0)
            individuo_cruzado = [individuo_pai1[0]]
            meio_individuo_pai2 = individuo_pai2[corte1:corte2+1]  # Segmento do pai 2
            
            # Adiciona cidades de pai_1 que NÃO estão no meio de pai_2
            for cidade in individuo_pai1[1:]:  # Ignora cidade inicial
                if cidade not in meio_individuo_pai2 and cidade not in individuo_cruzado:
                    individuo_cruzado.append(cidade)
                    if len(individuo_cruzado) == corte1:  # Preencheu até corte1
                        break
            
            # Adiciona o meio do pai_2 (segmento entre cortes)
            individuo_cruzado += meio_individuo_pai2

            # Completa com cidades que faltam (de pai_2)
            for cidade in individuo_pai2[1:]:  # Percorre pai_2 ignorando cidade inicial
                if cidade not in individuo_cruzado:
                    individuo_cruzado.append(cidade)
            
            filho[i] = individuo_cruzado
        else:  # Não aplica crossover: escolhe o melhor pai
            fit_individuo_pai1 = fitness(individuo_pai1)
            fit_individuo_pai2 = fitness(individuo_pai2)
            if fit_individuo_pai1 > fit_individuo_pai2:
                filho[i] = individuo_pai1
            else:
                filho[i] = individuo_pai2
        
        # Aplica mutação no filho gerado
        filho[i] = mutacao_inversao(filho[i], pm)  # Usa inversão (melhor desempenho)
        # filho[i] = mutacao(filho[i], pm) --- IGNORE ---
    return filho

def fitness(percurso):
    """Calcula o fitness de um percurso (quanto maior melhor): fitness = 1/distância"""
    distancia = calcular_distancia(percurso)
    if distancia == 0:
        return float('inf')  # Evita divisão por zero
    return 1 / distancia  # Menor distância = maior fitness

def print_fitness(populacao):
    """Imprime distância e fitness de todos os indivíduos da população (para debug)"""
    for individuo in populacao:
        fitness_val = fitness(individuo)
        distancia = calcular_distancia(individuo)
        print(f"Distância do percurso: {distancia}, Fitness: {fitness_val}")

def calcula_fitness(populacao):
    """Calcula o fitness de todos os indivíduos da população e retorna lista"""
    fit_pop = []
    for individuo in populacao:
        fit_pop.append(fitness(individuo))
    return fit_pop

def cidades_na_rota(melhor_individuo):
    """Converte coordenadas do indivíduo para nomes de cidades"""
    rota = []
    for coordenada in melhor_individuo:  # Percorre as coordenadas do melhor indivíduo
        for cidade, coord in cidades.items():  # Percorre o dicionário de cidades
            if coord == coordenada:  # Compara coordenadas
                rota.append(cidade)
                break
    return rota

def plotar_rota(melhor_individuo, distancia, fitness_val):
    """
    Plota a melhor rota encontrada em um gráfico X por Y
    """
    # Extrai as coordenadas X e Y
    x_coords = [cidade[0] for cidade in melhor_individuo]
    y_coords = [cidade[1] for cidade in melhor_individuo]
    
    # Adiciona a primeira cidade no final para fechar o circuito
    x_coords.append(melhor_individuo[0][0])
    y_coords.append(melhor_individuo[0][1])
    
    # Obtém os nomes das cidades na ordem da rota
    rota_nomes = cidades_na_rota(melhor_individuo)
    
    # Cria o gráfico
    plt.figure(figsize=(10, 8))
    
    # Plota as linhas conectando as cidades
    plt.plot(x_coords, y_coords, 'b-', linewidth=2, label='Rota')
    
    # Plota os pontos das cidades
    plt.scatter([cidade[0] for cidade in melhor_individuo], 
                [cidade[1] for cidade in melhor_individuo], 
                c='red', s=200, zorder=5)
    
    # Adiciona os nomes das cidades
    for i, (x, y) in enumerate(melhor_individuo):
        plt.annotate(rota_nomes[i], (x, y), 
                    textcoords="offset points", 
                    xytext=(0, 10), 
                    ha='center',
                    fontsize=12,
                    fontweight='bold')
    
    # Adiciona título e informações
    plt.title(f'Melhor Rota - Caixeiro Viajante\n' +
              f'Distância: {distancia:.2f} | Fitness: {fitness_val:.6f}',
              fontsize=14, fontweight='bold')
    plt.xlabel('Coordenada X', fontsize=12)
    plt.ylabel('Coordenada Y', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    # Ajusta os limites do gráfico dinamicamente baseado nas coordenadas
    x_coords_all = [cidade[0] for cidade in melhor_individuo]
    y_coords_all = [cidade[1] for cidade in melhor_individuo]
    
    # Calcula margem de 10% do range de coordenadas
    x_range = max(x_coords_all) - min(x_coords_all)
    y_range = max(y_coords_all) - min(y_coords_all)
    margin_x = max(5, x_range * 0.1)  # Margem mínima de 5
    margin_y = max(5, y_range * 0.1)
    
    plt.xlim(min(x_coords_all) - margin_x, max(x_coords_all) + margin_x)
    plt.ylim(min(y_coords_all) - margin_y, max(y_coords_all) + margin_y)
    
    plt.tight_layout()
    plt.show()

def plotar_comparacao_rotas(lista_rotas):
    """
    Plota múltiplas rotas em um grid para comparação
    lista_rotas: lista de tuplas (individuo, distancia, fitness, run_number)
    """
    n_rotas = len(lista_rotas)
    
    # Define o grid (2 linhas x 5 colunas para 10 rotas)
    fig, axes = plt.subplots(2, 5, figsize=(20, 10))
    fig.suptitle('Comparação das Melhores Rotas - 10 Execuções', fontsize=16, fontweight='bold')
    
    axes = axes.flatten()  # Transforma em array 1D para facilitar iteração
    
    for idx, (individuo, distancia, fitness_val, run_num) in enumerate(lista_rotas):
        ax = axes[idx]
        
        # Extrai as coordenadas X e Y
        x_coords = [cidade[0] for cidade in individuo]
        y_coords = [cidade[1] for cidade in individuo]
        
        # Obtém os nomes das cidades na ordem da rota
        rota_nomes = cidades_na_rota(individuo)
        
        # Plota as setas mostrando a direção da rota
        for i in range(len(individuo)):
            x_inicio = individuo[i][0]
            y_inicio = individuo[i][1]
            if i < len(individuo) - 1:
                x_fim = individuo[i+1][0]
                y_fim = individuo[i+1][1]
            else:
                # Última cidade volta para a primeira
                x_fim = individuo[0][0]
                y_fim = individuo[0][1]
            
            # Desenha seta
            ax.annotate('', xy=(x_fim, y_fim), xytext=(x_inicio, y_inicio),
                       arrowprops=dict(arrowstyle='->', color='blue', lw=1.5))
        
        # Plota os pontos das outras cidades (vermelho)
        if len(individuo) > 1:
            ax.scatter([cidade[0] for cidade in individuo[1:]], 
                       [cidade[1] for cidade in individuo[1:]], 
                       c='red', s=100, zorder=5)
        
        # Plota a cidade inicial (verde) - sempre a primeira
        ax.scatter([individuo[0][0]], [individuo[0][1]], 
                   c='green', s=150, zorder=6, marker='s', edgecolors='black', linewidths=2)
        
        # Adiciona os nomes das cidades
        for i, (x, y) in enumerate(individuo):
            ax.annotate(rota_nomes[i], (x, y), 
                       textcoords="offset points", 
                       xytext=(0, 5), 
                       ha='center',
                       fontsize=8,
                       fontweight='bold')
        
        # Adiciona título com informações
        ax.set_title(f'Run #{run_num}\nDist: {distancia:.2f} | Fit: {fitness_val:.6f}',
                    fontsize=10)
        ax.set_xlabel('X', fontsize=8)
        ax.set_ylabel('Y', fontsize=8)
        ax.grid(True, alpha=0.3)
        
        # Ajusta os limites dinamicamente para cada subplot
        x_coords_all = [cidade[0] for cidade in individuo]
        y_coords_all = [cidade[1] for cidade in individuo]
        
        # Calcula margem de 10% do range de coordenadas
        x_range = max(x_coords_all) - min(x_coords_all)
        y_range = max(y_coords_all) - min(y_coords_all)
        margin_x = max(3, x_range * 0.1)  # Margem mínima de 3
        margin_y = max(3, y_range * 0.1)
        
        ax.set_xlim(min(x_coords_all) - margin_x, max(x_coords_all) + margin_x)
        ax.set_ylim(min(y_coords_all) - margin_y, max(y_coords_all) + margin_y)
    
    plt.tight_layout()
    plt.show()

def resultado_final(populacao):
    """
    Loop principal do algoritmo genético com convergência adaptativa
    Para após 20 gerações consecutivas sem melhoria no fitness
    Na geração 1: reduz população para 33% melhores e dobra elitismo
    """
    fit_atual = 0
    fit_antigo = -1
    cont = 0  # Contador de gerações sem melhoria
    geracao = 0
    el = elitismo
    pm = prob_mutacao
    pc = prob_crossover
    
    while cont < geracoes100melhoria:  # Para após 20 gerações SEM melhoria
        # Estratégia adaptativa: na geração 1 intensifica exploração dos melhores
        if geracao == 1:
            populacao = top_percent(populacao, 0.33)  # Reduz para 33% melhores
            el = elitismo * 2  # Dobra elitismo (ex: 25% -> 50%)
            pm = 1.0
            pc = 1.0
        
        # Preserva os melhores indivíduos (elitismo)
        melhores_indices = top_indices(populacao, el)
        melhores_individuos = [populacao[i] for i in melhores_indices]
        
        # Gera nova geração via seleção, crossover e mutação
        pai_1, pai_2 = selecionar_pais(populacao)
        nova_populacao = crossover(pai_1, pai_2, populacao, pm, pc)
        populacao = nova_populacao
        fit_pop = calcula_fitness(populacao)

        # Substitui os piores pelos melhores da geração anterior (garante elitismo)
        bottom_indices = piores_indices(populacao, el)
        for i, pior_indice in enumerate(bottom_indices):
            populacao[pior_indice] = melhores_individuos[i]
        
        # Verifica convergência
        fit_antigo = fit_atual  # Guarda fitness anterior
        fit_atual = max(fit_pop)  # Calcula novo fitness
        
        if fit_atual == fit_antigo:
            cont += 1  # Incrementa se NÃO melhorou
        else:
            cont = 0  # RESETA contador se melhorou!
        geracao += 1
    # Retorna o melhor indivíduo encontrado
    fit_pop = calcula_fitness(populacao)
    melhor_fit = max(fit_pop)
    indice_melhor = fit_pop.index(melhor_fit)
    melhor_individuo = populacao[indice_melhor]
    distancia_melhor = calcular_distancia(melhor_individuo)
    return melhor_individuo, melhor_fit, distancia_melhor

print("\n")

# ============================================================================
# BLOCO DE TESTES: Metrifica o desempenho do algoritmo
# Executa 10 runs de 100 execuções cada (total: 1000 execuções)
# Conta quantas atingem o fitness ótimo conhecido
# ============================================================================
lista_melhores_rotas = []  # Lista para armazenar as melhores rotas de cada execução
tempo_inicio = time.time()  # Inicia cronômetro

for run_idx in range(10):
    contador = 0  # Conta quantas execuções atingiram o ótimo
    n_runs = 100  # 100 execuções por run
    top_fit = 0
    
    for i in range(n_runs):
        nova_populacao = gerar_populacao(cidades, tamanho_populacao)
        melhor_individuo, melhor_fit, distancia_melhor = resultado_final(nova_populacao)
        
        # Guarda o melhor resultado do run
        if melhor_fit >= top_fit:
            top_fit = melhor_fit
            top_distancia = distancia_melhor
            top_individuo = melhor_individuo
        
        # Conta se atingiu o fitness ótimo (distância 131.224 para 13 cidades)
        if melhor_fit >= par_sucesso:  # Ajuste conforme o problema
            contador += 1
            melhor_individuo_nomes = cidades_na_rota(top_individuo)
    
    # Armazena a melhor rota deste run para plotar depois
    lista_melhores_rotas.append((top_individuo, top_distancia, top_fit, run_idx + 1))
    
    # Imprime resultado do run
    print(f"Run #{run_idx + 1}: {contador}/{n_runs} runs ({contador/n_runs*100:.1f}%) atingiram o melhor fitness: {top_fit} | distância: {top_distancia} --> {melhor_individuo_nomes}")

# Finaliza cronômetro
tempo_fim = time.time()
tempo_total = tempo_fim - tempo_inicio

print(f"\n⏱️  Tempo total de execução: {tempo_total:.2f} segundos ({tempo_total/60:.2f} minutos)")
print(f"⏱️  Tempo médio por run: {tempo_total/10:.2f} segundos")

# Plota comparação de todas as rotas
print("\nGerando gráfico comparativo das 10 melhores rotas...")
plotar_comparacao_rotas(lista_melhores_rotas)


# ============================================================================
#                    ALGORITMO GENÉTICO PARA O TSP
#                  (Problema do Caixeiro Viajante)
# ============================================================================
#
# FLUXOGRAMA DO ALGORITMO:
# 
# 1. INICIALIZAÇÃO
#    └─> Gera população inicial aleatória (300 indivíduos)
#    └─> Define cidade inicial fixa em todas as rotas
#
# 2. LOOP PRINCIPAL (até convergir - 20 gerações sem melhoria):
#    │
#    ├─> [Geração 1] Estratégia adaptativa:
#    │   └─> Reduz população para 33% melhores (intensificação)
#    │   └─> Dobra elitismo (25% -> 50%)
#    │
#    ├─> ELITISMO: Preserva os melhores indivíduos
#    │
#    ├─> SELEÇÃO: Torneio com 4 indivíduos
#    │   └─> Escolhe 2 pais (melhor de cada dupla)
#    │
#    ├─> CROSSOVER (pc=100%): Combina pais gerando filhos
#    │   └─> Segmento do meio vem do pai 2
#    │   └─> Restante vem do pai 1 (evitando duplicatas)
#    │
#    ├─> MUTAÇÃO (pm=100%): Aplica inversão com hill climbing
#    │   └─> Inverte segmento aleatório
#    │   └─> Reverte se piorar distância
#    │
#    ├─> SUBSTITUIÇÃO: Piores são substituídos pelos melhores da geração anterior
#    │
#    └─> CONVERGÊNCIA: Verifica se fitness melhorou
#        └─> Se não melhorou: contador++
#        └─> Se melhorou: contador=0
#
# 3. RESULTADO FINAL
#    └─> Retorna melhor rota encontrada
#
# ============================================================================
# PARÂMETROS UTILIZADOS:
# ============================================================================
#
# tamanho_populacao = 300    # Número de rotas na população
# elitismo = 25%             # Percentual dos melhores preservados (50% após geração 1)
# prob_mutacao = 1.0         # 100% de chance de mutação
# prob_crossover = 1.0       # 100% de chance de crossover
# convergencia = 20          # Gerações sem melhoria para parar
# selecao = Torneio(4)       # Seleciona melhor entre 4 indivíduos
# mutacao = Inversão+HC      # Inversão de segmento com hill climbing
# crossover = OX modificado  # Order Crossover com segmento central do pai 2
#
# ============================================================================
# COMPARAÇÃO: SWAP vs INVERSÃO (MESMOS PARÂMETROS)
# ============================================================================
#
# TESTES COM 13 CIDADES (itba + A-L):
#
# 1) SWAP com Hill Climbing: 78.7% de sucesso (787/1000 execuções)
#    - Troca 2 cidades aleatórias e reverte se piorar
#    - Tempo médio: 9.14s por run
#
# 2) INVERSÃO com Hill Climbing: 94.1% de sucesso (941/1000 execuções) ✓
#    - Inverte segmento entre 2 pontos e reverte se piorar
#    - Tempo médio: 8.83s por run
#    - MELHORIA: +15.4 pontos percentuais (19.5% mais eficaz!)
#
# OBSERVAÇÃO IMPORTANTE:
# Nos testes realizados, observou-se que quanto MAIOR o problema (mais cidades),
# MAIOR a vantagem da mutação por INVERSÃO sobre SWAP mantendo os mesmos
# parâmetros. Isso ocorre porque inversão preserva adjacências e explora melhor
# o espaço de soluções em problemas de maior complexidade.
#
# POR QUÊ INVERSÃO É SUPERIOR?
# - Preserva adjacências: Ao inverter um segmento, as cidades dentro dele mantêm
#   suas relações de vizinhança, apenas em ordem reversa
# - Explora melhor o espaço de soluções: Uma inversão pode corrigir múltiplas
#   conexões ruins simultaneamente
# - Mais natural para TSP: Inversões capturam a estrutura geométrica do problema,
#   enquanto swaps são mudanças mais "brutas"
# - SWAP modifica 4 conexões (2 cidades afetam 4 arestas)
# - INVERSÃO modifica apenas 2 conexões nas extremidades do segmento
#
# CONCLUSÃO: Use mutação por inversão para TSP - é mais eficiente, eficaz
# e escala melhor com o aumento do tamanho do problema!
# ============================================================================