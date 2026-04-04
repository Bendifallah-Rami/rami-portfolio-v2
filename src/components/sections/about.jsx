'use client';

import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import { User, Code2, Terminal, Sparkles, Coffee, Globe } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-5 bg-transparent [font-family:var(--font-body)]"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-(--color-accent)/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[100px]" />

      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.03em] text-white">
            A LITTLE BIT <br />
            <span className="text-(--color-accent)">ABOUT <span className=''> ME</span></span>
          </h2>
          <p className="m-0 max-w-[42ch] leading-[1.8] [font-family:var(--font-body)] text-[clamp(1rem,1.4vw,1.25rem)] text-(--color-muted)">
            I blend technical expertise with a passion for problem-solving to build 
            digital experiences that make an impact.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={80}
          itemScale={0.03}
          itemStackDistance={30}
          baseScale={0.9}
          blurAmount={2}
          rotationAmount={-0.5}
        >
          {/* Card 1: Intro */}
          <ScrollStackItem>
            <div className="flex h-full flex-col [font-family:var(--font-body)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10">
                <User className="h-6 w-6 text-(--color-accent)" />
              </div>
              <h3 className="mb-4 flex items-center gap-3 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                Computer Science Student <Sparkles className="h-6 w-6 text-(--color-accent)" />
              </h3>
              <p className="mb-6 [font-family:var(--font-body)] text-lg leading-relaxed text-(--color-muted)">
                Hello! I&apos;m <span className="text-white font-semibold">Rami</span>, a computer science student at 
                <span className="text-(--color-accent)"> ESI Algiers</span>. I&apos;m a passionate full-stack developer 
                with a love for creating elegant, efficient solutions to complex problems.
              </p>
              <div className="mt-auto flex gap-3">
                <span className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-1.5 text-xs font-medium text-(--color-muted)">ESI Algiers</span>
                <span className="rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-1.5 text-xs font-medium text-(--color-muted)">Problem Solver</span>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 2: Focus */}
          <ScrollStackItem>
            <div className="flex h-full flex-col [font-family:var(--font-body)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10">
                <Terminal className="h-6 w-6 text-(--color-accent)" />
              </div>
              <h3 className="mb-4 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                Scalable Backend <span className="text-(--color-accent)">&</span> Robust Systems
              </h3>
              <p className="mb-6 [font-family:var(--font-body)] text-lg leading-relaxed text-(--color-muted)">
                I specialize in <span className="text-white font-semibold">backend development</span> while maintaining strong 
                frontend skills. I focus on building scalable APIs, robust databases, and functional frontends 
                using modern technologies. My goal is to create applications that are performant and 
                provide exceptional user experiences.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-auto">
                {['Node.js', 'PostgreSQL', 'Next.js', 'REST APIs'].map((skill) => (
                  <div key={skill} className="flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface) px-3 py-2 text-xs font-semibold text-white/80">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3: Beyond coding */}
          <ScrollStackItem>
            <div className="flex h-full flex-col [font-family:var(--font-body)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-accent)/10">
                <Globe className="h-6 w-6 text-(--color-accent)" />
              </div>
              <h3 className="mb-4 [font-family:var(--font-display)] text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                Beyond <span className="text-(--color-accent) underline decoration-2 underline-offset-8">the Code</span>
              </h3>
              <p className="mb-6 [font-family:var(--font-body)] text-lg leading-relaxed text-(--color-muted)">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                open source projects, or staying updated with the latest development trends and best practices. 
                I believe in <span className="text-white font-semibold">continuous learning</span> and 
                sharing knowledge with the community.
              </p>
              <div className="flex flex-wrap gap-6 mt-auto">
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-(--color-accent)" />
                  <span className="text-sm italic text-(--color-muted)">Life-long learner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code2 className="h-5 w-5 text-(--color-accent)" />
                  <span className="text-sm italic text-(--color-muted)">Open Source advocate</span>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}
