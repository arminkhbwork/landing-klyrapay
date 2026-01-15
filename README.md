# Landing 03 — KlyraPay

SEO-first startup landing page for a **payment / banking infrastructure** product.

## Local development (Node)

```bash
npm i
npm run dev
```

## Local development (Docker)

```bash
docker compose up --build
```

If port 3000 is already used (e.g. Dokploy), run:

```bash
HOST_PORT=3001 docker compose up --build
```

## Environment variables

Copy `.env.template` into `.env.local` and fill values as needed.

- `NEXT_PUBLIC_ALLOW_INDEXING`
  - `1`: allow indexing
  - `0`: disallow indexing via `robots.txt` (and “noindex” metadata)

## i18n + theme

- **Locales**: `/en`, `/de`, `/es`, `/fr`
- **Theme**: light/dark toggle (persists in `localStorage`, applies instantly)

## Project Details page

The top navigation’s last item is **Project Details**:

- `/project` redirects to your current locale
- `/en/project`, `/de/project`, `/es/project`, `/fr/project` are the actual pages
