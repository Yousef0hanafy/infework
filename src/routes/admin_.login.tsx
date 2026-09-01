import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Admin Sign In — Infeworks";
const DESC = "Internal sign-in for the Infeworks project records administration area.";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.navigate({ to: "/admin" });
  }

  return (
    <main className="iw-section-light flex min-h-screen items-center justify-center px-6 py-20">
      <div
        className="w-full max-w-md border p-10"
        style={{
          borderColor: "var(--iw-border)",
          backgroundColor: "var(--iw-surface)",
        }}
      >
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5" strokeWidth={1.5} style={{ color: "var(--iw-accent)" }} />
          <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
            Internal Access
          </p>
        </div>

        <h1 className="display-md mt-6 text-3xl">Administration</h1>
        <p className="body-reading mt-3 text-sm text-[var(--iw-text-secondary)]">
          Sign in with your Infeworks account to manage project records.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate>
          <div>
            <label
              htmlFor="admin-email"
              className="label-mono block"
              style={{ color: "var(--iw-text-secondary)" }}
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)" }}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="label-mono block"
              style={{ color: "var(--iw-text-secondary)" }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)" }}
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="border-s-2 ps-3 text-sm"
              style={{ borderColor: "var(--iw-error)", color: "var(--iw-error)" }}
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide uppercase disabled:opacity-60"
            style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
