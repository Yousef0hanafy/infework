import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import {
  ExternalLink,
  FolderKanban,
  ScrollText,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/infeworks/Logo";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/admin/login" });
    }
    return { user: data.user };
  },
  component: AdminLayout,
});

const NAV = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects" as const, label: "Projects", icon: FolderKanban },
  { to: "/admin/capabilities" as const, label: "Capabilities", icon: Layers },
  { to: "/admin/leads" as const, label: "Leads", icon: Inbox },
  { to: "/admin/audit" as const, label: "Audit Log", icon: ScrollText },
  { to: "/admin/settings" as const, label: "Settings", icon: Settings },
];

const CRUMB_LABELS: Record<string, string> = {
  admin: "Dashboard",
  projects: "Projects",
  capabilities: "Capabilities",
  leads: "Leads",
  audit: "Audit Log",
  settings: "Settings",
};

function AdminLayout() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [email, setEmail] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active) setEmail(data.user?.email ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin/login", replace: true });
  }

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: CRUMB_LABELS[seg] ?? seg.replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    last: i === segments.length - 1,
  }));
  const isProduction = import.meta.env.PROD;
  const envLabel = isProduction ? "PRODUCTION" : "STAGING";

  const sidebar = (
    <nav className="flex flex-col gap-1 p-4">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.exact ?? false }}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wide"
          style={{ color: "var(--iw-dark-text-muted)" }}
          activeProps={{
            style: {
              color: "var(--iw-dark-text)",
              backgroundColor: "var(--iw-dark-surface)",
            },
          }}
        >
          <item.icon className="h-4 w-4" strokeWidth={1.5} />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--iw-bg)" }}>
      <aside
        className="hidden w-64 shrink-0 flex-col md:flex"
        style={{ backgroundColor: "var(--iw-dark-bg)" }}
      >
        <div
          className="flex items-center gap-3 border-b px-6 py-6"
          style={{ borderColor: "var(--iw-dark-border)" }}
        >
          <Logo variant="light" markOnly />
          <div>
            <p
              className="text-lg leading-none tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--iw-dark-text)",
              }}
            >
              Infeworks
            </p>
            <p className="label-mono mt-1.5" style={{ color: "var(--iw-dark-accent)" }}>
              Admin
            </p>
          </div>
        </div>
        {sidebar}
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ backgroundColor: "var(--iw-dark-bg)" }}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <Logo variant="light" isAr={false} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" style={{ color: "var(--iw-dark-text)" }} />
            </button>
          </div>
          {sidebar}
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex items-center gap-4 border-b px-6 py-4"
          style={{
            borderColor: "var(--iw-border)",
            backgroundColor: "var(--iw-surface)",
          }}
        >
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-2 text-xs">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  {c.last ? (
                    <span
                      className="font-semibold tracking-wide uppercase"
                      style={{ color: "var(--iw-text-primary)" }}
                      aria-current="page"
                    >
                      {c.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={c.href as "/admin"}
                        className="tracking-wide uppercase hover:underline"
                        style={{ color: "var(--iw-text-secondary)" }}
                      >
                        {c.label}
                      </Link>
                      <span style={{ color: "var(--iw-border)" }}>/</span>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <span
              className="hidden border px-2 py-1 text-[10px] font-semibold tracking-[0.18em] sm:inline"
              style={{
                borderColor: isProduction ? "var(--iw-accent)" : "var(--iw-border)",
                color: isProduction ? "var(--iw-accent)" : "var(--iw-text-secondary)",
              }}
            >
              {envLabel}
            </span>
            <a
              href="/en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-2 text-xs font-semibold tracking-wide uppercase"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              View Website
            </a>
            {email ? (
              <span
                className="hidden text-sm lg:inline"
                style={{ color: "var(--iw-text-secondary)" }}
              >
                {email}
              </span>
            ) : null}

            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 border px-4 py-2 text-xs font-semibold tracking-wide uppercase"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-6 py-10 md:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
