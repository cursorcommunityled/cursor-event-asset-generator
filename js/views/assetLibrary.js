import {
  BRAND_ASSETS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getBrandAssetMeta,
} from "../lumaTileAssets.js";

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (p: string) => void, onGuidelines: () => void, onColours: () => void }} ctx
 */
export function renderAssetLibrary(container, { navigate, onGuidelines, onColours }) {
  container.innerHTML = `
    <div class="library-page">
      <header class="app-top-bar app-top-bar-hub library-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>← Assets center</button>
          <p class="eyebrow">Brand kit</p>
          <h1 class="app-top-bar-title hub-header-compact">Asset library</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Browse every approved SVG with preview and parameters (2D / 2.5D, theme, avatar shape). Download
            any file directly-no paths to copy.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <div class="library-toolbar panel">
        <div class="library-filters">
          <div class="field-group library-field">
            <label for="lib-search">Search</label>
            <input id="lib-search" type="search" placeholder="Name, filename, dark, 2.5D, circle…" autocomplete="off" />
          </div>
          <div class="field-group library-field">
            <label for="lib-category">Family</label>
            <select id="lib-category">
              <option value="">All families (${BRAND_ASSETS.length})</option>
              ${CATEGORY_ORDER.map(
                (cat) =>
                  `<option value="${escapeHtml(cat)}">${escapeHtml(CATEGORY_LABELS[cat])} (${
                    BRAND_ASSETS.filter((a) => a.category === cat).length
                  })</option>`,
              ).join("")}
            </select>
          </div>
        </div>
        <p class="library-count" aria-live="polite" id="lib-count"></p>
      </div>

      <ul class="library-grid" id="lib-grid"></ul>
      <p class="library-empty" id="lib-empty" hidden>No assets match your filters. Try clearing search or family.</p>
    </div>
  `;

  const searchEl = /** @type {HTMLInputElement} */ (container.querySelector("#lib-search"));
  const catEl = /** @type {HTMLSelectElement} */ (container.querySelector("#lib-category"));
  const grid = container.querySelector("#lib-grid");
  const empty = container.querySelector("#lib-empty");
  const countEl = container.querySelector("#lib-count");

  let actionMessage = "";

  function filteredAssets() {
    const q = searchEl.value.trim().toLowerCase();
    const categoryFilter = catEl.value;
    return BRAND_ASSETS.filter((asset) => {
      if (categoryFilter && asset.category !== categoryFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      const meta = getBrandAssetMeta(asset);
      const hay = [
        asset.label,
        asset.fileName,
        asset.category,
        asset.id,
        meta.dimensions,
        meta.theme,
        meta.avatarShape ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  async function downloadSvg(asset) {
    try {
      const res = await fetch(asset.src);
      if (!res.ok) {
        throw new Error("Network error");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = asset.fileName;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      actionMessage = `Downloaded ${asset.fileName}`;
    } catch {
      actionMessage = "Download failed - try again";
    }
    renderGrid();
    globalThis.setTimeout(() => {
      actionMessage = "";
      renderGrid();
    }, 2500);
  }

  function renderGrid() {
    const list = filteredAssets();
    if (!grid || !empty || !countEl) {
      return;
    }
    const toast = actionMessage ? ` · ${actionMessage}` : "";
    countEl.innerHTML = `Showing <strong>${list.length}</strong> of ${BRAND_ASSETS.length} assets${
      toast ? `<span class="library-action-toast">${escapeHtml(toast)}</span>` : ""
    }`;
    empty.hidden = list.length > 0;
    grid.innerHTML = list
      .map((asset) => {
        const meta = getBrandAssetMeta(asset);
        const shapeRow = meta.avatarShape
          ? `<div class="library-param"><dt>Shape</dt><dd>${escapeHtml(meta.avatarShape)}</dd></div>`
          : "";
        return `
        <li class="library-card panel">
          <div class="library-card-preview">
            <img src="${escapeHtml(asset.src)}" alt="" class="library-card-img" loading="lazy" />
          </div>
          <div class="library-card-body">
            <p class="library-card-family">${escapeHtml(CATEGORY_LABELS[asset.category] ?? asset.category)}</p>
            <h2 class="library-card-title">${escapeHtml(asset.label)}</h2>
            <dl class="library-params">
              <div class="library-param"><dt>File</dt><dd><code class="library-mono">${escapeHtml(asset.fileName)}</code></dd></div>
              <div class="library-param"><dt>Mark</dt><dd>${escapeHtml(meta.dimensions)}</dd></div>
              <div class="library-param"><dt>Theme</dt><dd>${escapeHtml(meta.theme)}</dd></div>
              ${shapeRow}
              <div class="library-param"><dt>Format</dt><dd>${escapeHtml(meta.format)}</dd></div>
            </dl>
            <button type="button" class="button button-primary library-download-btn" data-dl="${escapeHtml(asset.id)}">Download SVG</button>
          </div>
        </li>`;
      })
      .join("");

    grid.querySelectorAll("[data-dl]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-dl");
        const asset = BRAND_ASSETS.find((a) => a.id === id);
        if (asset) {
          void downloadSvg(asset);
        }
      });
    });
  }

  searchEl.addEventListener("input", renderGrid);
  catEl.addEventListener("change", renderGrid);
  container.querySelector("[data-back]")?.addEventListener("click", () => navigate("hub"));
  container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
  container.querySelector("[data-colours]")?.addEventListener("click", onColours);
  renderGrid();
}
