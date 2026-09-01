import type { ReactNode } from "react";

const inputClass =
  "mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]";

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="label-mono block"
      style={{ color: "var(--iw-text-secondary)" }}
    >
      {children}
    </label>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  dir,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  type?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        dir={dir}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        style={{ borderColor: "var(--iw-border)" }}
      />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 4,
  dir,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        rows={rows}
        dir={dir}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        style={{ borderColor: "var(--iw-border)" }}
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        style={{ borderColor: "var(--iw-border)" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FormNotice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const color = tone === "error" ? "var(--iw-error)" : "var(--iw-success)";
  return (
    <p role="alert" className="border-s-2 ps-3 text-sm" style={{ borderColor: color, color }}>
      {children}
    </p>
  );
}
