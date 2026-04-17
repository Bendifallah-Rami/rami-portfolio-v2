import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectsGallery from '../../components/sections/ProjectsGallery';

export const metadata = {
  title: 'All Projects',
  description: 'Explore all of my projects showcasing my full-stack development skills.',
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen [font-family:var(--font-body)]">
      <div className="pointer-events-none fixed top-0 right-0 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none fixed bottom-20 -left-20 h-96 w-96 rounded-full bg-(--color-accent)/5 blur-[120px]" />

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

        {/* Projects Gallery - Split View */}
        <ProjectsGallery />
      </div>
    </main>
  );
}
