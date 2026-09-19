<div align="center">

# Portfólio — Eduardo Estigarribia

Portfólio profissional de **Eduardo Estigarribia Oliveira**, Desenvolvedor Backend Java e Analista de Sistemas.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

[Ver portfólio online](https://drufontael.dpdns.org/) · [LinkedIn](https://www.linkedin.com/in/eduardoestigarribia/) · [Perfil no GitHub](https://github.com/Drufontael)

</div>

## Sobre o projeto

Este repositório contém meu portfólio profissional, criado para apresentar minha trajetória, competências técnicas e projetos de software com foco em **Java, Spring Boot, APIs REST, bancos relacionais, testes automatizados e arquitetura limpa**.

Além de uma apresentação pessoal, o site reúne estudos de caso dos projetos, decisões técnicas, experiência profissional, currículo e canais diretos de contato.

## Principais recursos

- apresentação profissional e resumo de carreira;
- projetos selecionados com problema abordado, contribuição, arquitetura e tecnologias;
- busca e filtros por status, Java e Kotlin;
- detalhes dos projetos em modais interativos;
- atualização de estrelas, forks e data de atividade pela API pública do GitHub;
- fallback para dados locais quando a API está indisponível ou atinge o limite de requisições;
- cache local das métricas do GitHub por 15 minutos;
- matriz de competências com aplicação prática em projetos;
- linha do tempo de experiência profissional e formação;
- currículo completo em modal, com opções para copiar, imprimir e salvar como PDF;
- geração automática do currículo em PDF durante o build;
- estrutura preparada para artigos técnicos com rotas por hash e metadados SEO;
- layout responsivo, navegação acessível e tema escuro;
- sitemap, robots.txt, Open Graph e metadados para mecanismos de busca.

## Projetos apresentados

| Projeto | Tecnologias principais | Status |
| --- | --- | --- |
| [Our Recipes](https://github.com/Drufontael/our-recipes) | Java 21, Spring Boot 3, Spring Security, JWT, PostgreSQL, Docker, Next.js | Funcional |
| [Carshop](https://github.com/Drufontael/carshop) | Java, Spring Boot, PostgreSQL, HATEOAS, Swagger/OpenAPI, Docker | Funcional |
| [MykytaDu App](https://github.com/Drufontael/mykytadu-app) | Kotlin Multiplatform, Compose Multiplatform, Koin, Ktor | Em desenvolvimento |
| [MykytaDu API](https://github.com/Drufontael/mykytadu-api) | Kotlin, API REST, Clean Architecture, Gradle, Docker, PostgreSQL | Em desenvolvimento |

## Tecnologias

### Interface

- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React

### Ferramentas e qualidade

- Vite
- Vitest
- TypeScript Compiler
- PDFKit
- TSX
- Bun ou npm

### Integrações

- API pública do GitHub para métricas dos repositórios
- Local Storage para cache
- links diretos para e-mail, LinkedIn e WhatsApp

## Arquitetura e funcionamento

O conteúdo essencial do portfólio é mantido em `src/data/portfolioData.ts`. Isso permite que os projetos, competências e informações profissionais sejam renderizados imediatamente, sem depender de serviços externos.

A integração em `src/services/github.ts` consulta a API do GitHub apenas para enriquecer os projetos curados com métricas não essenciais. Em caso de timeout, erro de rede ou limite de requisições, o site preserva integralmente os dados locais.

Os artigos técnicos são controlados pelo serviço de blog. Somente itens marcados como publicados são exibidos; rascunhos permanecem fora da página pública.

## Estrutura do projeto

```text
.
├── public/
│   ├── curriculo-eduardo-estigarribia.pdf
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generatePdf.ts
├── src/
│   ├── components/
│   ├── data/
│   │   └── portfolioData.ts
│   ├── services/
│   │   ├── blogService.ts
│   │   └── github.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Como executar localmente

### Pré-requisitos

- Node.js 20 ou superior; ou
- Bun 1.2 ou superior.

### Com npm

```bash
git clone https://github.com/Drufontael/portifolio-edu.git
cd portifolio-edu
npm install
npm run dev
```

### Com Bun

```bash
git clone https://github.com/Drufontael/portifolio-edu.git
cd portifolio-edu
bun install
bun run dev
```

A aplicação será disponibilizada em [http://localhost:3000](http://localhost:3000).

> O portfólio funciona localmente sem credenciais externas. O arquivo `.env.example` mantém variáveis herdadas do ambiente de criação, mas a versão atual do frontend não exige uma chave para exibir o conteúdo.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | inicia o servidor de desenvolvimento na porta 3000 |
| `npm run build` | gera o currículo em PDF e cria a versão de produção |
| `npm run preview` | visualiza localmente o build de produção |
| `npm run lint` | executa a verificação de tipos do TypeScript |
| `npm test` | executa os testes com Vitest |
| `npm run clean` | remove os artefatos locais de build |

Os mesmos comandos podem ser executados com `bun run`.

## Testes e validação

Antes de publicar alterações, execute:

```bash
npm run lint
npm test
npm run build
```

A suíte cobre regras relacionadas à curadoria de competências, experiência de uso, serviço de blog e integração resiliente com o GitHub.

## Personalização

A maior parte do conteúdo pode ser atualizada em um único arquivo:

```text
src/data/portfolioData.ts
```

Nele estão:

- informações pessoais;
- competências e tecnologias;
- experiência profissional;
- formação;
- projetos em destaque;
- artigos publicados e rascunhos.

O currículo em PDF é gerado por `scripts/generatePdf.ts` com os mesmos dados, reduzindo divergências entre o site e o documento para download.

## Deploy

Gere os arquivos estáticos com:

```bash
npm run build
```

O resultado será criado em `dist/` e pode ser hospedado em qualquer serviço compatível com sites estáticos.

## Autor

**Eduardo Estigarribia Oliveira**

Desenvolvedor Backend Java · Spring Boot · APIs REST · PostgreSQL · Docker · Kotlin Multiplatform

- [Portfólio](https://drufontael.dpdns.org/)
- [LinkedIn](https://www.linkedin.com/in/eduardoestigarribia/)
- [GitHub](https://github.com/Drufontael)

---

Se este projeto foi útil como referência, considere deixar uma estrela no repositório.
