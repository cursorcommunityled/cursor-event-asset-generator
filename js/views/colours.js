import {
  BRAND_TOKENS,
  DARK_COLOR_TABLE,
  LIGHT_COLOR_TABLE,
  downloadBrandTokensCss,
  downloadBrandTokensJson,
} from "../brandTokens.js";

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (p: string) => void, onGuidelines: () => void }} ctx
 */
export function renderColours(container, { navigate, onGuidelines }) {
  container.innerHTML = `
    <div class="reference-page colours-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>← Assets center</button>
          <p class="eyebrow">Brand reference</p>
          <h1 class="app-top-bar-title hub-header-compact">Colours &amp; tokens</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Values from the official guidelines. Tap a swatch or hex to copy. Export JSON/CSS for your own
            tools-or read
            <button type="button" class="button-text reference-inline-nav" data-guidelines>Guidelines</button>
            for usage.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines-nav>Guidelines →</button>
          </nav>
        </div>
      </header>

      <div class="reference-page-body">
        <section class="reference-section panel" aria-labelledby="colours-swatch-heading">
          <h2 id="colours-swatch-heading" class="reference-section-title">Quick swatches</h2>
          <p class="reference-section-lead">
            Outside the IDE: <strong>sentence case</strong> for titles. Use accent orange sparingly.
          </p>
          <div class="colours-swatch-grid" aria-label="Brand colour swatches" id="swatch-grid"></div>
          <p class="copy-hint colours-copy-hint" id="copy-hint" hidden></p>
        </section>

        <section class="reference-section panel" aria-labelledby="colours-table-light-heading">
          <h2 id="colours-table-light-heading" class="reference-section-title">Light theme</h2>
          <div class="colour-table-wrap">
            <table class="colour-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Hex</th>
                  <th scope="col">RGB</th>
                  <th scope="col">HSL</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="tbody-light"></tbody>
            </table>
          </div>
        </section>

        <section class="reference-section panel" aria-labelledby="colours-table-dark-heading">
          <h2 id="colours-table-dark-heading" class="reference-section-title">Dark theme</h2>
          <div class="colour-table-wrap">
            <table class="colour-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Hex</th>
                  <th scope="col">RGB</th>
                  <th scope="col">HSL</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="tbody-dark"></tbody>
            </table>
          </div>
        </section>

        <section class="reference-section panel reference-section--compact" aria-labelledby="colours-export-heading">
          <h2 id="colours-export-heading" class="reference-section-title">Download tokens</h2>
          <p class="reference-section-lead">
            Flat maps for <code>BRAND_TOKENS</code> in code-camelCase keys in JSON (<code>card01</code>, etc.).
          </p>
          <div class="download-row">
            <button type="button" class="button button-tertiary" id="dl-json">Download colours (JSON)</button>
            <button type="button" class="button button-tertiary" id="dl-css">Download colours (CSS vars)</button>
          </div>
        </section>
      </div>
    </div>
  `;

  const hintEl = container.querySelector("#copy-hint");

  async function copyHex(hex) {
    try {
      await navigator.clipboard.writeText(hex);
      if (hintEl) {
        hintEl.textContent = `Copied ${hex}`;
        hintEl.hidden = false;
      }
      globalThis.setTimeout(() => {
        if (hintEl) {
          hintEl.hidden = true;
        }
      }, 2000);
    } catch {
      if (hintEl) {
        hintEl.textContent = "Copy blocked - select the hex manually";
        hintEl.hidden = false;
      }
      globalThis.setTimeout(() => {
        if (hintEl) {
          hintEl.hidden = true;
        }
      }, 3000);
    }
  }

  const swatches = [
    {
      label: "Accent",
      hex: BRAND_TOKENS.light.accent,
      className: "",
      labelClass: "",
      hexClass: "",
    },
    {
      label: "Light bg",
      hex: BRAND_TOKENS.light.bg,
      className: " colours-swatch-tile--border",
      labelClass: "",
      hexClass: "",
    },
    {
      label: "Light fg",
      hex: BRAND_TOKENS.light.fg,
      className: "",
      labelClass: " colours-swatch-label--on-dark",
      hexClass: " colours-swatch-hex--on-dark",
    },
    {
      label: "Dark bg",
      hex: BRAND_TOKENS.dark.bg,
      className: "",
      labelClass: " colours-swatch-label--on-dark",
      hexClass: " colours-swatch-hex--on-dark",
    },
    {
      label: "Dark fg",
      hex: BRAND_TOKENS.dark.fg,
      className: "",
      labelClass: "",
      hexClass: "",
    },
  ];

  const swatchGrid = container.querySelector("#swatch-grid");
  if (swatchGrid) {
    swatchGrid.innerHTML = swatches
      .map(
        (s) => `
      <button type="button" class="colours-swatch-tile${s.className}" style="background:${escapeHtml(s.hex)}" data-hex="${escapeHtml(s.hex)}">
        <span class="colours-swatch-label${s.labelClass}">${escapeHtml(s.label)}</span>
        <span class="colours-swatch-hex${s.hexClass}">${escapeHtml(s.hex)}</span>
      </button>`,
      )
      .join("");
    swatchGrid.querySelectorAll("[data-hex]").forEach((btn) => {
      btn.addEventListener("click", () => copyHex(btn.getAttribute("data-hex") ?? ""));
    });
  }

  function tbodyRows(rows) {
    return rows
      .map(
        (row) => `
      <tr>
        <td><code class="colour-table-name">${escapeHtml(row.name)}</code></td>
        <td><button type="button" class="colour-table-hex-btn" data-hex="${escapeHtml(row.hex)}">${escapeHtml(row.hex)}</button></td>
        <td class="colour-table-mono">${escapeHtml(row.rgb)}</td>
        <td class="colour-table-mono">${escapeHtml(row.hsl)}</td>
        <td>${escapeHtml(row.description)}</td>
      </tr>`,
      )
      .join("");
  }

  const tbLight = container.querySelector("#tbody-light");
  const tbDark = container.querySelector("#tbody-dark");
  if (tbLight) {
    tbLight.innerHTML = tbodyRows(LIGHT_COLOR_TABLE);
  }
  if (tbDark) {
    tbDark.innerHTML = tbodyRows(DARK_COLOR_TABLE);
  }
  container.querySelectorAll(".colour-table-hex-btn[data-hex]").forEach((btn) => {
    btn.addEventListener("click", () => copyHex(btn.getAttribute("data-hex") ?? ""));
  });

  container.querySelector("#dl-json")?.addEventListener("click", () => downloadBrandTokensJson());
  container.querySelector("#dl-css")?.addEventListener("click", () => downloadBrandTokensCss());
  container.querySelector("[data-back]")?.addEventListener("click", () => navigate("hub"));
  container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
  container.querySelector("[data-guidelines-nav]")?.addEventListener("click", onGuidelines);
}
