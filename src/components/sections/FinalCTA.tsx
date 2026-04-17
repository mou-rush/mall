"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import VideoBackground from "@/components/ui/VideoBackground";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { VIDEOS, CTA_PATHS, CTA_FORM_LABELS } from "@/lib/constants";
import type { IconComponent } from "@/lib/types";

export default function FinalCTA() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [activeForm, setActiveForm] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="cta"
      dark={false}
      className="bg-[var(--moa-black)] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <VideoBackground
          src={VIDEOS.events}
          overlayOpacity={0.9}
          overlayColor="6,6,8"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] 
                        bg-[var(--gold-glow)] rounded-full blur-[200px] opacity-30"
        />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="cta-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Close the Deal?
          </motion.p>

          <AnimatedText
            text="Let's Build Together"
            el="h2"
            className="section-title mx-auto"
            variant="words"
          />

          <motion.p
            className="text-[var(--moa-muted)] max-w-xl mx-auto leading-loose mt-6"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            40 million people walked through our doors last year. The question
            isn&rsquo;t whether your brand belongs here. It&rsquo;s what
            you&rsquo;re waiting for.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {CTA_PATHS.map((path, i) => (
            <CTACard
              key={path.id}
              {...path}
              index={i}
              isActive={activeForm === path.id}
              onSelect={() =>
                setActiveForm(activeForm === path.id ? null : path.id)
              }
            />
          ))}
        </div>

        {activeForm && (
          <motion.div
            key={activeForm}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="glass-card rounded-[2px] p-8 lg:p-12 mb-16 overflow-hidden"
          >
            <ContactForm
              type={activeForm}
              onClose={() => setActiveForm(null)}
            />
          </motion.div>
        )}

        <Signoff />
      </div>
    </SectionWrapper>
  );
}

interface CTACardProps {
  icon: IconComponent;
  title: string;
  desc: string;
  cta: string;
  color: string;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function CTACard({
  icon: Icon,
  title,
  desc,
  cta,
  color,
  index,
  isActive,
  onSelect,
}: Readonly<CTACardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={`glass-card rounded-[2px] p-8 lg:p-10 relative overflow-hidden 
                  cursor-pointer transition-all duration-500
                  ${isActive ? "border-opacity-60 scale-[1.01]" : "hover:border-opacity-30"}`}
      style={{ borderColor: isActive ? color : undefined }}
      onClick={onSelect}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top, ${color}15, transparent 70%)`,
          opacity: isActive ? 1 : 0,
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        <Icon size={28} className="mb-6 block" style={{ color }} />
        <h3 className="text-[var(--moa-white)] font-medium text-xl mb-3">
          {title}
        </h3>
        <p className="text-[var(--moa-muted)] text-sm leading-loose mb-6">
          {desc}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="flex items-center gap-2 text-sm font-semibold tracking-wider 
                     uppercase transition-all duration-300"
          style={{ color }}
        >
          {isActive ? "Close ✕" : cta}
          {!isActive && <ArrowIcon size={14} />}
        </button>
      </div>
    </motion.div>
  );
}

interface ContactFormProps {
  type: string;
  onClose: () => void;
}

function ContactForm({ type, onClose }: Readonly<ContactFormProps>) {
  const labels = CTA_FORM_LABELS;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <p className="eyebrow">{labels[type]}</p>
        <button
          onClick={onClose}
          className="text-[var(--moa-muted)] hover:text-[var(--moa-white)] 
                     transition-colors text-lg"
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted! Connect to CRM API in production.");
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Jane"
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Smith"
            required
          />
        </div>
        <FormField
          label="Company"
          name="company"
          placeholder="Brand Inc."
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="jane@brand.com"
          required
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+1 (612) 000-0000"
        />
        <div>
          <label
            htmlFor="message"
            className="block eyebrow text-[0.6rem] mb-2 text-[var(--moa-muted)]"
          >
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Share your vision, budget range, and timeline…"
            className="w-full bg-[var(--moa-surface)] border border-[var(--moa-border)] 
                       rounded-[2px] px-4 py-3 text-[var(--moa-white)] text-sm 
                       placeholder:text-[var(--moa-muted)] focus:outline-none 
                       focus:border-[var(--gold)] transition-colors resize-none"
          />
        </div>

        <button type="submit" className="btn-primary w-full justify-center">
          Send Inquiry
          <ArrowIcon />
        </button>
      </form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: Readonly<FormFieldProps>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block eyebrow text-[0.6rem] mb-2 text-[var(--moa-muted)]"
      >
        {label}
        {required && <span className="text-[var(--gold)] ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[var(--moa-surface)] border border-[var(--moa-border)] 
                   rounded-[2px] px-4 py-3 text-[var(--moa-white)] text-sm 
                   placeholder:text-[var(--moa-muted)] focus:outline-none 
                   focus:border-[var(--gold)] transition-colors"
      />
    </div>
  );
}

function Signoff() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="border-t border-[var(--moa-border)] pt-12 
                 flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      <div>
        <p className="font-black tracking-[0.1em] text-xl uppercase mb-1">
          <span className="text-gold-gradient">Mall of America</span>
        </p>
        <p className="text-[var(--moa-muted)] text-xs tracking-wider">
          60 E Broadway · Bloomington, MN 55425
        </p>
      </div>

      <nav className="flex items-center gap-6" aria-label="Footer navigation">
        {["Leasing", "Sponsorship", "Events", "Press", "Careers"].map(
          (link) => (
            <button
              key={link}
              className="text-[var(--moa-muted)] text-xs tracking-widest uppercase 
                       hover:text-[var(--gold)] transition-colors"
            >
              {link}
            </button>
          ),
        )}
      </nav>

      <p className="text-[var(--moa-muted)] text-xs">
        © {new Date().getFullYear()} Mall of America. All rights reserved.
      </p>
    </motion.div>
  );
}
