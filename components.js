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
   CUSTOM ELEMENT: <sakura-tree>
   Recursive Blooming Sakura Cherry Blossom Fractal Tree (Sequential 10s Turtle Growth)
   -------------------------------------------------------------------------- */
class SakuraTree extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sakura-tree-container" title="Click to re-bloom branch-by-branch!">
        <canvas class="sakura-tree-canvas"></canvas>
      </div>
    `;

    const container = this.querySelector('.sakura-tree-container');
    const canvas = this.querySelector('.sakura-tree-canvas');
    const ctx = canvas.getContext('2d');

    let width = 320, height = 220;
    let branches = [];
    let nodes = [];
    const TOTAL_GROWTH_TIME = 20.0; // 20 seconds calm sequential growth
    let growthStartTime = performance.now();
    let windTime = 0;

    const buildTree = () => {
      branches = [];
      nodes = [];
      const startX = width / 2;
      const startY = height - 16;
      // Proportional bounds: guarantees at least 15-20% margin on all 4 sides with zero clipping!
      const trunkLen = Math.min(width * 0.74 / 5.25, height * 0.80 / 4.35);
      const cutoff = trunkLen * 0.15;
      const fSize = Math.max(3.2, trunkLen * 0.065);
      const nSize = Math.max(1.6, trunkLen * 0.032);

      const trace = (x, y, angle, len, depth) => {
        if (len < cutoff || depth === 0) {
          nodes.push({
            branchIndex: branches.length - 1,
            x: x,
            y: y,
            isLeaf: true,
            size: fSize
          });
          return;
        }

        const rad = angle * Math.PI / 180;
        const x2 = x + len * Math.sin(rad);
        const y2 = y - len * Math.cos(rad);
        const branchIdx = branches.length;

        branches.push({
          x1: x,
          y1: y,
          x2: x2,
          y2: y2,
          len: len,
          depth: depth,
          angle: angle,
          thickness: Math.max(1.1, (depth + 1) * (trunkLen / 45) * 0.95)
        });

        nodes.push({
          branchIndex: branchIdx,
          x: x2,
          y: y2,
          isLeaf: false,
          size: nSize
        });

        // Exact Turtle recursion (left 20 deg, right 20 deg)
        trace(x2, y2, angle - 20, len * 0.8, depth - 1);
        trace(x2, y2, angle + 20, len * 0.8, depth - 1);
      };

      trace(startX, startY, 0, trunkLen, 8);

      const branchDuration = TOTAL_GROWTH_TIME / branches.length;
      for (let i = 0; i < branches.length; i++) {
        branches[i].startTime = i * branchDuration;
        branches[i].endTime = (i + 1) * branchDuration;
      }
    };

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 320;
      height = rect.height || 220;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTree();
    };

    this._ro = new ResizeObserver(() => updateSize());
    this._ro.observe(container);
    updateSize();

    // Restart 10s sequential growth on click
    container.addEventListener('click', () => {
      growthStartTime = performance.now();
    });

    const petals = [];
    for (let i = 0; i < 28; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5 + 0.4,
        vy: Math.random() * 0.6 + 0.5,
        size: Math.random() * 3 + 2,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        alpha: Math.random() * 0.5 + 0.4
      });
    }

    const drawBlossom = (x, y, size) => {
      const colors = ['#ff7597', '#ffa3b8', '#ffccd7', '#fff0f3'];
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(Math.cos(a) * size * 0.65, Math.sin(a) * size * 0.65, size * 0.72, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!this.isConnected) return;
      ctx.clearRect(0, 0, width, height);

      const elapsed = (performance.now() - growthStartTime) / 1000;
      const currentTime = Math.min(elapsed, TOTAL_GROWTH_TIME);
      windTime += 0.02;

      let activeBranch = null;

      // Draw branches strictly in sequential order
      for (let i = 0; i < branches.length; i++) {
        const b = branches[i];
        if (currentTime < b.startTime) break; // Future branch, wait turn

        ctx.lineCap = 'round';
        ctx.lineWidth = b.thickness;
        ctx.strokeStyle = b.depth > 3 ? '#6d4427' : (b.depth > 1 ? '#8c5835' : '#a76d43');

        if (currentTime >= b.endTime) {
          ctx.beginPath();
          ctx.moveTo(b.x1, b.y1);
          ctx.lineTo(b.x2, b.y2);
          ctx.stroke();
        } else {
          // Current branch growing smoothly from start to tip
          const branchDur = b.endTime - b.startTime;
          const prog = (currentTime - b.startTime) / branchDur;
          const curX = b.x1 + (b.x2 - b.x1) * prog;
          const curY = b.y1 + (b.y2 - b.y1) * prog;

          ctx.beginPath();
          ctx.moveTo(b.x1, b.y1);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          activeBranch = { x: curX, y: curY, angle: b.angle };
          break; // Sequential: only one branch grows at a time
        }
      }

      // Draw blossom nodes as branches complete
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const b = branches[n.branchIndex];
        if (!b || currentTime < b.endTime) continue;

        if (n.isLeaf) {
          drawBlossom(n.x, n.y, n.size);
        } else {
          ctx.fillStyle = 'rgba(255, 140, 170, 0.85)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Glowing active pen tip during growth
      if (activeBranch && currentTime < TOTAL_GROWTH_TIME) {
        ctx.save();
        ctx.translate(activeBranch.x, activeBranch.y);
        ctx.fillStyle = '#ff3b69';
        ctx.shadowColor = 'rgba(255, 59, 105, 0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Falling drifting petals when mature or late in growth
      if (currentTime > 6.0) {
        const petalAlpha = Math.min(1.0, (currentTime - 6.0) / 6.0);
        petals.forEach(p => {
          p.x += p.vx + Math.sin(windTime + p.y * 0.01) * 0.4;
          p.y += p.vy;
          p.rot += p.vRot;

          if (p.y > height + 8) {
            p.y = -6;
            p.x = Math.random() * width;
          }
          if (p.x > width + 8) p.x = -6;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(255, 125, 160, ${p.alpha * petalAlpha})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
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
customElements.define('sakura-tree', SakuraTree);

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
    htmlCode: `<!-- Method 1: Web Component (Zero Setup) -->
<heart-3d></heart-3d>
<script type="module" src="components.js"></script>
<link rel="stylesheet" href="components.css">

<!-- Method 2: Standalone HTML5 Canvas -->
<!-- <canvas id="heartCanvas" width="600" height="600"></canvas> -->`,
    cssCode: `/* 3D Heart Canvas Container */
.heart-3d-container, #heartCanvas {
  position: relative;
  width: 100%;
  height: 220px;
  max-width: 320px;
  margin: 0 auto;
  cursor: grab;
  touch-action: none;
  background: transparent;
}
.heart-3d-container:active, #heartCanvas:active {
  cursor: grabbing;
}`,
    jsCode: `// 0. Canvas Setup
const canvas = document.getElementById('heartCanvas') || document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width || 600;
const height = canvas.height || 600;
const cx = width / 2;
const cy = height / 2;
const scale = 140;

// 1. Parametric 3D Heart Equation
function heart(u) {
  const x = 1.6 * Math.pow(Math.sin(u), 3);
  const y = 1.3 * Math.cos(u)
          - 0.5 * Math.cos(2 * u)
          - 0.2 * Math.cos(3 * u)
          - 0.1 * Math.cos(4 * u);
  return { x, y };
}

// 2. Generate 3,000 Volumetric Points
const points = [];
for (let i = 0; i < 3000; i++) {
  const u = Math.random() * Math.PI * 2;
  const { x, y } = heart(u);
  const rad = Math.sqrt(Math.random());
  const z = 1.1 * (1 - rad) * (Math.random() * 2 - 1);
  points.push({ x: x * rad, y: y * rad, z });
}

// 3. Real-Time 3D Rotation Matrix
function rotate3D(x, y, z, theta) {
  const xr = x * Math.cos(theta) + z * Math.sin(theta);
  const zr = -x * Math.sin(theta) + z * Math.cos(theta);
  return { xr, yr: y, zr };
}

// 4. Depth Sorting & Color Shading
function getDepthColor(depth) {
  const f = Math.max(0, Math.min(1, depth));
  const r = Math.round(145 + 100 * f);
  const g = Math.round(15 + 5 * f);
  const b = Math.round(30 + 35 * f);
  return \`rgb(\${r}, \${g}, \${b})\`;
}

function drawGlowPoint(px, py, depth) {
  const size = 1.2 + depth * 1.8;
  ctx.fillStyle = getDepthColor(depth);
  ctx.beginPath();
  ctx.arc(px, py, size, 0, Math.PI * 2);
  ctx.fill();
}

// 5. 60 FPS Canvas Render Loop
function render(time = 0) {
  ctx.clearRect(0, 0, width, height);
  const theta = time * 0.002;

  const projected = points.map(pt => rotate3D(pt.x, pt.y, pt.z, theta));
  projected.sort((a, b) => a.zr - b.zr);

  projected.forEach(({ xr, yr, zr }) => {
    const depth = (zr + 1.1) / 2.2;
    const px = cx + xr * scale;
    const py = cy - yr * scale;
    drawGlowPoint(px, py, depth);
  });

  requestAnimationFrame(render);
}
requestAnimationFrame(render);`
  },
  {
    id: 'sakura-tree',
    name: 'Sakura Fractal Tree',
    category: 'Interactive',
    badge: 'Generative Canvas',
    description: 'An organic recursive fractal tree blooming with soft cherry blossom petals and falling sakura breezes at 60 FPS.',
    previewTag: '<sakura-tree></sakura-tree>',
    htmlCode: `<!-- Custom Element -->
<sakura-tree></sakura-tree>

<!-- Load Component Script & Styles -->
<script type="module" src="components.js"></script>
<link rel="stylesheet" href="components.css">`,
    cssCode: `/* Sakura Tree Stage */
.sakura-tree-container {
  width: 100%;
  height: 220px;
  position: relative;
  cursor: pointer;
  touch-action: none;
}
.sakura-tree-canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
    jsCode: `// 1. Recursive Fractal Branching
function drawBranch(x, y, len, angle, depth) {
  if (depth === 0) {
    drawBlossoms(x, y);
    return;
  }
  const x2 = x + len * Math.sin(angle);
  const y2 = y - len * Math.cos(angle);

  ctx.lineWidth = Math.max(1, depth * 1.4);
  ctx.strokeStyle = getBarkColor(depth);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Recursive bifurcations
  drawBranch(x2, y2, len * 0.78, angle - 0.36, depth - 1);
  drawBranch(x2, y2, len * 0.78, angle + 0.36, depth - 1);
}

// 2. Sakura Petal Blossom Clusters
function drawBlossoms(x, y) {
  ctx.fillStyle = '#ff7597';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(x, y - 4, 3, 5, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 3. 60 FPS Breeze Sway Loop
function render() {
  ctx.clearRect(0, 0, width, height);
  drawBranch(width / 2, height - 20, 110, 0, 8);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);`
  }
];
