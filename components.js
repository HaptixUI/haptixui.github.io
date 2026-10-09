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
   COMPONENTS REGISTRY FOR HAPTIXUI (ONLY 2 CORE PRODUCTION BUTTONS)
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
  }
];
