import { Terminal, Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { hasPublishedArticles } from '../services/blogService';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const hasBlog = hasPublishedArticles();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-base">
                E
              </div>
              <span className="font-bold text-white text-base">Eduardo Estigarribia</span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Desenvolvedor Backend Java e Analista de Sistemas. Desenvolvimento de APIs REST com Spring Boot, arquitetura limpa, bancos relacionais e testes automatizados.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="GitHub @Drufontael"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="LinkedIn Eduardo Estigarribia"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="Email direto"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${PERSONAL_INFO.cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-blue-400 hover:text-blue-300 border border-zinc-800 transition-colors"
                title="WhatsApp direto"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-500">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline transition-colors">
                  Projetos e Repositórios
                </a>
              </li>
              <li>
                <a href="#competencias" className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline transition-colors">
                  Competências Técnicas
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline transition-colors">
                  Sobre Mim e Trajetória
                </a>
              </li>
              <li>
                <a href="#trajetoria" className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline transition-colors">
                  Experiência Profissional
                </a>
              </li>
              {hasBlog && (
                <li>
                  <a href="#blog" className="hover:text-blue-400 transition-colors">
                    Artigos Técnicos
                  </a>
                </li>
              )}
              <li>
                <a href="#contato" className="hover:text-blue-400 transition-colors">
                  Contato Direto
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Status */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-500">
              Disponibilidade e Localização
            </h4>
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-semibold text-xs">Aberto para contratação</span>
              </div>
              <p className="text-zinc-400 text-xs">
                Goiânia/GO • Disponível para oportunidades Presenciais, Remotas e Híbridas em todo o Brasil.
              </p>
              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-500">
                Horário de Brasília (UTC-3)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-zinc-500">
          <div>
            <span>© {new Date().getFullYear()} Eduardo Estigarribia Oliveira. Todos os direitos reservados.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
