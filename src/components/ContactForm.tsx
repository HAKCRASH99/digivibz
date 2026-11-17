import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle,
  Globe,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldAlert,
  User,
} from 'lucide-react';
import { SERVICE_OPTIONS } from '../data/contactContent';
import { submitContact } from '../lib/api';

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  company: string; // honeypot — hidden from real users
}

const EMPTY: FormState = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  website: '',
  description: '',
  company: '',
};

const fieldClass =
  'w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-[#C61A1A] transition-all placeholder:text-slate-400';

const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

/** Lettered rule that keeps the docket form organised in three sections. */
const SectionHead: React.FC<{ letter: string; title: string; hint?: string }> = ({
  letter,
  title,
  hint,
}) => (
  <div className="flex items-center gap-2">
    <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#C61A1A] text-[8px] font-extrabold text-white">
      {letter}
    </span>
    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
      {title}
    </span>
    <span className="h-px flex-1 bg-slate-100" />
    {hint && (
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-slate-300">
        {hint}
      </span>
    )}
  </div>
);

/**
 * The contact brief ("Get Your Personalized Growth Audit"), framed as an intake
 * docket. Submits to the Express API → MongoDB Atlas; the admin panel reads it
 * back. The readiness meter tracks the six fields that make a brief complete.
 */
export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [services, setServices] = useState<string[]>(['Full 5D AI Revenue System']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (service: string) =>
    setServices((list) => (list.includes(service) ? list.filter((s) => s !== service) : [...list, service]));

  const briefChecks = [
    form.fullName.trim().length > 0,
    form.businessName.trim().length > 0,
    form.email.trim().length > 0,
    form.phone.trim().length > 0,
    services.length > 0,
    form.description.trim().length > 0,
  ];
  const briefDone = briefChecks.filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    if (services.length === 0) {
      setError('Please choose at least one service you are interested in.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitContact({
      fullName: form.fullName,
      businessName: form.businessName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      services,
      description: form.description,
      source: 'contact-page',
      company: form.company,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#E7DCC6] bg-white shadow-[0_2px_0_rgba(15,23,42,0.04)]">
      {/* binder rail */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#C61A1A]" />

      {/* docket header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE6D2] bg-[#F8F1E2] px-5 py-2.5 sm:px-6">
        <span className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
          Intake form · IN-01
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-2.5 py-1 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
          <CheckCircle className="h-3 w-3" /> Free · no obligation
        </span>
      </div>

      {/* notebook margin rule */}
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-2 top-16 w-px bg-red-100" />

      <div className="p-5 sm:p-7">
        {/* brief readiness */}
        <div className="mb-5 flex items-center gap-3">
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Brief readiness
          </span>
          <div className="flex flex-1 items-center gap-1.5" role="img" aria-label={`Brief ${briefDone} of 6 fields complete`}>
            {briefChecks.map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full border transition-colors duration-500 ${
                  i < briefDone ? 'border-[#C61A1A] bg-[#C61A1A]' : 'border-slate-300 bg-white'
                }`}
              />
            ))}
          </div>
          <span className="shrink-0 font-mono text-[10px] font-extrabold tabular-nums text-slate-500">
            {briefDone}/6
          </span>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="py-10 text-center space-y-4"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-200 bg-red-50 text-[#C61A1A]">
                <CheckCircle className="h-9 w-9" />
              </div>
              <div className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C61A1A]">
                IN-01 · Filed · Awaiting strategy review
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">Your Growth Audit Is Requested!</h4>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. A senior
                growth strategist will review{' '}
                <span className="font-semibold text-slate-900">{form.website || form.businessName}</span>{' '}
                and reach out within <span className="font-semibold text-slate-900">24–48 hours</span> at{' '}
                <span className="font-semibold text-slate-900">{form.email}</span>.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-[#C61A1A]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C61A1A]" />
                {services.length} service{services.length === 1 ? '' : 's'} queued for review
              </div>
              <div>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setServices(['Full 5D AI Revenue System']);
                    setIsSubmitted(false);
                  }}
                  className="cursor-pointer px-5 py-2 text-xs font-semibold text-[#C61A1A] hover:underline"
                >
                  Submit another request
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* A — identity */}
              <SectionHead letter="A" title="Who you are" hint="Required" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={labelClass}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="cf-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={set('fullName')}
                      placeholder="e.g. Alex Henderson"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-business" className={labelClass}>
                    Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="cf-business"
                      type="text"
                      required
                      autoComplete="organization"
                      value={form.businessName}
                      onChange={set('businessName')}
                      placeholder="e.g. Henderson Dental Group"
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>

              {/* B — contact */}
              <div className="pt-1">
                <SectionHead letter="B" title="How we reach you" hint="Required" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-email" className={labelClass}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="cf-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="alex@hendersondental.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-phone" className={labelClass}>
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="cf-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+1 (555) 234-5678"
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>

              {/* C — the objective */}
              <div className="pt-1">
                <SectionHead letter="C" title="The objective" hint="Be specific" />
              </div>

              <div>
                <label htmlFor="cf-website" className={labelClass}>
                  Website (optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="cf-website"
                    type="text"
                    value={form.website}
                    onChange={set('website')}
                    placeholder="https://yourbrand.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Interested Service(s) — multi-select chips */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className={labelClass + ' mb-0'}>Interested Service(s)</label>
                  <span className="text-[11px] font-semibold tabular-nums text-slate-500">
                    {services.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Interested services">
                  {SERVICE_OPTIONS.map((service) => {
                    const active = services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleService(service)}
                        className={`inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-[12.5px] font-semibold transition-all ${
                          active
                            ? 'border-[#C61A1A] bg-[#C61A1A] text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" />}
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief Project Description */}
              <div>
                <label htmlFor="cf-description" className={labelClass}>
                  Brief Project Description
                </label>
                <textarea
                  id="cf-description"
                  rows={4}
                  required
                  value={form.description}
                  onChange={set('description')}
                  placeholder="Share your revenue goals, current ad spend, or conversion bottlenecks..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm transition-all placeholder:text-slate-400 focus:border-[#C61A1A] focus:outline-none focus:ring-2 focus:ring-[#C61A1A]"
                />
              </div>

              {/* Honeypot — invisible to humans, catches bots */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="cf-company">Company</label>
                <input
                  id="cf-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={set('company')}
                />
              </div>

              {/* Inline error */}
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-[#9E1414]">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="dz-btn-shine group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#C61A1A] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#9E1414] disabled:cursor-not-allowed disabled:opacity-80 sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending Your Request…</span>
                  </>
                ) : (
                  <>
                    <span>Get My Free Growth Audit</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                Your details stay private — no spam, no sharing. Ever.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
