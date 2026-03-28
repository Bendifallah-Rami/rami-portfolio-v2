'use client';

import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import { User, Code2, Terminal, Sparkles, Coffee, Globe } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden font-body">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <h2 className="m-0 leading-none mb-6" 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 900, 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              letterSpacing: '-0.03em',
              color: 'var(--color-white)'
            }}>
            A LITTLE BIT <br />
            <span className="text-secondary italic">ABOUT ME</span>
          </h2>
          <p className="m-0 leading-[1.8] max-w-[42ch]"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              color: 'var(--color-muted)'
            }}>
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
            <div className="flex flex-col h-full font-body">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <User className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display flex items-center gap-3"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                Computer Science Student <Sparkles className="text-secondary w-6 h-6" />
              </h3>
              <p className="text-lg text-muted leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Hello! I&apos;m <span className="text-white font-semibold">Rami</span>, a computer science student at 
                <span className="text-secondary"> ESI Algiers</span>. I&apos;m a passionate full-stack developer 
                with a love for creating elegant, efficient solutions to complex problems.
              </p>
              <div className="mt-auto flex gap-3">
                <span className="px-4 py-1.5 bg-surface border border-border rounded-full text-xs text-muted font-medium">ESI Algiers</span>
                <span className="px-4 py-1.5 bg-surface border border-border rounded-full text-xs text-muted font-medium">Problem Solver</span>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 2: Focus */}
          <ScrollStackItem>
            <div className="flex flex-col h-full font-body">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Terminal className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                Scalable Backend <span className="text-secondary">&</span> Robust Systems
              </h3>
              <p className="text-lg text-muted leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                I specialize in <span className="text-white font-semibold">backend development</span> while maintaining strong 
                frontend skills. I focus on building scalable APIs, robust databases, and functional frontends 
                using modern technologies. My goal is to create applications that are performant and 
                provide exceptional user experiences.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-auto">
                {['Node.js', 'PostgreSQL', 'Next.js', 'REST APIs'].map((skill) => (
                  <div key={skill} className="py-2 px-3 bg-surface border border-border rounded-xl flex items-center justify-center text-xs font-semibold text-white/80">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3: Beyond coding */}
          <ScrollStackItem>
            <div className="flex flex-col h-full font-body">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                Beyond <span className="text-secondary underline decoration-2 underline-offset-8">the Code</span>
              </h3>
              <p className="text-lg text-muted leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                open source projects, or staying updated with the latest development trends and best practices. 
                I believe in <span className="text-white font-semibold">continuous learning</span> and 
                sharing knowledge with the community.
              </p>
              <div className="flex flex-wrap gap-6 mt-auto">
                <div className="flex items-center gap-3">
                  <Coffee className="text-secondary w-5 h-5" />
                  <span className="text-muted italic text-sm">Life-long learner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code2 className="text-secondary w-5 h-5" />
                  <span className="text-muted italic text-sm">Open Source advocate</span>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}
