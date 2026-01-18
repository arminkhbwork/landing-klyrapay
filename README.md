# Landing 03 — KlyraPay

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-klyrapay.arminkhabazha.com-00d9ff)](https://klyrapay.arminkhabazha.com/en)

SEO-first startup landing page for a **payment / banking infrastructure** product.

> **Live Demo**: [klyrapay.arminkhabazha.com](https://klyrapay.arminkhabazha.com/en)  
> **Repository**: [github.com/arminkhbwork/landing-klyrapay](https://github.com/arminkhbwork/landing-klyrapay)

## ✨ Features

- ⚡ **Next.js 16** with App Router
- 🎨 **Tailwind CSS 4** for styling
- 📱 **Responsive design**
- 🔍 **SEO optimized** with robots.txt and sitemap
- 🌍 **Internationalization (i18n)** - Multi-language support (EN, DE, ES, FR)
- 🌓 **Dark mode** with theme toggle
- 🎬 **GSAP** animations
- 🎨 **Three.js** 3D graphics
- 🐳 **Docker** support
- ✅ **TypeScript** for type safety
- 🧹 **ESLint** & **Prettier** for code quality
- 🪝 **Husky** git hooks

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Docker (optional, for containerized development)

### Local Development (Node)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development (Docker)

```bash
# Build and start container
docker compose up --build
```

If port 3000 is already used (e.g. Dokploy), run:

```bash
HOST_PORT=3001 docker compose up --build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Check code formatting
- `npm run format:write` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🔧 Environment Variables

Copy `.env.template` into `.env.local` and fill values as needed.

- `NEXT_PUBLIC_ALLOW_INDEXING`
  - `1`: allow indexing
  - `0`: disallow indexing via `robots.txt` (and "noindex" metadata)

## 🌍 Internationalization (i18n)

The project supports multiple locales:

- **English**: `/en`
- **German**: `/de`
- **Spanish**: `/es`
- **French**: `/fr`

## 🌓 Theme Support

- **Light/Dark mode** toggle available in the header
- Theme preference persists in `localStorage`
- Theme applies instantly without page reload

## 📄 Project Details Page

The top navigation's last item is **Project Details**:

- `/project` redirects to your current locale
- `/en/project`, `/de/project`, `/es/project`, `/fr/project` are the actual pages

## 🏗️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/     # Localized routes
│   │   └── ...            # Root pages
│   ├── components/
│   │   ├── motion/        # GSAP animation components
│   │   ├── site/          # Site-wide components
│   │   ├── three/         # Three.js components
│   │   └── ui/            # UI components
│   └── lib/
│       ├── dictionaries.ts # Translation dictionaries
│       └── i18n.ts        # i18n configuration
├── public/                # Static assets
└── Dockerfile            # Docker configuration
```

## 👤 Author

**Armin Khabazha**

- Portfolio: [arminkhabazha.com](https://arminkhabazha.com)
- Email: arminkhbwork@gmail.com
- GitHub: [@arminkhbwork](https://github.com/arminkhbwork)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security vulnerabilities, please see [SECURITY.md](SECURITY.md).
