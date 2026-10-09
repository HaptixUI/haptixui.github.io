/**
 * HaptixUI - Component Registry & Custom Element Definitions
 * Production-ready Web Components with isolated logic and styling
 */

import './download-button.js';

/* --------------------------------------------------------------------------
   CUSTOM ELEMENT: <cart-button>
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
   CUSTOM ELEMENT: <heart-3d>
   Mathematical 3D Volumetric Heart Particle Cloud
   -------------------------------------------------------------------------- */
class Heart3D extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="heart-3d-container">
        <canvas class="heart-3d-canvas"></canvas>
      </div>
    `;

    const container = this.querySelector('.heart-3d-container');
    const canvas = this.querySelector('.heart-3d-canvas');
    const ctx = canvas.getContext('2d');

    // 1. Parametric Heart Equations
    const heartParametric = (u) => {
      const x = 1.6 * Math.pow(Math.sin(u), 3);
      const y = 1.3 * Math.cos(u) - 0.5 * Math.cos(2 * u) - 0.2 * Math.cos(3 * u) - 0.1 * Math.cos(4 * u);
      return { x, y };
    };

    // 2. Volumetric 3D Points Cloud
    const N = 2600;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const u = Math.random() * Math.PI * 2;
      const { x: hx, y: hy } = heartParametric(u);
      const rad = Math.sqrt(Math.random());
      const x = hx * rad;
      const y = hy * rad;
      const z = 1.1 * (1 - rad) * (Math.random() * 2 - 1);
      pts.push({ x, y, z });
    }

    // 3. Color Depth Palette (Pure Crimson to Radiant Ruby Red)
    const getDepthColor = (depth) => {
      const f = Math.max(0.0, Math.min(1.0, depth));
      const r = Math.round(70 + (255 - 70) * f);
      const g = Math.round(0 + 35 * f);
      const b = Math.round(15 + (65 - 15) * f);
      return `rgb(${r}, ${g}, ${b})`;
    };

    // 4. Responsive Canvas Sizing
    let width = 280, height = 210;
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 280;
      height = rect.height || 210;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    this._ro = new ResizeObserver(() => updateSize());
    this._ro.observe(container);
    updateSize();

    // 5. Interactive Drag & Natural Momentum Physics
    let theta = 0;
    let phi = 0;
    let velTheta = 0;
    let velPhi = 0;
    const idleSpeed = 0.026;
    let isDragging = false;
    let lastX = 0, lastY = 0;

    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velTheta = 0;
      velPhi = 0;
      container.setPointerCapture?.(e.pointerId);
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      // Natural trackball physics: drag up -> tilts up, drag down -> tilts down
      theta += dx * 0.01;
      phi += dy * 0.01;
      phi = Math.max(-0.75, Math.min(0.75, phi));

      velTheta = dx * 0.008;
      velPhi = dy * 0.008;

      lastX = e.clientX;
      lastY = e.clientY;
    });

    const stopDrag = () => { isDragging = false; };
    container.addEventListener('pointerup', stopDrag);
    container.addEventListener('pointercancel', stopDrag);

    // 6. 60 FPS Render Loop (Natural inertia & pure 3D rotation)
    const render = () => {
      if (!this.isConnected) return;
      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        theta += velTheta + idleSpeed;
        phi += velPhi;

        velTheta *= 0.93;
        velPhi *= 0.93;

        // Gently relax vertical pitch back toward center when idle
        phi += (0 - phi) * 0.025;
        phi = Math.max(-0.75, Math.min(0.75, phi));
      }

      const baseScale = Math.min(width, height) * 0.23;
      const cosT = Math.cos(theta), sinT = Math.sin(theta);
      const cosP = Math.cos(phi), sinP = Math.sin(phi);

      const projected = [];
      const len = pts.length;
      for (let i = 0; i < len; i++) {
        const pt = pts[i];
        const xr1 = pt.x * cosT + pt.z * sinT;
        const zr1 = -pt.x * sinT + pt.z * cosT;
        const yr1 = pt.y;

        const yr2 = yr1 * cosP - zr1 * sinP;
        const zr2 = yr1 * sinP + zr1 * cosP;
        const xr2 = xr1;

        projected.push({
          x: xr2,
          y: -yr2,
          z: zr2
        });
      }

      projected.sort((a, b) => a.z - b.z);

      const cx = width / 2;
      const cy = height / 2;

      // Render 3D Heart Points (Clean background, no blur stains)
      const pLen = projected.length;
      for (let i = 0; i < pLen; i++) {
        const p = projected[i];
        const depth = (p.z + 1.1) / 2.2;
        const px = cx + p.x * baseScale;
        const py = cy + p.y * baseScale;
        const dotSize = 1.3 + depth * 2.8;

        ctx.fillStyle = getDepthColor(depth);
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();

        if (depth > 0.9 && i % 4 === 0) {
          ctx.fillStyle = 'rgba(255, 235, 245, 0.9)';
          ctx.beginPath();
          ctx.arc(px, py, dotSize * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      this._animId = requestAnimationFrame(render);
    };

    this._animId = requestAnimationFrame(render);
  }

  disconnectedCallback() {
    if (this._animId) cancelAnimationFrame(this._animId);
    if (this._ro) this._ro.disconnect();
  }
}
customElements.define('heart-3d', Heart3D);

/* --------------------------------------------------------------------------
   COMPONENTS REGISTRY FOR HAPTIXUI
   -------------------------------------------------------------------------- */
export const COMPONENTS_REGISTRY = [
  {
    id: 'download-button',
    name: 'Animated Download Button',
    category: 'Buttons',
    badge: 'State Transition',
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
    id: 'heart-3d',
    name: '3D Rotating Glowing Heart',
    category: 'Interactive',
    badge: 'Canvas 3D',
    description: 'A 3D volumetric heart composed of 2,600 mathematical points plotted via cardioid parametric equations with pure continuous 360° rotation.',
    previewTag: '<heart-3d></heart-3d>',
    htmlCode: `<!-- Custom Element -->
<heart-3d></heart-3d>

<!-- Include Component Script & Styles -->
<script type="module" src="components.js"></script>
<link rel="stylesheet" href="components.css">`,
    cssCode: `/* 3D Canvas Container */
.heart-3d-container {
  position: relative;
  width: 100%;
  height: 220px;
  max-width: 320px;
  margin: 0 auto;
  cursor: grab;
  touch-action: none;
}
.heart-3d-container:active {
  cursor: grabbing;
}`,
    jsCode: `// Cardioid Parametric 3D Heart
function heart(u) {
  const x = 1.6 * Math.pow(Math.sin(u), 3);
  const y = 1.3 * Math.cos(u) - 0.5 * Math.cos(2*u) - 0.2 * Math.cos(3*u) - 0.1 * Math.cos(4*u);
  return { x, y };
}

// 2,800 Points 3D Projection & 60 FPS Rotation Loop`
  }
];
