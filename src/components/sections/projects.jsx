'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import CardSwap, { Card } from '../ui/CardSwap';
import { allProjects, getPrimaryProjectImage, getProjectImages } from '../../data/projects';

export default function Projects() {
  const firstThreeProjects = useMemo(() => allProjects.slice(0, 3), []);
  const [desktopFrontCardIndex, setDesktopFrontCardIndex] = useState(0);
  const activeDesktopProject = firstThreeProjects[desktopFrontCardIndex] ?? firstThreeProjects[0];

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-20 -left-20 h-96 w-96 rounded-full bg-(--color-accent)/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="mb-16 max-w-2xl">
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            FEATURED <span className="text-(--color-accent)">PROJECTS</span>
          </h2>
          <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            A selection of my recent work showcasing full-stack development,
            modern architecture, and user-focused design.
          </p>
        </div>

        <div className="mb-14 hidden grid-cols-12 items-center gap-10 lg:grid">
          <div className="lg:col-span-5">
            <p className="mb-6 text-sm text-(--color-muted)">
              Click any card to bring it to the front.
            </p>

            {activeDesktopProject && (
              <div className="rounded-2xl border border-(--color-border)/40 bg-(--color-surface)/30 p-6 lg:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
                  Now Showing
                </p>
                <h3 className="mt-2 text-3xl font-black text-white [font-family:var(--font-display)]">
                  {activeDesktopProject.title}
                </h3>
                <p className="mt-3 max-w-[62ch] text-(--color-muted)">
                  {activeDesktopProject.detailedDescription ?? activeDesktopProject.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeDesktopProject.tech.map(tech => (
                    <span
                      key={tech}
                      className="rounded-full bg-(--color-accent)/20 px-3 py-1 text-sm text-(--color-accent)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {activeDesktopProject.demoUrl !== '#' && (
                    <a
                      href={activeDesktopProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-(--color-accent) px-5 py-3 font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {activeDesktopProject.codeUrl !== '#' && (
                    <a
                      href={activeDesktopProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-(--color-accent) px-5 py-3 font-semibold text-(--color-accent) transition-colors hover:bg-(--color-accent)/10"
                    >
                      <Github className="h-4 w-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative min-h-120 lg:col-span-7">
            <CardSwap
              width={700}
              height={540}
              cardDistance={170}
              verticalDistance={100}
              delay={6500}
              pauseOnHover
              skewAmount={3}
              onCardClick={setDesktopFrontCardIndex}
              onOrderChange={setDesktopFrontCardIndex}
              containerClassName="absolute right-0 top-1/2 translate-x-[10%] -translate-y-1/2 perspective-[1500px] overflow-visible"
            >
              {firstThreeProjects.map((project) => {
                const projectImages = getProjectImages(project);
                const primaryProjectImage = getPrimaryProjectImage(project);

                return (
                <Card key={project.id} customClass="cursor-pointer overflow-hidden shadow-2xl">
                  <div className="h-full w-full rounded-2xl border border-(--color-border)/40 bg-(--color-surface)/92 overflow-hidden">
                    <div className="relative h-4/5 w-full overflow-hidden bg-(--color-surface)/40">
                      {primaryProjectImage && primaryProjectImage !== '/Card - Element-desktop.png' ? (
                        <Image
                          src={primaryProjectImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-(--color-accent) text-xs font-mono">IMAGE</span>
                        </div>
                      )}

                      {projectImages.length > 1 && (
                        <span className="absolute left-3 top-3 rounded-md border border-(--color-border)/80 bg-(--color-surface)/88 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white  shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                          {projectImages.length} Photos
                        </span>
                      )}
                    </div>

                    <div className="flex h-1/5 flex-col justify-between p-3">
                      <div>
                        <h3 className="text-xl font-bold text-white line-clamp-1">{project.title}</h3>
                        <p className="mt-2 text-sm text-(--color-muted) line-clamp-2">{project.description}</p>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="rounded-full bg-(--color-accent)/20 px-2.5 py-1 text-xs text-(--color-accent)"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>

        <div className="mb-5 text-sm text-(--color-muted) lg:hidden">
          Swipe to preview featured projects.
        </div>

        <div className="-mx-6 mb-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:hidden">
          {firstThreeProjects.map((project) => {
            const projectImages = getProjectImages(project);
            const primaryProjectImage = getPrimaryProjectImage(project);

            return (
            <article
              key={project.id}
              className="group relative w-[84%] shrink-0 snap-center rounded-2xl border border-(--color-border)/40 bg-(--color-surface)/30 text-left transition-all duration-300 sm:w-[68%]"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-black">
                {primaryProjectImage && primaryProjectImage !== '/Card - Element-desktop.png' ? (
                  <Image
                    src={primaryProjectImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 84vw, 68vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-(--color-accent) text-xs font-mono">IMAGE</span>
                  </div>
                )}

                {projectImages.length > 1 && (
                  <span className="absolute left-3 top-3 rounded-md border border-(--color-border)/80 bg-(--color-surface)/88 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                    {projectImages.length} Photos
                  </span>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/80 to-transparent" />
              </div>

              <div className="space-y-2 p-4">
                <h3 className="text-base font-semibold text-white line-clamp-1">{project.title}</h3>
                <p className="text-sm text-(--color-muted) line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 2).map(tech => (
                    <span
                      key={tech}
                      className="rounded-full bg-(--color-accent)/20 px-2.5 py-1 text-xs text-(--color-accent)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        <div className="mb-10 lg:hidden" />

        <div className="flex justify-center">
          <Button
            href="/projects"
            className="inline-flex items-center gap-2 text-sm"
            style={{
              fontFamily: 'var(--font-display)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-ink)',
            }}
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
