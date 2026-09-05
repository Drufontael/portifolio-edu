import { Repository, BlogPost, ExperienceItem, EducationItem, CompetencyGroup } from '../types';

export const PERSONAL_INFO = {
  name: 'Eduardo Estigarribia Oliveira',
  shortName: 'Eduardo Estigarribia',
  role: 'Desenvolvedor Backend Java | Spring Boot e APIs REST',
  location: 'Goiânia/GO, Brasil (Disponível: Presencial, Remoto e Híbrido)',
  phone: '(62) 99670-0460',
  cleanPhone: '5562996700460',
  email: 'eduardo.estigarribia@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/eduardoestigarribia/',
  githubUrl: 'https://github.com/Drufontael',
  githubUser: 'Drufontael',
  summary:
    'Desenvolvedor backend Java e Analista de Sistemas em consolidação profissional, com maturidade trazida por 19 anos de atuação técnica prévia em diagnóstico e manutenção de sistemas críticos. Experiência prática na construção de APIs REST com Java, Spring Boot, Spring Security, JPA/Hibernate, bancos relacionais como PostgreSQL e conteinerização com Docker, aplicando arquitetura limpa e testes unitários.',
  elevatorPitch:
    'Aplico método analítico de diagnóstico, investigação de causa-raiz e documentação técnica no desenvolvimento de APIs em Java, com foco em arquitetura limpa, testes e bancos relacionais.',
  availability: 'Disponível: Presencial, Remoto e Híbrido',
};

export const COMPETENCY_GROUPS: CompetencyGroup[] = [
  {
    id: 'foco-principal',
    title: 'Foco Principal',
    shortTitle: 'Foco Principal',
    badge: 'Tecnologias Centrais Backend',
    description:
      'Tecnologias centrais no desenvolvimento diário de APIs RESTful, arquitetura backend, persistência relacional e garantia de qualidade com testes automatizados.',
    technologies: [
      {
        name: 'Java',
        usageContext:
          'Desenvolvimento central de APIs e regras de negócio com Java 17 e 21, utilizando Programação Orientada a Objetos, Records, Streams e tratamento estruturado de dados.',
        appliedProject: 'Our Recipes / Carshop',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryRepoUrl: 'https://github.com/Drufontael/carshop',
        secondaryProject: 'Carshop',
        categoryTag: 'Linguagem / Backend',
      },
      {
        name: 'Spring Boot',
        usageContext:
          'Desenvolvimento de APIs RESTful, injeção de dependências (IoC), configuração modularizada de beans, tratamento centralizado de exceções e validação de requisições.',
        appliedProject: 'Our Recipes / Carshop',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryRepoUrl: 'https://github.com/Drufontael/carshop',
        secondaryProject: 'Carshop',
        categoryTag: 'Framework Backend',
      },
      {
        name: 'APIs REST',
        usageContext:
          'Modelagem de contratos HTTP RESTful, paginação, filtros estruturados, validação de payload com Bean Validation e navegação semântica com hipermídia HATEOAS.',
        appliedProject: 'Carshop / Our Recipes / MykytaDu API',
        repoUrl: 'https://github.com/Drufontael/carshop',
        secondaryRepoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryProject: 'Our Recipes',
        categoryTag: 'Padrão Arquitetural',
      },
      {
        name: 'Spring Data JPA',
        usageContext:
          'Camada de persistência relacional com Hibernate ORM, consultas derivadas via interfaces de repositório, queries personalizadas em JPQL e controle transacional de integridade.',
        appliedProject: 'Carshop / Our Recipes',
        repoUrl: 'https://github.com/Drufontael/carshop',
        secondaryRepoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryProject: 'Our Recipes',
        categoryTag: 'Persistência / ORM',
      },
      {
        name: 'PostgreSQL',
        usageContext:
          'Modelagem de banco de dados relacional, definição de esquemas de tabelas, chaves primárias e estrangeiras, índices e garantia de integridade referencial.',
        appliedProject: 'Carshop / Our Recipes / MykytaDu API',
        repoUrl: 'https://github.com/Drufontael/carshop',
        secondaryRepoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryProject: 'Our Recipes',
        categoryTag: 'Banco de Dados',
      },
      {
        name: 'Testes (JUnit 5 & Mockito)',
        usageContext:
          'Elaboração de testes unitários e de integração para validação de regras de negócio no padrão AAA (Arrange, Act, Assert), isolamento com dublês de teste via Mockito e asserções com AssertJ.',
        appliedProject: 'Our Recipes / Carshop',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryRepoUrl: 'https://github.com/Drufontael/carshop',
        secondaryProject: 'Carshop',
        categoryTag: 'Qualidade de Software',
      },
    ],
  },
  {
    id: 'experiencia-pratica',
    title: 'Experiência Prática',
    shortTitle: 'Experiência Prática',
    badge: 'Segurança, Infraestrutura e Multiplataforma',
    description:
      'Ferramentas e padrões aplicados diretamente na entrega de recursos de autenticação, conteinerização, arquitetura desacoplada e clientes multiplataforma.',
    technologies: [
      {
        name: 'Spring Security',
        usageContext:
          'Configuração do SecurityFilterChain, autorização de requisições baseada em papéis (RBAC com anotações @PreAuthorize), sanitização de cabeçalhos e proteção de endpoints.',
        appliedProject: 'Our Recipes / Spring Security JWT Template',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Segurança',
      },
      {
        name: 'JWT (JSON Web Tokens)',
        usageContext:
          'Autenticação stateless com geração, assinatura digital HMAC-SHA256 e validação de tokens via filtro interceptor customizado (OncePerRequestFilter).',
        appliedProject: 'Our Recipes / Spring Security JWT Template',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Autenticação',
      },
      {
        name: 'Docker Compose',
        usageContext:
          'Orquestração declarativa de contêineres para provisionamento automatizado de instâncias PostgreSQL e serviços backend em ambiente local reproduzível e isolado.',
        appliedProject: 'Our Recipes / Carshop / MykytaDu API',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        secondaryRepoUrl: 'https://github.com/Drufontael/carshop',
        secondaryProject: 'Carshop',
        categoryTag: 'DevOps / Contêineres',
      },
      {
        name: 'Arquitetura Hexagonal',
        usageContext:
          'Separação estrita entre Domínio, Portas e Adaptadores (Ports & Adapters), desacoplando completamente o núcleo de regras de negócio de frameworks web e bancos de dados.',
        appliedProject: 'Our Recipes',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Padrão Arquitetural',
      },
      {
        name: 'Ktor',
        usageContext:
          'Cliente HTTP assíncrono (ktor-client) para consumo de rotas REST, serialização JSON com kotlinx.serialization e gerenciamento de rede multiplataforma.',
        appliedProject: 'MykytaDu App',
        repoUrl: 'https://github.com/Drufontael/mykytadu-app',
        categoryTag: 'Comunicação de Rede',
      },
      {
        name: 'Koin',
        usageContext:
          'Injeção de dependências leve e declarativa para resolução de instâncias, serviços e repositórios no módulo comum compartilhado (commonMain) Kotlin.',
        appliedProject: 'MykytaDu App',
        repoUrl: 'https://github.com/Drufontael/mykytadu-app',
        categoryTag: 'Injeção de Dependências',
      },
      {
        name: 'Kotlin Multiplatform (KMP)',
        usageContext:
          'Compartilhamento de regras de negócio, serialização e chamadas de rede entre plataformas Android e Desktop com interface declarativa Compose Multiplatform.',
        appliedProject: 'MykytaDu App',
        repoUrl: 'https://github.com/Drufontael/mykytadu-app',
        categoryTag: 'Multiplataforma',
      },
      {
        name: 'Next.js',
        usageContext:
          'Construção de interface web moderna em React com TypeScript, integrando autenticação JWT e consumo dos endpoints da API backend para validação das jornadas de usuário.',
        appliedProject: 'Our Recipes (Módulo Frontend)',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Frontend Web',
      },
    ],
  },
  {
    id: 'conhecimento-complementar',
    title: 'Conhecimento Complementar',
    shortTitle: 'Conhecimento Complementar',
    badge: 'Ferramentas, Protocolos e Tecnologias de Apoio',
    description:
      'Tecnologias, linguagens e ferramentas utilizadas em rotinas operacionais, estudos de arquitetura, disciplinas acadêmicas e cursos complementares.',
    technologies: [
      {
        name: 'Swagger / OpenAPI 3',
        usageContext:
          'Documentação interativa de contratos de API REST, schemas de requisição/resposta e facilitação de testes de integração via UI interativa.',
        appliedProject: 'Carshop',
        repoUrl: 'https://github.com/Drufontael/carshop',
        categoryTag: 'Documentação de API',
      },
      {
        name: 'Git & GitHub',
        usageContext:
          'Controle de versão distribuído, branches temáticas, fluxo de commits atômicos, resolução de conflitos e publicação de repositórios open-source.',
        appliedProject: 'Repositórios públicos e projetos pessoais (Drufontael)',
        repoUrl: 'https://github.com/Drufontael',
        categoryTag: 'Controle de Versão',
      },
      {
        name: 'Maven & Gradle',
        usageContext:
          'Gestão declarativa de dependências, automação de build, empacotamento de artefatos JAR e execução de suítes de testes em Java e Kotlin.',
        appliedProject: 'Our Recipes (Maven) e MykytaDu (Gradle)',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Automação de Build',
      },
      {
        name: 'Flyway',
        usageContext:
          'Versionamento e execução automatizada de scripts DDL para migrações incrementais e seguras de esquemas em bancos de dados relacionais.',
        appliedProject: 'Carshop / Estudos de arquitetura de dados',
        repoUrl: 'https://github.com/Drufontael/carshop',
        categoryTag: 'Migrações de Banco',
      },
      {
        name: 'TypeScript & JavaScript',
        usageContext:
          'Tipagem estática no desenvolvimento de interfaces web para consumo, integração e validação de contratos de APIs REST.',
        appliedProject: 'Our Recipes (Frontend Web)',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Linguagem Frontend',
      },
      {
        name: 'Tailwind CSS',
        usageContext:
          'Estilização utilitária de interfaces web modernas com foco em consistência de design tokens, responsividade e contraste visual.',
        appliedProject: 'Our Recipes (Frontend Web)',
        repoUrl: 'https://github.com/Drufontael/our-recipes',
        categoryTag: 'Estilização Web',
      },
      {
        name: 'MySQL & H2 Database',
        usageContext:
          'Bancos relacionais auxiliares utilizados em prototipagem rápida, persistência em memória e testes de integração automatizados.',
        appliedProject: 'Cursos de Java e laboratórios práticos (DIO)',
        repoUrl: null,
        categoryTag: 'Bancos Relacionais',
      },
      {
        name: 'OpenFeign',
        usageContext:
          'Cliente HTTP declarativo no ecossistema Spring Cloud para comunicação síncrona entre serviços sem boilerplate de chamadas HTTP.',
        appliedProject: 'Estudos de integração de serviços (DIO)',
        repoUrl: null,
        categoryTag: 'Integração de Serviços',
      },
      {
        name: 'MongoDB',
        usageContext:
          'Modelagem e consultas em banco NoSQL orientado a documentos para cenários que exigem esquemas dinâmicos e coleções não relacionais.',
        appliedProject: 'Laboratórios acadêmicos de modelagem de dados (Anhanguera)',
        repoUrl: null,
        categoryTag: 'NoSQL / Documentos',
      },
      {
        name: 'Redis',
        usageContext:
          'Fundamentos de armazenamento em memória do tipo chave-valor para estratégias de caching temporário e mitigação de latência de leitura.',
        appliedProject: 'Estudos de escalabilidade e arquitetura backend',
        repoUrl: null,
        categoryTag: 'Cache em Memória',
      },
      {
        name: 'Linux / Shell Scripting',
        usageContext:
          'Navegação e administração de ambientes Unix/Linux via terminal, execução de scripts Bash e gerenciamento de processos e contêineres.',
        appliedProject: 'Ambientes de desenvolvimento e rotinas em contêineres Docker',
        repoUrl: null,
        categoryTag: 'Sistema Operacional',
      },
      {
        name: 'Angular (Fundamentos)',
        usageContext:
          'Fundamentos de arquitetura modular orientada a componentes, serviços com injeção de dependências e TypeScript.',
        appliedProject: 'Disciplinas práticas da graduação em Análise e Desenvolvimento de Sistemas (Anhanguera)',
        repoUrl: null,
        categoryTag: 'Framework Frontend',
      },
      {
        name: 'Postman & Insomnia',
        usageContext:
          'Criação e manutenção de coleções de requisições HTTP, inspeção detalhada de cabeçalhos e validação manual de endpoints.',
        appliedProject: 'Depuração técnica e validação das APIs Carshop, Our Recipes e MykytaDu',
        repoUrl: null,
        categoryTag: 'Testes de API',
      },
      {
        name: 'Scrum / Kanban',
        usageContext:
          'Metodologias ágeis aplicadas ao planejamento de demandas, backlog, visibilidade de fluxo de entrega e priorização de requisitos de negócio.',
        appliedProject: 'Rotinas operacionais na MM Motors e organização dos projetos de software',
        repoUrl: null,
        categoryTag: 'Metodologias Ágeis',
      },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'mm-motors',
    company: 'MM Motors',
    role: 'Assistente de Vendas & Desenvolvedor de Soluções Internas',
    period: '2023 – fev. 2026',
    location: 'Goiânia, GO',
    badge: 'Aplicação em Negócio Real',
    description:
      'Atuação nas rotinas comerciais e administrativas de veículos seminovos, identificando necessidades operacionais do dia a dia e desenvolvendo soluções de software para apoio ao controle da loja.',
    bullets: [
      'Concepção e desenvolvimento da API REST "Carshop" para gestão de veículos, clientes e contratos de consignação.',
      'Desenvolvimento com Java, Spring Boot, banco relacional PostgreSQL e documentação via Swagger/OpenAPI.',
      'Configuração de ambiente conteinerizado com Docker Compose para execução local dos serviços.',
      'Otimização do fluxo de consulta e integração de telas web para padronização de registros administrativos.',
    ],
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker Compose', 'Swagger/OpenAPI', 'Next.js', 'Git'],
    transferableHighlight:
      'Compreensão direta das necessidades operacionais do negócio e tradução prática em requisitos técnicos e modelos de dados.',
  },
  {
    id: 'stemac',
    company: 'STEMAC S/A Grupos Geradores',
    role: 'Técnico Especialista Mecânico',
    period: '2000 – 2019',
    location: 'Goiânia e Centro-Oeste',
    badge: 'Sistemas Críticos & Diagnóstico',
    description:
      'Atuação técnica em campo no diagnóstico e resolução de falhas em grupos geradores de energia dedicados a operações com necessidade de funcionamento contínuo (hospitais, indústrias e infraestruturas essenciais).',
    bullets: [
      'Diagnóstico de falhas mecânicas e eletromecânicas com análise metódica de causas-raiz.',
      'Tomada de decisão técnica em campo em situações com exigência de pronto restabelecimento.',
      'Atendimento técnico a clientes e comunicação com equipes de campo.',
      'Elaboração de laudos técnicos detalhados e orientações preventivas para redução de paradas não programadas.',
    ],
    techStack: ['Análise de Causa-Raiz', 'Diagnóstico de Sistemas', 'Depuração Técnica', 'Decisão sob Pressão', 'Comunicação com Clientes'],
    transferableHighlight:
      'Aplicação de método analítico de diagnóstico, rastreabilidade de causas-raiz e documentação técnica no desenvolvimento e teste de APIs backend.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Anhanguera Educacional',
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    period: 'Concluído em 2025',
    details: 'Foco em Engenharia de Software, Modelagem de Banco de Dados, Redes, Paradigmas de Programação e Arquitetura de Sistemas.',
  },
  {
    institution: 'Digital Innovation One (DIO)',
    degree: 'Formação Java & Spring Boot',
    period: '2024',
    details: 'Construção de APIs RESTful, Spring Security, JPA/Hibernate, injeção de dependências e arquitetura de serviços.',
  },
  {
    institution: 'Digital Innovation One (DIO)',
    degree: 'Testes em Java com JUnit 5 & Mockito',
    period: '2024',
    details: 'Cobertura de código, testes unitários, testes de integração, dublês de teste e boas práticas de asserções.',
  },
];

export const FEATURED_PROJECTS: Repository[] = [
  {
    id: 101,
    name: 'our-recipes',
    displayName: 'Our Recipes',
    full_name: 'Drufontael/our-recipes',
    html_url: 'https://github.com/Drufontael/our-recipes',
    codeUrl: 'https://github.com/Drufontael/our-recipes',
    demoUrl: null,
    description:
      'Aplicação full stack para cadastro, visualização e avaliação de receitas culinárias, com autenticação JWT e controle de permissões.',
    language: 'Java',
    stargazers_count: 3,
    forks_count: 1,
    open_issues_count: 0,
    updated_at: '2025-02-15T00:00:00Z',
    topics: ['java', 'spring-boot', 'hexagonal-architecture', 'nextjs', 'postgresql', 'docker-compose', 'spring-security'],
    is_featured: true,
    architecture: 'Arquitetura Hexagonal (Ports & Adapters)',
    commits_count: 57,
    problemSolved:
      'Dispersão de receitas culinárias em anotações manuais e falta de padronização na categorização de ingredientes, porções e avaliações entre usuários.',
    problemLabel: 'Problema abordado',
    eduardoContribution:
      'Concepção e desenvolvimento integral do backend em Java 21 e Spring Boot 3, modelagem do domínio, implementação de autenticação stateless com Spring Security e tokens JWT, conteinerização de todos os serviços com Docker Compose e elaboração de suíte de testes unitários com JUnit 5 e Mockito.',
    mainTechnicalDecision:
      'Adoção de Arquitetura Hexagonal (Ports & Adapters) para desacoplar completamente o núcleo de regras de negócio de frameworks web e drivers de persistência, permitindo testes unitários rápidos e independentes de infraestrutura.',
    technologies: ['Java 21', 'Spring Boot 3', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker Compose', 'JUnit 5', 'Mockito', 'Next.js', 'TypeScript'],
    status: {
      label: 'Funcional (v1.0)',
      type: 'completed',
      stageDescription: 'Backend operacional com autenticação JWT, documentação e suíte de testes unitários.',
    },
    highlights: [
      'Backend estruturado em Arquitetura Hexagonal, com separação entre regras de domínio, portas e adaptadores web/banco',
      'Controle de acesso implementado com Spring Security e autenticação via tokens JWT',
      'Interface web desenvolvida com Next.js e TypeScript para consumo da API',
      'Ambiente local com serviços e banco PostgreSQL organizados via Docker Compose',
      'Testes unitários desenvolvidos com JUnit 5 cobrindo as regras de negócio centrais',
    ],
  },
  {
    id: 102,
    name: 'carshop',
    displayName: 'Carshop',
    full_name: 'Drufontael/carshop',
    html_url: 'https://github.com/Drufontael/carshop',
    codeUrl: 'https://github.com/Drufontael/carshop',
    demoUrl: null,
    description:
      'API RESTful desenvolvida para apoiar a gestão de estoque e rotinas comerciais de revenda de veículos, inspirada no fluxo observado na MM Motors.',
    language: 'Java',
    stargazers_count: 2,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2025-01-20T00:00:00Z',
    topics: ['java', 'spring-boot', 'postgresql', 'docker', 'hateoas', 'swagger', 'api-rest'],
    is_featured: true,
    architecture: 'RESTful com Padrão HATEOAS & Clean Design',
    commits_count: 42,
    problemSolved:
      'Gargalos operacionais no controle de estoque automotivo, com informações descentralizadas de clientes, veículos em pátio e contratos de consignação.',
    problemLabel: 'Problema abordado',
    eduardoContribution:
      'Mapeamento dos requisitos da rotina comercial na MM Motors, modelagem relacional no PostgreSQL, desenvolvimento dos endpoints RESTful em Java e Spring Boot com navegação HATEOAS, validação de regras de negócio e documentação Swagger/OpenAPI 3.0.',
    mainTechnicalDecision:
      'Implementação do padrão HATEOAS nos endpoints para habilitar hipermídia autodirigida nas respostas da API, permitindo aos clientes navegar entre veículos, contratos e clientes a partir de links semânticos retornados no JSON.',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Docker Compose', 'HATEOAS', 'Swagger / OpenAPI 3', 'JUnit 5'],
    status: {
      label: 'Projeto funcional',
      type: 'functional',
      stageDescription: 'API REST estruturada com Spring Boot, PostgreSQL, navegação HATEOAS e documentação Swagger/OpenAPI 3.0.',
    },
    highlights: [
      'Modelagem de dados para veículos, clientes e controle de contratos de consignação',
      'Implementação de links hipermídia com padrão HATEOAS nos endpoints da API',
      'Documentação de endpoints com Swagger / OpenAPI 3.0 para consulta e testes',
      'Controle de migrações em PostgreSQL e conteinerização via Docker Compose',
      'Tratamento centralizado de erros e validações de dados nas requisições',
    ],
  },
  {
    id: 104,
    name: 'mykytadu-app',
    displayName: 'MykytaDu App',
    full_name: 'Drufontael/mykytadu-app',
    html_url: 'https://github.com/Drufontael/mykytadu-app',
    codeUrl: 'https://github.com/Drufontael/mykytadu-app',
    demoUrl: null,
    description:
      'Aplicativo multiplataforma para organização e catálogo de animes, em desenvolvimento com Kotlin Multiplatform (KMP) e Compose Multiplatform para Android e Desktop.',
    language: 'Kotlin',
    stargazers_count: 4,
    forks_count: 1,
    open_issues_count: 0,
    updated_at: '2025-02-01T00:00:00Z',
    topics: ['kotlin-multiplatform', 'compose-multiplatform', 'koin', 'ktor-client', 'android', 'desktop'],
    is_featured: true,
    architecture: 'Kotlin Multiplatform (KMP) & Compose Multiplatform',
    commits_count: 29,
    problemSolved:
      'Estruturação de um cliente multiplataforma unificado para Android e Desktop compartilhando componentes visuais e infraestrutura de rede.',
    problemLabel: 'Problema abordado',
    eduardoContribution:
      'Implementação da fundação KMP, criação do Design System com Compose Multiplatform, estruturação da navegação tipada e configuração de injeção de dependências com Koin e cliente HTTP Ktor.',
    mainTechnicalDecision:
      'Utilização de Kotlin Multiplatform (KMP) e Compose Multiplatform para compartilhar componentes de interface, navegação e infraestrutura de rede no módulo comum (commonMain).',
    technologies: ['Kotlin', 'Compose Multiplatform', 'Kotlin Multiplatform (KMP)', 'Koin (DI)', 'Ktor Client', 'Coroutines'],
    status: {
      label: 'Em desenvolvimento',
      type: 'in_development',
      stageDescription: 'Estrutura inicial multiplataforma (Compose Multiplatform e Koin) com tela principal e navegação básica. A integração completa com a API mykytadu-api e o fluxo de autenticação ainda não estão concluídos.',
    },
    highlights: [
      'Fundação Kotlin Multiplatform (KMP) estruturada com módulo comum (commonMain)',
      'Design System base desenvolvido com Compose Multiplatform para Android e Desktop',
      'Infraestrutura de navegação tipada implementada entre fluxos de tela',
      'Configuração de injeção de dependências modular com Koin',
      'Estrutura de requisições HTTP assíncronas configurada com Ktor Client',
    ],
  },
  {
    id: 103,
    name: 'mykytadu-api',
    displayName: 'MykytaDu API',
    full_name: 'Drufontael/mykytadu-api',
    html_url: 'https://github.com/Drufontael/mykytadu-api',
    codeUrl: 'https://github.com/Drufontael/mykytadu-api',
    demoUrl: null,
    description:
      'API RESTful backend planejada para o ecossistema MykytaDu, com estrutura inicial para futuro catálogo de animes, persistência relacional e regras de negócio.',
    language: 'Kotlin',
    stargazers_count: 2,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2025-02-05T00:00:00Z',
    topics: ['api-rest', 'backend', 'kotlin', 'postgresql', 'clean-architecture', 'docker'],
    is_featured: true,
    architecture: 'API RESTful & Clean Architecture (Em Estruturação)',
    commits_count: 34,
    problemSolved:
      'Fornecer um serviço backend centralizado para gerenciamento de catálogo, listas e informações de animes de forma desacoplada para as aplicações cliente.',
    problemLabel: 'Problema que o projeto pretende resolver',
    eduardoContribution:
      'Configuração da estrutura base do projeto com Kotlin e Gradle, organização inicial de pacotes seguindo Clean Architecture e ambiente Docker para PostgreSQL.',
    mainTechnicalDecision:
      'Adoção preliminar de Clean Architecture para isolar a estrutura das futuras regras de negócio de frameworks e banco de dados, facilitando a evolução independente do backend.',
    technologies: ['Kotlin', 'APIs RESTful', 'Clean Architecture', 'Gradle', 'Docker', 'PostgreSQL (Planejado)'],
    status: {
      label: 'Em Desenvolvimento',
      type: 'in_development',
      stageDescription: 'Estrutura inicial configurada com Gradle e Docker; modelagem relacional, persistência e endpoints de catálogo permanecem em fase de planejamento e desenvolvimento.',
    },
    highlights: [
      'Implementado: Configuração da estrutura base do projeto com Kotlin e Gradle',
      'Implementado: Definição preliminar de pacotes segundo princípios de Clean Architecture',
      'Implementado: Configuração inicial de ambiente Docker para execução local',
      'Planejado: Modelagem relacional definitiva e migrações no PostgreSQL',
      'Planejado: Desenvolvimento dos endpoints RESTful de catálogo, filtros e paginação',
      'Planejado: Tratamento global de exceções e testes automatizados',
    ],
  },
  {
    id: 105,
    name: 'spring-security-jwt-template',
    displayName: 'Spring Security JWT Template',
    full_name: 'Drufontael/spring-security-jwt-template',
    html_url: 'https://github.com/Drufontael',
    codeUrl: 'https://github.com/Drufontael',
    demoUrl: null,
    description:
      'Estrutura base para autenticação em APIs Spring Boot com tokens JWT stateless e controle de permissões por papéis (RBAC).',
    language: 'Java',
    stargazers_count: 1,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2024-11-12T00:00:00Z',
    topics: ['java', 'spring-security', 'jwt', 'rbac', 'best-practices'],
    is_featured: false,
    architecture: 'Security Filter Chain & Token Provider',
    commits_count: 18,
    problemSolved:
      'Necessidade de um template pré-configurado de segurança para novas APIs Spring Boot sem necessidade de reescrever lógica de autenticação JWT.',
    eduardoContribution:
      'Desenvolvimento do filtro customizado OncePerRequestFilter, geração e validação de tokens JWT criptografados e anotações de autorização por função.',
    mainTechnicalDecision:
      'Configuração stateless da sessão com autenticação baseada puramente em cabeçalhos Authorization Bearer, garantindo escalabilidade horizontal.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'HMAC-SHA256'],
    status: {
      label: 'Funcional (Template)',
      type: 'completed',
      stageDescription: 'Template estruturado para reaproveitamento em projetos Spring Boot.',
    },
    highlights: [
      'Configuração de filtros customizados no SecurityFilterChain',
      'Tratamento de exceções de autenticação e autorização com respostas padronizadas',
      'Restrição de acesso a endpoints através de anotações @PreAuthorize',
    ],
  },
];

export const CURATED_PROJECTS: Repository[] = FEATURED_PROJECTS.slice(0, 4);

/**
 * Artigos publicados e verificados.
 * Atualmente vazio para cumprir a regra de não manter artigos simulados, datas fictícias
 * ou chamadas sem destino na página pública.
 * Quando houver pelo menos um artigo completo e publicado, adicione-o aqui com status: 'published'
 * para que a seção de blog e os links de navegação sejam ativados automaticamente.
 */
export const PUBLISHED_BLOG_POSTS: BlogPost[] = [];

// Export para compatibilidade retroativa
export const BLOG_POSTS: BlogPost[] = PUBLISHED_BLOG_POSTS;

/**
 * Rascunhos técnicos e temas estruturados para publicação futura.
 * Marcados estritamente como status: 'draft' — NÃO são expostos na página pública.
 */
export const DRAFT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'arquitetura-hexagonal-spring-boot',
    slug: 'arquitetura-hexagonal-spring-boot',
    title: 'Arquitetura Hexagonal na Prática com Spring Boot: Protegendo o Domínio de Dependências Externas',
    summary:
      'Como a separação entre Domínio, Portas e Adaptadores (Ports & Adapters) organiza a estrutura da API Our Recipes e evita acoplamentos diretos com banco de dados e frameworks.',
    readTime: '6 min de leitura',
    category: 'Arquitetura',
    tags: ['Java', 'Spring Boot', 'Clean Architecture', 'Ports and Adapters', 'DDD'],
    status: 'draft',
    featured: true,
    author: {
      name: 'Eduardo Estigarribia',
      role: 'Desenvolvedor Backend Java | Analista de Sistemas',
    },
    seo: {
      metaTitle: 'Arquitetura Hexagonal com Spring Boot | Eduardo Estigarribia',
      metaDescription: 'Separação entre Domínio, Portas e Adaptadores na prática com Spring Boot e Java.',
    },
    content: [
      'Ao iniciar projetos no ecossistema Spring Boot, o padrão clássico de camadas (Controller -> Service -> Repository) costuma ser a primeira escolha. No entanto, à medida que a complexidade do negócio aumenta, o domínio pode acabar acumulando anotações de persistência, regras de serialização e dependências diretas de bibliotecas externas.',
      'No desenvolvimento da aplicação **Our Recipes**, optei pela **Arquitetura Hexagonal** (Ports & Adapters). A premissa central é manter o núcleo de negócio independente de frameworks, bancos de dados ou protocolos de transporte.',
      '### Como organizamos o projeto:',
      '1. **Núcleo de Domínio (`core/domain`)**: Entidades e objetos de valor em Java puro, sem anotações de persistência como `@Entity` ou `@Table`. As regras fundamentais de receitas e avaliações residem aqui.',
      '2. **Portas de Entrada e Saída (`core/ports`)**: Interfaces Java que definem contratos. As *Driving Ports* expõem casos de uso para o exterior (ex: `CreateRecipeUseCase`), enquanto as *Driven Ports* definem o que o domínio necessita do exterior (ex: `RecipeRepositoryPort`).',
      '3. **Adaptadores (`adapters`)**: Implementações concretas. No lado web, controllers REST convertem DTOs em comandos de domínio. No lado de persistência, um adaptador implementa a porta do repositório utilizando o Spring Data JPA.',
      '### Benefícios práticos:',
      'O principal ganho está na clareza dos testes e na manutenibilidade. É possível testar as regras de negócio com testes unitários puros usando JUnit 5 de forma rápida, sem necessidade de carregar o contexto completo do Spring ou inicializar instâncias de banco de dados para validações de domínio.',
    ],
  },
  {
    id: 'da-mecanica-industrial-ao-backend-java',
    slug: 'da-mecanica-industrial-ao-backend-java',
    title: 'Da Mecânica Industrial ao Backend: O Que o Diagnóstico de Sistemas Críticos Ensina sobre Código Confiável',
    summary:
      'Como o raciocínio investigativo de diagnóstico em sistemas mecânicos críticos contribui para a depuração de código, organização de testes e construção de APIs confiáveis.',
    readTime: '7 min de leitura',
    category: 'Carreira',
    tags: ['Carreira Tech', 'Transição', 'Resolução de Problemas', 'Maturidade Profissional'],
    status: 'draft',
    featured: true,
    author: {
      name: 'Eduardo Estigarribia',
      role: 'Desenvolvedor Backend Java | Analista de Sistemas',
    },
    seo: {
      metaTitle: 'Da Mecânica Industrial ao Backend Java | Eduardo Estigarribia',
      metaDescription: 'O que o diagnóstico de sistemas críticos industriais ensina sobre código confiável e arquitetura de software.',
    },
    content: [
      'A transição de carreira para a área de desenvolvimento de software não significa descartar a experiência prévia. Ao longo de 19 anos atuando com diagnóstico de falhas em grupos geradores industriais, aprendi que a lógica de resolução de problemas segue princípios muito semelhantes aos do desenvolvimento backend.',
      '### 1. Sintomas vs. Causa-Raiz:',
      'Em um equipamento industrial com alarme de sobreaquecimento, trocar apenas o sensor resolve o alerta, mas não a causa do problema, que pode estar no fluxo de arrefecimento ou na calibração de uma válvula.',
      'No backend Java, a situação é parecida. Quando uma requisição falha com um `NullPointerException` ou retorna erro de banco, adicionar uma verificação condicional isolada pode mascarar uma falha estrutural. A prática de engenharia exige investigar o ciclo de vida da informação, os limites da transação e a validação na entrada dos dados.',
      '### 2. Rigor e Prevenção:',
      'Em equipamentos de suporte a energia contínua, falhas operacionais acarretam impactos diretos. Isso consolidou um hábito permanente de seguir procedimentos, documentar etapas e realizar verificações preventivas.',
      'No desenvolvimento de software, essa mesma postura se traduz na escrita metódica de testes com JUnit e Mockito, na documentação de endpoints e na atenção ao tratamento de exceções em APIs com Spring Boot.',
    ],
  },
];
