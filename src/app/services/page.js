import Link from 'next/link';
import { Database, Layers3, ServerCog } from 'lucide-react';
import Button from '../../components/ui/Button';
import { services } from '../../data/services';

const iconMap = {
  ServerCog,
  Database,
  Layers3,
};

export const metadata = {
  title: 'Services | rami portfolio',
  description: 'Service offerings for API engineering, database design, and full-stack delivery.',
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-svh overflow-hidden px-4 py-20 sm:px-6 md:px-10 [font-family:var(--font-body)]">
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
          <p className="m-0 max-w-[62ch] text-[1.05rem] leading-[1.9] text-(--color-muted)">
            I focus on backend-heavy product work with clean system design and practical frontend delivery.
            These are the three core services I can help you with.
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || ServerCog;

            return (
              <article
                key={service.id}
                className="rounded-3xl border border-(--color-border) bg-(--color-surface)/70 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10">
                  <Icon className="h-6 w-6 text-(--color-accent)" />
                </div>

                <h2 className="m-0 mb-3 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white">
                  {service.title}
                </h2>

                <p className="m-0 mb-5 text-sm leading-[1.8] text-(--color-muted)">{service.summary}</p>

                <ul className="m-0 list-none space-y-2 p-0">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-(--color-muted)">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            href="/#contact"
            className="text-sm"
            style={{
              fontFamily: 'var(--font-display)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-dark)',
            }}
          >
            Start a Project
          </Button>

          <Link
            href="/#services"
            className="text-sm text-(--color-muted) transition-colors duration-200 hover:text-white"
          >
            Jump to Services Section
          </Link>
        </div>
      </main>
    </div>
  );
}
