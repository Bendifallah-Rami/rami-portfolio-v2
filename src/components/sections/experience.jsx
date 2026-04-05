import { experienceStats } from '../../data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 [font-family:var(--font-body)]"
    >
      <div className="pointer-events-none absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[110px]" />

      <div className="container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-(--color-accent)">
            Experience In Numbers
          </p>
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5.4vw,4.6rem)] font-black tracking-[-0.03em] text-white">
            STATS <span className="text-(--color-accent)">PROVES A LOT!</span>
          </h2>
          <p className="m-0 text-[1.02rem] leading-[1.8] text-(--color-muted)">
            Behind every great website, there are powerful stats that prove its success.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experienceStats.map((item) => (
            <article
              key={item.label}
              className="group relative overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)/65 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--color-accent)/55"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-(--color-accent)/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-3 h-1.5 w-12 rounded-full bg-(--color-accent)/70" />
                <p className="m-0 [font-family:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-none text-white">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-medium text-(--color-muted)">{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
