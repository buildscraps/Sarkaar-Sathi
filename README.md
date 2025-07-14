# SarkaarSathi

**SarkaarSathi** is a modern, accessible, and user-friendly platform to discover, search, and access Indian government schemes, services, and portals in seconds. Built with Next.js, DaisyUI, and Tailwind CSS, it provides a seamless experience for citizens to find verified public services.

## 🚀 Features
- 🔍 Fuzzy search with typo tolerance and auto-suggestions
- 🧭 Powerful filters (categories, departments, tags, state-specific)
- 📱 Fully responsive, mobile-first design
- 🧾 Rich service cards with bookmarking, badges, and more info modals
- ♿ Accessibility-first: keyboard navigation, ARIA labels, semantic HTML
- 🌗 Dark/light theme toggle
- ⚡ Infinite scroll / Load More for fast browsing
- 🏷️ Tag-based filtering and result counts
- 🛡️ SEO-friendly metadata and Open Graph

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Fuse.js](https://fusejs.io/) (fuzzy search)
- [Lucide Icons](https://lucide.dev/)

## 📦 Folder Structure
```
src/
  app/           # Next.js app directory (pages, layout, meta)
  components/    # Reusable UI components
  data/          # Static data (services.json)
  lib/           # Constants and utilities
  types/         # TypeScript types and global declarations
public/          # Static assets (SVGs, icons)
```

## 🧑‍💻 Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Format and lint code:**
   ```bash
   npm run format && npm run lint
   ```
4. **Build for production:**
   ```bash
   npm run build && npm start
   ```

## 🌐 Deployment
- Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.
- Ensure environment is set to `production` for best performance.

## ♿ Accessibility & Best Practices
- All interactive elements are keyboard-accessible and have ARIA labels.
- Uses semantic HTML and color contrast for readability.
- Optimized for Lighthouse accessibility and performance scores.

## 📝 Contributing
1. Fork the repo and create a new branch.
2. Make your changes with clear, descriptive commits.
3. Ensure code passes lint and format checks.
4. Submit a pull request with a detailed description.

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.

---

**SarkaarSathi** – Empowering citizens with easy access to government services.
