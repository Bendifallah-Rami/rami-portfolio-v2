import { ArrowUpRight, Mail, Linkedin, Instagram, Github } from 'lucide-react';
import Button from '../ui/Button';
import { contactContent } from '../../data/contact';
import { socialLinks } from '../../data/navitems';

const socialIconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Email: Mail,
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 [font-family:var(--font-body)]">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-(--color-accent)/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-(--color-accent)/8 blur-[140px]" />

      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* CTA Banner Section */}
        <div className="relative rounded-3xl border border-(--color-border) bg-gradient-to-br from-(--color-surface)/60 via-(--color-surface)/40 to-(--color-surface)/20 p-12 backdrop-blur-md overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-(--color-accent)/5 to-transparent pointer-events-none" />
          
          <div className="relative">
            {/* Headline */}
            <div className="mb-8 max-w-3xl">
              <h3 className="text-[clamp(1.8rem,4vw,3rem)] [font-family:var(--font-display)] font-black tracking-[-0.03em] text-white leading-tight mb-3">
                Have an Awesome Project Idea?{' '}
                <span className="text-(--color-accent)">Let&apos;s Discuss</span>
              </h3>
              <p className="text-[1rem] leading-[1.6] text-(--color-muted) max-w-[50ch]">
                Ready to bring your vision to life? Reach out and let&apos;s explore what we can build together.
              </p>
            </div>

            {/* CTA Button & Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Button
                href={contactContent.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-dark)',
                }}
              >
                <Mail className="h-4 w-4" />
                <span>Send Me an Email</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              {/* Social Links */}
              <div className="flex items-center gap-1">
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-(--color-muted) mr-3">
                  Connect
                </span>
                <div className="flex gap-2">
                  {socialLinks.map((social) => {
                    const Icon = socialIconMap[social.label] || Mail;
                    const isExternal = social.href.startsWith('http');
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="group flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)/50 text-(--color-muted) transition-all duration-300 hover:border-(--color-accent)/60 hover:bg-(--color-accent) hover:text-white hover:shadow-[0_8px_20px_rgba(189,250,92,0.15)]"
                        aria-label={social.label}
                        title={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
