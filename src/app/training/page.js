import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TrainingCardsGrid from '../../components/sections/TrainingCardsGrid';
import { trainingItems } from '../../data/training';
import { pagesMeta, seoMetadata } from '../../data/seo';

export const metadata = {
  title: pagesMeta['/training'].title,
  description: pagesMeta['/training'].description,
  openGraph: {
    title: pagesMeta['/training'].title,
    description: pagesMeta['/training'].description,
    images: [seoMetadata.image],
  },
};

export default function TrainingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--color-dark) [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />

      <div className="container mx-auto max-w-6xl px-6 py-24">
        <Link
          href="/#training"
          className="mb-8 inline-flex items-center gap-2 text-(--color-accent) transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-14 max-w-4xl">
          <h1 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            TRAINING <span className="text-(--color-accent)">EXPERIENCE</span>
          </h1>
          <p className="m-0 max-w-[58ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            A complete view of the training tracks that built my technical depth and delivery mindset.
          </p>
        </div>

        <TrainingCardsGrid items={trainingItems} />
      </div>
    </main>
  );
}
