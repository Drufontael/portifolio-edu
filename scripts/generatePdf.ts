import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION } from '../src/data/portfolioData';

export function generateResumePdf(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 36, bottom: 36, left: 40, right: 40 },
      info: {
        Title: `Currículo - ${PERSONAL_INFO.name}`,
        Author: PERSONAL_INFO.name,
        Subject: 'Desenvolvedor Backend Java - Currículo Profissional',
        Keywords: 'Java, Spring Boot, PostgreSQL, Docker, REST APIs, Arquitetura Limpa, Testes',
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Primary Colors
    const primaryColor = '#1d4ed8'; // Blue 700
    const textColor = '#18181b'; // Zinc 900
    const mutedColor = '#52525b'; // Zinc 600

    // Header
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text(PERSONAL_INFO.name, { align: 'left' });

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor(textColor)
      .text('Desenvolvedor Backend Java | Analista de Sistemas', { align: 'left' });

    doc.moveDown(0.2);

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor(mutedColor)
      .text(
        `${PERSONAL_INFO.location} • Tel: ${PERSONAL_INFO.phone} • Email: ${PERSONAL_INFO.email}\nLinkedIn: ${PERSONAL_INFO.linkedinUrl} • GitHub: ${PERSONAL_INFO.githubUrl}`
      );

    doc.moveDown(0.6);
    doc.strokeColor('#cbd5e1').lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(0.6);

    // Resumo Profissional
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text('RESUMO PROFISSIONAL');

    doc.moveDown(0.3);

    doc
      .fontSize(9.5)
      .font('Helvetica')
      .fillColor(textColor)
      .text(PERSONAL_INFO.summary, { align: 'justify', lineGap: 2 });

    doc.moveDown(0.6);

    // Competências Técnicas
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text('COMPETÊNCIAS TÉCNICAS');

    doc.moveDown(0.3);

    const competencies = [
      {
        group: 'Foco Principal:',
        desc: 'Java (17/21), Spring Boot, APIs REST, Spring Data JPA, PostgreSQL, JUnit 5, Mockito, Modelagem Relacional.',
      },
      {
        group: 'Experiência Prática:',
        desc: 'Spring Security, JWT, Docker Compose, Arquitetura Hexagonal, Ktor, Koin, Kotlin Multiplatform, Next.js.',
      },
      {
        group: 'Conhecimento Complementar:',
        desc: 'Git/GitHub, CI/CD básico, Swagger/OpenAPI, Linux/Shell Scripting, HATEOAS, Redis, MongoDB.',
      },
      {
        group: 'Competências Metodológicas:',
        desc: 'Diagnóstico analítico de causa-raiz, depuração sistemática, resolução metódica e documentação técnica.',
      },
    ];

    competencies.forEach((c) => {
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor(textColor)
        .text(`• ${c.group} `, { continued: true })
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(c.desc);
    });

    doc.moveDown(0.6);

    // Experiência Profissional
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text('EXPERIÊNCIA PROFISSIONAL');

    doc.moveDown(0.3);

    EXPERIENCES.forEach((exp, index) => {
      doc
        .fontSize(10.5)
        .font('Helvetica-Bold')
        .fillColor(textColor)
        .text(`${exp.role} — ${exp.company}`, { continued: true })
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(` (${exp.period})`, { align: 'right' });

      doc
        .fontSize(8.5)
        .font('Helvetica-Oblique')
        .fillColor(mutedColor)
        .text(`${exp.location} | Foco: ${exp.badge}`);

      doc.moveDown(0.2);

      exp.bullets.forEach((bullet) => {
        doc
          .fontSize(8.8)
          .font('Helvetica')
          .fillColor(textColor)
          .text(`  •  ${bullet}`, { lineGap: 1.5 });
      });

      if (index < EXPERIENCES.length - 1) {
        doc.moveDown(0.5);
      }
    });

    doc.moveDown(0.6);

    // Formação Acadêmica
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text('FORMAÇÃO ACADÊMICA E QUALIFICAÇÕES');

    doc.moveDown(0.3);

    EDUCATION.forEach((edu) => {
      doc
        .fontSize(9.5)
        .font('Helvetica-Bold')
        .fillColor(textColor)
        .text(`${edu.degree} — ${edu.institution} (${edu.period})`);

      doc
        .fontSize(8.5)
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(edu.details, { lineGap: 1 });

      doc.moveDown(0.2);
    });

    doc.end();

    stream.on('finish', () => {
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

// Run when executed directly
const targetFile = path.resolve(process.cwd(), 'public/curriculo-eduardo-estigarribia.pdf');
generateResumePdf(targetFile)
  .then(() => {
    console.log(`Resume PDF successfully generated at: ${targetFile}`);
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
