'use client';

import { useMemo } from 'react';
import { Braces, Database, ServerCog, Wrench, BadgeCheck } from 'lucide-react';
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
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
  SiGit,
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

  return (
    <section
      id="skills"
      className="relative py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute top-0 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-(--color-accent)/10 blur-[100px]" />

      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-4xl">
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            TECHNICAL <span className="text-(--color-accent)">SKILLS</span>
          </h2>
          <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            My toolkit is focused on building scalable backend systems with polished frontend experiences,
            using technologies that are practical, reliable, and production-ready.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map(({ title, icon, skills }) => {
            const Icon = iconMap[icon] || Braces;
            return (
              <article
                key={title}
                className="rounded-3xl border border-(--color-border) bg-(--color-surface)/70 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-accent)/10">
                  <Icon className="h-5 w-5 text-(--color-accent)" />
                </div>
                <h3 className="mb-4 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-(--color-border) bg-transparent px-3.5 py-1.5 text-xs font-semibold text-(--color-muted)"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-(--color-border) bg-(--color-surface)/50 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-(--color-muted)">
            <Wrench className="h-4 w-4 text-(--color-accent)" />
            Engineering Workflow
          </div>
          <div className="flex flex-wrap gap-2.5">
            {workflowSkills.map((item) => (
              <span
                key={item}
                className="rounded-lg bg-(--color-accent)/10 px-3 py-1.5 text-sm font-medium text-white"
              >
                {item}
              </span>
            ))}
          </div>
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
