'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { allProjects } from '../../data/projects';

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState(allProjects[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(350px,500px)] gap-12 lg:gap-16 items-start">
      {/* Right Panel - Project Details (First on Desktop) */}
      <div className="order-2 lg:order-2 space-y-5">
        {/* Project Image - Large */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-(--color-accent)/40 bg-linear-to-br from-(--color-accent)/15 to-(--color-accent)/5 shadow-[0_20px_60px_rgba(189,250,92,0.15)]">
          {selectedProject.imageUrl ? (
            <>
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-(--color-muted) text-lg">
              No Image Available
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="space-y-5">
          {/* Title & Description */}
          <div className="space-y-3">
            <h2 className="m-0 text-5xl font-black text-white [font-family:var(--font-display)] tracking-[-0.03em]">
              {selectedProject.title}
            </h2>
            <p className="m-0 text-xl leading-[1.7] text-(--color-muted)">
              {selectedProject.description}
            </p>
          </div>

          {/* Overview */}
          {selectedProject.detailedDescription && (
            <div className="space-y-3 border-t border-(--color-border)/20 pt-5">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-(--color-accent) rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-(--color-accent)">
                  About This Project
                </h3>
              </div>
              <p className="text-base leading-[1.8] text-(--color-muted)">
                {selectedProject.detailedDescription}
              </p>
            </div>
          )}

          {/* Features */}
          {selectedProject.features && selectedProject.features.length > 0 && (
            <div className="space-y-3 border-t border-(--color-border)/20 pt-5">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-(--color-accent) rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-(--color-accent)">
                  Key Features
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.features.map((feature, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-(--color-surface)/40 border border-(--color-border)/20 hover:border-(--color-accent)/40 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(189,250,92,0.1)]">
                    <div className="flex items-start gap-2.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-(--color-accent) mt-1 flex-shrink-0" />
                      <span className="text-sm leading-[1.5] text-(--color-muted)">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          {selectedProject.tech && selectedProject.tech.length > 0 && (
            <div className="space-y-3 border-t border-(--color-border)/20 pt-5">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-(--color-accent) rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-(--color-accent)">
                  Technology Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-(--color-accent)/15 border border-(--color-accent)/50 text-(--color-accent) transition-all duration-200 hover:bg-(--color-accent)/25 hover:border-(--color-accent)/70 hover:shadow-[0_4px_12px_rgba(189,250,92,0.15)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-5 border-t border-(--color-border)/20">
            {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--color-accent) text-white font-bold text-base transition-all duration-300 hover:shadow-[0_12px_32px_rgba(189,250,92,0.4)] hover:bg-(--color-accent)/95 active:scale-95 [font-family:var(--font-display)] group"
              >
                <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                Visit Live
              </a>
            )}
            {selectedProject.codeUrl && selectedProject.codeUrl !== '#' && (
              <a
                href={selectedProject.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--color-accent)/10 border-1.5 border-(--color-accent)/60 text-(--color-accent) font-bold text-base transition-all duration-300 hover:bg-(--color-accent)/20 hover:border-(--color-accent) hover:shadow-[0_8px_20px_rgba(189,250,92,0.2)] active:scale-95 [font-family:var(--font-display)] group"
              >
                <Github className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Left Panel - Project Grid */}
      <div className="order-1 lg:order-1 sticky top-24">
        <h3 className="text-xs font-black uppercase tracking-[0.15em] text-(--color-accent) mb-6">
          All Projects ({allProjects.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 max-h-[900px] overflow-y-auto [-webkit-scrollbar-width:none] [scrollbar-width:none] [-ms-overflow-style:none]">
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {allProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-xl overflow-hidden border-2 aspect-square transition-all duration-300 ${
                selectedProject.id === project.id
                  ? 'border-(--color-accent) shadow-[0_0_20px_rgba(189,250,92,0.3)] scale-100'
                  : 'border-(--color-border)/30 hover:border-(--color-border)/60 hover:scale-105'
              }`}
              title={project.title}
            >
              {/* Thumbnail Image */}
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-(--color-muted) text-xs bg-(--color-surface)/30">
                  No Image
                </div>
              )}
              
              {/* Overlay with Title */}
              <div className={`absolute inset-0 transition-all duration-300 flex items-end justify-start p-3 ${
                selectedProject.id === project.id
                  ? 'bg-black/70'
                  : 'bg-black/0 group-hover:bg-black/50'
              }`}>
                <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {project.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
