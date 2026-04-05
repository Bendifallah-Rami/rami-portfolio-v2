import { ArrowUpRight, Github, Mail, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import { contactContent } from '../../data/contact';

const channelIcons = {
  email: Mail,
  github: Github,
  location: MapPin,
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute top-4 right-0 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <div className="mb-14 max-w-4xl">
          <p className="m-0 mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
            {contactContent.kicker}
          </p>
          <h2 className="m-0 mb-6 leading-none [font-family:var(--font-display)] text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-white">
            {contactContent.title} <span className="text-(--color-accent)">{contactContent.highlight}</span>
          </h2>
          <p className="m-0 max-w-[64ch] text-[1.05rem] leading-[1.8] text-(--color-muted)">
            {contactContent.description}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-3xl border border-(--color-border) bg-(--color-surface)/60 p-7 backdrop-blur-sm">
            <p className="m-0 rounded-xl border border-(--color-border) bg-(--color-dark)/50 px-4 py-3 text-[0.95rem] leading-[1.7] text-(--color-muted)">
              {contactContent.availability}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {contactContent.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-(--color-border) bg-(--color-dark)/55 p-4"
                >
                  <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-(--color-muted)">
                    {item.label}
                  </p>
                  <p className="mt-2 m-0 [font-family:var(--font-display)] text-[1rem] font-bold tracking-[-0.01em] text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {contactContent.process.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-(--color-border)/80 bg-(--color-surface)/40 p-4"
                >
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
                    Step {step.step}
                  </p>
                  <p className="m-0 mt-2 text-sm font-semibold text-white">{step.title}</p>
                  <p className="m-0 mt-2 text-[0.85rem] leading-[1.7] text-(--color-muted)">{step.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={contactContent.primaryCta.href}
                className="inline-flex items-center gap-2 text-sm"
                style={{
                  fontFamily: 'var(--font-display)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-dark)',
                }}
              >
                {contactContent.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <a
                href={contactContent.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm text-(--color-muted) transition-colors hover:border-(--color-accent)/70 hover:text-white"
              >
                {contactContent.secondaryCta.label}
              </a>
            </div>
          </article>

          <article className="rounded-3xl border border-(--color-border) bg-(--color-surface)/40 p-7 backdrop-blur-sm">
            <p className="m-0 mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">
              Direct Channels
            </p>

            <div className="space-y-3">
              {contactContent.channels.map((channel) => {
                const Icon = channelIcons[channel.id] || Mail;
                const isLink = Boolean(channel.href);
                const isExternal = channel.href.startsWith('http');

                const content = (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-accent)/15 text-(--color-accent)">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-(--color-muted)">{channel.label}</span>
                      <span className="block truncate text-[0.95rem] font-semibold text-white">{channel.value}</span>
                    </span>
                  </>
                );

                if (!isLink) {
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center gap-3 rounded-2xl border border-(--color-border)/70 bg-(--color-dark)/45 px-4 py-3"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 rounded-2xl border border-(--color-border)/70 bg-(--color-dark)/45 px-4 py-3 transition-all duration-300 hover:border-(--color-accent)/60 hover:bg-(--color-surface)/55"
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <p className="m-0 mt-6 rounded-xl border border-(--color-border)/70 bg-(--color-dark)/40 px-4 py-3 text-[0.85rem] leading-[1.7] text-(--color-muted)">
              {contactContent.note}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
