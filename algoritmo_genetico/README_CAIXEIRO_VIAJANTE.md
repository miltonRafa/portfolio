# Algoritmo Genético - Problema do Caixeiro Viajante (TSP)

Implementação otimizada de algoritmo genético para resolver o Problema do Caixeiro Viajante usando Python. Utiliza mutação por inversão com hill climbing, elitismo adaptativo e estratégia de intensificação para encontrar rotas próximas ao ótimo.

## 🎯 Características principais

- **Mutação por inversão com Hill Climbing:** 19.5% mais eficaz que mutação SWAP
- **Elitismo adaptativo:** 25% na inicialização, dobra para 50% após primeira geração
- **Redução populacional:** Mantém apenas 33% melhores após geração 1 (intensificação)
- **Visualização automática:** Gera gráficos comparativos das 10 melhores rotas
- **Cidade inicial fixa:** Usuário escolhe cidade de partida
- **Convergência adaptativa:** Para após 20 gerações sem melhoria

## 📊 Exemplo de visualização

O algoritmo gera automaticamente:
- Gráfico comparativo 2×5 mostrando as 10 melhores rotas encontradas
- Setas indicando direção do percurso
- Cidade inicial destacada em verde (quadrado)
- Demais cidades em vermelho (círculo)
- Informações de distância e fitness para cada rota

## 🚀 Como executar

### Pré-requisitos
```bash
pip install matplotlib
```

### Execução
```bash
python3 caixeiro_viajante.py
```

### Entrada esperada
```
Digite o nome da cidade inicial: itba
Digite as coordenadas da cidade inicial no formato x,y: 0,0
```

## 🧬 Fluxograma do algoritmo

```
1. INICIALIZAÇÃO
   └─> Gera população de 300 rotas aleatórias
   └─> Cidade inicial fixa em todas as rotas

2. LOOP EVOLUTIVO (até 20 gerações sem melhoria)
   │
   ├─> [Geração 1] Estratégia adaptativa:
   │   └─> Reduz para 33% melhores (intensificação)
   │   └─> Dobra elitismo (25% → 50%)
   │
   ├─> SELEÇÃO: Torneio com 4 indivíduos
   │
   ├─> CROSSOVER (100%): Order Crossover modificado
   │   └─> Segmento central do pai 2
   │   └─> Restante do pai 1 (sem duplicatas)
   │
   ├─> MUTAÇÃO (100%): Inversão + Hill Climbing
   │   └─> Inverte segmento aleatório
   │   └─> Reverte se piorar distância
   │
   ├─> ELITISMO: Substitui piores pelos melhores
   │
   └─> CONVERGÊNCIA: Se fitness não melhorou → contador++
                      Se melhorou → contador = 0

3. RESULTADO
   └─> Retorna melhor rota encontrada
   └─> Gera visualização comparativa
```

## ⚙️ Parâmetros configuráveis

```python
tamanho_populacao = 300      # Rotas por geração
elitismo = 25                # % preservado (50% após gen. 1)
prob_mutacao = 1.0           # 100% de mutação
prob_crossover = 1.0         # 100% de crossover
geracoes100melhoria = 20     # Gerações sem melhoria para parar
par_sucesso = 0.00810...     # Fitness alvo (1/distância ótima)
```

## 🔬 Comparação: SWAP vs INVERSÃO

Testes realizados com **13 cidades** (1000 execuções):

| Método | Taxa de Sucesso | Tempo Médio | Melhoria |
|--------|----------------|-------------|----------|
| **SWAP** com Hill Climbing | 78.7% (787/1000) | 9.14s/run | Baseline |
| **INVERSÃO** com Hill Climbing | **94.1%** (941/1000) | 8.83s/run | **+19.5%** ✓ |

### Por que INVERSÃO é superior?

✅ **Preserva adjacências:** Cidades dentro do segmento mantêm relações de vizinhança  
✅ **Explora melhor:** Uma inversão corrige múltiplas conexões ruins simultaneamente  
✅ **Mais natural para TSP:** Captura estrutura geométrica do problema  
✅ **Menos disruptiva:** Modifica apenas 2 conexões (vs 4 no SWAP)  
✅ **Escala melhor:** Vantagem aumenta com número de cidades  

### Observação importante

> Quanto MAIOR o problema (mais cidades), MAIOR a vantagem da mutação por INVERSÃO sobre SWAP. Isso ocorre porque inversão preserva adjacências e explora melhor o espaço de soluções em problemas complexos.

## 📈 Metodologia de teste

**Estrutura:**
- 10 blocos de 100 execuções cada (total: 1000 runs)
- População inicial aleatória para cada execução
- Mesma cidade inicial em todas as rotas

**Saída por bloco:**
```
Run #1: 87/100 runs (87.0%) atingiram o melhor fitness: 0.008103
distância: 123.45 --> ['itba', 'A', 'B', 'C', ...]
```

**Métricas coletadas:**
- Taxa de sucesso (% que atinge fitness ótimo)
- Melhor fitness encontrado
- Distância correspondente
- Sequência de cidades da melhor rota
- Tempo total de execução

## 🎨 Visualização das rotas

Após os testes, o algoritmo gera automaticamente um gráfico 2×5 comparando as 10 melhores rotas:

**Características do gráfico:**
- Setas azuis indicam direção do percurso
- Cidade inicial: quadrado verde
- Demais cidades: círculos vermelhos
- Limites ajustados dinamicamente ao tamanho da rota
- Título com distância e fitness de cada rota

## 🏗️ Estrutura do código

### Funções principais

| Função | Descrição |
|--------|-----------|
| `gerar_percurso_aleatorio()` | Cria rota aleatória mantendo cidade inicial |
| `calcular_distancia()` | Soma distâncias euclidianas + volta à origem |
| `selecionar_pais()` | Torneio entre 4 indivíduos (2 pais) |
| `mutacao_inversao()` | Inverte segmento + Hill Climbing |
| `crossover()` | Order Crossover modificado + mutação |
| `resultado_final()` | Loop evolutivo principal |
| `plotar_comparacao_rotas()` | Visualiza 10 melhores rotas em grid |

### Cidades padrão

```python
cidades = {
    'A': (10, 10),  'B': (20, 15),  'C': (30, 10),
    'D': (25, 25),  'E': (10, 30),  'F': (5, 25),
    'G': (0, 10),   'H': (10, 0),   'I': (20, 5),
    'J': (30, 0)
}
```
**+ cidade inicial fornecida pelo usuário**

## 🧮 Complexidade do problema

Para **n cidades**:
- Rotas possíveis sem restrições: `n!`
- Com cidade inicial fixa: `(n-1)!`
- Considerando simetria (A→B→C = C→B→A): `(n-1)!/2`

**Exemplo com 13 cidades:**
```
(13-1)!/2 = 12!/2 = 239.500.800 rotas possíveis
```

## 📚 Componentes do algoritmo

### Seleção
**Torneio entre 4:** Sorteia 4 indivíduos, escolhe o melhor de cada par (2 torneios paralelos)

### Crossover (Order Crossover modificado)
```
Pai 1: [itba, A, B, C, D, E, F]
Pai 2: [itba, D, F, A, B, C, E]
Cortes: posições 2 e 4

Filho:
1. Começa com cidade inicial: [itba]
2. Preenche até corte1 com Pai1: [itba, A]
3. Adiciona segmento Pai2: [itba, A, F, A, B]
4. Completa com cidades faltantes de Pai2: [itba, A, F, A, B, C, D, E]
```

### Mutação por Inversão + Hill Climbing
```
Rota original:  [itba, A, B, C, D, E, F]
Seleciona i1=2, i2=5
Inverte segmento [B,C,D,E]:  [itba, A, E, D, C, B, F]

Hill Climbing:
SE distância_nova > distância_original:
   REVERTE para rota original
SENÃO:
   MANTÉM a inversão
```

### Elitismo Adaptativo
```
Geração 0: preserva 25% melhores (75 de 300)
Geração 1: reduz população para 33% (100 indivíduos)
         + dobra elitismo para 50% (50 de 100)
Geração 2+: mantém elitismo em 50%
```

## 🎓 Conceitos aplicados

- **Algoritmo Genético:** Metaheurística inspirada em evolução natural
- **Seleção por Torneio:** Pressão seletiva balanceada
- **Elitismo:** Garante não perder melhores soluções
- **Hill Climbing:** Busca local para refinamento
- **Order Crossover:** Crossover especializado para permutações
- **Mutação Inversão:** Operador que preserva adjacências

## 📝 Notas de implementação

1. **Cidade inicial sempre preservada:** Índice 0 nunca é alterado em crossover/mutação
2. **Distância euclidiana:** `sqrt((x2-x1)² + (y2-y1)²)`
3. **Fitness = 1/distância:** Menor distância = maior fitness
4. **Convergência:** Para quando top fitness não melhora por 20 gerações
5. **Intensificação na geração 1:** Reduz diversidade para explorar soluções promissoras

## 🔍 Quando usar cada mutação?

| Cenário | Recomendação |
|---------|--------------|
| **Poucas cidades (< 10)** | SWAP ou Inversão funcionam bem |
| **Muitas cidades (> 10)** | **INVERSÃO** (muito superior) |
| **Busca rápida** | SWAP (mais simples) |
| **Qualidade da solução** | **INVERSÃO** (melhor exploração) |

## 📊 Resultados esperados

Com os parâmetros atuais, espera-se:
- Taxa de sucesso > 90% (atingir fitness próximo ao ótimo)
- Convergência em ~40-60 gerações
- Tempo de execução: ~9-10 segundos por bloco de 100 runs
- Total: ~90-100 segundos para 1000 execuções

## 🚀 Melhorias possíveis

- [ ] Implementar 2-opt como busca local adicional
- [ ] Adicionar mutação por scramble (embaralhamento)
- [ ] Permitir carregar cidades de arquivo CSV
- [ ] Implementar crossover PMX (Partially Mapped Crossover)
- [ ] Adicionar animação da evolução da melhor rota
- [ ] Paralelizar execução dos runs para melhor performance

## 📖 Referências

- Holland, J. H. (1992). "Adaptation in Natural and Artificial Systems"
- Goldberg, D. E. (1989). "Genetic Algorithms in Search, Optimization and Machine Learning"
- Larranaga et al. (1999). "Genetic Algorithms for the Travelling Salesman Problem"

---

**Autor:** Milton  
**Última atualização:** Novembro 2025
