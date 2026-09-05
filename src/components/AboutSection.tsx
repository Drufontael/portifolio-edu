import { 
  User, 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  ExternalLink,
  Linkedin,
  Zap,
  Layers,
  Search,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elegant Dark Eyebrow */}
        <div className="max-w-3xl mb-16 text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-2">
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span>Professional Profile & Engineering Philosophy</span>
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sobre Mim & O Diferencial de Maturidade
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
            Como 19 anos de resolução de falhas críticas na indústria de energia moldaram uma abordagem rigorosa, resiliente e analítica para o desenvolvimento de software backend.
          </p>
        </div>

        {/* Top Split: Bio & Seniority Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Bio Narrative */}
          <div className="lg:col-span-7 space-y-5 text-left text-zinc-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-md shadow-black/40">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 font-mono">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>Engenharia Guiada por Causa-Raiz e Arquitetura Sólida</span>
              </h3>
              <p className="text-zinc-400">
                Sou <strong className="text-white font-medium">Eduardo Estigarribia Oliveira</strong>, Desenvolvedor Backend Java e Analista de Sistemas residente em Goiânia/GO, com total disponibilidade para atuação <strong className="text-blue-400 font-medium">presencial, remota e híbrida</strong>. Minha jornada na tecnologia é sustentada por uma sólida transição após <strong className="text-blue-400 font-medium">19 anos atuando como Técnico Especialista na STEMAC S/A</strong>, onde fui responsável pelo diagnóstico e restabelecimento de grupos geradores em hospitais, data centers e indústrias de grande porte.
              </p>
              <p className="text-zinc-400">
                Essa vivência de quase duas décadas em ambientes onde paradas não programadas significam perdas incalculáveis gerou uma <strong className="text-white font-medium">mentalidade de engenharia inegociável</strong>: código backend precisa ser previsível, modular, auditável e exaustivamente testado antes de chegar a produção.
              </p>
              <p className="text-zinc-400">
                Hoje aplico essa disciplina na construção de microsserviços e APIs com <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Java 21</span>, <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Spring Boot</span>, arquiteturas limpas (<span className="text-indigo-300 font-mono text-xs">Hexagonal / Ports & Adapters</span>), persistência otimizada em <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">PostgreSQL</span> e contêineres <span className="text-blue-400 font-mono text-xs bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Docker</span>.
              </p>
            </div>

            {/* LinkedIn Verification Card */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Trajetória Verificada no LinkedIn</h4>
                  <p className="text-xs text-zinc-400">Eduardo Estigarribia • Histórico completo e conexões</p>
                </div>
              </div>
              <a
                id="about-linkedin-link"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-950 hover:bg-blue-600 hover:text-white transition-all shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Acessar Perfil</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Pillars of Transferred Seniority */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Habilidades Transferíveis & Rigor
            </h3>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold font-mono">
                <Search className="w-4 h-4" />
                <span>Investigação Sistemática de Causa-Raiz</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Não mascaro sintomas com soluções temporárias. Investigo o ciclo de vida dos objetos, a modelagem de domínio e transações do banco para garantir estabilidade duradoura.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold font-mono">
                <Zap className="w-4 h-4" />
                <span>Resolução de Incidentes sob Pressão</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Quase duas décadas com decisões rápidas e assertivas em ambientes críticos, minimizando downtime e comunicando clareza aos times e stakeholders.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold font-mono">
                <BookOpen className="w-4 h-4" />
                <span>Documentação e Rastreabilidade</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Código sem documentação é risco operacional. Produzo especificações OpenAPI/Swagger, diagramas de arquitetura e histórico limpo de commits no GitHub.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold font-mono">
                <Layers className="w-4 h-4" />
                <span>Tradução de Necessidades em Software</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Experiência prática na MM Motors me ensinou a entender dores de negócio operacionais e transformá-las diretamente em APIs eficientes como o Carshop.
              </p>
            </div>
          </div>

        </div>

        {/* Education & Certifications Row */}
        <div className="pt-2">
          <div className="mb-6 text-left">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>Formação Acadêmica & Certificações</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Base acadêmica em Análise de Sistemas e cursos de especialização contínua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    {idx === 0 ? <GraduationCap className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-mono text-blue-400">{edu.period}</span>
                  <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400 font-medium">{edu.institution}</p>
                </div>
                {edu.details && (
                  <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
