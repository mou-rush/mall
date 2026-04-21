interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormField({
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
