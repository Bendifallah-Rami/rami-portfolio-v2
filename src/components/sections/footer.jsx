import { ArrowUpRight } from 'lucide-react';
import { footerContent } from '../../data/footer';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-(--color-border)/70 py-10 sm:py-14 [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-(--color-accent)/10 blur-[120px] sm:-top-20 sm:h-72 sm:w-72" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-3xl border border-(--color-border)/60 bg-(--color-surface)/45 p-5 sm:p-6 lg:col-span-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
              {footerContent.role}
            </p>
            <p className="m-0 mt-3 [font-family:var(--font-display)] text-[clamp(1.6rem,7.5vw,2.8rem)] font-black tracking-[-0.03em] text-white sm:text-[clamp(1.8rem,3.4vw,2.8rem)]">
              {footerContent.brand}
            </p>
            <p className="m-0 mt-4 max-w-[60ch] text-[0.95rem] leading-[1.8] text-(--color-muted)">
              {footerContent.tagline}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
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

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-2xl border border-(--color-border)/60 bg-(--color-surface)/45 p-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Navigate</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-col sm:gap-2">
                {footerContent.quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="-mx-2 rounded-md px-2 py-1 text-sm font-medium text-(--color-muted) transition-[background,color] duration-200 hover:bg-(--color-surface)/50 hover:text-white sm:mx-0 sm:px-0 sm:py-0 sm:hover:bg-transparent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-(--color-border)/60 bg-(--color-surface)/45 p-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Pages</p>
              <div className="flex flex-col gap-2">
                {footerContent.pageLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="-mx-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-(--color-muted) transition-[background,color] duration-200 hover:bg-(--color-surface)/50 hover:text-white sm:mx-0 sm:px-0 sm:py-0 sm:hover:bg-transparent"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-(--color-border)/60 bg-(--color-surface)/45 p-4 sm:col-span-2 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 lg:col-span-1">
              <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-accent)">Reach Me</p>
              <div className="space-y-2">
                {footerContent.contacts.map((item) => (
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="-mx-2 block rounded-md px-2 py-1 text-sm text-(--color-muted) transition-[background,color] duration-200 hover:bg-(--color-surface)/50 hover:text-white sm:mx-0 sm:px-0 sm:py-0 sm:hover:bg-transparent"
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

        <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-(--color-border)/70 pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
          <p className="m-0 text-center text-xs text-(--color-muted) sm:text-left">
            © {year} {footerContent.brand}. Crafted with intent in Algeria.
          </p>

          <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border) px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-muted) transition-all hover:border-(--color-accent)/70 hover:text-white sm:w-auto sm:py-1.5"
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
