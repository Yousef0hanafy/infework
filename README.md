# Infeworks (إنفيوركس للأعمال الهندسية المتكاملة)

Official enterprise web platform and project showcase for **Infeworks** — specialists in MEP, strategic water/wastewater infrastructure, electromechanical contracting, and environmental engineering across Egypt and the MENA region.

---

## 🌟 Key Features

- **Full Bilingual Architecture (EN / AR)**:
  - Native RTL/LTR support powered by URL-based localization (`/en` and `/ar`).
  - Seamless layout mirroring, typography adaptations, and metadata management.
- **Enterprise Project Showcase**:
  - Filterable portfolio spanning Water Infrastructure, Strategic Facilities, Civil & Commercial, and Industrial MEP.
  - Interactive technical facts sheet (Client, Consultant, Capacity, Scope, Location, Completion Year).
  - High-performance responsive media galleries and engineering schematic viewers.
- **Dynamic Partner Ribbons**:
  - Drag-enabled infinite kinetic ribbons and directory grids for National Clients, Contracting Authorities, and Approved Equipment Suppliers.
- **Administrative Control Panel (`/admin`)**:
  - Secure dashboard for project management, lead triage, and system settings.
  - Visual photo grid management (batch uploading, primary hero selection, reordering, deletion).
  - High-precision engineering schematic uploader with instant file size and MIME validation.
  - Live slug conflict checker and draft/publication status toggling.
- **Resilient Fallback Data Layer**:
  - Hybrid data architecture using Supabase PostgreSQL with built-in static fallback caching, ensuring zero public downtime even during schema transitions.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Full-stack SSR / Nitro engine)
- **UI & Routing**: React 18, [@tanstack/react-router](https://tanstack.com/router)
- **State & Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Styling**: Tailwind CSS, CSS Variables design token system
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Storage, RLS, Auth)
- **Package Manager / Runtime**: [Bun](https://bun.sh/) / Node.js 20+

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js 20+](https://nodejs.org/) or [Bun](https://bun.sh/) installed.
- Access to a Supabase project instance.

### 2. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Yousef0hanafy/infework.git
cd infework

# Install dependencies using Bun (recommended) or npm
bun install
# or: npm install
