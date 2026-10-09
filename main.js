/**
 * HaptixUI - Main Application Script
 * Responsive catalog manager with instant search, category filtering,
 * mega-dropdown menu, stage theme switching, and inspector code modal.
 */

import { COMPONENTS_REGISTRY } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const grid = document.getElementById('componentsGrid');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const sortSelect = document.getElementById('sortSelect');
  const browseCategoryTitle = document.getElementById('browseCategoryTitle');
  const browseSubtitle = document.getElementById('browseSubtitle');
  const browseCountBadge = document.getElementById('browseCountBadge');

  // Sidebar & Navigation
  const appLayout = document.getElementById('appLayout');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const sidebarExpandFloatBtn = document.getElementById('sidebarExpandFloatBtn');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  const themePillButtons = document.querySelectorAll('.theme-pill-btn');

  // Search shortcuts
  const navSearchTrigger = document.getElementById('navSearchTrigger');

  // Inspector Modal Elements
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalPreviewStage = document.getElementById('modalPreviewStage');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');
  const modalCopyBtn = document.getElementById('modalCopyBtn');
  const modalTabButtons = document.querySelectorAll('.tab-btn');
  const modalStageThemeBtn = document.getElementById('modalStageThemeBtn');

  // Toast
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  // State
  let activeCategory = 'All';
  let searchQuery = '';
  let activeSort = 'popular';
  let globalStageTheme = 'dark'; // 'dark' | 'black' | 'light'
  let activeModalComponent = null;
  let activeTab = 'html';

  function showToast(msg) {
    if (!toast) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Sidebar Toggle / Collapse functionality
  const isSavedCollapsed = localStorage.getItem('haptixui_sidebar_collapsed') === 'true';
  if (isSavedCollapsed && appLayout) {
    appLayout.classList.add('sidebar-collapsed');
    if (sidebarToggleBtn) {
      sidebarToggleBtn.classList.remove('active');
      sidebarToggleBtn.setAttribute('aria-pressed', 'false');
    }
  }

  function toggleSidebar(forceState) {
    if (!appLayout) return;
    const shouldCollapse = forceState !== undefined 
      ? !forceState 
      : !appLayout.classList.contains('sidebar-collapsed');

    appLayout.classList.toggle('sidebar-collapsed', shouldCollapse);
    const isNowVisible = !shouldCollapse;

    if (sidebarToggleBtn) {
      sidebarToggleBtn.classList.toggle('active', isNowVisible);
      sidebarToggleBtn.setAttribute('aria-pressed', isNowVisible ? 'true' : 'false');
    }

    localStorage.setItem('haptixui_sidebar_collapsed', shouldCollapse ? 'true' : 'false');
    showToast(isNowVisible ? 'Categories sidebar shown' : 'Categories sidebar hidden');
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar();
    });
  }

  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar(false);
    });
  }

  if (sidebarExpandFloatBtn) {
    sidebarExpandFloatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar(true);
    });
  }

  // Set Active Category
  function setCategory(cat) {
    activeCategory = cat;

    // Update Sidebar active state
    sidebarNavItems.forEach(item => {
      item.classList.toggle('active', item.dataset.category === cat);
    });

    // Update Page Titles
    if (cat === 'All') {
      browseCategoryTitle.textContent = 'Browse all';
      browseSubtitle.textContent = 'Open-Source animated UI elements made with pure CSS & Web Components';
    } else {
      browseCategoryTitle.textContent = cat;
      browseSubtitle.textContent = `Interactive ${cat.toLowerCase()} with pure CSS and zero external dependencies`;
    }

    renderGrid();
  }

  // Sidebar category clicks
  sidebarNavItems.forEach(item => {
    item.addEventListener('click', () => {
      setCategory(item.dataset.category);
    });
  });

  // Global Stage Theme Switches
  themePillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      themePillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      globalStageTheme = btn.dataset.theme;

      // Apply to all stages
      document.querySelectorAll('.comp-stage').forEach(stage => {
        stage.classList.remove('stage-black', 'stage-light');
        if (globalStageTheme === 'black') stage.classList.add('stage-black');
        if (globalStageTheme === 'light') stage.classList.add('stage-light');
      });
    });
  });

  // Search Input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    searchClearBtn.classList.toggle('visible', searchQuery.length > 0);
    renderGrid();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.classList.remove('visible');
    renderGrid();
  });

  // Quick Search Trigger (Ctrl+K or nav search)
  if (navSearchTrigger) {
    navSearchTrigger.addEventListener('click', () => {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  window.addEventListener('keydown', (e) => {
    // Ctrl+B or Cmd+B to toggle categories sidebar
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
    // Ctrl+K or Cmd+K to focus search input
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Sort dropdown
  sortSelect.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderGrid();
  });

  // Render Grid
  function renderGrid() {
    grid.innerHTML = '';

    // Filter
    let filtered = COMPONENTS_REGISTRY.filter((comp) => {
      const matchCat = activeCategory === 'All' || comp.category === activeCategory;
      const matchQuery = comp.name.toLowerCase().includes(searchQuery) ||
                         comp.description.toLowerCase().includes(searchQuery) ||
                         comp.category.toLowerCase().includes(searchQuery);
      return matchCat && matchQuery;
    });

    // Sort
    if (activeSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === 'views') {
      filtered.sort((a, b) => parseFloat(b.views || '0') - parseFloat(a.views || '0'));
    }

    // Update count badge
    browseCountBadge.textContent = `${filtered.length} element${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #64748b; background: #0c0e15; border-radius: 18px; border: 1px dashed rgba(255,255,255,0.1);">
          <p style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">No elements found for "${searchQuery}"</p>
          <p style="font-size: 14px; margin-bottom: 16px;">Try searching for "button", "toggle", "card", or reset filters.</p>
          <button id="resetSearchBtn" style="background: rgba(0, 168, 255, 0.15); border: 1px solid #00a8ff; color: #00a8ff; padding: 7px 16px; border-radius: 8px; font-weight: 600; cursor: pointer;">Reset Search</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetSearchBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          searchClearBtn.classList.remove('visible');
          setCategory('All');
        });
      }
      return;
    }

    filtered.forEach((comp) => {
      const card = document.createElement('article');
      card.className = 'comp-card';

      // Determine initial stage theme class
      let stageClass = '';
      if (globalStageTheme === 'black') stageClass = 'stage-black';
      if (globalStageTheme === 'light') stageClass = 'stage-light';

      card.innerHTML = `
        <div class="comp-stage ${stageClass}" id="stage-${comp.id}">
          <div class="comp-stage-tools">
            <button class="stage-theme-btn" title="Toggle this stage background (Dark / Light)" aria-label="Toggle stage theme">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
              </svg>
            </button>
          </div>
          <div class="comp-instance">${comp.previewTag}</div>
        </div>

        <div class="comp-body">
          <div class="comp-info-top">
            <h2 class="comp-title">${comp.name}</h2>
            <span class="comp-badge">${comp.badge}</span>
          </div>

          <div class="comp-stats-row">
            <div class="comp-stats-left">
              <span class="stat-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                ${comp.views || '24.5K'}
              </span>
              <span class="stat-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                ${comp.likes || '2.1K'}
              </span>
            </div>
            <span style="font-size: 11px; color: #64748b;">${comp.category}</span>
          </div>

          <div class="comp-actions-row">
            <button class="btn-get-code inspect-btn" data-id="${comp.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Get Code
            </button>
            <button class="btn-quick-copy quick-copy-btn" data-id="${comp.id}" title="Quick copy HTML tag" aria-label="Copy component tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
        </div>
      `;

      // Stage single-card theme switcher
      const stageEl = card.querySelector('.comp-stage');
      const themeBtn = card.querySelector('.stage-theme-btn');
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stageEl.classList.toggle('stage-light');
      });

      // Quick Copy
      const copyBtn = card.querySelector('.quick-copy-btn');
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard?.writeText(comp.htmlCode).then(() => {
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
          `;
          showToast(`Copied <${comp.id}> HTML snippet!`);
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            `;
          }, 2000);
        });
      });

      // Inspect Modal
      const inspectBtn = card.querySelector('.inspect-btn');
      inspectBtn.addEventListener('click', () => {
        openModal(comp);
      });

      grid.appendChild(card);
    });
  }

  // Open Inspector Modal
  function openModal(comp) {
    activeModalComponent = comp;
    modalTitle.textContent = comp.name;
    modalBadge.textContent = comp.badge;

    // Clone interactive element into modal
    modalPreviewStage.innerHTML = comp.previewTag;

    // Update code snippet for active tab
    renderModalCode();

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    activeModalComponent = null;
    modalPreviewStage.innerHTML = '';
  }

  function renderModalCode() {
    if (!activeModalComponent) return;
    if (activeTab === 'html') {
      modalCodeSnippet.textContent = activeModalComponent.htmlCode;
    } else if (activeTab === 'css') {
      modalCodeSnippet.textContent = activeModalComponent.cssCode;
    } else if (activeTab === 'js') {
      modalCodeSnippet.textContent = activeModalComponent.jsCode;
    }
  }

  modalTabButtons.forEach((tab) => {
    tab.addEventListener('click', () => {
      modalTabButtons.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      renderModalCode();
    });
  });

  // Modal copy button
  modalCopyBtn.addEventListener('click', () => {
    const textToCopy = modalCodeSnippet.textContent;
    navigator.clipboard?.writeText(textToCopy).then(() => {
      showToast(`${activeTab.toUpperCase()} code copied to clipboard!`);
    });
  });

  // Modal Stage Theme
  modalStageThemeBtn.addEventListener('click', () => {
    modalPreviewStage.parentElement.classList.toggle('stage-light');
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Initial load
  renderGrid();

  // Deep-linking: Automatically open modal for direct reel shares (e.g. ?id=download-button)
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('id') || window.location.hash.replace('#', '');
  if (targetId) {
    const comp = COMPONENTS_REGISTRY.find((c) => c.id === targetId || 
      (targetId === 'cart-button' && (c.id === 'cart-truck' || c.id === 'cart-button')) ||
      (targetId === 'cart-truck' && (c.id === 'cart-truck' || c.id === 'cart-button'))
    );
    if (comp) {
      setTimeout(() => openModal(comp), 400);
    }
  }
});
