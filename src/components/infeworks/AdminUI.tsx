import type { ReactNode } from "react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-8"
      style={{ borderColor: "var(--iw-border)" }}
    >
      <div>
        {eyebrow ? (
          <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
            {eyebrow}
          </p>
        ) : null}
        <h1 className="display-md mt-3 text-3xl md:text-4xl">{title}</h1>
        {description ? (
          <p className="body-reading mt-3 max-w-2xl text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`border p-6 ${className}`}
      style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
    >
      {children}
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: "neutral" | "success" | "warning" | "muted"; children: ReactNode }) {
  const color =
    tone === "success"
      ? "var(--iw-success)"
      : tone === "warning"
        ? "var(--iw-warning)"
        : tone === "muted"
          ? "var(--iw-text-secondary)"
          : "var(--iw-accent)";
  return (
    <span
      className="inline-flex items-center border px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase"
      style={{ borderColor: color, color }}
    >
      {children}
    </span>
  );
}

export function AdminTableShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-8 overflow-x-auto border"
      style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
    >
      <table className="w-full min-w-[720px] border-collapse text-sm">{children}</table>
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th
      className="label-mono border-b px-5 py-4 text-start font-medium"
      style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <td className={`border-b px-5 py-4 align-middle ${className}`} style={{ borderColor: "var(--iw-border)" }}>
      {children}
    </td>
  );
}

export function AdminButton({
  children,
  onClick,
  variant = "outline",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const solid = variant === "solid";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase disabled:opacity-40"
      style={
        solid
          ? { backgroundColor: "var(--iw-accent)", color: "#ffffff" }
          : { border: "1px solid var(--iw-border)", color: "var(--iw-text-primary)" }
      }
    >
      {children}
    </button>
  );
}
