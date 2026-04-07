import { ArrowUpRight } from 'lucide-react';
import { footerContent } from '../../data/footer';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-(--color-border)/70 py-14 [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-(--color-accent)/10 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
              {footerContent.role}
            </p>
            <p className="m-0 mt-3 [font-family:var(--font-display)] text-[clamp(1.8rem,3.4vw,2.8rem)] font-black tracking-[-0.03em] text-white">
              {footerContent.brand}
            </p>
            <p className="m-0 mt-4 max-w-[60ch] text-[0.95rem] leading-[1.8] text-(--color-muted)">
              {footerContent.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {footerContent.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-(--color-border) bg-(--color-surface)/45 px-3 py-1 text-xs text-(--color-muted)"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Navigate</p>
              <div className="flex flex-col gap-2">
                {footerContent.quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-(--color-muted) transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Pages</p>
              <div className="flex flex-col gap-2">
                {footerContent.pageLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Reach Me</p>
              <div className="space-y-2">
                {footerContent.contacts.map((item) => (
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-sm text-(--color-muted) transition-colors hover:text-white"
                    >
                      <span className="text-white/80">{item.label}:</span> {item.value}
                    </a>
                  ) : (
                    <p key={item.label} className="m-0 text-sm text-(--color-muted)">
                      <span className="text-white/80">{item.label}:</span> {item.value}
                    </p>
                  )
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {footerContent.socialLinks.map((social) => {
                  const isExternal = social.href.startsWith('http');
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-muted) transition-all hover:border-(--color-accent)/70 hover:text-white"
                    >
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-(--color-border)/70 pt-6 sm:flex-row sm:items-center">
          <p className="m-0 text-xs text-(--color-muted)">
            © {year} {footerContent.brand}. Crafted with intent in Algeria.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-muted) transition-all hover:border-(--color-accent)/70 hover:text-white"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
