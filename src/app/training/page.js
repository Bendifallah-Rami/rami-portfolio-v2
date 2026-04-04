import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { trainingItems } from '../../data/training';

export const metadata = {
  title: 'Training Experience',
  description: 'Detailed overview of my training experiences and key outcomes.',
};

export default function TrainingPage() {
  return (
    <main className="relative min-h-screen bg-(--color-dark) [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />

      <div className="container mx-auto max-w-6xl px-6 py-14">
        <Link
          href="/#training"
          className="mb-8 inline-flex items-center gap-2 text-(--color-accent) transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12 max-w-3xl">
          <h1 className="m-0 mb-5 [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black leading-none tracking-[-0.03em] text-white">
            TRAINING <span className="text-(--color-accent)">EXPERIENCE</span>
          </h1>
          <p className="m-0 text-[1.02rem] leading-[1.8] text-(--color-muted)">
            A complete view of the training tracks that built my technical depth and delivery mindset.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {trainingItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/55"
            >
              <div className="relative h-55 w-full bg-black">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="p-5">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-(--color-border) bg-(--color-dark)/45 px-3 py-1.5 text-[0.76rem] text-(--color-muted)">
                  <Calendar size={12} className="text-(--color-accent)/75" />
                  {item.period}
                </div>

                <h2 className="m-0 mb-3 [font-family:var(--font-display)] text-xl font-bold leading-tight text-white">
                  {item.title}
                </h2>

                <p className="m-0 mb-4 text-sm leading-[1.75] text-(--color-muted)">
                  {item.description}
                </p>

                <div className="space-y-2">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                      <p className="m-0 text-sm leading-6 text-(--color-muted)">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
