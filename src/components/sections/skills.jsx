'use client';

import { useMemo } from 'react';
import { BadgeCheck, Braces, Database, ServerCog, Sparkles, Wrench } from 'lucide-react';
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { skillGroups, skillLoopItems, workflowSkills } from '../../data/skills';
import LogoLoop from '../ui/LogoLoop';

const iconMap = {
  Braces,
  Database,
  ServerCog,
  BadgeCheck,
};

const loopIconMap = {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiFastapi,
  SiNestjs,
  SiGit,
};

const toCalcOffset = (value) => {
  const rounded = Math.round(value * 1000) / 1000;
  const normalized = Object.is(rounded, -0) ? 0 : rounded;
  const abs = Math.abs(normalized);
  const valueText = Number.isInteger(abs)
    ? String(abs)
    : abs.toFixed(3).replace(/\.?0+$/, '');
  const operator = normalized < 0 ? '-' : '+';

  return `${operator} ${valueText}px`;
};

export default function Skills() {
  const loopLogos = useMemo(() => {
    return skillLoopItems.map(({ label, icon, color }) => {
      const Icon = loopIconMap[icon] || SiJavascript;

      return {
        ariaLabel: label,
        title: label,
        node: (
          <span className="inline-flex items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) p-3 text-[0.8em]">
            <Icon className="h-[1.5em] w-[1.5em]" style={{ color }} />
          </span>
        ),
      };
    });
  }, []);

  const totalSkills = useMemo(() => {
    return skillGroups.reduce((count, group) => count + group.skills.length, 0);
  }, []);

  const orbitSkills = useMemo(() => {
    const flattened = skillGroups.flatMap(({ title, skills }) =>
      skills.map((skill) => ({ skill, title }))
    );

    if (!flattened.length) return [];

    const maxItems = Math.min(flattened.length, 12);

    return flattened.slice(0, maxItems).map((item, index) => {
      const angle = ((Math.PI * 2) / maxItems) * index - Math.PI / 2;
      const radius = index % 2 === 0 ? 118 : 154;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return {
        ...item,
        xOffset: toCalcOffset(x),
        yOffset: toCalcOffset(y),
      };
    });
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-16 md:py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-(--color-surface)/15 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="mb-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
              TECHNICAL <span className="text-(--color-accent)">SKILLS</span>
            </h2>
            <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
              A practical full-stack toolkit engineered for fast interfaces, robust APIs, and
              systems that stay clean as products grow.
            </p>
          </div>

          <aside className="hidden md:block relative overflow-hidden rounded-[1.8rem] border border-(--color-border) bg-(--color-surface)/55 p-6 backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-10 right-0 h-28 w-28 rounded-full bg-(--color-accent)/20 blur-2xl" />
            <div className="relative">
              <div className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
                <Sparkles className="h-4 w-4" />
                Toolbox Depth
              </div>
              <p className="m-0 [font-family:var(--font-display)] text-[clamp(2.1rem,4vw,3.2rem)] font-black leading-none text-white">
                {String(totalSkills).padStart(2, '0')} Core Skills
              </p>
              <p className="mt-3 mb-0 text-sm leading-relaxed text-(--color-muted)">
                Balanced across frontend craftsmanship, backend architecture, and infrastructure
                workflows.
              </p>
            </div>
          </aside>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative space-y-4">
            {skillGroups.map(({ title, icon, skills }, index) => {
              const Icon = iconMap[icon] || Braces;

              return (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-[1.65rem] bg-(--color-surface)/75 px-5 py-5 shadow-[0_14px_30px_rgba(0,0,0,0.24)] sm:px-6"
                >
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-accent)/12">
                        <Icon className="h-5 w-5 text-(--color-accent)" />
                      </div>
                      <h3 className="m-0 [font-family:var(--font-display)] text-[1.35rem] font-extrabold tracking-[-0.02em] text-white sm:text-[1.5rem]">
                        {title}
                      </h3>
                      <span className="ml-auto rounded-full border border-(--color-border) bg-black/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-(--color-muted)">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-(--color-border) bg-black/15 px-3.5 py-1.5 text-xs font-semibold text-(--color-muted) transition-[border-color,color,transform] duration-250 hover:-translate-y-0.5 hover:border-(--color-accent)/50 hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="hidden lg:flex relative overflow-hidden rounded-4xl border border-(--color-border) bg-linear-to-br from-(--color-surface)/90 via-(--color-surface)/75 to-[#10131c]/95 p-6 sm:p-8 flex-col">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[30px_30px] opacity-50" />
            <div className="relative flex-1 flex flex-col items-center justify-center">
              <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-(--color-accent)">
                Skill Constellation
              </p>

              <div className="relative mx-auto mt-5 h-80 w-80 max-w-full sm:h-88 sm:w-88">
                <div className="absolute inset-0 rounded-full border border-(--color-border)/70" />
                <div className="absolute inset-8 rounded-full border border-(--color-border)/60" />
                <div className="absolute inset-16 rounded-full border border-dashed border-(--color-accent)/40 animate-[spin_24s_linear_infinite]" />

                <div className="absolute top-1/2 left-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-(--color-accent)/35 bg-(--color-dark)/85 text-center shadow-[0_0_30px_rgba(189,250,92,0.14)] backdrop-blur-md">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-(--color-muted)">
                    Focus
                  </span>
                  <span className="mt-1 [font-family:var(--font-display)] text-lg font-black text-white">
                    Full Stack
                  </span>
                </div>

                {orbitSkills.map(({ skill, title, xOffset, yOffset }) => (
                  <span
                    key={`${title}-${skill}`}
                    className="absolute top-1/2 left-1/2 rounded-full border border-(--color-border) bg-(--color-surface)/95 px-2.5 py-1 text-[0.63rem] font-semibold uppercase tracking-[0.09em] text-white shadow-md"
                    style={{ transform: `translate(calc(-50% ${xOffset}), calc(-50% ${yOffset}))` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="m-0 mt-4 text-sm leading-relaxed text-(--color-muted)">
                Frontend, backend, and data tooling are intentionally blended so each layer ships
                with performance, clarity, and maintainability in mind.
              </p>
            </div>
          </aside>
        </div>

        <div className="hidden lg:block mt-9 overflow-hidden rounded-[1.8rem] border border-(--color-border) bg-(--color-surface)/55 p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-(--color-muted)">
            <Wrench className="h-4 w-4 text-(--color-accent)" />
            Engineering Workflow
          </div>

          <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {workflowSkills.map((item, index) => (
              <li
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-(--color-border) bg-black/15 px-4 py-4"
              >
                <div className="pointer-events-none absolute -right-6 -top-8 h-16 w-16 rounded-full bg-(--color-accent)/15 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-(--color-accent)">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="m-0 mt-2 [font-family:var(--font-display)] text-[1rem] font-bold text-white">
                  {item}
                </p>

                {index !== workflowSkills.length - 1 && (
                  <span
                    className="pointer-events-none absolute top-1/2 -right-3 hidden h-px w-6 -translate-y-1/2 bg-(--color-accent)/40 xl:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12 w-full border-y border-(--color-border) bg-(--color-surface)/40 py-7 sm:py-8">
        <LogoLoop
          logos={loopLogos}
          speed={72}
          gap={28}
          logoHeight={52}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--color-surface)"
          className="w-full"
          ariaLabel="Technology logo loop"
        />
      </div>
    </section>
  );
}
