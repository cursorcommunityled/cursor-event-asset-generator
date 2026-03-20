import { toPng, toSvg } from "html-to-image";

import {
  BRAND_COLORS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  DEFAULT_EXPORT_PX,
  DEFAULT_PRIMARY_ASSET_ID,
  DEFAULT_SECONDARY_ASSET_ID,
  EXPORT_SIZE_MAX_PX,
  EXPORT_SIZE_MIN_PX,
  EXPORT_SIZE_SHORTCUTS,
  LOCKUP_VERTICAL_2D_DARK,
  clampExportSizePx,
  getAssetById,
  getAssetWidth,
  getCategoryAssets,
  getThemedVariantId,
} from "./lumaTileAssets.js";

/**
 * @param {HTMLElement} container
 * @param {{ boot?: string | undefined, navigate: (p: string) => void, onGuidelines: () => void, onColours: () => void }} ctx
 */
export function mountTileEditor(container, { boot, navigate, onGuidelines, onColours }) {
  const state = {
    theme: /** @type {"dark" | "light"} */ ("dark"),
    eyebrow: "Cursor community",
    chapter: "Krakow",
    subtitle: "Community event",
    footer: "cursor.com",
    exportSizePx: DEFAULT_EXPORT_PX,
    primaryCategory: "General Logos/Cube",
    primaryAssetId: DEFAULT_PRIMARY_ASSET_ID,
    secondaryCategory: "General Logos/Wordmark",
    secondaryAssetId: DEFAULT_SECONDARY_ASSET_ID,
    showSecondaryAsset: true,
    primaryScale: 100,
    secondaryScale: 100,
    exportFormat: /** @type {"png" | "svg"} */ ("png"),
    mobileTab: /** @type {"build" | "preview"} */ ("build"),
    exportModalOpen: false,
    exportSizeMenuOpen: false,
    isExporting: false,
    errorMessage: "",
  };

  function runPresetLumaDark() {
    state.theme = "dark";
    state.eyebrow = "Cursor community";
    state.chapter = "Krakow";
    state.subtitle = "Community event";
    state.footer = "cursor.com";
    state.exportSizePx = DEFAULT_EXPORT_PX;
    state.primaryCategory = "General Logos/Cube";
    state.primaryAssetId = DEFAULT_PRIMARY_ASSET_ID;
    state.secondaryCategory = "General Logos/Wordmark";
    state.secondaryAssetId = DEFAULT_SECONDARY_ASSET_ID;
    state.showSecondaryAsset = true;
    state.primaryScale = 100;
    state.secondaryScale = 100;
    state.errorMessage = "";
  }

  function runPresetLumaLight() {
    state.theme = "light";
    state.eyebrow = "Cursor community";
    state.chapter = "Your city";
    state.subtitle = "Community event";
    state.footer = "cursor.com";
    state.primaryCategory = "General Logos/Cube";
    state.primaryAssetId = getThemedVariantId(DEFAULT_PRIMARY_ASSET_ID, "light");
    state.secondaryCategory = "General Logos/Wordmark";
    state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "light");
    state.showSecondaryAsset = true;
    state.primaryScale = 100;
    state.secondaryScale = 100;
    state.errorMessage = "";
  }

  function runPresetPromoCopy() {
    state.theme = "dark";
    state.eyebrow = "Save the date";
    state.chapter = "Your city";
    state.subtitle = "In-person meetup";
    state.footer = "cursor.com";
    state.primaryCategory = "General Logos/Cube";
    state.primaryAssetId = getThemedVariantId(DEFAULT_PRIMARY_ASSET_ID, "dark");
    state.secondaryCategory = "General Logos/Wordmark";
    state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "dark");
    state.showSecondaryAsset = true;
    state.primaryScale = 105;
    state.secondaryScale = 100;
    state.errorMessage = "";
  }

  function runPresetLockupSoloDark() {
    state.theme = "dark";
    state.eyebrow = "Cursor community";
    state.chapter = "Your city";
    state.subtitle = "";
    state.footer = "cursor.com";
    state.primaryCategory = "General Logos/Lockup Vertical";
    state.primaryAssetId = LOCKUP_VERTICAL_2D_DARK;
    state.secondaryCategory = "General Logos/Wordmark";
    state.secondaryAssetId = getThemedVariantId(DEFAULT_SECONDARY_ASSET_ID, "dark");
    state.showSecondaryAsset = false;
    state.primaryScale = 100;
    state.secondaryScale = 100;
    state.errorMessage = "";
  }

  if (boot === "luma-dark") {
    runPresetLumaDark();
  } else if (boot === "luma-light") {
    runPresetLumaLight();
  } else if (boot === "lockup") {
    runPresetLockupSoloDark();
  }

  container.innerHTML = `
    <div class="editor-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" id="tile-back">← Assets center</button>
          <p class="eyebrow">Square graphics</p>
          <h1 class="app-top-bar-title">Square designer</h1>
          <p class="app-top-bar-tagline">
            Build in the preview; use <strong>Export</strong> to pick format (PNG or SVG) and square output size.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" id="tile-guidelines">Guidelines</button>
            <button type="button" class="button-text" id="tile-colours">Colours</button>
          </nav>
          <div class="app-top-bar-buttons">
            <button type="button" class="button button-secondary" id="tile-reset">Reset</button>
            <button type="button" class="button button-primary" id="tile-export-open">Export…</button>
          </div>
        </div>
      </header>

      <dialog class="export-modal panel" id="export-dialog" aria-labelledby="export-modal-title">
        <h2 id="export-modal-title" class="export-modal-title">Export graphic</h2>
        <p class="export-modal-lead">
          Square output. PNG is a flat bitmap; SVG wraps the layout (editable in many tools - text uses web fonts).
        </p>
        <div class="export-modal-block">
          <span id="export-format-label" class="export-modal-label">Format</span>
          <fieldset class="export-format-segmented" aria-labelledby="export-format-label">
            <legend class="visually-hidden">Export format</legend>
            <button type="button" class="export-format-segment" id="fmt-png" data-fmt="png">PNG</button>
            <button type="button" class="export-format-segment" id="fmt-svg" data-fmt="svg">SVG</button>
          </fieldset>
        </div>
        <div class="export-modal-block">
          <span id="export-size-label" class="export-modal-label">Square size</span>
          <div class="export-size-dropdown" id="export-size-dropdown">
            <button type="button" id="export-size-trigger" class="export-size-dropdown-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="export-size-menu" aria-labelledby="export-size-label">
              <span class="export-size-dropdown-value" id="export-size-value"></span>
              <span class="export-size-dropdown-chevron" id="export-size-chevron" aria-hidden="true"></span>
            </button>
            <div id="export-size-menu" class="export-size-dropdown-panel" hidden>
              <p class="export-size-dropdown-heading">Presets</p>
              <div class="export-size-dropdown-grid" id="export-size-grid"></div>
              <div class="export-size-dropdown-custom">
                <label for="export-modal-custom-px" class="export-size-dropdown-custom-label">Custom</label>
                <input id="export-modal-custom-px" type="number" inputmode="numeric" min="${EXPORT_SIZE_MIN_PX}" max="${EXPORT_SIZE_MAX_PX}" step="1" class="export-size-dropdown-custom-input" />
              </div>
            </div>
          </div>
          <p class="export-modal-hint" id="export-modal-hint"></p>
        </div>
        <p class="export-modal-filename">File: <code id="export-filename"></code></p>
        <p class="error-message export-modal-error" id="export-error" hidden></p>
        <div class="export-modal-actions">
          <button type="button" class="button button-secondary" id="export-cancel">Cancel</button>
          <button type="button" class="button button-primary" id="export-download">Download</button>
        </div>
      </dialog>

      <div class="mobile-tab-bar" role="tablist" aria-label="Mobile view">
        <button type="button" role="tab" class="mobile-tab" id="tab-build" aria-selected="true">Build</button>
        <button type="button" role="tab" class="mobile-tab" id="tab-preview" aria-selected="false">Preview</button>
      </div>

      <main class="app-body" id="tile-main" data-mobile-tab="build">
        <section class="app-main panel panel-preview" aria-label="Live preview">
          <div class="preview-hero">
            <div class="preview-frame">
              <div class="preview-frame-meter">
                <div class="event-tile-fit">
                <div class="event-tile" id="tile-preview-root">
                  <div class="event-tile-noise"></div>
                  <div class="event-tile-content">
                    <div class="event-tile-top"><p class="event-tile-eyebrow" id="pv-eyebrow"></p></div>
                    <div class="event-tile-main">
                      <div class="event-tile-brand">
                        <img class="event-tile-primary-asset" id="pv-primary" alt="" />
                        <img class="event-tile-secondary-asset" id="pv-secondary" alt="" />
                      </div>
                      <div class="event-tile-copy">
                        <p class="event-tile-title" id="pv-title"></p>
                        <p class="event-tile-subtitle" id="pv-subtitle"></p>
                      </div>
                    </div>
                    <div class="event-tile-bottom"><p class="event-tile-footer" id="pv-footer"></p></div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div class="preview-summary" aria-live="polite">
              <span class="preview-summary-item" id="sum-theme"></span>
              <span class="preview-summary-sep">·</span>
              <span class="preview-summary-item" id="sum-export"></span>
            </div>
            <p class="error-message error-message-preview" id="preview-err" hidden></p>
          </div>
        </section>
        <aside class="app-rail panel panel-controls" aria-label="Build controls">
          <div class="rail-inner" id="rail-inner"></div>
        </aside>
      </main>
    </div>
  `;

  const railHtml = `
    <div class="build-card">
      <h2 class="build-card-title">Quick start</h2>
      <p class="build-card-hint">Pick a preset, then edit copy.</p>
      <div class="preset-chips">
        <button type="button" class="chip" id="pre-luma-dark">Luma (dark)</button>
        <button type="button" class="chip" id="pre-luma-light">Luma (light)</button>
        <button type="button" class="chip" id="pre-promo">Promo / save the date</button>
        <button type="button" class="chip" id="pre-lockup">Lockup only</button>
      </div>
      <div class="field-group">
        <label for="theme">Theme</label>
        <select id="theme"><option value="dark">Dark</option><option value="light">Light</option></select>
      </div>
    </div>
    <div class="build-card">
      <h2 class="build-card-title">Event copy</h2>
      <p class="build-card-hint">Main content users see on the tile.</p>
      <div class="field-group rail-field-first">
        <label for="eyebrow">Eyebrow</label>
        <input id="eyebrow" type="text" maxlength="40" placeholder="Cursor community" />
      </div>
      <div class="field-group">
        <label for="chapter">Title</label>
        <input id="chapter" type="text" maxlength="50" placeholder="Krakow" />
      </div>
      <div class="field-group">
        <label for="subtitle">Subtitle</label>
        <input id="subtitle" type="text" maxlength="60" placeholder="Community event" />
      </div>
      <div class="field-group">
        <label for="footer">Footer</label>
        <input id="footer" type="text" maxlength="40" placeholder="cursor.com" />
      </div>
    </div>
    <details class="build-card rail-advanced">
      <summary class="rail-advanced-summary">Advanced brand controls</summary>
      <div class="rail-advanced-body">
        <div class="asset-block">
          <h3 class="asset-block-title">Primary</h3>
          <div class="field-row">
            <div class="field-group rail-field-first">
              <label for="primary-category">Family</label>
              <select id="primary-category"></select>
            </div>
            <div class="field-group">
              <label for="primary-asset">File</label>
              <select id="primary-asset"></select>
            </div>
          </div>
          <div class="field-group">
            <label for="primary-scale">Size</label>
            <input id="primary-scale" type="range" min="70" max="140" step="5" />
            <p class="field-help" id="primary-scale-help"></p>
          </div>
        </div>
        <div class="asset-block asset-block-secondary">
          <div class="toggle-row">
            <h3 class="asset-block-title">Secondary</h3>
            <label class="checkbox-label">
              <input type="checkbox" id="show-secondary" /> <span>Show</span>
            </label>
          </div>
          <div id="secondary-controls">
            <div class="field-row">
              <div class="field-group rail-field-first">
                <label for="secondary-category">Family</label>
                <select id="secondary-category"></select>
              </div>
              <div class="field-group">
                <label for="secondary-asset">File</label>
                <select id="secondary-asset"></select>
              </div>
            </div>
            <div class="field-group">
              <label for="secondary-scale">Size</label>
              <input id="secondary-scale" type="range" min="70" max="140" step="5" />
              <p class="field-help" id="secondary-scale-help"></p>
            </div>
          </div>
        </div>
      </div>
    </details>
  `;

  const railInner = container.querySelector("#rail-inner");
  if (railInner) {
    railInner.innerHTML = railHtml;
  }

  const el = (id) => container.querySelector(`#${id}`);
  const previewRoot = /** @type {HTMLElement | null} */ (el("tile-preview-root"));
  const previewFrameMeter = /** @type {HTMLElement | null} */ (container.querySelector(".preview-frame-meter"));
  const tileFit = /** @type {HTMLElement | null} */ (container.querySelector(".event-tile-fit"));
  const exportDialog = /** @type {HTMLDialogElement | null} */ (el("export-dialog"));
  let exportAnchorEl = /** @type {HTMLElement | null} */ (el("tile-export-open"));
  const exportSizeDropdown = el("export-size-dropdown");
  const exportSizeMenu = el("export-size-menu");
  const exportSizeTrigger = el("export-size-trigger");
  const exportSizeChevron = el("export-size-chevron");
  let sizeRaf = 0;

  function syncPreviewSquareSize() {
    if (!previewFrameMeter || !tileFit) {
      return;
    }
    // Keep a little breathing room so the preview feels balanced
    // and avoids edge clipping on short laptop viewports.
    const side = Math.floor(Math.min(previewFrameMeter.clientWidth, previewFrameMeter.clientHeight, 760) * 0.84);
    if (side <= 0) {
      return;
    }
    tileFit.style.width = `${side}px`;
    tileFit.style.height = `${side}px`;
  }

  function schedulePreviewSquareSize() {
    if (sizeRaf) {
      cancelAnimationFrame(sizeRaf);
    }
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0;
      syncPreviewSquareSize();
    });
  }

  function fillCategorySelect(selectEl, currentCat) {
    if (!selectEl) {
      return;
    }
    selectEl.innerHTML = CATEGORY_ORDER.map(
      (c) => `<option value="${c}">${CATEGORY_LABELS[c]}</option>`,
    ).join("");
    selectEl.value = currentCat;
  }

  function fillAssetSelect(selectEl, category, currentId) {
    if (!selectEl) {
      return;
    }
    const opts = getCategoryAssets(category);
    selectEl.innerHTML = opts.map((a) => `<option value="${a.id}">${a.label}</option>`).join("");
    if (opts.some((a) => a.id === currentId)) {
      selectEl.value = currentId;
    } else if (opts[0]) {
      selectEl.value = opts[0].id;
    }
  }

  function syncFormFromState() {
    /** @type {HTMLInputElement | null} */ (el("eyebrow")).value = state.eyebrow;
    /** @type {HTMLInputElement | null} */ (el("chapter")).value = state.chapter;
    /** @type {HTMLInputElement | null} */ (el("subtitle")).value = state.subtitle;
    /** @type {HTMLInputElement | null} */ (el("footer")).value = state.footer;
    /** @type {HTMLSelectElement | null} */ (el("theme")).value = state.theme;
    /** @type {HTMLInputElement | null} */ (el("primary-scale")).value = String(state.primaryScale);
    /** @type {HTMLInputElement | null} */ (el("secondary-scale")).value = String(state.secondaryScale);
    /** @type {HTMLInputElement | null} */ (el("show-secondary")).checked = state.showSecondaryAsset;

    fillCategorySelect(/** @type {HTMLSelectElement | null} */ (el("primary-category")), state.primaryCategory);
    fillCategorySelect(/** @type {HTMLSelectElement | null} */ (el("secondary-category")), state.secondaryCategory);
    fillAssetSelect(/** @type {HTMLSelectElement | null} */ (el("primary-asset")), state.primaryCategory, state.primaryAssetId);
    fillAssetSelect(/** @type {HTMLSelectElement | null} */ (el("secondary-asset")), state.secondaryCategory, state.secondaryAssetId);

    state.primaryAssetId = /** @type {HTMLSelectElement} */ (el("primary-asset")).value;
    state.secondaryAssetId = /** @type {HTMLSelectElement} */ (el("secondary-asset")).value;
  }

  function syncPreview() {
    const palette = BRAND_COLORS[state.theme];
    const primary = getAssetById(state.primaryAssetId);
    const secondary = getAssetById(state.secondaryAssetId);
    if (!previewRoot) {
      return;
    }
    previewRoot.className = `event-tile event-tile-${state.theme}`;
    previewRoot.style.backgroundColor = palette.bg;
    previewRoot.style.color = palette.fg;

    const eyebrowEl = el("pv-eyebrow");
    const subEl = el("pv-subtitle");
    const footEl = el("pv-footer");
    const secImg = /** @type {HTMLImageElement | null} */ (el("pv-secondary"));

    if (eyebrowEl) {
      if (state.eyebrow.trim()) {
        eyebrowEl.textContent = state.eyebrow.trim();
        eyebrowEl.style.display = "";
      } else {
        eyebrowEl.textContent = "";
        eyebrowEl.style.display = "none";
      }
    }

    const titleEl = el("pv-title");
    if (titleEl) {
      titleEl.textContent = state.chapter.trim() || "Your chapter";
    }
    if (subEl) {
      if (state.subtitle.trim()) {
        subEl.textContent = state.subtitle.trim();
        subEl.style.display = "";
      } else {
        subEl.textContent = "";
        subEl.style.display = "none";
      }
    }
    if (footEl) {
      if (state.footer.trim()) {
        footEl.textContent = state.footer.trim();
        footEl.style.display = "";
      } else {
        footEl.textContent = "";
        footEl.style.display = "none";
      }
    }

    const pImg = /** @type {HTMLImageElement | null} */ (el("pv-primary"));
    if (pImg) {
      pImg.src = primary.src;
      pImg.alt = primary.label;
      pImg.style.width = getAssetWidth(primary.category, state.primaryScale, "primary");
    }
    if (secImg) {
      if (state.showSecondaryAsset) {
        secImg.src = secondary.src;
        secImg.alt = secondary.label;
        secImg.style.width = getAssetWidth(secondary.category, state.secondaryScale, "secondary");
        secImg.style.display = "";
      } else {
        secImg.style.display = "none";
      }
    }

    const st = el("sum-theme");
    const se = el("sum-export");
    if (st) {
      st.textContent = state.theme === "dark" ? "Dark" : "Light";
    }
    if (se) {
      se.textContent = `Next export: ${clampExportSizePx(state.exportSizePx)}×${clampExportSizePx(state.exportSizePx)} px ${state.exportFormat.toUpperCase()}`;
    }

    const psh = el("primary-scale-help");
    const ssh = el("secondary-scale-help");
    if (psh) {
      psh.textContent = `${state.primaryScale}% of template default`;
    }
    if (ssh) {
      ssh.textContent = `${state.secondaryScale}% of template default`;
    }

    const secBlock = el("secondary-controls");
    if (secBlock) {
      secBlock.style.display = state.showSecondaryAsset ? "" : "none";
    }

    const perr = el("preview-err");
    if (perr) {
      if (state.errorMessage) {
        perr.textContent = state.errorMessage;
        perr.hidden = false;
      } else {
        perr.hidden = true;
      }
    }

    schedulePreviewSquareSize();
  }

  function updateFormatButtons() {
    const png = el("fmt-png");
    const svg = el("fmt-svg");
    png?.classList.toggle("export-format-segment--active", state.exportFormat === "png");
    svg?.classList.toggle("export-format-segment--active", state.exportFormat === "svg");
  }

  function updateExportModalUi() {
    el("export-size-value").textContent = `${clampExportSizePx(state.exportSizePx)} px`;
    el("export-modal-hint").textContent =
      state.exportFormat === "png"
        ? "Raster square - typical 800 (events) or 1080 (social), up to 8192."
        : "SVG canvas size; vector marks stay sharp inside the file.";
    const chapterSlug = state.chapter.trim().toLowerCase().replaceAll(/\s+/g, "-") || "cursor-event";
    const side = clampExportSizePx(state.exportSizePx);
    el("export-filename").textContent = `cursor-${chapterSlug}-${side}.${state.exportFormat}`;

    const grid = el("export-size-grid");
    if (grid) {
      grid.innerHTML = EXPORT_SIZE_SHORTCUTS.map((shortcut) => {
        const active = clampExportSizePx(state.exportSizePx) === shortcut.size;
        return `<button type="button" class="export-size-dropdown-option${active ? " export-size-dropdown-option--active" : ""}" data-size="${shortcut.size}">${shortcut.label}px</button>`;
      }).join("");
      grid.querySelectorAll("[data-size]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.exportSizePx = Number(btn.getAttribute("data-size"));
          /** @type {HTMLInputElement | null} */ (el("export-modal-custom-px")).value = String(state.exportSizePx);
          state.exportSizeMenuOpen = false;
          refreshExportMenu();
          updateExportModalUi();
          syncPreview();
        });
      });
    }
    /** @type {HTMLInputElement | null} */ (el("export-modal-custom-px")).value = String(state.exportSizePx);
    updateFormatButtons();
    const dlBtn = el("export-download");
    if (dlBtn && !state.isExporting) {
      dlBtn.textContent = `Download ${state.exportFormat.toUpperCase()}`;
    }
  }

  function refreshExportMenu() {
    if (!exportSizeMenu || !exportSizeTrigger || !exportSizeChevron) {
      return;
    }
    exportSizeMenu.hidden = !state.exportSizeMenuOpen;
    exportSizeTrigger.setAttribute("aria-expanded", state.exportSizeMenuOpen ? "true" : "false");
    exportSizeChevron.classList.toggle("export-size-dropdown-chevron--open", state.exportSizeMenuOpen);
  }

  function positionExportPopover() {
    if (!exportDialog || !exportDialog.open) {
      return;
    }
    const anchorRect =
      exportAnchorEl?.getBoundingClientRect() ??
      /** @type {HTMLElement | null} */ (el("tile-export-open"))?.getBoundingClientRect();
    if (!anchorRect) {
      return;
    }
    const margin = 12;
    const preferredWidth = Math.min(360, Math.max(280, Math.floor(window.innerWidth * 0.32)));
    const popoverWidth = Math.min(preferredWidth, window.innerWidth - margin * 2);
    const left = Math.min(
      window.innerWidth - popoverWidth - margin,
      Math.max(margin, Math.round(anchorRect.right - popoverWidth)),
    );
    const popoverHeight = Math.max(220, exportDialog.getBoundingClientRect().height || 0);
    const placeBelow = anchorRect.bottom + 8 + popoverHeight <= window.innerHeight - margin;
    const top = placeBelow
      ? Math.max(margin, Math.round(anchorRect.bottom + 8))
      : Math.max(margin, Math.round(anchorRect.top - popoverHeight - 8));
    exportDialog.style.left = `${left}px`;
    exportDialog.style.top = `${top}px`;
    exportDialog.style.width = `${popoverWidth}px`;
  }

  function openExportModal(anchorEl) {
    exportAnchorEl = /** @type {HTMLElement | null} */ (anchorEl ?? exportAnchorEl);
    state.exportModalOpen = true;
    state.exportSizeMenuOpen = false;
    if (exportDialog) {
      if (!exportDialog.open) {
        exportDialog.show();
      }
      positionExportPopover();
    }
    updateExportModalUi();
    refreshExportMenu();
  }

  function closeExportModal() {
    state.exportModalOpen = false;
    state.exportSizeMenuOpen = false;
    exportDialog?.close();
  }

  el("tile-back")?.addEventListener("click", () => navigate("hub"));
  el("tile-guidelines")?.addEventListener("click", onGuidelines);
  el("tile-colours")?.addEventListener("click", onColours);
  el("tile-reset")?.addEventListener("click", () => {
    runPresetLumaDark();
    syncFormFromState();
    syncPreview();
  });
  el("tile-export-open")?.addEventListener("click", (e) => {
    state.errorMessage = "";
    openExportModal(/** @type {HTMLElement} */ (e.currentTarget));
  });
  exportDialog?.addEventListener("close", () => {
    state.exportModalOpen = false;
    state.exportSizeMenuOpen = false;
  });

  el("export-cancel")?.addEventListener("click", () => closeExportModal());

  el("fmt-png")?.addEventListener("click", () => {
    state.exportFormat = "png";
    updateExportModalUi();
    syncPreview();
  });
  el("fmt-svg")?.addEventListener("click", () => {
    state.exportFormat = "svg";
    updateExportModalUi();
    syncPreview();
  });


  exportSizeTrigger?.addEventListener("click", () => {
    state.exportSizeMenuOpen = !state.exportSizeMenuOpen;
    if (state.exportSizeMenuOpen) {
      updateExportModalUi();
    }
    refreshExportMenu();
  });

  el("export-modal-custom-px")?.addEventListener("change", (e) => {
    const v = Number(/** @type {HTMLInputElement} */ (e.target).value);
    if (Number.isFinite(v)) {
      state.exportSizePx = v;
    }
  });
  el("export-modal-custom-px")?.addEventListener("blur", () => {
    state.exportSizePx = clampExportSizePx(state.exportSizePx);
    updateExportModalUi();
    syncPreview();
  });
  el("export-modal-custom-px")?.addEventListener("click", (e) => e.stopPropagation());
  el("export-modal-custom-px")?.addEventListener("keydown", (e) => e.stopPropagation());

  document.addEventListener(
    "pointerdown",
    (ev) => {
      if (state.exportModalOpen && exportDialog && !exportDialog.contains(/** @type {Node} */ (ev.target))) {
        state.exportSizeMenuOpen = false;
        refreshExportMenu();
        closeExportModal();
        return;
      }
      if (!state.exportSizeMenuOpen || !exportSizeDropdown) {
        return;
      }
      if (!exportSizeDropdown.contains(/** @type {Node} */ (ev.target))) {
        state.exportSizeMenuOpen = false;
        refreshExportMenu();
      }
    },
    true,
  );
  window.addEventListener("resize", () => {
    positionExportPopover();
  });

  el("pre-luma-dark")?.addEventListener("click", () => {
    runPresetLumaDark();
    syncFormFromState();
    syncPreview();
  });
  el("pre-luma-light")?.addEventListener("click", () => {
    runPresetLumaLight();
    syncFormFromState();
    syncPreview();
  });
  el("pre-promo")?.addEventListener("click", () => {
    runPresetPromoCopy();
    syncFormFromState();
    syncPreview();
  });
  el("pre-lockup")?.addEventListener("click", () => {
    runPresetLockupSoloDark();
    syncFormFromState();
    syncPreview();
  });

  ["eyebrow", "chapter", "subtitle", "footer"].forEach((fid) => {
    el(fid)?.addEventListener("input", (e) => {
      const v = /** @type {HTMLInputElement} */ (e.target).value;
      if (fid === "eyebrow") {
        state.eyebrow = v;
      }
      if (fid === "chapter") {
        state.chapter = v;
      }
      if (fid === "subtitle") {
        state.subtitle = v;
      }
      if (fid === "footer") {
        state.footer = v;
      }
      syncPreview();
    });
  });

  el("theme")?.addEventListener("change", (e) => {
    const next = /** @type {HTMLSelectElement} */ (e.target).value;
    state.theme = next === "light" ? "light" : "dark";
    state.primaryAssetId = getThemedVariantId(state.primaryAssetId, state.theme);
    state.secondaryAssetId = getThemedVariantId(state.secondaryAssetId, state.theme);
    syncFormFromState();
    syncPreview();
  });

  el("primary-category")?.addEventListener("change", (e) => {
    state.primaryCategory = /** @type {HTMLSelectElement} */ (e.target).value;
    const first = getCategoryAssets(state.primaryCategory)[0];
    if (first) {
      state.primaryAssetId = getThemedVariantId(first.id, state.theme);
    }
    fillAssetSelect(/** @type {HTMLSelectElement | null} */ (el("primary-asset")), state.primaryCategory, state.primaryAssetId);
    state.primaryAssetId = /** @type {HTMLSelectElement} */ (el("primary-asset")).value;
    syncPreview();
  });
  el("primary-asset")?.addEventListener("change", (e) => {
    state.primaryAssetId = /** @type {HTMLSelectElement} */ (e.target).value;
    syncPreview();
  });
  el("primary-scale")?.addEventListener("input", (e) => {
    state.primaryScale = Number(/** @type {HTMLInputElement} */ (e.target).value);
    syncPreview();
  });

  el("secondary-category")?.addEventListener("change", (e) => {
    state.secondaryCategory = /** @type {HTMLSelectElement} */ (e.target).value;
    const first = getCategoryAssets(state.secondaryCategory)[0];
    if (first) {
      state.secondaryAssetId = getThemedVariantId(first.id, state.theme);
    }
    fillAssetSelect(/** @type {HTMLSelectElement | null} */ (el("secondary-asset")), state.secondaryCategory, state.secondaryAssetId);
    state.secondaryAssetId = /** @type {HTMLSelectElement} */ (el("secondary-asset")).value;
    syncPreview();
  });
  el("secondary-asset")?.addEventListener("change", (e) => {
    state.secondaryAssetId = /** @type {HTMLSelectElement} */ (e.target).value;
    syncPreview();
  });
  el("secondary-scale")?.addEventListener("input", (e) => {
    state.secondaryScale = Number(/** @type {HTMLInputElement} */ (e.target).value);
    syncPreview();
  });
  el("show-secondary")?.addEventListener("change", (e) => {
    state.showSecondaryAsset = /** @type {HTMLInputElement} */ (e.target).checked;
    syncPreview();
  });

  el("tab-build")?.addEventListener("click", () => {
    state.mobileTab = "build";
    el("tile-main")?.setAttribute("data-mobile-tab", "build");
    el("tab-build")?.classList.add("mobile-tab-active");
    el("tab-preview")?.classList.remove("mobile-tab-active");
    el("tab-build")?.setAttribute("aria-selected", "true");
    el("tab-preview")?.setAttribute("aria-selected", "false");
  });
  el("tab-preview")?.addEventListener("click", () => {
    state.mobileTab = "preview";
    el("tile-main")?.setAttribute("data-mobile-tab", "preview");
    el("tab-preview")?.classList.add("mobile-tab-active");
    el("tab-build")?.classList.remove("mobile-tab-active");
    el("tab-preview")?.setAttribute("aria-selected", "true");
    el("tab-build")?.setAttribute("aria-selected", "false");
    schedulePreviewSquareSize();
  });

  el("export-download")?.addEventListener("click", () => void runExportDownload());

  async function runExportDownload() {
    if (!previewRoot) {
      return;
    }
    if (location.protocol === "file:") {
      state.errorMessage =
        "Export is blocked in file:// mode by browser security. Open this folder via http(s) (e.g. local static server) or GitHub Pages.";
      syncPreview();
      const errEl = el("export-error");
      if (errEl) {
        errEl.textContent = state.errorMessage;
        errEl.hidden = false;
      }
      return;
    }
    state.isExporting = true;
    state.errorMessage = "";
    const errEl = el("export-error");
    const btn = el("export-download");
    if (errEl) {
      errEl.hidden = true;
    }
    if (btn) {
      btn.textContent = "Working…";
      /** @type {HTMLButtonElement} */ (btn).disabled = true;
    }
    try {
      const side = clampExportSizePx(state.exportSizePx);
      const chapterSlug = state.chapter.trim().toLowerCase().replaceAll(/\s+/g, "-") || "cursor-event";
      const dataUrl =
        state.exportFormat === "png"
          ? await toPng(previewRoot, {
              cacheBust: true,
              pixelRatio: 1,
              canvasWidth: side,
              canvasHeight: side,
            })
          : await toSvg(previewRoot, {
              cacheBust: true,
              width: side,
              height: side,
            });
      const link = document.createElement("a");
      link.download = `cursor-${chapterSlug}-${side}.${state.exportFormat}`;
      link.href = dataUrl;
      link.click();
      closeExportModal();
    } catch (error) {
      console.error(error);
      state.errorMessage = "Export failed. Try again after the preview finishes loading.";
      syncPreview();
      if (errEl) {
        errEl.textContent = state.errorMessage;
        errEl.hidden = false;
      }
    } finally {
      state.isExporting = false;
      if (btn) {
        btn.textContent = `Download ${state.exportFormat.toUpperCase()}`;
        /** @type {HTMLButtonElement} */ (btn).disabled = false;
      }
    }
  }

  if (previewFrameMeter && typeof ResizeObserver !== "undefined") {
    const previewResizeObserver = new ResizeObserver(() => {
      schedulePreviewSquareSize();
    });
    previewResizeObserver.observe(previewFrameMeter);
  }
  window.addEventListener("resize", schedulePreviewSquareSize);

  syncFormFromState();
  syncPreview();
  updateExportModalUi();
  schedulePreviewSquareSize();
}
