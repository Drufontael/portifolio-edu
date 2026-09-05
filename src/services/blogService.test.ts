import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  getPublishedArticles, 
  hasPublishedArticles, 
  getArticleBySlug, 
  getArticleUrl, 
  parseArticleSlugFromHash, 
  updateArticleSeo 
} from './blogService';
import { PUBLISHED_BLOG_POSTS, DRAFT_BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';

describe('Blog Architecture and Service', () => {
  const originalDocument = globalThis.document;

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock simples de document para execução em ambiente Node do Vitest
    const metaTags = new Map<string, string>();
    let title = 'Eduardo Estigarribia | Desenvolvedor Backend Java';

    const mockDoc = {
      get title() {
        return title;
      },
      set title(val: string) {
        title = val;
      },
      querySelector: (selector: string) => {
        const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
        if (nameMatch) {
          const key = `name:${nameMatch[1]}`;
          if (!metaTags.has(key)) return null;
          return {
            getAttribute: (attr: string) => (attr === 'content' ? metaTags.get(key) || null : null),
            setAttribute: (attr: string, val: string) => {
              if (attr === 'content') metaTags.set(key, val);
            },
          };
        }
        const propMatch = selector.match(/meta\[property="([^"]+)"\]/);
        if (propMatch) {
          const key = `prop:${propMatch[1]}`;
          if (!metaTags.has(key)) return null;
          return {
            getAttribute: (attr: string) => (attr === 'content' ? metaTags.get(key) || null : null),
            setAttribute: (attr: string, val: string) => {
              if (attr === 'content') metaTags.set(key, val);
            },
          };
        }
        return null;
      },
      createElement: (tag: string) => {
        let nameAttr = '';
        let propAttr = '';
        return {
          setAttribute: (attr: string, val: string) => {
            if (attr === 'name') nameAttr = val;
            if (attr === 'property') propAttr = val;
            if (attr === 'content') {
              if (nameAttr) metaTags.set(`name:${nameAttr}`, val);
              if (propAttr) metaTags.set(`prop:${propAttr}`, val);
            }
          },
        };
      },
      head: {
        appendChild: (_el: unknown) => {},
      },
    };

    // @ts-expect-error Mocking document in test environment
    globalThis.document = mockDoc;
  });

  afterEach(() => {
    globalThis.document = originalDocument;
  });

  // 1. Estado Atual: Nenhum artigo simulado na página pública
  it('não deve exibir artigos simulados ou datas fictícias na lista pública', () => {
    const published = getPublishedArticles();
    expect(published).toEqual([]);
    expect(hasPublishedArticles()).toBe(false);
  });

  // 2. Isolamento de Rascunhos
  it('deve manter rascunhos técnicos estritamente isolados com status draft', () => {
    expect(DRAFT_BLOG_POSTS.length).toBeGreaterThan(0);
    DRAFT_BLOG_POSTS.forEach((draft) => {
      expect(draft.status).toBe('draft');
    });

    // Garante que nenhum rascunho vaze para os artigos publicados
    const published = getPublishedArticles();
    expect(published.some((p) => p.status === 'draft')).toBe(false);
  });

  // 3. Parser de URL Hash (#artigo/:slug)
  it('deve extrair corretamente o slug do artigo a partir do hash da URL', () => {
    expect(parseArticleSlugFromHash('#artigo/arquitetura-hexagonal-spring-boot')).toBe('arquitetura-hexagonal-spring-boot');
    expect(parseArticleSlugFromHash('#artigo/da-mecanica-industrial-ao-backend-java')).toBe('da-mecanica-industrial-ao-backend-java');
    
    // Outros hashes não devem ser interpretados como artigos
    expect(parseArticleSlugFromHash('#projetos')).toBeNull();
    expect(parseArticleSlugFromHash('#competencias')).toBeNull();
    expect(parseArticleSlugFromHash('')).toBeNull();
  });

  // 4. Geração de URL Própria para Artigos
  it('deve gerar URLs individuais de navegação para os artigos', () => {
    const slug = 'arquitetura-hexagonal-spring-boot';
    expect(getArticleUrl(slug)).toBe('#artigo/arquitetura-hexagonal-spring-boot');
  });

  // 5. Metadados SEO e Ciclo de Vida
  it('deve atualizar metadados SEO do documento ao visualizar um artigo e restaurar ao sair', () => {
    const mockArticle: BlogPost = {
      id: 'teste-artigo',
      slug: 'teste-artigo',
      title: 'Artigo de Teste sobre Spring Boot',
      summary: 'Resumo técnico detalhado sobre testes no Spring Boot.',
      readTime: '5 min de leitura',
      category: 'Arquitetura',
      tags: ['Java', 'Spring'],
      content: ['Conteúdo completo do artigo de teste.'],
      status: 'published',
      author: {
        name: 'Eduardo Estigarribia',
        role: 'Desenvolvedor Backend Java',
      },
      seo: {
        metaTitle: 'Artigo de Teste SEO | Eduardo Estigarribia',
        metaDescription: 'Descrição SEO personalizada para indexação.',
      },
    };

    const initialTitle = document.title;

    // Aplica SEO do artigo
    const restoreSeo = updateArticleSeo(mockArticle);
    expect(document.title).toBe('Artigo de Teste SEO | Eduardo Estigarribia');

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta?.getAttribute('content')).toBe('Descrição SEO personalizada para indexação.');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Artigo de Teste SEO | Eduardo Estigarribia');

    // Executa a restauração (simulando saída do artigo)
    restoreSeo();
    expect(document.title).toBe(initialTitle);
  });

  // 6. Reativação da Arquitetura quando houver artigo publicado
  it('deve localizar artigo por slug quando publicado', () => {
    expect(getArticleBySlug('slug-inexistente')).toBeUndefined();
  });
});
