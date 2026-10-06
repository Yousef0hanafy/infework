# Project Discovery: Infeworks Website

## 1. Context and Environment

- **Date Checked**: 2026-10-05
- **Branch**: `add-schema`
- **HEAD Commit**: `e79baf3b808a620249fb900b2714cede3ff541ab`
- **Working Tree State**: Uncommitted changes in `src/routes/$locale.about.tsx`, `src/components/infeworks/Footer.tsx`, `public/images/team/abdlaziz.png`. Untracked file: `public/images/team/mahmoud-adham.png`.

## 2. Technology Stack (Verified from package.json)

- **Framework**: TanStack Start (v1.168.49) / TanStack Router (v1.170.32)
- **UI Library**: React 19 (`react`, `react-dom`)
- **Styling**: Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`), Radix UI Primitives.
- **Data Fetching & State**: TanStack Query (`@tanstack/react-query`)
- **Backend & Database**: Supabase (`@supabase/supabase-js`)
- **Build Tool**: Vite (v8.1.5)

## 3. Architecture & Main Flows

### Routing & Structure

The application relies on file-based routing provided by TanStack Router within `src/routes`:

- **Root**: `src/routes/__root.tsx` defines the core error boundaries, global styles, and NotFound fallbacks.
- **Localization**: Uses a path parameter layout `src/routes/$locale.tsx`. Enforces valid locales (`en`, `ar`) via `beforeLoad` redirects. Children of this layout inherit common UI elements like `Header` and `Footer`.
- **Admin**: `src/routes/admin.tsx` and its children implement a protected dashboard. It validates the session using `supabase.auth.getUser()` in `beforeLoad` and redirects to `/admin/login` if unauthenticated.

### Data Flow Example: Public Projects

- **Route**: `src/routes/$locale.work.index.tsx` (List) and `src/routes/$locale.work.$slug.tsx` (Detail).
- **Loader**: The route's `loader` function runs on the server (using TanStack Start's `createServerFn` from `src/lib/public.functions.ts`).
- **Data Source**: The server functions invoke data access methods in `src/lib/public-data.server.ts` using the Supabase client. Some methods merge live database data with hardcoded definitions (e.g., falling back to `getFlagshipDetail` for core projects).

### Styling & Localization Conventions

- **CSS**: Centralized in `src/styles.css`. Uses design tokens scoped to `:root` and `@theme inline` mapping to Tailwind configuration. Variables use an `iw-` prefix (e.g., `--iw-bg`, `--iw-accent`).
- **Typography**: Dual fonts for LTR/RTL (`--font-sans`, `--font-arabic`).
- **Localization**: UI translations are mostly managed inline within components utilizing a simple `isArabic = locale === "ar"` check. Tailwind RTL modifiers (`rtl:`) are used for directional styling.

## 4. Key Directories & Map

| Change Category          | Starting Point / Directory      | Notes                                                                               |
| ------------------------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| **Public Pages**         | `src/routes/$locale.*.tsx`      | Homepage (`index`), About, What we do, Work.                                        |
| **Admin Panel**          | `src/routes/admin.*.tsx`        | Requires Supabase authentication.                                                   |
| **Shared UI Components** | `src/components/infeworks/`     | Contains highly specialized structural/decorative components (Logo, Footers, etc.). |
| **Design Tokens & CSS**  | `src/styles.css`                | Edit colors, typography, global overrides here.                                     |
| **Server Data / API**    | `src/lib/public-data.server.ts` | Adjust public queries, merge logic, Supabase calls.                                 |
| **Types & Schemas**      | `src/lib/public-types.ts`       | Defines data shapes and structures.                                                 |

## 5. Constraints & Material Limitations

- **External Integration**: Relying on Supabase for data and authentication. Any schema change needs synchronization between the Supabase dashboard and the client types.
- **Lovable Integration**: `AGENTS.md` strictly forbids rewriting history (no force push, squash, rebase) because it is synced with the Lovable platform.
- **Validation limitation**: Inspection was restricted to code review and basic git commands. The dev server, builds, or actual authentication flow were not executed.

> **Reminder for future agent sessions**: Use this document as a navigation aid. Always verify the current Git state and read the most up-to-date source files for the specific area being modified before writing implementation code.
