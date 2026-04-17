import Link from 'next/link';
import { Database, Layers3, ServerCog } from 'lucide-react';
import Button from '../../components/ui/Button';
import { services } from '../../data/services';
import WhyChooseCarousel from './WhyChooseCarousel';

const iconMap = {
  ServerCog,
  Database,
  Layers3,
};

const workflow = [
  { step: 1, title: 'Discovery & Planning', description: 'Understand your goals, constraints, and technical requirements.' },
  { step: 2, title: 'Architecture & Design', description: 'Design scalable systems with clear data flows and API contracts.' },
  { step: 3, title: 'Development & Integration', description: 'Build features with clean code, testing, and CI/CD setup.' },
  { step: 4, title: 'Testing & Optimization', description: 'Thorough QA, performance tuning, and production preparation.' },
  { step: 5, title: 'Deployment & Support', description: 'Launch with confidence and provide handoff documentation.' },
];

export const metadata = {
  title: 'Services | rami portfolio',
  description: 'Service offerings for API engineering, database design, and full-stack delivery. Build scalable, maintainable products with clean architecture.',
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden [font-family:var(--font-body)]">
      {/* Navigation Back */}
      <div className="sticky top-0 z-10 border-b border-(--color-border)/20 bg-(--color-dark)/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-(--color-muted) transition-colors duration-200 hover:text-white"
          >
            <span>←</span>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section - Powerful & Client-Focused */}
      <section className="relative overflow-hidden px-6 py-14 sm:py-18">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-(--color-accent)/12 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-(--color-accent)/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <h1 className="m-0 mb-6 [font-family:var(--font-display)] text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-[-0.03em] text-white">
              Scale Your Business
              <br />
              <span className="bg-gradient-to-r from-(--color-accent) to-(--color-accent)/70 bg-clip-text text-transparent">
                With Powerful Software
              </span>
            </h1>
            <p className="m-0 mb-8 text-[1.1rem] leading-[1.8] text-(--color-muted)">
              From concept to launch, I build production-grade systems that solve real problems. Let&apos;s turn your vision into a scalable product that delights users and drives results.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {['100+ Projects', 'Production Scale', '99.9% Uptime'].map((stat) => (
                <span
                  key={stat}
                  className="inline-flex items-center gap-2 rounded-full bg-(--color-accent)/12 border border-(--color-accent)/30 px-4 py-2 text-(--color-accent)"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services - Visual & Engaging */}
      <section className="relative px-6 py-12">
        <div className="pointer-events-none absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-(--color-accent)/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
              What I <span className="text-(--color-accent)">Build</span>
            </h2>
            <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              Comprehensive solutions tailored to your needs—from robust backends to polished frontends.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || ServerCog;
              return (
                <article
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-(--color-surface)/70 hover:border-(--color-accent)/60 hover:shadow-[0_16px_48px_rgba(189,250,92,0.1)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-(--color-accent)/15 blur-3xl transition-opacity duration-300 group-hover:opacity-50" />

                  <div className="relative mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent)/12 group-hover:bg-(--color-accent)/25 transition-all duration-300">
                      <Icon className="h-8 w-8 text-(--color-accent)" />
                    </div>
                  </div>

                  <h3 className="m-0 mb-3 [font-family:var(--font-display)] text-[1.5rem] font-black tracking-[-0.02em] text-white">
                    {service.title}
                  </h3>

                  <p className="m-0 mb-6 text-[0.95rem] leading-[1.6] text-(--color-muted)">
                    {service.summary}
                  </p>

                  <ul className="m-0 list-none space-y-2.5 p-0">
                    {service.details.slice(0, 4).map((detail) => {
                      const detailText = typeof detail === 'string' ? detail : detail.name;
                      return (
                        <li
                          key={detailText}
                          className="flex items-center gap-2.5 text-[0.9rem] text-(--color-muted)"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-(--color-accent)/60" />
                          {detailText}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section - Carousel */}
      <WhyChooseCarousel />

      {/* Process Section - Roadmap */}
      <section className="relative px-6 py-12">
        <div className="pointer-events-none absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-(--color-accent)/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
              How We Work <span className="text-(--color-accent)">Together</span>
            </h2>
            <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              A clear, structured journey from your initial vision to a live, thriving product.
            </p>
          </div>

          {/* Timeline Roadmap */}
          <div className="mx-auto max-w-4xl">
            <div className="space-y-0">
              {workflow.map((item, idx) => (
                <div key={item.step} className="relative">
                  {/* Timeline Connector */}
                  {idx < workflow.length - 1 && (
                    <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-gradient-to-b from-(--color-accent)/40 to-transparent" />
                  )}

                  {/* Card */}
                  <div className="relative ml-20 mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface)/30 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-(--color-surface)/50 hover:border-(--color-accent)/40 group">
                    {/* Step Circle */}
                    <div className="absolute -left-8 top-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-dark)">
                      <span className="[font-family:var(--font-display)] text-lg font-black text-(--color-accent)">
                        {item.step}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="m-0 mb-3 [font-family:var(--font-display)] text-[1.3rem] font-black tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="m-0 text-[0.95rem] leading-[1.7] text-(--color-muted) [font-family:var(--font-body)]">
                      {item.description}
                    </p>

                    {/* Accent line on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-(--color-accent) rounded-l-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline End Badge */}
          <div className="mx-auto mt-12 max-w-4xl flex justify-center">
            <div className="rounded-full bg-(--color-accent)/10 border border-(--color-accent)/30 px-6 py-3 text-center">
              <p className="m-0 text-sm font-semibold text-(--color-accent) [font-family:var(--font-display)]">
                Your product is live and thriving
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section - Comprehensive Stack */}
      <section className="relative px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="m-0 mb-3 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
              My Tech <span className="text-(--color-accent)">Arsenal</span>
            </h2>
            <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              I specialize in production-grade technologies that scale. Here&apos;s what I use to build reliable, fast, and maintainable systems.
            </p>
          </div>

          {/* Backend & APIs */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-(--color-accent)" />
              <h3 className="m-0 text-lg font-bold text-white">Backend & APIs</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'Node.js & Express', desc: 'Fast, scalable server-side JavaScript' },
                { name: 'TypeScript', desc: 'Type-safe development for fewer bugs' },
                { name: 'REST & GraphQL APIs', desc: 'Multiple paradigms for flexible integrations' },
              ].map((tech) => (
                <div key={tech.name} className="border-l-2 border-(--color-accent)/40 bg-(--color-surface)/20 px-4 py-3 hover:border-(--color-accent)/70 transition-colors">
                  <p className="m-0 font-semibold text-white">{tech.name}</p>
                  <p className="m-0 mt-1 text-xs text-(--color-muted)">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Databases & Data */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-(--color-accent)" />
              <h3 className="m-0 text-lg font-bold text-white">Databases & Data Layer</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'PostgreSQL', desc: 'Powerful relational database for complex queries' },
                { name: 'Prisma ORM', desc: 'Type-safe database client with migrations' },
                { name: 'MongoDB & Redis', desc: 'NoSQL and caching for performance' },
              ].map((tech) => (
                <div key={tech.name} className="border-l-2 border-(--color-accent)/40 bg-(--color-surface)/20 px-4 py-3 hover:border-(--color-accent)/70 transition-colors">
                  <p className="m-0 font-semibold text-white">{tech.name}</p>
                  <p className="m-0 mt-1 text-xs text-(--color-muted)">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend & UI */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-(--color-accent)" />
              <h3 className="m-0 text-lg font-bold text-white">Frontend & UI</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'React & Next.js', desc: '14+, SSR, static generation for speed' },
                { name: 'Tailwind CSS', desc: 'Utility-first CSS for consistent styling' },
                { name: 'GSAP & Framer Motion', desc: 'Smooth animations and interactions' },
              ].map((tech) => (
                <div key={tech.name} className="border-l-2 border-(--color-accent)/40 bg-(--color-surface)/20 px-4 py-3 hover:border-(--color-accent)/70 transition-colors">
                  <p className="m-0 font-semibold text-white">{tech.name}</p>
                  <p className="m-0 mt-1 text-xs text-(--color-muted)">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps & Deployment */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-(--color-accent)" />
              <h3 className="m-0 text-lg font-bold text-white">DevOps & Infrastructure</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'Docker & Containers', desc: 'Containerized deployments for consistency' },
                { name: 'CI/CD Pipelines', desc: 'GitHub Actions, automated testing & deployment' },
                { name: 'AWS & Cloud', desc: 'EC2, RDS, S3, Lambda for scalable infrastructure' },
              ].map((tech) => (
                <div key={tech.name} className="border-l-2 border-(--color-accent)/40 bg-(--color-surface)/20 px-4 py-3 hover:border-(--color-accent)/70 transition-colors">
                  <p className="m-0 font-semibold text-white">{tech.name}</p>
                  <p className="m-0 mt-1 text-xs text-(--color-muted)">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-(--color-accent)" />
              <h3 className="m-0 text-lg font-bold text-white">Developer Tools & Testing</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'Git & Version Control', desc: 'Clean commits and branch strategy' },
                { name: 'Jest & Testing', desc: 'Unit and integration tests for reliability' },
                { name: 'ESLint & Prettier', desc: 'Code quality and consistent formatting' },
              ].map((tech) => (
                <div key={tech.name} className="border-l-2 border-(--color-accent)/40 bg-(--color-surface)/20 px-4 py-3 hover:border-(--color-accent)/70 transition-colors">
                  <p className="m-0 font-semibold text-white">{tech.name}</p>
                  <p className="m-0 mt-1 text-xs text-(--color-muted)">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Strong & Clear */}
      <section className="relative px-6 py-14">
        <div className="pointer-events-none absolute inset-0 h-96 rounded-3xl bg-(--color-accent)/8 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-12 text-center backdrop-blur-sm">
            <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-4xl font-black tracking-[-0.02em] text-white">
              Let&apos;s Build Your <span className="text-(--color-accent)">Next Big Thing</span>
            </h2>
            <p className="m-0 mx-auto mb-8 max-w-[55ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              Ready to transform your ideas into a powerful product? Let&apos;s start a conversation about what&apos;s possible.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/#contact"
                className="text-sm font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-dark)',
                }}
              >
                Schedule a Call
              </Button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-(--color-border) px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-(--color-accent)/60 hover:bg-(--color-surface)/70 text-(--color-muted) hover:text-white"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
