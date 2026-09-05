import { Briefcase, Calendar, MapPin, CheckCircle, ExternalLink, Linkedin, GitPullRequest } from 'lucide-react';
import { EXPERIENCES, PERSONAL_INFO } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="trajetoria" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Elegant Dark Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              <span>Career Journey & Professional Track</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Trajetória Técnica Detalhada
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Consolidada a partir de experiências práticas, entrega de valor em negócios reais e formação contínua. Espelhada com o perfil do LinkedIn.
            </p>
          </div>

          <a
            id="timeline-linkedin-btn"
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg text-xs font-medium text-zinc-200 transition-colors self-start md:self-auto"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>Ver perfil no LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-12 text-left">
          
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker node with Elegant Dark blue accent */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>

              {/* Content Card */}
              <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all space-y-5 shadow-md shadow-black/40">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-blue-400 font-semibold text-base mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Principais Responsabilidades & Entregas:
                  </h4>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Transferable Seniority Callout */}
                {exp.transferableHighlight && (
                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
                    <GitPullRequest className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-400 font-semibold font-mono">Diferencial para Engenharia: </strong>
                      <span className="text-zinc-300">{exp.transferableHighlight}</span>
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-zinc-500 mr-1">Tecnologias:</span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
