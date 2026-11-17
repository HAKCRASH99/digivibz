import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Check, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { staggerContainer, staggerItem } from './Reveal';

/** Site footer — brand blurb, quick links, services, contact, newsletter. */
export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const socials = [
    { label: 'Twitter / X', icon: Twitter, href: '#twitter' },
    { label: 'Facebook', icon: Facebook, href: '#facebook' },
    { label: 'Instagram', icon: Instagram, href: '#instagram' },
    { label: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
  ];

  const linkClass =
    'inline-flex min-h-9 items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white group';

  return (
    <footer className="relative border-t border-[#18181B] bg-black pb-8 pt-12 text-slate-300 sm:pb-12 sm:pt-16">
      {/* Brand hairline — gives the black block a deliberate top edge on phones */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C61A1A] to-transparent opacity-70"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-[#27272A] pb-9 md:grid-cols-2 md:gap-10 lg:grid-cols-5 lg:pb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="col-span-2 space-y-4 lg:col-span-2">
            <Logo variant="dark" size="md" />
            <p className="max-w-sm text-[13px] leading-relaxed text-slate-400 sm:text-sm">
              DIGIVIBZ is an AI-powered digital growth agency helping businesses generate leads, increase sales, and scale revenue with data-driven systems.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#27272A] bg-[#18181B] text-slate-400 transition-all hover:-translate-y-0.5 hover:border-[#C61A1A] hover:bg-[#C61A1A] hover:text-white active:scale-95"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={staggerItem} className="space-y-1">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Quick Links</h4>
            <ul className="space-y-0.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Services', href: '/services' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    <span className="h-px w-0 bg-[#C61A1A] transition-all duration-300 group-hover:w-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem} className="space-y-1">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Services</h4>
            <ul className="space-y-0.5">
              {['SEO Services', 'Google Ads', 'Web Designing', 'Web Development', 'AI Automation'].map((service) => (
                <li key={service}>
                  <a href="/services" className={linkClass}>
                    <span className="h-px w-0 bg-[#C61A1A] transition-all duration-300 group-hover:w-2" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem} className="col-span-2 space-y-4 md:col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">Contact</h4>
            <ul className="space-y-1 text-[13px] text-slate-400">
              <li>
                <a href="mailto:info@digivibz.com" className={linkClass}>
                  <Mail className="h-4 w-4 shrink-0 text-[#C61A1A]" />
                  info@digivibz.com
                </a>
              </li>
              <li>
                <a href="tel:+18005553444" className={linkClass}>
                  <Phone className="h-4 w-4 shrink-0 text-[#C61A1A]" />
                  +1 (800) 555-DIGI
                </a>
              </li>
              <li className="flex min-h-9 items-center gap-1.5 text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-[#C61A1A]" />
                Location: Florida, USA
              </li>
            </ul>

            <div className="pt-1">
              <span className="mb-1 block text-[12px] font-semibold text-slate-200">
                Join our newsletter
              </span>
              <p className="mb-2.5 text-[11px] text-slate-500">
                We'll send you a letter every week.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 py-2 text-[13px] text-red-300"
                >
                  <Check className="h-4 w-4" /> Subscribed successfully!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="h-10 w-full min-w-0 rounded-lg border border-[#27272A] bg-[#18181B] px-3 text-[13px] text-white transition-colors placeholder:text-slate-500 focus:border-[#C61A1A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-10 shrink-0 rounded-lg bg-[#C61A1A] px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#9E1414] active:scale-95"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Legal bar */}
        <div className="mt-7 flex flex-col gap-5 text-[12px] text-slate-500 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="order-2 sm:order-1">© 2026 DIGIVIBZ. All Rights Reserved.</p>
          <div className="order-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 sm:order-2 sm:justify-end sm:gap-x-6 sm:gap-y-2">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Refund Policy', href: '/refund-policy' },
              { label: 'Marketing Disclaimer', href: '/marketing-disclaimer' },
              { label: 'Legal Notice', href: '/legal-notice' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-9 items-center rounded-md px-1.5 transition-colors hover:text-slate-200 sm:min-h-0 sm:px-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/"
              aria-label="Back to top"
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#27272A] bg-[#18181B] text-slate-400 transition-all hover:border-[#C61A1A] hover:bg-[#C61A1A] hover:text-white active:scale-95 sm:ml-0 sm:h-9 sm:w-9"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
