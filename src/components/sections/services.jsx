'use client';

import { ArrowUpRight, Database, Layers3, ServerCog } from 'lucide-react';
import Button from '../ui/Button';
import Folder from '../ui/Folder';
import { services } from '../../data/services';

const iconMap = {
  ServerCog,
  Database,
  Layers3,
};

const serviceColors = {
  'api-engineering': '#4169E1',
  'database-design': '#7C3AED',
  'fullstack-delivery': '#06B6D4',
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute top-10 -left-10 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-(--color-accent)/10 blur-[100px]" />

      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-4xl">
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            MY <span className="text-(--color-accent)">SERVICES</span>
          </h2>
          <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            I provide focused development services that help products move from idea to production with
            strong architecture, clean code, and polished user experience.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || ServerCog;
            const folderColor = serviceColors[service.id] || '#5227FF';

            return (
              <article
                key={service.id}
                className="group relative rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-(--color-surface)/60 hover:border-(--color-accent)/50"
              >
                {/* Interactive Folder - Center Top */}
                <div className="mb-8 flex justify-center pt-4">
                  <Folder
                    color={folderColor}
                    size={1.2}
                    items={service.details}
                  />
                </div>

                {/* Service Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-accent)/15 transition-all duration-300 group-hover:bg-(--color-accent)/25 group-hover:scale-110">
                    <Icon className="h-7 w-7 transition-all duration-300 text-(--color-accent)" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="mb-3 text-center [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white transition-all duration-300">
                  {service.title}
                </h3>

                {/* Service Summary */}
                <p className="mb-6 text-center text-sm leading-[1.8] text-(--color-muted)">
                  {service.summary}
                </p>

                {/* Details List - Below Folder */}
                <div className="rounded-2xl bg-(--color-surface)/30 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-(--color-accent) opacity-70">
                    What's included:
                  </p>
                  <ul className="m-0 list-none space-y-2 p-0">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-xs leading-[1.6] text-(--color-muted)">
                        <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-(--color-accent)" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative accent line */}
                <div
                  className="absolute -bottom-px left-0 h-px w-0 bg-linear-to-r opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100"
                  style={{ backgroundImage: `linear-gradient(to right, ${folderColor}, transparent)` }}
                />
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            href="/services"
            className="inline-flex items-center gap-2 text-sm"
            style={{
              fontFamily: 'var(--font-display)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-dark)',
            }}
          >
            Explore Services Page
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
