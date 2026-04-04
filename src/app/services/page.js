import Link from 'next/link';
import { Database, Layers3, ServerCog, CheckCircle, Zap, Shield, Code, TrendingUp, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import { services } from '../../data/services';

const iconMap = {
  ServerCog,
  Database,
  Layers3,
};

const benefits = [
  { icon: Zap, title: 'Faster Time to Market', description: 'Clean architecture and modular design accelerate development cycles.' },
  { icon: Shield, title: 'Production Ready', description: 'Battle-tested patterns for reliability, security, and scalability.' },
  { icon: TrendingUp, title: 'Future Proof', description: 'Systems designed to grow with your business needs and user base.' },
  { icon: Code, title: 'Maintainable Codebase', description: 'Well-structured code that your team can understand and extend.' },
];

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
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute top-12 left-6 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-10 right-8 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />

        <main className="relative mx-auto w-full max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-(--color-muted) transition-colors duration-200 hover:text-white"
          >
            <span>←</span>
            Back to Home
          </Link>

          <header className="mt-8 max-w-4xl">
            <h1 className="m-0 mb-6 [font-family:var(--font-display)] text-[clamp(2.2rem,6vw,5rem)] font-black leading-none tracking-[-0.03em] text-white">
              SERVICES <span className="text-(--color-accent)">I OFFER</span>
            </h1>
            <p className="m-0 mb-4 max-w-[62ch] text-[1.05rem] leading-[1.9] text-(--color-muted)">
              I focus on backend-heavy product work with clean system design and practical frontend delivery.
              Whether you're scaling your infrastructure or shipping a new product, I build systems that are
              resilient, maintainable, and ready for the real world.
            </p>
            <p className="m-0 max-w-[62ch] text-sm leading-[1.8] text-(--color-accent)">
              ✓ 100+ projects delivered • ✓ Production-scale systems • ✓ Team collaboration experts
            </p>
          </header>

          {/* Core Services */}
          <section className="mt-16">
            <h2 className="mb-12 [font-family:var(--font-display)] text-3xl font-bold tracking-[-0.02em] text-white">
              Core Services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || ServerCog;

                return (
                  <article
                    key={service.id}
                    className="group rounded-3xl border border-(--color-border) bg-(--color-surface)/50 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-(--color-surface)/70 hover:border-(--color-accent)/50"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-accent)/15 transition-all duration-300 group-hover:bg-(--color-accent)/25 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-(--color-accent)" />
                    </div>

                    <h3 className="m-0 mb-3 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white">
                      {service.title}
                    </h3>

                    <p className="m-0 mb-6 text-sm leading-[1.8] text-(--color-muted)">
                      {service.summary}
                    </p>

                    <ul className="m-0 list-none space-y-3 p-0">
                      {service.details.map((detail) => {
                        const detailText = typeof detail === 'string' ? detail : detail.name;
                        return (
                          <li key={detailText} className="flex items-start gap-2 text-xs leading-[1.6] text-(--color-muted)">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                            <span>{detailText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </section>

      {/* Benefits Section */}
      <section className="relative px-4 py-24 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute top-0 -right-20 h-96 w-96 rounded-full bg-(--color-accent)/5 blur-[120px]" />
        
        <div className="relative mx-auto w-full max-w-6xl">
          <h2 className="mb-6 text-center [font-family:var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-white">
            Why Work With Me
          </h2>
          <p className="mx-auto mb-16 max-w-[60ch] text-center text-[1.05rem] leading-[1.9] text-(--color-muted)">
            Every project I take on benefits from battle-tested practices, architectural thinking, and a commitment
            to shipping quality code that scales.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-(--color-border) bg-(--color-surface)/30 p-6 transition-all duration-300 hover:bg-(--color-surface)/50 hover:border-(--color-accent)/30">
                <Icon className="mb-4 h-8 w-8 text-(--color-accent)" />
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-(--color-muted)">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative px-4 py-24 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute top-10 -left-20 h-80 w-80 rounded-full bg-(--color-accent)/5 blur-[100px]" />
        
        <div className="relative mx-auto w-full max-w-6xl">
          <h2 className="mb-6 text-center [font-family:var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-white">
            How I Work
          </h2>
          <p className="mx-auto mb-16 max-w-[60ch] text-center text-[1.05rem] leading-[1.9] text-(--color-muted)">
            A clear, collaborative process from concept to launch ensures your project stays on track
            and aligned with your vision.
          </p>

          <div className="space-y-4">
            {workflow.map((item, idx) => (
              <div
                key={item.step}
                className="flex gap-6 rounded-2xl border border-(--color-border) bg-(--color-surface)/30 p-8 transition-all duration-300 hover:bg-(--color-surface)/50 hover:border-(--color-accent)/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-accent) text-sm font-bold text-(--color-dark)">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-muted)">{item.description}</p>
                </div>
                {idx < workflow.length - 1 && (
                  <div className="absolute left-1/2 h-8 w-px -translate-x-1/2 bg-linear-to-b from-(--color-accent) to-transparent opacity-30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="relative px-4 py-24 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-(--color-accent)/5 blur-[120px]" />
        
        <div className="relative mx-auto w-full max-w-6xl">
          <h2 className="mb-6 text-center [font-family:var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-white">
            What You Get
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Clean, Documented Code', description: 'Well-structured codebase with comprehensive documentation for your team.' },
              { title: 'Scalable Architecture', description: 'Systems built to handle growth without costly rewrites.' },
              { title: 'Performance Optimized', description: 'Fast APIs, efficient queries, and lean frontend delivery.' },
              { title: 'Security-First Approach', description: 'Authentication, validation, and industry-standard security practices.' },
              { title: 'CI/CD Ready', description: 'Automated testing and deployment pipelines out of the box.' },
              { title: 'Knowledge Transfer', description: 'Handoff sessions and documentation to empower your team.' },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-2xl border border-(--color-border) bg-(--color-surface)/30 p-6">
                <CheckCircle className="mb-4 h-6 w-6 text-(--color-accent)" />
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-(--color-muted)">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="relative px-4 py-24 sm:px-6 md:px-10">
        <div className="relative mx-auto w-full max-w-6xl">
          <h2 className="mb-6 text-center [font-family:var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-white">
            Built With Modern Tech
          </h2>
          <p className="mx-auto mb-12 max-w-[60ch] text-center text-[1.05rem] leading-[1.9] text-(--color-muted)">
            I use proven, production-ready technologies that solve real problems and integrate seamlessly.
          </p>

          <div className="rounded-3xl border border-(--color-border) bg-(--color-surface)/30 p-12">
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { name: 'Node.js & Express', use: 'Robust backend APIs' },
                { name: 'PostgreSQL & Prisma', use: 'Reliable data layer' },
                { name: 'React & Next.js', use: 'Modern UI frameworks' },
                { name: 'Tailwind CSS', use: 'Fast styling' },
                { name: 'TypeScript', use: 'Type-safe development' },
                { name: 'Docker', use: 'Containerized deployment' },
                { name: 'Git & CI/CD', use: 'Automated workflows' },
                { name: 'REST & APIs', use: 'Clean integrations' },
              ].map(({ name, use }) => (
                <div key={name} className="flex flex-col gap-2 rounded-xl bg-(--color-surface)/40 p-4">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-xs text-(--color-muted)">→ {use}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute inset-0 h-96 rounded-3xl bg-(--color-accent)/5 blur-[100px]" />
        
        <div className="relative mx-auto w-full max-w-4xl rounded-3xl border border-(--color-border) bg-(--color-surface)/50 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 [font-family:var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-white">
            Ready to Build Something Great?
          </h2>
          <p className="mx-auto mb-8 max-w-[50ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            Let's talk about your project. I'll help you understand what's possible and how to get there.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/#contact"
              className="text-sm"
              style={{
                fontFamily: 'var(--font-display)',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-dark)',
              }}
            >
              Start Your Project
            </Button>

            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-6 py-3 text-sm transition-all duration-300 hover:border-(--color-accent)/50 hover:bg-(--color-surface)/50 text-(--color-muted) hover:text-white"
            >
              View Service Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
