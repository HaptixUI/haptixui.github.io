/**
 * HaptixUI - Component Registry & Custom Element Definitions
 * Production-ready Web Components with isolated logic and styling
 */

import './download-button.js';

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 2: <cart-button>
   -------------------------------------------------------------------------- */
class CartButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="cart-btn-wrap">
        <button class="cart-btn" type="button" aria-label="Add to cart">
          <div class="btn-content">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Add to Cart</span>
          </div>

          <div class="truck-scene">
            <div class="road-line"></div>
            <div class="truck-wrapper">
              <div class="truck-icon">
                <svg viewBox="0 0 46 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Headlight beam -->
                  <polygon points="40,16 46,14 46,20 40,18" fill="#fef08a" opacity="0.8"/>
                  <!-- Cargo Container Body -->
                  <rect x="2" y="4" width="25" height="17" rx="2" fill="#ffffff"/>
                  <line x1="14" y1="5" x2="14" y2="20" stroke="#cbd5e1" stroke-width="1.2"/>
                  <!-- Delivery Package Badge -->
                  <rect x="6" y="9" width="5" height="6" rx="1" fill="#f59e0b"/>
                  <line x1="6" y1="12" x2="11" y2="12" stroke="#d97706" stroke-width="0.8"/>
                  <!-- Cabin Body -->
                  <path d="M27 9h8l5 6v6h-13V9z" fill="#f8fafc"/>
                  <!-- Windshield Glass -->
                  <path d="M29 11h5.5l3.5 4.5h-9V11z" fill="#0284c7"/>
                  <path d="M30 11.8h4l2.5 3.2h-6.5V11.8z" fill="#38bdf8"/>
                  <!-- Front Bumper -->
                  <rect x="39" y="19" width="3" height="3" rx="1" fill="#64748b"/>
                  <!-- Rear Wheel -->
                  <circle cx="10" cy="21" r="5" fill="#0f172a"/>
                  <circle cx="10" cy="21" r="2.8" fill="#94a3b8"/>
                  <circle cx="10" cy="21" r="1.2" fill="#ffffff"/>
                  <!-- Front Wheel -->
                  <circle cx="33" cy="21" r="5" fill="#0f172a"/>
                  <circle cx="33" cy="21" r="2.8" fill="#94a3b8"/>
                  <circle cx="33" cy="21" r="1.2" fill="#ffffff"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="order-done-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Added!</span>
          </div>
        </button>
      </div>
    `;

    const btn = this.querySelector('.cart-btn');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('animating') || btn.classList.contains('ordered')) {
        btn.classList.remove('ordered', 'animating');
        return;
      }

      btn.classList.add('animating');
      setTimeout(() => {
        btn.classList.remove('animating');
        btn.classList.add('ordered');
        setTimeout(() => {
          btn.classList.remove('ordered');
        }, 3000);
      }, 2800);
    });
  }
}
customElements.define('cart-button', CartButton);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 3: <heart-button>
   -------------------------------------------------------------------------- */
class HeartButton extends HTMLElement {
  connectedCallback() {
    this.count = 1428;
    this.liked = false;

    this.innerHTML = `
      <div class="heart-btn-wrap">
        <button class="heart-btn" type="button" aria-label="Like button">
          <div class="heart-icon-box">
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <div class="sparkle-container"></div>
          </div>
          <span class="heart-count">1,428</span>
        </button>
      </div>
    `;

    const btn = this.querySelector('.heart-btn');
    const countEl = this.querySelector('.heart-count');
    const sparkleBox = this.querySelector('.sparkle-container');

    const colors = ['#ff2a6d', '#00a8ff', '#ffd166', '#06d6a0', '#a855f7', '#ff70a6'];

    btn.addEventListener('click', () => {
      this.liked = !this.liked;
      btn.classList.toggle('liked', this.liked);

      if (this.liked) {
        countEl.textContent = (this.count + 1).toLocaleString();
        sparkleBox.innerHTML = '';
        for (let i = 0; i < 14; i++) {
          const angle = (i / 14) * 2 * Math.PI;
          const dist = 24 + Math.random() * 16;
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;
          const s = document.createElement('div');
          s.className = 'sparkle';
          s.style.background = colors[i % colors.length];
          s.style.setProperty('--tx', `${tx}px`);
          s.style.setProperty('--ty', `${ty}px`);
          sparkleBox.appendChild(s);
        }
      } else {
        countEl.textContent = this.count.toLocaleString();
        sparkleBox.innerHTML = '';
      }
    });
  }
}
customElements.define('heart-button', HeartButton);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 4: <theme-toggle>
   -------------------------------------------------------------------------- */
class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="theme-switch-wrap">
        <div class="theme-switch" role="button" tabindex="0" aria-label="Toggle theme">
          <div class="sky-bg">
            <div class="sky-stars">
              <span class="sky-star" style="top: 8px; left: 16px; width: 3px; height: 3px;"></span>
              <span class="sky-star" style="top: 22px; left: 26px; width: 2px; height: 2px; animation-delay: 0.7s;"></span>
              <span class="sky-star" style="top: 14px; left: 34px; width: 3px; height: 3px; animation-delay: 1.2s;"></span>
            </div>
            <div class="sky-clouds">
              <span class="cloud-bubble" style="bottom: -8px; left: 10px; width: 24px; height: 24px;"></span>
              <span class="cloud-bubble" style="bottom: -10px; left: 24px; width: 30px; height: 30px;"></span>
            </div>
          </div>
          <div class="celestial-orb"></div>
        </div>
      </div>
    `;

    const toggle = this.querySelector('.theme-switch');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-day');
    });
  }
}
customElements.define('theme-toggle', ThemeToggle);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 5: <trash-button>
   -------------------------------------------------------------------------- */
class TrashButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="trash-btn-wrap">
        <button class="trash-btn" type="button" aria-label="Delete item">
          <div class="trash-icon-box">
            <svg class="trash-can-lid" viewBox="0 0 24 8" fill="currentColor">
              <rect x="2" y="2" width="20" height="3" rx="1.5"></rect>
              <rect x="9" y="0" width="6" height="2" rx="1"></rect>
            </svg>
            <svg class="trash-can-body" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 1h18l-2 18H5L3 1z" fill="rgba(239, 68, 68, 0.2)"></path>
              <line x1="8" y1="5" x2="8" y2="15"></line>
              <line x1="12" y1="5" x2="12" y2="15"></line>
              <line x1="16" y1="5" x2="16" y2="15"></line>
            </svg>
          </div>
          <span class="trash-text">Delete Item</span>
        </button>
      </div>
    `;

    const btn = this.querySelector('.trash-btn');
    const text = this.querySelector('.trash-text');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('deleting')) return;

      if (btn.classList.contains('deleted')) {
        btn.classList.remove('deleted');
        text.textContent = 'Delete Item';
        return;
      }

      btn.classList.add('deleting');
      text.textContent = 'Deleting...';

      setTimeout(() => {
        btn.classList.remove('deleting');
        btn.classList.add('deleted');
        text.textContent = 'Deleted ✓';
        setTimeout(() => {
          btn.classList.remove('deleted');
          text.textContent = 'Delete Item';
        }, 3000);
      }, 1000);
    });
  }
}
customElements.define('trash-button', TrashButton);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 6: <hologram-card>
   -------------------------------------------------------------------------- */
class HologramCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="holo-card-perspective">
        <div class="holo-card">
          <div class="holo-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Interactive 3D
          </div>
          <h3 class="holo-title">Holo Sheen Card</h3>
          <p class="holo-desc">Interactive cursor tracking card featuring 3D matrix tilt and light reflection highlights.</p>
        </div>
      </div>
    `;

    const card = this.querySelector('.holo-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}
customElements.define('hologram-card', HologramCard);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 7: <copy-button>
   -------------------------------------------------------------------------- */
class CopyButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="copy-btn-wrap">
        <button class="copy-pill-btn" type="button" aria-label="Copy to clipboard">
          <span class="copy-icon-box">
            <svg class="copy-icon-default" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg class="copy-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span class="copy-btn-text">Copy Link</span>
        </button>
      </div>
    `;

    const btn = this.querySelector('.copy-pill-btn');
    const text = this.querySelector('.copy-btn-text');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('copied')) return;
      btn.classList.add('copied');
      text.textContent = 'Copied!';
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
      setTimeout(() => {
        btn.classList.remove('copied');
        text.textContent = 'Copy Link';
      }, 2400);
    });
  }
}
customElements.define('copy-button', CopyButton);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 8: <cyber-toggle>
   -------------------------------------------------------------------------- */
class CyberToggle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="cyber-toggle-wrap">
        <button class="cyber-switch" type="button" aria-label="Toggle cyber switch" role="switch" aria-checked="false">
          <div class="cyber-track">
            <span class="cyber-status-text on">ON</span>
            <div class="cyber-thumb">
              <div class="cyber-thumb-core"></div>
            </div>
            <span class="cyber-status-text off">OFF</span>
          </div>
        </button>
      </div>
    `;

    const btn = this.querySelector('.cyber-switch');
    btn.addEventListener('click', () => {
      const isChecked = btn.classList.toggle('active');
      btn.setAttribute('aria-checked', isChecked ? 'true' : 'false');
    });
  }
}
customElements.define('cyber-toggle', CyberToggle);

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT 9: <quantum-loader>
   -------------------------------------------------------------------------- */
class QuantumLoader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="quantum-loader-wrap">
        <div class="quantum-spinner" aria-label="Loading animation">
          <div class="quantum-orbit orbit-1"></div>
          <div class="quantum-orbit orbit-2"></div>
          <div class="quantum-orbit orbit-3"></div>
          <div class="quantum-center-dot"></div>
        </div>
        <span class="quantum-label">QUANTUM CORE</span>
      </div>
    `;
  }
}
customElements.define('quantum-loader', QuantumLoader);

/* --------------------------------------------------------------------------
   COMPONENTS REGISTRY FOR HAPTIXUI
   -------------------------------------------------------------------------- */
export const COMPONENTS_REGISTRY = [
  {
    id: 'download-button',
    name: 'Animated Download Button',
    category: 'Buttons',
    badge: 'State Transition',
    views: '48.2K',
    likes: '4.8K',
    description: 'A 3-state morphing button: Idle with badge -> In-progress state with percentage interpolation -> Completion state with animated checkmark.',
    previewTag: '<download-button></download-button>',
    htmlCode: `<!-- Custom Element -->
<download-button duration="3000" auto-reset="true"></download-button>

<!-- Load Script & CSS -->
<script type="module" src="download-button.js"></script>
<link rel="stylesheet" href="download-button.css">`,
    cssCode: `/* The Morphing Pill */
.download-btn {
  width: 270px;
  height: 68px;
  border-radius: 9999px;
  background-color: #1c1d22;
  transition: all 0.4s ease;
}
.download-btn.is-downloading {
  background-color: #0099ff;
}
.download-btn.is-done {
  background-color: #1c1d22;
}`,
    jsCode: `// Transitions State Machine
const TRANSITIONS = {
  idle: { start: 'downloading' },
  downloading: { finish: 'done' },
  done: { reset: 'idle' }
};`
  },
  {
    id: 'cart-button',
    name: 'Add to Cart Delivery Button',
    category: 'Buttons',
    badge: 'Motion Sequence',
    views: '32.1K',
    likes: '3.1K',
    description: 'Shopping cart morphs into a delivery truck sequence with road animation and transitions to an order confirmed state.',
    previewTag: '<cart-button></cart-button>',
    htmlCode: `<cart-button></cart-button>`,
    cssCode: `.cart-btn.animating .truck-wrapper {
  animation: driveTruck 2.2s cubic-bezier(0.45, 0, 0.2, 1) forwards;
}
@keyframes driveTruck {
  0% { transform: translateX(0); }
  100% { transform: translateX(360px); }
}`,
    jsCode: `btn.addEventListener('click', () => {
  btn.classList.add('animating');
  setTimeout(() => btn.classList.add('ordered'), 2200);
});`
  },
  {
    id: 'heart-burst',
    name: 'Particle Heart Like Button',
    category: 'Buttons',
    badge: 'Particle System',
    views: '29.7K',
    likes: '2.9K',
    description: 'Interactive favorite button featuring spring scale physics, radial particle burst, and dynamic count increment.',
    previewTag: '<heart-button></heart-button>',
    htmlCode: `<heart-button></heart-button>`,
    cssCode: `@keyframes explodeSpark {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}`,
    jsCode: `// Emits 14 radial particles with calculated trigonometric trajectories`
  },
  {
    id: 'copy-button',
    name: 'Fluid Ripple Copy Button',
    category: 'Buttons',
    badge: 'State Feedback',
    views: '21.4K',
    likes: '2.3K',
    description: 'Haptic-style clipboard copy button that fluidly transitions from copy icon to emerald checkmark with instant feedback.',
    previewTag: '<copy-button></copy-button>',
    htmlCode: `<copy-button></copy-button>`,
    cssCode: `.copy-pill-btn.copied {
  background: #0d2818;
  border-color: #22c55e;
  color: #4ade80;
}`,
    jsCode: `btn.addEventListener('click', () => {
  btn.classList.add('copied');
  text.textContent = 'Copied!';
  setTimeout(() => btn.classList.remove('copied'), 2400);
});`
  },
  {
    id: 'trash-delete',
    name: 'Destructive Delete Button',
    category: 'Buttons',
    badge: 'Destructive Action',
    views: '19.8K',
    likes: '1.8K',
    description: 'Animated confirmation action: Container lid opens with spring ease, items drop in, and button locks into a deleted state.',
    previewTag: '<trash-button></trash-button>',
    htmlCode: `<trash-button></trash-button>`,
    cssCode: `.trash-btn:hover .trash-can-lid {
  transform: rotate(-30deg) translateY(-2px);
}
.trash-btn.deleting {
  animation: trashShake 0.4s ease infinite;
}`,
    jsCode: `btn.addEventListener('click', () => {
  btn.classList.add('deleting');
  setTimeout(() => btn.classList.add('deleted'), 1000);
});`
  },
  {
    id: 'theme-toggle',
    name: 'Celestial Day & Night Switch',
    category: 'Toggles',
    badge: 'Theme Switch',
    views: '36.5K',
    likes: '3.6K',
    description: 'Smooth celestial switch: Cratered moon with starry night sky morphs into radiant daylight sun with cloud geometry.',
    previewTag: '<theme-toggle></theme-toggle>',
    htmlCode: `<theme-toggle></theme-toggle>`,
    cssCode: `.theme-switch.is-day .celestial-orb {
  transform: translateX(40px);
  background: #facc15;
  box-shadow: 0 0 16px rgba(250, 204, 21, 0.9);
}`,
    jsCode: `toggle.addEventListener('click', () => {
  toggle.classList.toggle('is-day');
});`
  },
  {
    id: 'cyber-toggle',
    name: 'Pulse Cyber Toggle Switch',
    category: 'Toggles',
    badge: 'Tactile Toggle',
    views: '27.3K',
    likes: '2.7K',
    description: 'Futuristic mechanical tactile toggle with illuminated power rails, sliding armature and high-contrast status indicator.',
    previewTag: '<cyber-toggle></cyber-toggle>',
    htmlCode: `<cyber-toggle></cyber-toggle>`,
    cssCode: `.cyber-switch.active .cyber-thumb {
  transform: translateX(46px);
  background: #00a8ff;
}`,
    jsCode: `switchBtn.addEventListener('click', () => {
  switchBtn.classList.toggle('active');
});`
  },
  {
    id: 'hologram-card',
    name: '3D Holographic Tilt Card',
    category: 'Cards',
    badge: '3D Perspective',
    views: '44.1K',
    likes: '4.2K',
    description: 'Gyroscope-style mouse-tracking 3D tilt card with dynamic iridescent sheen following cursor coordinates.',
    previewTag: '<hologram-card></hologram-card>',
    htmlCode: `<hologram-card></hologram-card>`,
    cssCode: `.holo-card {
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
}`,
    jsCode: `card.addEventListener('mousemove', (e) => {
  const rotateX = ((y - centerY) / centerY) * -14;
  const rotateY = ((x - centerX) / centerX) * 14;
  card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});`
  },
  {
    id: 'quantum-loader',
    name: 'Infinity Quantum Orbit Loader',
    category: 'Loaders',
    badge: 'Micro-Motion',
    views: '31.8K',
    likes: '3.0K',
    description: 'Multi-axis 3D particle orbit loader spinning on 3 distinct rotational geometric planes with a pulsing energy nucleus.',
    previewTag: '<quantum-loader></quantum-loader>',
    htmlCode: `<quantum-loader></quantum-loader>`,
    cssCode: `.orbit-1 { animation: rotateOrbit1 1.6s linear infinite; }
.orbit-2 { animation: rotateOrbit2 1.4s linear infinite reverse; }
.orbit-3 { animation: rotateOrbit3 1.8s linear infinite; }`,
    jsCode: `// Pure CSS 3D hardware-accelerated transforms`
  }
];
