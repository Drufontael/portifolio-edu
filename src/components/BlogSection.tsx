import { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { getPublishedArticles, getArticleUrl } from '../services/blogService';

interface BlogSectionProps {
  onSelectArticle?: (post: BlogPost) => void;
}

export default function BlogSection({ onSelectArticle }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const publishedPosts = getPublishedArticles();

  // Se não houver artigos completos e publicados, remove temporariamente a seção da página pública
  if (publishedPosts.length === 0) {
    return null;
  }

  // Extrai categorias dinamicamente dos artigos publicados
  const availableCategories = ['all', ...Array.from(new Set(publishedPosts.map((p) => p.category)))];

  const filteredPosts = publishedPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  return (
    <section id="blog" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 font-mono">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Artigos Técnicos e Publicações</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
              Blog de Engenharia & Tecnologia
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Decisões de arquitetura no ecossistema Java e Spring Boot, diagnóstico em sistemas críticos, boas práticas de backend e testes automatizados.
            </p>
          </div>

          {/* Category tabs */}
          {availableCategories.length > 2 && (
            <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800 self-start md:self-auto">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts Grid — Card inteiro com link funcional para a URL própria do artigo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {filteredPosts.map((post) => {
            const articleUrl = getArticleUrl(post.slug);
            const displayDate = post.publishedAt || post.date;

            return (
              <a
                key={post.id}
                id={`blog-card-${post.slug}`}
                href={articleUrl}
                onClick={(e) => {
                  if (onSelectArticle) {
                    e.preventDefault();
                    window.location.hash = `artigo/${post.slug}`;
                    onSelectArticle(post);
                  }
                }}
                className="group block rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all duration-200 p-6 sm:p-7 space-y-4 shadow-md shadow-black/40 hover:shadow-blue-500/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium text-[11px]">
                      {post.category}
                    </span>
                    {displayDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{displayDate}</span>
                      </span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                {/* Footer: Tags & Read CTA */}
                <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-700/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span>Acessar artigo completo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
