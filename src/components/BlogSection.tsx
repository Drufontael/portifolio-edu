import { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import ArticleModal from './ArticleModal';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Arquitetura', 'Carreira', 'Kotlin', 'Testes'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  return (
    <section id="blog" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elegant Dark Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Latest from Blog & Knowledge Base</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Blog de Engenharia & Tecnologia
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Reflexões práticas, decisões arquiteturais no ecossistema Java/Spring, lições de 19 anos de engenharia diagnóstica e testes automatizados.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
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
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer rounded-lg bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-md shadow-black/40"
            >
              <div className="space-y-3">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium text-[11px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {post.readTime}
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

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
                  <span>Ler artigo completo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Full article reader modal */}
      <ArticleModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  );
}
