'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { allProjects, getPrimaryProjectImage, getProjectImages } from '../../data/projects';

const clampIndex = (index, total) => {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
};

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

const getAspectRatio = (width, height, min = 0.68, max = 1.9) => {
  if (!width || !height) return null;
  const ratio = width / height;
  return Math.round(clampValue(ratio, min, max) * 1000) / 1000;
};

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState(allProjects[0]);
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [imageAspectRatios, setImageAspectRatios] = useState({});

  const selectedProjectImages = getProjectImages(selectedProject);
  const selectedProjectImageCount = selectedProjectImages.length || 1;
  const selectedProjectImageIndex = clampIndex(
    projectImageIndexes[selectedProject.id] ?? 0,
    selectedProjectImageCount
  );
  const selectedProjectImage =
    selectedProjectImages[selectedProjectImageIndex] ?? getPrimaryProjectImage(selectedProject);

  const selectedImageRatioKey = `${selectedProject.id}:${selectedProjectImage}`;
  const selectedImageAspectRatio = imageAspectRatios[selectedImageRatioKey] ?? 1.6;

  const saveAspectRatio = (key, width, height, min = 0.68, max = 1.9) => {
    const ratio = getAspectRatio(width, height, min, max);
    if (!ratio) return;

    setImageAspectRatios((prev) => {
      if (prev[key] === ratio) return prev;
      return {
        ...prev,
        [key]: ratio,
      };
    });
  };

  const setSelectedImageIndex = (projectId, nextIndex, total) => {
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projectId]: clampIndex(nextIndex, total),
    }));
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    setProjectImageIndexes((prev) => {
      if (typeof prev[project.id] === 'number') return prev;
      return { ...prev, [project.id]: 0 };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.85fr)_minmax(460px,1.15fr)] gap-12 lg:gap-16 items-start">
      {/* Right Panel - Project Details */}
      <div className="order-1 lg:order-2 space-y-5">
        {/* Project Image - Large */}
        <div
          className="relative w-full min-h-72 sm:min-h-80 lg:min-h-105 rounded-3xl overflow-hidden border-2 border-(--color-accent)/40 bg-linear-to-br from-(--color-accent)/15 to-(--color-accent)/5 shadow-[0_20px_60px_rgba(189,250,92,0.15)]"
          style={{ aspectRatio: selectedImageAspectRatio }}
        >
          {selectedProjectImage ? (
            <>
              <Image
                src={selectedProjectImage}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 56vw, 720px"
                className="object-contain transition-transform duration-500 hover:scale-105"
                onLoad={(event) =>
                  saveAspectRatio(
                    selectedImageRatioKey,
                    event.currentTarget.naturalWidth,
                    event.currentTarget.naturalHeight
                  )
                }
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

              {selectedProjectImages.length > 1 && (
                <>
                  <span className="absolute left-4 top-4 rounded-md border border-(--color-border)/80 bg-(--color-surface)/88 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                    {selectedProjectImageIndex + 1} / {selectedProjectImageCount}
                  </span>

                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImageIndex(
                          selectedProject.id,
                          selectedProjectImageIndex - 1,
                          selectedProjectImageCount
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/92 text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-px hover:border-(--color-accent)/65 hover:bg-(--color-accent)/15 hover:text-white"
                      aria-label={`Previous image for ${selectedProject.title}`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImageIndex(
                          selectedProject.id,
                          selectedProjectImageIndex + 1,
                          selectedProjectImageCount
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/92 text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-px hover:border-(--color-accent)/65 hover:bg-(--color-accent)/15 hover:text-white"
                      aria-label={`Next image for ${selectedProject.title}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-(--color-muted) text-lg">
              No Image Available
            </div>
          )}
        </div>

        {selectedProjectImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-(--color-border)/30 bg-(--color-surface)/30 p-2">
            {selectedProjectImages.map((imageSrc, imageIndex) => (
              <button
                key={`${selectedProject.id}-${imageSrc}-${imageIndex}`}
                type="button"
                onClick={() =>
                  setSelectedImageIndex(selectedProject.id, imageIndex, selectedProjectImageCount)
                }
                className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                  imageIndex === selectedProjectImageIndex
                    ? 'border-(--color-accent)/70'
                    : 'border-(--color-border)/40 hover:border-(--color-accent)/40'
                }`}
                aria-label={`Show image ${imageIndex + 1} for ${selectedProject.title}`}
              >
                <Image
                  src={imageSrc}
                  alt={`${selectedProject.title} thumbnail ${imageIndex + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

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
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-(--color-accent) mt-1 shrink-0" />
                      <span className="text-sm leading-normal text-(--color-muted)">
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
      <div className="order-2 lg:order-1 relative lg:sticky lg:top-24">
        <h3 className="text-xs font-black uppercase tracking-[0.15em] text-(--color-accent) mb-6">
          All Projects ({allProjects.length})
        </h3>
        <div className="projects-grid-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-none overflow-visible lg:max-h-255 lg:overflow-y-auto [-webkit-scrollbar-width:none] [scrollbar-width:none] [-ms-overflow-style:none]">
          <style>{`
            .projects-grid-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {allProjects.map((project) => {
            const projectImages = getProjectImages(project);
            const primaryProjectImage = getPrimaryProjectImage(project);
            const projectCardRatioKey = `${project.id}:${primaryProjectImage}`;
            const projectCardAspectRatio = imageAspectRatios[projectCardRatioKey] ?? 1.6;

            return (
            <button
              key={project.id}
              onClick={() => selectProject(project)}
              className={`group relative rounded-xl overflow-hidden border-2 min-h-40 lg:min-h-52 transition-all duration-300 ${
                selectedProject.id === project.id
                  ? 'border-(--color-accent) shadow-[0_0_20px_rgba(189,250,92,0.3)] scale-100'
                  : 'border-(--color-border)/30 hover:border-(--color-border)/60 hover:scale-105'
              }`}
              style={{ aspectRatio: projectCardAspectRatio }}
              title={project.title}
            >
              {/* Thumbnail Image */}
              {primaryProjectImage ? (
                <Image
                  src={primaryProjectImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 360px"
                  className="bg-black/30 p-1 object-contain group-hover:scale-105 transition-transform duration-500"
                  onLoad={(event) =>
                    saveAspectRatio(
                      projectCardRatioKey,
                      event.currentTarget.naturalWidth,
                      event.currentTarget.naturalHeight,
                      0.7,
                      1.9
                    )
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-(--color-muted) text-xs bg-(--color-surface)/30">
                  No Image
                </div>
              )}
              
              {/* Overlay with Title */}
              <div className={`absolute inset-0 transition-all duration-300 flex items-end justify-start p-3 ${
                selectedProject.id === project.id
                  ? 'bg-(--color-surface)/72'
                  : 'bg-(--color-surface)/0 group-hover:bg-(--color-surface)/60'
              }`}>
                <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {project.title}
                </p>
              </div>

              {projectImages.length > 1 && (
                <span className="absolute right-2 top-2 rounded-md border border-(--color-border)/80 bg-(--color-surface)/88 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_4px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                  {projectImages.length}
                </span>
              )}
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
