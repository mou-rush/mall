"use client";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { CTA_FORM_LABELS } from "@/lib/constants";
import FormField from "./FormField";

interface ContactFormProps {
  type: string;
  onClose: () => void;
}

export default function ContactForm({
  type,
  onClose,
}: Readonly<ContactFormProps>) {
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
