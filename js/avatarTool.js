import { toPng } from "html-to-image";

import { BRAND_TOKENS } from "./brandTokens.js";
import { getAvatarOptions } from "./lumaTileAssets.js";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EXPORT_SIZE = 512;

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (p: string) => void, onGuidelines: () => void, onColours: () => void }} ctx
 */
export function mountAvatarTool(container, { navigate, onGuidelines, onColours }) {
  const AVATAR_OPTIONS = getAvatarOptions();
  const firstCircle = AVATAR_OPTIONS.find((o) => o.shape === "circle");

  let shape = /** @type {"circle" | "square"} */ ("circle");
  let assetId = firstCircle?.id ?? AVATAR_OPTIONS[0]?.id ?? "";
  let bgKey = /** @type {"light" | "dark" | "neutral"} */ ("neutral");
  let isExporting = false;

  container.innerHTML = `
    <div class="editor-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" id="av-back">← Assets center</button>
          <p class="eyebrow">Community profile</p>
          <h1 class="app-top-bar-title">Chapter avatar</h1>
          <p class="app-top-bar-tagline">
            Official circle or square avatars from the brand kit. Export PNG for Discord, Slack,
            Luma host image, or Meetup organiser photo.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" id="av-guidelines">Guidelines</button>
            <button type="button" class="button-text" id="av-colours">Colours</button>
          </nav>
          <div class="app-top-bar-buttons">
            <button type="button" class="button button-primary" id="av-export">Download ${EXPORT_SIZE}px PNG</button>
          </div>
        </div>
      </header>
      <main class="avatar-tool-body">
        <section class="avatar-preview-panel panel">
          <h2 class="avatar-panel-title">Preview</h2>
          <p class="avatar-panel-hint">
            Checker background is only for contrast; exported PNG uses transparency around the mark
            where the SVG allows.
          </p>
          <div class="avatar-preview-stage" id="av-stage">
            <div class="avatar-export-frame avatar-export-frame-circle" id="av-frame">
              <img alt="" class="avatar-preview-img" id="av-img" />
            </div>
          </div>
          <p class="error-message" id="av-err" hidden></p>
        </section>
        <aside class="avatar-controls panel">
          <h2 class="avatar-panel-title">Asset</h2>
          <div class="field-group rail-field-first">
            <label for="avatar-shape">Shape</label>
            <select id="avatar-shape"><option value="circle">Circle</option><option value="square">Square</option></select>
          </div>
          <div class="field-group">
            <label for="avatar-variant">Variant</label>
            <select id="avatar-variant"></select>
          </div>
          <div class="field-group">
            <label for="avatar-bg">Preview background</label>
            <select id="avatar-bg">
              <option value="neutral">Neutral (check contrast)</option>
              <option value="light">Brand light bg</option>
              <option value="dark">Brand dark bg</option>
            </select>
          </div>
          <div class="notes-card notes-card-rail avatar-notes">
            <p class="avatar-notes-p">
              Use <strong>2D</strong> avatars by default. Prefer a variant that matches your platform
              (dark avatar on light UI, etc.).
            </p>
          </div>
        </aside>
      </main>
    </div>
  `;

  const el = (id) => container.querySelector(`#${id}`);
  const frame = /** @type {HTMLElement | null} */ (el("av-frame"));
  const img = /** @type {HTMLImageElement | null} */ (el("av-img"));
  const stage = /** @type {HTMLElement | null} */ (el("av-stage"));
  const variantSelect = /** @type {HTMLSelectElement | null} */ (el("avatar-variant"));
  const shapeSelect = /** @type {HTMLSelectElement | null} */ (el("avatar-shape"));
  const bgSelect = /** @type {HTMLSelectElement | null} */ (el("avatar-bg"));
  const errEl = /** @type {HTMLElement | null} */ (el("av-err"));
  const exportBtn = /** @type {HTMLButtonElement | null} */ (el("av-export"));

  function filteredOptions() {
    return AVATAR_OPTIONS.filter((o) => o.shape === shape);
  }

  function selected() {
    const list = filteredOptions();
    return list.find((o) => o.id === assetId) ?? list[0];
  }

  function fillVariants() {
    if (!variantSelect) {
      return;
    }
    const list = filteredOptions();
    variantSelect.innerHTML = list.map((o) => `<option value="${escapeHtml(o.id)}">${escapeHtml(o.label)}</option>`).join("");
    if (list.some((o) => o.id === assetId)) {
      variantSelect.value = assetId;
    } else if (list[0]) {
      assetId = list[0].id;
      variantSelect.value = assetId;
    }
  }

  function sync() {
    const s = selected();
    const previewBgByKey = {
      light: BRAND_TOKENS.light.bg,
      dark: BRAND_TOKENS.dark.bg,
      neutral: "#c8c4bc",
    };
    if (stage) {
      stage.style.background = previewBgByKey[bgKey];
    }
    if (frame) {
      frame.className = `avatar-export-frame avatar-export-frame-${shape}`;
    }
    if (img && s) {
      img.src = s.src;
      img.alt = s.label;
    }
  }

  el("av-back")?.addEventListener("click", () => navigate("hub"));
  el("av-guidelines")?.addEventListener("click", onGuidelines);
  el("av-colours")?.addEventListener("click", onColours);

  shapeSelect?.addEventListener("change", () => {
    shape = /** @type {"circle" | "square"} */ (shapeSelect.value);
    const first = AVATAR_OPTIONS.find((o) => o.shape === shape);
    if (first) {
      assetId = first.id;
    }
    fillVariants();
    sync();
  });

  variantSelect?.addEventListener("change", () => {
    assetId = variantSelect.value;
    sync();
  });

  bgSelect?.addEventListener("change", () => {
    bgKey = /** @type {"light" | "dark" | "neutral"} */ (bgSelect.value);
    sync();
  });

  exportBtn?.addEventListener("click", () => void runExport());

  async function runExport() {
    if (!frame) {
      return;
    }
    isExporting = true;
    if (errEl) {
      errEl.hidden = true;
    }
    if (exportBtn) {
      exportBtn.textContent = "Exporting…";
      exportBtn.disabled = true;
    }
    try {
      const dataUrl = await toPng(frame, {
        cacheBust: true,
        pixelRatio: 2,
        canvasWidth: EXPORT_SIZE,
        canvasHeight: EXPORT_SIZE,
      });
      const link = document.createElement("a");
      link.download = `cursor-chapter-avatar-${shape}-${EXPORT_SIZE}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      if (errEl) {
        errEl.textContent = "Export failed. Try again when the preview has loaded.";
        errEl.hidden = false;
      }
    } finally {
      isExporting = false;
      if (exportBtn) {
        exportBtn.textContent = `Download ${EXPORT_SIZE}px PNG`;
        exportBtn.disabled = false;
      }
    }
  }

  /** @type {HTMLSelectElement | null} */ (el("avatar-shape")).value = shape;
  fillVariants();
  sync();
}
