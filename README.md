# HaptixUI ⚡

<p align="center">
  <img src="https://raw.githubusercontent.com/HaptixUI/haptixui.github.io/main/haptixui_logo.jpg" alt="HaptixUI Logo" width="120" style="border-radius: 28px;" />
</p>

<p align="center">
  <b>High-End Tactile Micro-Interactions & Animated UI Components</b><br>
  Built with pure HTML, modern CSS, and native Web Components. 0 external dependencies.
</p>

<p align="center">
  <a href="https://haptixui.github.io/"><img src="https://img.shields.io/badge/Live_Demo-haptixui.github.io-00a8ff?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/HaptixUI/haptixui/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License" /></a>
  <a href="https://instagram.com/haptixui"><img src="https://img.shields.io/badge/Instagram-@haptixui-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
  <img src="https://img.shields.io/badge/Dependencies-0_Zero-a855f7?style=for-the-badge" alt="Zero Dependencies" />
</p>

---

## 🌐 Live Catalog & Playground

Experience all micro-interactions live with 60 FPS silky smooth animations, multi-theme canvas previews, and 1-click code copying:

👉 **[https://haptixui.github.io/](https://haptixui.github.io/)**

---

## ⚡ Key Highlights

- **Zero Dependencies:** No heavy libraries, no Tailwind bloat, no runtime overhead. 100% native Web Standards.
- **Framework Agnostic:** Seamlessly drop components into **Vanilla HTML, React, Next.js, Vue, Nuxt, Svelte, or Astro**.
- **1-Click Copy & Inspect:** Full syntax-highlighted HTML, modular CSS, and JavaScript source code available for every component.
- **Deep-Linking Support:** Link directly to any component dialog via URL query parameters (`?id=<component-id>`).
- **Multi-Device Responsive:** 100% optimized across mobile (320px+), tablets, laptops, and ultra-wide desktop viewports.
- **Multi-Stage Themes:** Preview components across Dark Slate, AMOLED Pitch Black, and Light Canvas modes.

---

## 🧩 Components Catalog & Direct Deep-Links

Browse the components catalog with instant modal deep-linking:

| # | Component | Category | Tech Stack | Direct Live Demo & Code |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **3-State Morphing Download Button** | Buttons | Web Component | [🚀 Preview & Code](https://haptixui.github.io/?id=download-button) |
| **02** | **3D Delivery Truck Cart Button** | Buttons | Web Component | [🚀 Preview & Code](https://haptixui.github.io/?id=cart-button) |
| **03** | **Celestial Day & Night Switch** | Toggles | Pure CSS | [🚀 Preview & Code](https://haptixui.github.io/?id=theme-toggle) |
| **04** | **Pulse Cyber Toggle Switch** | Toggles | Pure CSS | [🚀 Preview & Code](https://haptixui.github.io/?id=cyber-toggle) |
| **05** | **3D Holographic Tilt Card** | Cards | Web Component | [🚀 Preview & Code](https://haptixui.github.io/?id=hologram-card) |
| **06** | **Infinity Quantum Orbit Loader** | Loaders | Web Component | [🚀 Preview & Code](https://haptixui.github.io/?id=quantum-loader) |

---

## 🚀 Quick Start Example

### 1. In Plain HTML / Vanilla JS
Import the custom element script and stylesheet, then use the tag directly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 1. Include Component CSS -->
  <link rel="stylesheet" href="https://haptixui.github.io/download-button.css">
</head>
<body>

  <!-- 2. Use the Custom Element -->
  <download-button duration="3000" auto-reset="true"></download-button>

  <!-- 3. Include Component Script -->
  <script type="module" src="https://haptixui.github.io/download-button.js"></script>
</body>
</html>
```

### 2. In React / Next.js
Web Components work natively with React:

```jsx
import { useEffect } from 'react';
import 'https://haptixui.github.io/download-button.css';

export default function DownloadFeature() {
  useEffect(() => {
    import('https://haptixui.github.io/download-button.js');
  }, []);

  return (
    <div className="flex items-center justify-center p-8">
      <download-button duration="3000" auto-reset="true"></download-button>
    </div>
  );
}
```

---

## 🤖 Automated Instagram Community Bot

HaptixUI is connected to an automated 24/7 Meta Developer Webhook bot on Instagram.

- Comment **`"CODE"`** on any reel at [@haptixui](https://instagram.com/haptixui)
- Our bot immediately verifies the comment and dispatches the exact component deep-link and copy-paste source code directly to your Instagram Direct Messages!

---

## 🤝 Contributing

Contributions, feedback, and new micro-interaction ideas are warmly welcome!

1. Fork the Project: `https://github.com/HaptixUI/haptixui`
2. Create your Feature Branch: `git checkout -b feature/NewInteraction`
3. Commit your Changes: `git commit -m 'Add exciting micro-interaction'`
4. Push to the Branch: `git push origin feature/NewInteraction`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. Free for commercial and personal use.

Made with ⚡ by [HaptixUI](https://github.com/HaptixUI). Follow [@haptixui](https://instagram.com/haptixui) for daily micro-interaction drops!
