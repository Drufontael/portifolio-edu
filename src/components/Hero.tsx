import { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Send, 
  CheckCircle2, 
  Copy, 
  Github, 
  Linkedin, 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCurriculum: () => void;
}

export default function Hero({ onOpenCurriculum }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Decorative ambient blue gradients from Elegant Dark theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Disponível: Presencial, Remoto e Híbrido • Backend Java</span>
            </div>

            {/* Main Headline styled after Elegant Dark (tracking-tighter + blue &) */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                Software Developer <span className="text-blue-500">&</span> <br />
                Backend Specialist
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300">
                {PERSONAL_INFO.name}
              </p>
            </div>

            {/* Elevator Pitch */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Desenvolvedor Backend Java e Analista de Sistemas. Especialista em construir sistemas escaláveis e arquiteturas limpas. Uno <strong className="text-white font-semibold">19 anos de atuação técnica especializada em diagnósticos críticos (STEMAC S/A)</strong> ao ecossistema moderno: <span className="text-blue-400 font-mono text-sm">Spring Boot</span>, <span className="text-blue-400 font-mono text-sm">PostgreSQL</span>, <span className="text-blue-400 font-mono text-sm">Docker</span>, <span className="text-blue-400 font-mono text-sm">Arquitetura Hexagonal</span> e <span className="text-blue-400 font-mono text-sm">JUnit 5</span>.
            </p>

            {/* Conversion CTA Group styled with Elegant Dark buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-whatsapp-cta"
                href={`https://wa.me/${PERSONAL_INFO.cleanPhone}?text=${encodeURIComponent(
                  'Olá Eduardo, vi seu portfólio profissional e gostaria de agendar uma conversa sobre uma vaga/projeto backend.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <a
                id="hero-github-cta"
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                <span>@Drufontael</span>
              </a>

              <a
                id="hero-projects-cta"
                href="#projetos"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              >
                <span>Ver Projetos</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </a>

              <button
                id="hero-curriculum-btn"
                onClick={onOpenCurriculum}
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-lg font-medium text-xs text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                title="Ver currículo detalhado em PDF"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>CV (PDF)</span>
              </button>
            </div>

            {/* Quick Contact & Verified Profile Links */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Email:</span>
                <span className="text-zinc-300">{PERSONAL_INFO.email}</span>
                <button
                  id="hero-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-1 hover:text-blue-400 text-zinc-500 transition-colors"
                  title="Copiar email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {copiedEmail && <span className="text-blue-400 text-[11px]">Copiado!</span>}
              </div>

              <div className="hidden sm:block text-zinc-700">•</div>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-blue-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Tech Card / Elegant Dark Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/90 overflow-hidden hover:border-zinc-700 transition-colors">
              
              {/* Terminal Titlebar */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-blue-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">eduardo@backend-system: ~</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  <Cpu className="w-3 h-3" />
                  <span>JDK 21 LTS</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-4">
                <div>
                  <span className="text-blue-400">$</span>{' '}
                  <span className="text-zinc-200">java -version</span>
                  <p className="text-zinc-400 mt-1 pl-3 border-l-2 border-zinc-800">
                    openjdk 21.0.4 2024-07-16 LTS<br />
                    OpenJDK Runtime Environment Temurin (build 21.0.4+7)
                  </p>
                </div>

                <div>
                  <span className="text-blue-400">$</span>{' '}
                  <span className="text-zinc-200">cat /etc/profile/eduardo.json</span>
                  <div className="mt-1.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-zinc-300 space-y-1.5">
                    <div className="text-zinc-500">{'// Perfil e Diferencial Competitivo'}</div>
                    <div><span className="text-blue-400">"status"</span>: <span className="text-zinc-200">"Pronto para impactar times de alta performance"</span>,</div>
                    <div><span className="text-blue-400">"disponibilidade"</span>: <span className="text-blue-300">"Presencial, Remoto e Híbrido"</span>,</div>
                    <div><span className="text-blue-400">"experiencia_previa"</span>: <span className="text-indigo-300">"19 anos resolução de falhas críticas (STEMAC)"</span>,</div>
                    <div><span className="text-blue-400">"formacao"</span>: <span className="text-zinc-300">"Análise e Desenv. de Sistemas (Anhanguera)"</span>,</div>
                    <div><span className="text-blue-400">"arquitetura_preferida"</span>: <span className="text-blue-300">"Hexagonal / Ports & Adapters"</span>,</div>
                    <div><span className="text-blue-400">"testes"</span>: <span className="text-zinc-300">["JUnit 5", "Mockito", "AssertJ"]</span>,</div>
                    <div><span className="text-blue-400">"repositorios_github"</span>: <span className="text-blue-400">"Drufontael (Live Sync)"</span></div>
                  </div>
                </div>

                {/* Architecture Guarantees */}
                <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-zinc-950/60 border border-zinc-800">
                    <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Domínio Isolado</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-zinc-950/60 border border-zinc-800">
                    <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>PostgreSQL & Docker</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-zinc-950/60 border border-zinc-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Spring Security JWT</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 p-2 rounded bg-zinc-950/60 border border-zinc-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Testes Automatizados</span>
                  </div>
                </div>

              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Sistema Operacional: Ativo
                </span>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>github.com/Drufontael</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
