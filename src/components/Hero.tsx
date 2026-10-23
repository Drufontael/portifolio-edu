import { 
  ArrowRight, 
  Download, 
  Linkedin,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCurriculum: () => void;
}

export default function Hero({ onOpenCurriculum }: HeroProps) {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-[#3B82F6]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Title, Short Value Proposition & 3 Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]"></span>
              </span>
              <span>Disponível: Presencial, Remoto e Híbrido</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-[#3B82F6] tracking-tight">
                Desenvolvedor Backend Java
              </p>
            </div>

            {/* Short Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Desenvolvimento de APIs RESTful com Java, Spring Boot e PostgreSQL, aplicando autenticação, arquitetura limpa e testes automatizados com JUnit 5 e Mockito. Resolução metódica de problemas fundamentada em 19 anos de atuação técnica prévia.
            </p>

            {/* Exactly Three Actions: "Ver projetos", "Baixar currículo", "LinkedIn" */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-action-projects"
                href="#projetos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-[#3B82F6] hover:bg-blue-600 text-white transition-all shadow-md shadow-[#3B82F6]/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
              >
                <span>Ver projetos</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <button
                id="hero-action-curriculum"
                onClick={onOpenCurriculum}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-500 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#3B82F6]" />
                <span>Baixar currículo</span>
              </button>

              <a
                id="hero-action-linkedin"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-500 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
              >
                <Linkedin className="w-4 h-4 text-[#3B82F6]" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Terminal with at most 4 relevant lines */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/80 overflow-hidden text-left">
              
              {/* Titlebar */}
              <div className="px-4 py-2.5 bg-[#18181B] border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">backend-service ~ terminal</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#3B82F6]">
                  <Terminal className="w-3 h-3" />
                  <span>JDK 21 LTS</span>
                </div>
              </div>

              {/* Terminal Body: Exactly 4 relevant lines */}
              <div className="p-4 font-mono text-xs sm:text-sm space-y-2 bg-[#18181B]/90">
                <div className="text-zinc-200">
                  <span className="text-[#3B82F6] font-bold">$</span> ./mvnw spring-boot:run
                </div>
                <div className="text-zinc-400 pl-3 border-l-2 border-[#3B82F6]/50 text-xs leading-relaxed">
                  [INFO] Spring Boot 3.4 • Java 21 • PostgreSQL: connected
                </div>
                <div className="text-zinc-400 pl-3 border-l-2 border-[#3B82F6]/50 text-xs leading-relaxed">
                  [INFO] Ports &amp; Adapters architecture ready on :8080
                </div>
                <div className="text-emerald-400 pl-3 border-l-2 border-emerald-500/70 text-xs leading-relaxed font-medium">
                  [INFO] Build successful • automated tests passing
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
