# Contribuindo para o Projeto

Primeiramente, obrigado por dedicar seu tempo para contribuir! ❤️

Todos os tipos de contribuições são incentivados e valorizados. Veja o [Índice](#índice) para diferentes formas de ajudar e detalhes sobre como este projeto lida com elas. Por favor, leia a seção relevante antes de fazer sua contribuição. Isso tornará mais fácil para nós, mantenedores, e tornará a experiência mais tranquila para todos os envolvidos. A comunidade aguarda suas contribuições. 🎉

> Este projeto é um **Work In Progress (WIP)**, desenvolvido como parte do **Bootcamp da Faculdade Impacta**. Tenha em mente que o projeto está em desenvolvimento, e melhorias contínuas são esperadas ao longo do tempo.
> 
> Se você gosta do projeto, mas não tem tempo para contribuir, tudo bem! Há outras formas fáceis de apoiar o projeto e mostrar sua apreciação, das quais também ficaríamos muito felizes:
> - Dê uma estrela no projeto
> - Mencione o projeto em meetups locais e compartilhe com seus amigos/colegas

## Índice

- [Código de Conduta](#código-de-conduta)
- [Tenho uma Pergunta](#tenho-uma-pergunta)
- [Quero Contribuir](#quero-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Sua Primeira Contribuição de Código](#sua-primeira-contribuição-de-código)
- [Melhorando a Documentação](#melhorando-a-documentação)
- [Contribuições e commits](#contribuições-e-commits)
- [Guia de Estilo](#guia-de-estilo)

## Código de Conduta

Este projeto e todos os envolvidos seguem o [Código de Conduta](blob/master/CODE_OF_CONDUCT.md). Ao participar, espera-se que você cumpra esse código.

## Tenho uma Pergunta

Se você tiver uma dúvida, é recomendável procurar primeiro por [Issues](/issues) existentes. Caso encontre uma issue que aborde sua dúvida e ainda precise de esclarecimentos, você pode escrever sua pergunta nessa issue. Também recomendamos que faça uma pesquisa na internet.

Se ainda sentir a necessidade de perguntar, siga os seguintes passos:

- Abra uma [Issue](/issues/new).
- Forneça o máximo de contexto possível sobre o que está enfrentando.
- Informe as versões do projeto e da plataforma (nodejs, npm, etc.), conforme aplicável.

Nós cuidaremos da issue o mais rápido possível.

## Quero Contribuir

> ### Aviso Legal 
> Ao contribuir para este projeto, você deve concordar que é o autor de 100% do conteúdo, que você possui os direitos necessários sobre o conteúdo e que o conteúdo que você contribui pode ser fornecido sob a licença do projeto.

### Reportando Bugs

#### Antes de Submeter um Bug

Um bom relatório de bug não deve deixar outros precisando buscar mais informações com você. Portanto, pedimos que você investigue cuidadosamente, colete informações e descreva o problema em detalhes. Por favor, complete as etapas abaixo antes de submeter um bug para nos ajudar a corrigir o problema o mais rápido possível:

- Certifique-se de que está usando a versão mais recente.
- Verifique se o problema não é um erro de configuração ou ambiente incompatível (leia a [documentação]()).
- Confira se outros usuários já relataram o problema na [tracker de bugs](issues?q=label%3Abug).
- Pesquise na internet (incluindo Stack Overflow) para ver se usuários fora da comunidade do GitHub discutiram o problema.
- Colete informações sobre o bug:
  - Stack trace
  - Sistema operacional e versão (Windows, Linux, macOS)
  - Versões de interpretadores, SDK, gerenciadores de pacotes, ou outros detalhes relevantes.
  - Passos para reproduzir o problema.

#### Como Submeter um Bom Relatório de Bug?

> **Importante**: Nunca reporte publicamente vulnerabilidades ou bugs de segurança. Ao invés disso, envie bugs sensíveis por email para <>.

Usamos o GitHub Issues para acompanhar bugs. Se encontrar um problema:

- Abra uma [Issue](/issues/new).
- Explique o comportamento esperado e o comportamento real.
- Descreva os *passos de reprodução* para que outra pessoa possa recriar o problema.
- Forneça as informações que você coletou na seção anterior.

Após submeter:

- O time do projeto marcará a issue com as tags apropriadas.
- Um membro do time tentará reproduzir o problema com os passos fornecidos. Se não houver passos claros, a issue será marcada como `needs-repro`.
- Se o time puder reproduzir o problema, ele será marcado como `needs-fix` e estará disponível para ser resolvido.

### Sugerindo Melhorias

Esta seção orienta sobre como submeter uma sugestão de melhoria, incluindo novos recursos e pequenas melhorias em funcionalidades existentes.

#### Antes de Submeter uma Sugestão

- Certifique-se de que está usando a versão mais recente.
- Leia a [documentação]() para verificar se a funcionalidade já não é coberta.
- Verifique se a sugestão já não foi feita na [lista de Issues](/issues).
- Avalie se sua sugestão está alinhada com o escopo e os objetivos do projeto.

#### Como Submeter uma Boa Sugestão de Melhoria?

Sugestões de melhorias são acompanhadas como [Issues do GitHub](/issues).

- Use um **título claro e descritivo** para a sugestão.
- Descreva **passo a passo** a melhoria sugerida em detalhes.
- Explique o comportamento atual e o comportamento esperado, bem como por que a mudança seria útil para a maioria dos usuários.
- Inclua capturas de tela ou GIFs, se aplicável.
- Justifique porque a melhoria seria benéfica para a maioria dos usuários do projeto.

### Sua Primeira Contribuição de Código

Antes de começar a contribuir, leia as instruções específicas do projeto para garantir que seu código esteja em conformidade.

### Melhorando a Documentação

Melhorias na documentação são sempre bem-vindas! Se você perceber algo que possa ser esclarecido, corrigido ou ampliado, não hesite em contribuir.

### Contribuições e Commits

Para manter a consistência no código, decidimos que:

- O nome dos commits, arquivos, funções e variáveis seguirá a nomenclatura em inglês.
- Cada projeto (backend e frontend) possui uma convenção de lintagem configurada para garantir a padronização do código. Certifique-se de rodar as verificações de linting antes de realizar um commit para garantir que seu código esteja em conformidade com as diretrizes do projeto.

#### Branches

**Fixas**

- **Master:** Branch principal que contém o código estável em produção.

**Temporárias**

- **bug_fix/nome_da_demanda_em_ingles:** Para correções de bugs.
- **feature/nome_da_demanda:** Para novas funcionalidades.

#### Commits

- Descreva em poucas palavras a alteração realizada e utilize as convenções de commit: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

#### Exemplo de Commit

```bash
feat(auth): add user login feature

fix(button): correct alignment issue on mobile
```

#### Nomenclaturas de Variáveis e Arquivos
Variáveis e arquivos devem seguir a convenção camelCase para JavaScript/TypeScript e snake_case para nomes de arquivos em outras linguagens.

### Guia de estilo

Siga as diretrizes de estilo configuradas no projeto, como ESLint e Prettier, para garantir a consistência do código.

## Atribuição
Esse guia foi baseado em **contributing.md**. [Faça seu próprio](https://contributing.md/)!
