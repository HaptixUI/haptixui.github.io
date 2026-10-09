/**
 * DownloadButton - Custom Web Component
 * Accessible animated download button with 3-state transitions:
 * Idle (Dark Pill + Left Disc) -> Downloading (Progress & Interpolated %) -> Done (Success Disc)
 */

export const TRANSITIONS = {
  idle: { start: 'downloading' },
  downloading: { finish: 'done' },
  done: { reset: 'idle' }
};

export function formatPercent(p) {
  const percent = Math.min(100, Math.max(0, Math.floor(p)));
  return `${percent}%`;
}

class DownloadButton extends HTMLElement {
  static get observedAttributes() {
    return ['duration', 'download-url', 'filename', 'auto-reset', 'auto-reset-delay'];
  }

  constructor() {
    super();
    this.state = 'idle'; // 'idle' | 'downloading' | 'done'
    this.progress = 0;
    this._animationFrame = null;
    this._resetTimeout = null;
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  disconnectedCallback() {
    if (this._animationFrame) cancelAnimationFrame(this._animationFrame);
    if (this._resetTimeout) clearTimeout(this._resetTimeout);
  }

  get duration() {
    return parseInt(this.getAttribute('duration') || '3000', 10);
  }

  get autoReset() {
    return this.getAttribute('auto-reset') !== 'false';
  }

  get autoResetDelay() {
    return parseInt(this.getAttribute('auto-reset-delay') || '3000', 10);
  }


  get downloadUrl() {
    return this.getAttribute('download-url') || '';
  }

  get filename() {
    return this.getAttribute('filename') || 'downloaded-file.zip';
  }

  render() {
    this.innerHTML = `
      <div class="download-btn-container">
        <button class="download-btn" id="dbButton" aria-label="Download button" type="button">
          <!-- State 1: Left Blue Disc with Down Arrow -->
          <div class="db-disc" id="dbDisc">
            <svg viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
            </svg>
          </div>

          <!-- State 1: Label -->
          <div class="db-label-container">
            <span class="db-text-idle">Download</span>
          </div>

          <!-- State 2: Progress Track & Fill -->
          <div class="db-progress-track">
            <div class="db-progress-bar" id="dbProgressBar"></div>
          </div>

          <!-- State 2: Active Downloading Info (% + Arrow Right) -->
          <div class="db-downloading-content">
            <span class="db-percent-text" id="dbPercentText">0%</span>
            <div class="db-arrow-right">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </div>
          </div>

          <!-- State 3: Done State Content ("Done" + Green Check Disc) -->
          <div class="db-done-content">
            <span class="db-text-done">Done</span>
            <div class="db-done-disc">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    `;

    this.btn = this.querySelector('#dbButton');
    this.progressBar = this.querySelector('#dbProgressBar');
    this.percentText = this.querySelector('#dbPercentText');
  }

  bindEvents() {
    this.btn.addEventListener('click', () => {
      if (this.state === 'idle') {
        this.startDownload();
      } else if (this.state === 'done') {
        this.reset();
      }
    });
  }

  setProgressManually(currentPercent) {
    this.state = 'downloading';
    this.btn.classList.add('is-downloading');
    this.btn.classList.remove('is-done');
    this.progress = Math.min(100, Math.max(0, currentPercent));
    this.progressBar.style.width = `${this.progress}%`;
    this.percentText.textContent = formatPercent(this.progress);
  }

  startDownload() {
    if (this.state !== 'idle') return;

    this.state = TRANSITIONS.idle.start;
    this.progress = 0;
    this.btn.classList.add('is-downloading');
    this.btn.classList.remove('is-done');
    this.progressBar.style.width = '0%';
    this.percentText.textContent = '0%';

    this.dispatchEvent(new CustomEvent('download:start', { detail: { state: this.state } }));

    const startTime = performance.now();
    const duration = this.duration;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(1, elapsed / duration);

      // Realistic easing: starts quick, steady middle, smooth finish
      // Ease out cubic approximation
      const easeVal = 1 - Math.pow(1 - progressRatio, 2.4);
      const currentPercent = Math.min(100, Math.round(easeVal * 100));

      this.progress = currentPercent;
      this.progressBar.style.width = `${currentPercent}%`;
      this.percentText.textContent = formatPercent(currentPercent);

      this.dispatchEvent(new CustomEvent('download:progress', {
        detail: { progress: currentPercent, ratio: progressRatio }
      }));

      if (progressRatio < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      } else {
        this.progressBar.style.width = '100%';
        this.percentText.textContent = '100%';
        setTimeout(() => this.finish(), 180);
      }
    };

    this._animationFrame = requestAnimationFrame(animate);
  }

  finish() {
    this.state = TRANSITIONS.downloading.finish;
    this.btn.classList.remove('is-downloading');
    this.btn.classList.add('is-done');

    // Trigger real browser download if URL specified
    if (this.downloadUrl) {
      this.triggerBrowserDownload(this.downloadUrl, this.filename);
    }

    this.dispatchEvent(new CustomEvent('download:complete', { detail: { state: this.state } }));

    if (this.autoReset) {
      if (this._resetTimeout) clearTimeout(this._resetTimeout);
      this._resetTimeout = setTimeout(() => {
        this.reset();
      }, this.autoResetDelay);
    }
  }

  reset() {
    if (this._resetTimeout) clearTimeout(this._resetTimeout);
    if (this._animationFrame) cancelAnimationFrame(this._animationFrame);

    this.state = TRANSITIONS.done.reset;
    this.progress = 0;
    this.btn.classList.remove('is-downloading', 'is-done');
    this.progressBar.style.width = '0%';
    this.percentText.textContent = '0%';

    this.dispatchEvent(new CustomEvent('download:reset', { detail: { state: this.state } }));
  }

  triggerBrowserDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

customElements.define('download-button', DownloadButton);
