import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { allProjects } from '../../data/projects';

export const metadata = {
  title: 'All Projects',
  description: 'Explore all of my projects showcasing my full-stack development skills.',
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black [font-family:var(--font-body)]">
      <div className="pointer-events-none fixed top-0 right-0 h-96 w-96 rounded-full bg-(--color-accent)/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 -left-32 h-80 w-80 rounded-full bg-(--color-accent)/5 blur-[100px]" />

      <div className="container mx-auto px-6 py-16 relative">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-(--color-accent) hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>

          <div className="max-w-2xl">
            <h1 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.03em] text-white">
              ALL <span className="text-(--color-accent)">PROJECTS</span>
            </h1>
            <p className="m-0 text-[1.05rem] leading-[1.8] text-(--color-muted)">
              A comprehensive showcase of my work across web development, full-stack applications,
              and modern architecture.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-(--color-border)/30 bg-(--color-surface)/20 overflow-hidden hover:border-(--color-accent)/50 hover:bg-(--color-surface)/40 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative w-full aspect-video bg-linear-to-br from-(--color-accent)/20 to-(--color-accent)/5 overflow-hidden">
                {project.imageUrl && project.imageUrl !== '/Card - Element-desktop.png' ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-(--color-accent) text-sm font-mono">IMAGE</span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-(--color-accent) transition-colors">
                  {project.title}
                </h3>
                <p className="text-(--color-muted) text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-(--color-accent)/20 text-(--color-accent) rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-(--color-border)/30 text-(--color-muted) rounded-full text-xs font-medium">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-accent) text-black text-sm font-bold hover:bg-(--color-accent)/90 transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                  {project.codeUrl !== '#' && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-(--color-accent) text-(--color-accent) text-sm font-bold hover:bg-(--color-accent)/10 transition-all"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
