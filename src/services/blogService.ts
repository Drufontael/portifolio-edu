import { BlogPost } from '../types';
import { PUBLISHED_BLOG_POSTS } from '../data/portfolioData';

/**
 * Retorna todos os artigos publicados e verificados.
 * Artigos em rascunho ou sem conteúdo completo não são retornados.
 */
export function getPublishedArticles(): BlogPost[] {
  return PUBLISHED_BLOG_POSTS.filter((post) => post.status === 'published');
}

/**
 * Verifica se existe pelo menos um artigo completo e publicado.
 * Utilizado para decidir se a seção de blog e links de navegação devem ser exibidos na página pública.
 */
export function hasPublishedArticles(): boolean {
  return getPublishedArticles().length > 0;
}

/**
 * Busca um artigo publicado pelo seu slug único.
 */
export function getArticleBySlug(slug: string): BlogPost | undefined {
  return getPublishedArticles().find((post) => post.slug === slug);
}

/**
 * Gera a URL própria de navegação do artigo no cliente.
 */
export function getArticleUrl(slug: string): string {
  return `#artigo/${slug}`;
}

/**
 * Extrai o slug do artigo a partir do hash da URL (ex: "#artigo/meu-artigo").
 */
export function parseArticleSlugFromHash(hash: string): string | null {
  if (!hash) return null;
  const match = hash.match(/^#artigo\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

const DEFAULT_SEO = {
  title: 'Eduardo Estigarribia | Desenvolvedor Backend Java',
  description:
    'Portfólio profissional de Eduardo Estigarribia Oliveira - Desenvolvedor Backend Java e Analista de Sistemas. Projetos práticos com Spring Boot, APIs REST, bancos relacionais e arquitetura limpa.',
};

/**
 * Atualiza metadados SEO do documento (title, meta description, og:tags)
 * e retorna uma função de limpeza para restaurar os valores padrão ao sair do artigo.
 */
export function updateArticleSeo(article: BlogPost | null): () => void {
  if (typeof document === 'undefined') return () => {};

  if (!article) {
    document.title = DEFAULT_SEO.title;
    updateMetaTag('description', DEFAULT_SEO.description);
    updateOgTag('og:title', DEFAULT_SEO.title);
    updateOgTag('og:description', DEFAULT_SEO.description);
    return () => {};
  }

  const articleTitle = article.seo?.metaTitle || `${article.title} | Eduardo Estigarribia`;
  const articleDesc = article.seo?.metaDescription || article.summary;

  document.title = articleTitle;
  updateMetaTag('description', articleDesc);
  updateOgTag('og:title', articleTitle);
  updateOgTag('og:description', articleDesc);
  updateOgTag('og:type', 'article');

  return () => {
    document.title = DEFAULT_SEO.title;
    updateMetaTag('description', DEFAULT_SEO.description);
    updateOgTag('og:title', DEFAULT_SEO.title);
    updateOgTag('og:description', DEFAULT_SEO.description);
    updateOgTag('og:type', 'website');
  };
}

function updateMetaTag(name: string, content: string): void {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateOgTag(property: string, content: string): void {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
