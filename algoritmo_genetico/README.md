# Algoritmo Genético

Algoritmo genético simples em Python para otimizar a função f(x) = x * sin(x). Simula evolução natural para encontrar o valor ótimo da função.

## Exemplo de execução

![Execução do algoritmo](./screenshots/execucao.png)
*Execução completa mostrando evolução detalhada da população ao longo de múltiplas gerações*

## Descrição

O algoritmo busca o valor de x que maximiza f(x) = x * sin(x) através de um processo evolutivo:

- Inicialização de população com valores aleatórios
- Cálculo do fitness de cada indivíduo usando f(x)
- Seleção dos melhores indivíduos para reprodução
- Cruzamento entre pais para gerar descendentes
- Aplicação de mutações aleatórias
- Repetição do ciclo por múltiplas gerações

## Componentes do algoritmo

**Seleção:** Torneio entre 4 indivíduos escolhidos aleatoriamente
**Cruzamento:** Combinação aritmética (filho = α*pai1 + (1-α)*pai2)
**Mutação:** Perturbação aditiva com magnitude controlada
**Elitismo:** Preservação dos 2 melhores indivíduos entre gerações

## Execução
Ambiente virtual recomendado:

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
```

Dependências opcionais:
```bash
pip install sympy
```

Execução:
```bash
python algoritmo_genetico.py
```

## Metodologia de teste

O script executa 10 blocos experimentais, cada um realizando 100 runs independentes com populações iniciais distintas. Ao final de cada bloco, exibe o número de runs que atingiram o threshold de fitness (>= 960000.0) e a taxa de sucesso correspondente.

Esta abordagem permite avaliar a consistência e robustez do algoritmo sob diferentes condições iniciais.

## Parâmetros configuráveis

Principais variáveis no arquivo `algoritmo_genetico.py`:

- `valor_min`, `valor_max`: domínio de busca dos indivíduos
- `tamanho_populacao`: tamanho da população por geração
- `pm`: probabilidade de mutação (ex: 0.1 = 10%)
- `pc`: probabilidade de cruzamento (ex: 0.7 = 70%)
- `teta`: magnitude da mutação (5% do intervalo total)

## Observações sobre parâmetros

- **População maior:** melhora estabilidade e cobertura do espaço de busca, mas aumenta custo computacional
- **Mutação alta:** excesso de ruído pode prejudicar convergência
- **Mutação baixa:** risco de estagnação em ótimos locais
- **Taxa de cruzamento:** controla intensidade da exploração por recombinação

## Análise experimental

Este projeto inclui análise experimental detalhada com **validação estatística robusta**:

### Metodologia aplicada:
- **1000 execuções** organizadas em 10 blocos de 100 runs cada
- **Múltiplos espaços de busca** para validar escalabilidade do algoritmo
- **Variação sistemática** da probabilidade de mutação (pm = 0.1 vs pm = 0.8)
- **Análise comparativa** entre diferentes configurações de parâmetros

### Resultados experimentais:
- **Teste 1** (espaço [0,100]): População 1000, amostra 100 (10% do espaço)
  - pm = 0.1: Taxa de sucesso média **12.9%**
  - pm = 0.8: Taxa de sucesso média **16.4%**

- **Teste 2** (espaço [0,1.000.000]): População 1M, amostra 100 (0.01% do espaço)  
  - pm = 0.1: Taxa de sucesso média **10.2%**
  - pm = 0.8: Taxa de sucesso média **13.6%**

### Documentação:
- [Relatório de análise experimental](./docs/analise_experimentos.md) - Comparação sistemática de parâmetros e conclusões técnicas
- [Relatório completo em PDF](./docs/relatorio_algoritmo_genetico.pdf) - Análise experimental com metodologia científica completa, incluindo justificativa estatística e resultados detalhados

