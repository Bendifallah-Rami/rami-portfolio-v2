import Link from 'next/link';
import { Database, Layers3, ServerCog } from 'lucide-react';
import Button from '../../components/ui/Button';
import { services } from '../../data/services';
import { workflow } from '../../data/workflow';
import WhyChooseCarousel from './WhyChooseCarousel';
import TechArsenalCarousel from '../../components/sections/TechArsenalCarousel';
import { pagesMeta, seoMetadata } from '../../data/seo';

const iconMap = {
  ServerCog,
  Database,
  Layers3,
};

export const metadata = {
  title: pagesMeta['/services'].title,
  description: pagesMeta['/services'].description,
  openGraph: {
    title: pagesMeta['/services'].title,
    description: pagesMeta['/services'].description,
    images: [seoMetadata.image],
  },
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden [font-family:var(--font-body)]">
      {/* Navigation Back */}
      <div className="sticky top-0 z-50 border-b border-(--color-border)/20 bg-(--color-dark)/80 backdrop-blur-sm">
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
        <div className="pointer-events-none absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <h1 className="m-0 mb-6 [font-family:var(--font-display)] text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-[-0.03em] text-white">
              Scale Your Business
              <br />
              <span className="bg-linear-to-r from-(--color-accent) to-(--color-accent)/70 bg-clip-text text-transparent">
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
                  className="group relative overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-8 backdrop-blur-sm transition-all duration-200 hover:bg-(--color-surface)/70 hover:border-(--color-accent)/60"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-(--color-accent)/12 blur-2xl transition-opacity duration-300 group-hover:opacity-60" />

                  <div className="relative mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent)/12 transition-all duration-300 group-hover:bg-(--color-accent)/25">
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
        <div className="pointer-events-none absolute inset-0 bottom-0 -left-20 h-80 w-80 rounded-full bg-(--color-accent)/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="m-0 mb-4 [font-family:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.03em] text-white">
              How We Work <span className="text-(--color-accent)">Together</span>
            </h2>
            <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              A clear, structured journey from your initial vision to a live, thriving product.
            </p>
          </div>

          {/* Horizontal Roadmap */}
          <div className="mx-auto max-w-6xl">
            {/* Connecting Line */}
            <div className="relative mb-12">
              <div className="absolute left-0 right-0 top-8 h-0.5 bg-linear-to-r from-transparent via-(--color-accent)/40 to-transparent" />
              
              {/* Steps Container */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                {workflow.map((item, idx) => (
                  <div key={item.step} className="relative">
                    {/* Step Circle */}
                    <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-3 border-(--color-accent) bg-(--color-dark) shadow-[0_0_20px_rgba(189,250,92,0.3)]">
                      <span className="[font-family:var(--font-display)] text-sm font-black text-(--color-accent)">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Content Card */}
                    <div className="rounded-xl border border-(--color-border)/60 bg-(--color-surface)/20 p-6 text-center backdrop-blur-sm transition-all duration-200 hover:bg-(--color-surface)/40 hover:border-(--color-accent)/40">
                      <h3 className="m-0 mb-3 text-base font-black text-white [font-family:var(--font-display)] leading-tight">
                        {item.title}
                      </h3>
                      <p className="m-0 text-sm leading-[1.6] text-(--color-muted) [font-family:var(--font-body)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* End State Badge */}
            <div className="mx-auto mt-6 flex justify-center">
              <div className="rounded-full bg-(--color-accent)/10 border border-(--color-accent)/30 px-5 py-2 text-center">
                <p className="m-0 text-xs font-semibold text-(--color-accent) [font-family:var(--font-display)]">
                  Live & Thriving
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Arsenal Carousel Section */}
      <TechArsenalCarousel />

      {/* Final CTA - Strong & Clear */}
      <section className="relative px-6 py-14">
        <div className="pointer-events-none absolute inset-0 opacity-50 rounded-3xl bg-(--color-accent)/8 blur-[100px]" />

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
                  color: 'var(--color-ink)',
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
