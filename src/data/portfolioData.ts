import { Repository, BlogPost, ExperienceItem, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Eduardo Estigarribia Oliveira',
  shortName: 'Eduardo Estigarribia',
  role: 'Desenvolvedor Backend Java | Analista de Sistemas',
  location: 'Goiânia/GO, Brasil (Disponível: Presencial, Remoto e Híbrido)',
  phone: '(62) 99670-0460',
  cleanPhone: '5562996700460',
  email: 'eduardo.estigarribia@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/eduardoestigarribia/',
  githubUrl: 'https://github.com/Drufontael',
  githubUser: 'Drufontael',
  summary:
    'Desenvolvedor backend Java e Analista de Sistemas, em transição consolidada para tecnologia após 19 anos de atuação técnica especializada em diagnósticos e sistemas críticos. Experiência prática comprovada na construção de APIs REST e aplicações web escaláveis com Java, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL e Docker.',
  elevatorPitch:
    'Uno 19 anos de raciocínio investigativo de causa-raiz e resiliência sob pressão à engenharia de software moderna: Arquitetura Hexagonal, testes automatizados e microsserviços conteinerizados.',
  availability: 'Disponível: Presencial, Remoto e Híbrido (Backend Java / Full Stack)',
};

export const SKILL_CATEGORIES = [
  {
    category: 'Backend & Java Ecosystem',
    skills: [
      { name: 'Java 17/21', level: 'Avançado' },
      { name: 'Spring Boot', level: 'Avançado' },
      { name: 'Spring Security', level: 'Intermediário' },
      { name: 'Spring Data JPA / Hibernate', level: 'Avançado' },
      { name: 'APIs RESTful & HATEOAS', level: 'Avançado' },
      { name: 'JWT & OAuth2 Concepts', level: 'Intermediário' },
    ],
  },
  {
    category: 'Dados, Cache & Testes',
    skills: [
      { name: 'PostgreSQL', level: 'Avançado' },
      { name: 'MySQL & H2 Database', level: 'Avançado' },
      { name: 'MongoDB', level: 'Intermediário' },
      { name: 'Redis', level: 'Intermediário' },
      { name: 'JUnit 5 & AssertJ', level: 'Avançado' },
      { name: 'Mockito', level: 'Avançado' },
    ],
  },
  {
    category: 'Arquitetura & Integração',
    skills: [
      { name: 'Arquitetura Hexagonal (Ports & Adapters)', level: 'Avançado' },
      { name: 'MVC & Clean Architecture', level: 'Avançado' },
      { name: 'Swagger / OpenAPI 3', level: 'Avançado' },
      { name: 'OpenFeign', level: 'Intermediário' },
      { name: 'Ktor Client & Koin DI', level: 'Intermediário' },
      { name: 'Database Migrations (Flyway)', level: 'Intermediário' },
    ],
  },
  {
    category: 'Frontend & Multiplataforma',
    skills: [
      { name: 'Kotlin & Compose Multiplatform', level: 'Intermediário' },
      { name: 'TypeScript & JavaScript', level: 'Intermediário' },
      { name: 'Next.js & React', level: 'Intermediário' },
      { name: 'Angular (Fundamentos)', level: 'Básico' },
      { name: 'Tailwind CSS', level: 'Intermediário' },
    ],
  },
  {
    category: 'DevOps, Ferramentas & Metodologias',
    skills: [
      { name: 'Docker & Docker Compose', level: 'Avançado' },
      { name: 'Git & GitHub Workflows', level: 'Avançado' },
      { name: 'Maven & Gradle', level: 'Avançado' },
      { name: 'Linux / Bash Scripting', level: 'Intermediário' },
      { name: 'Postman / Insomnia', level: 'Avançado' },
      { name: 'Scrum / Kanban', level: 'Intermediário' },
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
    badge: 'Impacto Real em Negócios',
    description:
      'Atuação estratégica no processo comercial e administrativo de veículos seminovos, aliada à identificação direta de gargalos operacionais e à transformação dessas dores em software produtivo.',
    bullets: [
      'Concepção, arquitetura e desenvolvimento autônomo da API REST "Carshop" para gestão integrada de veículos, clientes e contratos de consignação.',
      'Desenvolvimento em Java/Spring Boot com persistência relacional PostgreSQL e documentação viva via Swagger/OpenAPI.',
      'Ambiente completamente conteinerizado com Docker Compose para fácil deploy e replicação.',
      'Desenvolvimento e integração de interfaces web para rotinas administrativas, mantendo o código versionado no GitHub.',
      'Aceleração do tempo de consulta de inventário e redução substancial de retrabalho documental entre vendas e retaguarda.',
    ],
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker Compose', 'Swagger/OpenAPI', 'Next.js', 'Git'],
    transferableHighlight:
      'Capacidade única de ouvir as dores reais do cliente e traduzi-las imediatamente em requisitos técnicos de alta fidelidade.',
  },
  {
    id: 'stemac',
    company: 'STEMAC S/A Grupos Geradores',
    role: 'Técnico Especialista Mecânico',
    period: '2000 – 2019 (19 anos)',
    location: 'Goiânia e Centro-Oeste',
    badge: '19 Anos de Excelência Técnica',
    description:
      'Liderança técnica em campo para diagnóstico e resolução de falhas complexas em grupos geradores de energia crítica (hospitais, indústrias, shopping centers e infraestruturas vitais).',
    bullets: [
      'Diagnóstico de falhas mecânicas e eletromecânicas em sistemas de alta complexidade com análise metódica de causas-raiz.',
      'Tomada de decisão em tempo real sob alta pressão em clientes com operação ininterrupta.',
      'Atendimento técnico especializado a clientes corporativos e liderança técnica de equipes operacionais multidisciplinares.',
      'Elaboração de laudos, documentações técnicas minuciosas e orientações preventivas para mitigação de paradas não programadas.',
    ],
    techStack: ['Análise de Causa-Raiz', 'Diagnóstico de Sistemas', 'Depuração Crítica', 'Gestão sob Pressão', 'Comunicação com Clientes'],
    transferableHighlight:
      'Os mesmos princípios que garantem a confiabilidade de geradores de hospitais guiam o código backend: rastreabilidade, prevenção de falhas em cascata, arquitetura resiliente e testes rigorosos.',
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
    degree: 'Especialização Java & Spring Boot',
    period: '2024',
    details: 'Construção de APIs RESTful, Spring Security, JPA/Hibernate, injeção de dependências e microsserviços.',
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
    full_name: 'Drufontael/our-recipes',
    html_url: 'https://github.com/Drufontael/our-recipes',
    description:
      'Aplicação full stack moderna para criação, compartilhamento e avaliação de receitas com domínio rico, autenticação JWT e controle de acesso.',
    language: 'Java',
    stargazers_count: 3,
    forks_count: 1,
    open_issues_count: 0,
    updated_at: '2025-02-15T00:00:00Z',
    topics: ['java', 'spring-boot', 'hexagonal-architecture', 'nextjs', 'postgresql', 'docker-compose', 'spring-security'],
    is_featured: true,
    architecture: 'Arquitetura Hexagonal (Ports & Adapters)',
    commits_count: 57,
    highlights: [
      'Backend estruturado em Arquitetura Hexagonal, segregando estritamente domínio de adaptadores web e de persistência',
      'Segurança robusta com Spring Security e autenticação baseada em tokens JWT',
      'Frontend moderno construído com Next.js e TypeScript integrado à API',
      'Orquestração completa dos serviços e banco relacional PostgreSQL via Docker Compose',
      'Repositório com 57 commits atestando evolução técnica contínua e testes bem estruturados',
    ],
  },
  {
    id: 102,
    name: 'carshop',
    full_name: 'Drufontael/carshop',
    html_url: 'https://github.com/Drufontael/carshop',
    description:
      'API RESTful corporativa para administração de lojas de veículos seminovos, modelada com base nas dores operacionais vivenciadas na MM Motors.',
    language: 'Java',
    stargazers_count: 2,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2025-01-20T00:00:00Z',
    topics: ['java', 'spring-boot', 'postgresql', 'docker', 'hateoas', 'swagger', 'api-rest'],
    is_featured: true,
    architecture: 'RESTful com Padrão HATEOAS & Clean Design',
    commits_count: 42,
    highlights: [
      'Modelagem orientada a domínio para veículos, histórico de clientes e gestão de contratos de consignação',
      'Hipermídia com padrão HATEOAS para navegação rica pelos recursos da API',
      'Documentação viva e interativa com Swagger / OpenAPI 3.0 para fácil consumo',
      'Migrations gerenciadas com PostgreSQL e ambiente replicável em contêiner Docker',
      'Validações customizadas de regras de negócio comerciais e tratamento global de exceções',
    ],
  },
  {
    id: 103,
    name: 'mykytadu',
    full_name: 'Drufontael/mykytadu',
    html_url: 'https://github.com/Drufontael/mykytadu',
    description:
      'Aplicativo multiplataforma para organização e catálogo de animes, desenvolvido incrementalmente para Android, Desktop e iOS.',
    language: 'Kotlin',
    stargazers_count: 4,
    forks_count: 1,
    open_issues_count: 0,
    updated_at: '2025-02-01T00:00:00Z',
    topics: ['kotlin-multiplatform', 'compose-multiplatform', 'koin', 'ktor-client', 'android', 'desktop'],
    is_featured: true,
    architecture: 'Kotlin Multiplatform (KMP) + MVI Architecture',
    commits_count: 29,
    highlights: [
      'Fundação multiplataforma compartilhando regras de negócio e rede entre Android e Desktop',
      'Design System reutilizável com Compose Multiplatform com 8 rotas tipadas concluídas',
      'Injeção de dependências modular e desacoplada utilizando Koin',
      'Consumo assíncrono de APIs externas via cliente HTTP Ktor com engines por plataforma',
      'Organização ágil em sprints com 29 commits e documentação de arquitetura clara',
    ],
  },
  {
    id: 104,
    name: 'spring-security-jwt-template',
    full_name: 'Drufontael/spring-security-jwt-template',
    html_url: 'https://github.com/Drufontael',
    description:
      'Template de segurança para microsserviços Java com autenticação JWT stateless, refresh token e controle granular de permissões (RBAC).',
    language: 'Java',
    stargazers_count: 1,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2024-11-12T00:00:00Z',
    topics: ['java', 'spring-security', 'jwt', 'rbac', 'best-practices'],
    is_featured: false,
    architecture: 'Security Filter Chain & Token Provider',
    commits_count: 18,
    highlights: [
      'Implementação de filtros customizados no SecurityFilterChain',
      'Tratamento de exceções de autenticação e autorização com respostas JSON padronizadas RFC 7807',
      'Suporte a múltiplos papéis de usuário com anotações `@PreAuthorize`',
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'arquitetura-hexagonal-spring-boot',
    slug: 'arquitetura-hexagonal-spring-boot',
    title: 'Arquitetura Hexagonal na Prática com Spring Boot: Protegendo o Domínio de Dependências Externas',
    summary:
      'Como a separação estrita entre Domínio, Portas e Adaptadores (Ports & Adapters) transformou a manutenibilidade da API Our Recipes e eliminou acoplamentos com banco de dados e frameworks.',
    date: '18 Fev 2025',
    readTime: '6 min de leitura',
    category: 'Arquitetura',
    tags: ['Java', 'Spring Boot', 'Clean Architecture', 'Ports and Adapters', 'DDD'],
    featured: true,
    content: [
      'Ao iniciar projetos no ecossistema Spring Boot, o padrão clássico de camadas (Controller -> Service -> Repository) costuma ser a primeira escolha. No entanto, à medida que a complexidade do negócio aumenta, surge um problema silencioso: o domínio passa a ser contaminado por anotações do JPA, regras de serialização do Jackson e dependências diretas de bibliotecas externas.',
      'No desenvolvimento da aplicação **Our Recipes**, optei pela **Arquitetura Hexagonal** (Ports & Adapters). A premissa central é simples e poderosa: o núcleo do negócio não deve saber que o Spring Boot, o PostgreSQL ou uma API HTTP sequer existem.',
      '### Como estruturamos o hexágono:',
      '1. **Núcleo de Domínio (`core/domain`)**: Entidades puras e objetos de valor em Java puro, sem nenhuma anotação de persistência como `@Entity` ou `@Table`. As regras invariantes de receitas e avaliações residem exclusivamente aqui.',
      '2. **Portas de Entrada e Saída (`core/ports`)**: Interfaces Java que definem contratos. As *Driving Ports* expõem casos de uso para o exterior (ex: `CreateRecipeUseCase`), enquanto as *Driven Ports* definem o que o domínio precisa do mundo externo (ex: `RecipeRepositoryPort`).',
      '3. **Adaptadores (`adapters`)**: Implementações concretas. No lado web, controllers REST convertem DTOs em comandos de domínio. No lado de persistência, um adaptador implementa a porta do repositório utilizando o Spring Data JPA.',
      '### O Ganho Real na Engenharia de Software:',
      'A maior vantagem não é estética, mas sim a **testabilidade descomplicada**. Conseguimos testar 100% dos fluxos de negócio usando testes unitários puros com JUnit 5 em milissegundos, sem precisar carregar o contexto pesado do Spring (`@SpringBootTest`) ou subir bancos em memória. Quando o domínio é livre, o sistema ganha vida longa e fácil manutenção.',
    ],
  },
  {
    id: 'da-mecanica-industrial-ao-backend-java',
    slug: 'da-mecanica-industrial-ao-backend-java',
    title: 'Da Mecânica Industrial ao Backend: O Que 19 Anos de Sistemas Críticos me Ensinaram sobre Código Confiável',
    summary:
      'Uma reflexão sincera sobre transição de carreira técnica. Como o método de diagnóstico de falhas em grupos geradores de hospitais é o mesmo mindset necessário para depurar e arquitetar APIs de alta disponibilidade.',
    date: '28 Jan 2025',
    readTime: '7 min de leitura',
    category: 'Carreira',
    tags: ['Carreira Tech', 'Transição', 'Resolução de Problemas', 'Maturidade Profissional'],
    featured: true,
    content: [
      'Muitos encaram a transição de carreira para a programação como um "começar do zero absoluto". Após quase duas décadas na STEMAC S/A atuando com grupos geradores industriais em clientes de altíssima exigência — como centros cirúrgicos hospitalares e indústrias que não podem parar nem por um segundo —, percebi que a essência da engenharia permanece idêntica.',
      '### 1. A Sintomatologia vs. A Causa-Raiz:',
      'Em uma máquina industrial com alarme de sobreaquecimento, o operador inexperiente apenas troca o sensor. O técnico sênior sabe que o sensor é só o mensageiro: a falha pode estar na vazão da bomba, na aeração da sala ou na cavitação do fluido.',
      'No backend Java, a situação é análoga. Quando uma requisição lança um `NullPointerException` ou estoura tempo de resposta com erro 504, trocar uma linha por um `if (obj != null)` arbitrário é apenas colocar uma fita isolante no sensor. A verdadeira maturidade técnica exige investigar o ciclo de vida do objeto, a transação do banco ou o gargalo de I/O.',
      '### 2. A Falha Não É Opção em Ambientes Críticos:',
      'Se um grupo gerador falha quando a concessionária de energia cai, o hospital fica no escuro. Essa responsabilidade cria um rigor inegociável com documentação, testes de carga preventivos e procedimentos padronizados.',
      'Ao trazer essa bagagem para o desenvolvimento de software, escrever testes com JUnit e Mockito deixa de ser uma obrigação burocrática para se tornar a rede de segurança primária da aplicação. Hoje, no desenvolvimento backend com Spring Boot e Docker, cada commit reflete essa busca incessante por previsibilidade e confiabilidade.',
    ],
  },
  {
    id: 'kotlin-multiplatform-mykytadu',
    slug: 'kotlin-multiplatform-mykytadu',
    title: 'Kotlin Multiplatform na Prática: Construindo o MykytaDu para Android e Desktop sem Duplicar Regras',
    summary:
      'Como o ecossistema KMP permite compartilhar a camada de dados, modelos e injeção de dependências com Koin e Ktor, mantendo uma experiência de desenvolvimento unificada e tipada.',
    date: '10 Jan 2025',
    readTime: '5 min de leitura',
    category: 'Kotlin',
    tags: ['Kotlin', 'KMP', 'Compose Multiplatform', 'Ktor', 'Koin', 'Mobile'],
    featured: false,
    content: [
      'O dilema entre desenvolvimento nativo e tecnologias cross-platform gerou debates acalorados durante anos. Enquanto soluções híbridas tradicionais frequentemente sacrificam performance de UI ou forçam pontes complexas em JavaScript, o **Kotlin Multiplatform (KMP)** propõe uma abordagem muito mais elegante: compilação direta para bytecode nativo de cada target.',
      'Ao projetar o **MykytaDu** — uma aplicação para gerenciamento e acompanhamento de animes —, decidi validar na prática até onde o compartilhamento de código poderia ir entre Android e Desktop (JVM).',
      '### A Arquitetura Adotada:',
      '- **Módulo `commonMain`**: Contém todos os modelos de dados serializados com `kotlinx.serialization`, clientes HTTP configurados com `ktor-client` e a árvore de injeção de dependências com o framework leve `Koin`.',
      '- **`Compose Multiplatform` para a UI**: Com o Jetpack Compose estendido para Desktop pela JetBrains, foi possível compartilhar inclusive componentes visuais (botões, listas paginadas, temas e telas de navegação).',
      '- **Engines de Rede Específicas**: O Ktor permite usar a engine `OkHttp` no Android e `CIO` ou `Java` no Desktop, mantendo a mesma API fluente para chamadas assíncronas com coroutines.',
      'Com 29 commits e 8 rotas concluídas, o resultado foi uma base de código única onde cerca de 85% do código é 100% compartilhado, demonstrando que o KMP já é uma alternativa viável e madura para produção.',
    ],
  },
  {
    id: 'testes-junit5-mockito-sem-fragilidade',
    slug: 'testes-junit5-mockito-sem-fragilidade',
    title: 'Testes Unitários com JUnit 5 e Mockito sem Fragilidade: O Guia para APIs Spring Robustas',
    summary:
      'Por que testes frágeis que testam implementação em vez de comportamento quebram a cada refatoração, e como estruturar testes expressivos e fáceis de manter.',
    date: '15 Dez 2024',
    readTime: '6 min de leitura',
    category: 'Testes',
    tags: ['JUnit 5', 'Mockito', 'Java', 'TDD', 'Qualidade de Software'],
    featured: false,
    content: [
      'Uma das maiores queixas de desenvolvedores em equipes ágeis é: "Toda vez que altero um detalhe de código interno, metade dos testes quebram!". Isso geralmente é sintoma de testes excessivamente acoplados aos detalhes de implementação do Mockito.',
      '### Princípios para Testes Saudáveis no Backend:',
      '1. **Teste Comportamento, Não Métodos Internos**: O seu teste deve validar que, dado um comando válido, o resultado retornado ou a ação externa gerada foi a esperada. Evite validar ordens estritas de métodos auxiliares (`verify(repo, times(1)).findById(...)`) quando isso não for essencial para o contrato.',
      '2. **Padrão AAA (Arrange, Act, Assert)**: Mantenha seus métodos de teste divididos com clareza visual entre a preparação do cenário, a execução do método sob teste e a validação final com `assertThat` da biblioteca AssertJ, que fornece mensagens de erro legíveis.',
      '3. **Evite Subir o Contexto do Spring para Testes Unitários**: `@SpringBootTest` é excelente para testes de integração end-to-end com `@Testcontainers`, mas é um desperdício usá-lo para testar regras de domínio da camada Service. Utilize `@ExtendWith(MockitoExtension.class)` para obter execuções instantâneas.',
    ],
  },
];
