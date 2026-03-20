import { toPng } from "html-to-image";
import JSZip from "jszip";
import { getAssetById } from "../lumaTileAssets.js";

const LOGO_BY_THEME = {
  dark: "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_DARK.svg",
  light: "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_LIGHT.svg",
};

const FORMATS = {
  square: { label: "Square 1:1", width: 1080, height: 1080 },
  horizontal: { label: "Horizontal 16:9", width: 1920, height: 1080 },
  instagram: { label: "Story 9:16", width: 1080, height: 1920 },
};

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (p: string) => void, onGuidelines: () => void, onColours: () => void }} ctx
 */
export function mountSpeakerGenerator(container, { navigate, onGuidelines, onColours }) {
  const state = {
    fullName: "Name Surname",
    speakerTitle: "Role / Company",
    topicTitle: "Topic title",
    eventName: "Cursor community",
    datePlace: "20 Apr 2026 - Krakow",
    photoDataUrl: "",
    format: /** @type {"square"|"horizontal"|"instagram"} */ ("square"),
    theme: /** @type {"dark"|"light"} */ ("dark"),
    message: "",
  };

  container.innerHTML = `
    <div class="editor-root speaker-generator-root">
      <header class="app-top-bar app-top-bar-editor">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back><- Assets center</button>
          <p class="eyebrow">Community</p>
          <h1 class="app-top-bar-title">Speaker asset generator</h1>
          <p class="app-top-bar-tagline">Upload photo, add speaker details, then export all key formats in dark and light.</p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <main class="app-body speaker-generator-body">
        <section class="app-main panel panel-preview speaker-preview-panel" aria-label="Speaker preview">
          <div class="speaker-preview-toolbar">
            <div class="speaker-chip-row" id="sg-format-row"></div>
            <div class="speaker-chip-row" id="sg-theme-row"></div>
            <div class="speaker-preview-actions">
              <button type="button" class="button button-secondary" id="sg-download-current">Download current</button>
              <button type="button" class="button button-primary" id="sg-download-all">Download all (6)</button>
            </div>
          </div>
          <p class="speaker-preview-message" id="sg-message" hidden></p>
          <div class="speaker-preview-wrap">
            <div class="speaker-card speaker-card--square speaker-card--dark" id="sg-preview-card">
              <div class="speaker-card-overlay"></div>
              <div class="speaker-card-inner">
                <div class="speaker-card-photo" data-photo-wrap>
                  <img alt="Speaker photo" data-photo />
                </div>
                <p class="speaker-card-event" data-event></p>
                <h2 class="speaker-card-name" data-name></h2>
                <p class="speaker-card-title" data-title></p>
                <p class="speaker-card-topic" data-topic></p>
                <p class="speaker-card-meta" data-meta></p>
                <img class="speaker-card-logo" data-logo alt="" />
              </div>
            </div>
          </div>
        </section>

        <aside class="app-rail panel panel-controls speaker-controls-panel" aria-label="Speaker controls">
          <div class="rail-inner">
            <div class="build-card">
              <h2 class="build-card-title">Speaker details</h2>
              <div class="field-group rail-field-first">
                <label for="sg-name">Name and surname</label>
                <input id="sg-name" type="text" value="${escapeHtml(state.fullName)}" />
              </div>
              <div class="field-group">
                <label for="sg-title">Title / role</label>
                <input id="sg-title" type="text" value="${escapeHtml(state.speakerTitle)}" />
              </div>
              <div class="field-group">
                <label for="sg-topic">Topic title</label>
                <input id="sg-topic" type="text" value="${escapeHtml(state.topicTitle)}" />
              </div>
            </div>

            <div class="build-card">
              <h2 class="build-card-title">Event details</h2>
              <div class="field-group rail-field-first">
                <label for="sg-event">Event name</label>
                <input id="sg-event" type="text" value="${escapeHtml(state.eventName)}" />
              </div>
              <div class="field-group">
                <label for="sg-meta">Date and place</label>
                <input id="sg-meta" type="text" value="${escapeHtml(state.datePlace)}" placeholder="20 Apr 2026 - Krakow" />
              </div>
            </div>

            <div class="build-card">
              <h2 class="build-card-title">Photo</h2>
              <p class="build-card-hint">Upload once, auto-cropped into a circle.</p>
              <div class="field-group rail-field-first">
                <label for="sg-photo">Speaker photo</label>
                <input id="sg-photo" type="file" accept="image/*" />
              </div>
              <div class="download-row">
                <button type="button" class="button button-secondary" id="sg-clear-photo">Remove photo</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <div class="speaker-export-stage" id="sg-export-stage" aria-hidden="true"></div>
    </div>
  `;

  const el = (s) => /** @type {HTMLElement | null} */ (container.querySelector(s));
  const previewCard = el("#sg-preview-card");
  const msgEl = el("#sg-message");
  const exportStage = el("#sg-export-stage");

  if (!previewCard || !msgEl || !exportStage) {
    return;
  }

  function setMessage(text) {
    state.message = text;
    msgEl.textContent = text;
    msgEl.hidden = !text;
  }

  function paintCard(card, format, theme) {
    card.className = `speaker-card speaker-card--${format} speaker-card--${theme}`;
    const nameEl = card.querySelector("[data-name]");
    const titleEl = card.querySelector("[data-title]");
    const topicEl = card.querySelector("[data-topic]");
    const eventEl = card.querySelector("[data-event]");
    const metaEl = card.querySelector("[data-meta]");
    const photoWrap = card.querySelector("[data-photo-wrap]");
    const photoImg = /** @type {HTMLImageElement|null} */ (card.querySelector("[data-photo]"));
    const logoImg = /** @type {HTMLImageElement|null} */ (card.querySelector("[data-logo]"));

    if (nameEl) nameEl.textContent = state.fullName.trim() || "Name Surname";
    if (titleEl) titleEl.textContent = state.speakerTitle.trim() || "Role / Company";
    if (topicEl) topicEl.textContent = state.topicTitle.trim() || "Topic title";
    if (eventEl) eventEl.textContent = state.eventName.trim() || "Cursor community";
    if (metaEl) metaEl.textContent = state.datePlace.trim() || "";

    if (photoWrap && photoImg) {
      if (state.photoDataUrl) {
        photoImg.src = state.photoDataUrl;
        photoImg.style.display = "";
        photoWrap.classList.remove("speaker-card-photo--empty");
      } else {
        photoImg.removeAttribute("src");
        photoImg.style.display = "none";
        photoWrap.classList.add("speaker-card-photo--empty");
      }
    }

    if (logoImg) {
      const id = LOGO_BY_THEME[theme];
      const logo = getAssetById(id);
      logoImg.src = logo.src;
    }
  }

  function updatePreview() {
    paintCard(previewCard, state.format, state.theme);
    setMessage("");
    renderChipRows();
  }

  function renderChipRows() {
    const formatRow = el("#sg-format-row");
    const themeRow = el("#sg-theme-row");
    if (!formatRow || !themeRow) {
      return;
    }
    formatRow.innerHTML = Object.entries(FORMATS)
      .map(
        ([id, f]) =>
          `<button type="button" class="chip${state.format === id ? " chip-active" : ""}" data-format="${id}">${f.label}</button>`,
      )
      .join("");
    themeRow.innerHTML = ["dark", "light"]
      .map(
        (t) =>
          `<button type="button" class="chip${state.theme === t ? " chip-active" : ""}" data-theme="${t}">${t === "dark" ? "Dark" : "Light"}</button>`,
      )
      .join("");
    formatRow.querySelectorAll("[data-format]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.format = /** @type {"square"|"horizontal"|"instagram"} */ (btn.getAttribute("data-format"));
        updatePreview();
      });
    });
    themeRow.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.theme = /** @type {"dark"|"light"} */ (btn.getAttribute("data-theme"));
        updatePreview();
      });
    });
  }

  function buildExportHtml(format, theme) {
    const logoId = LOGO_BY_THEME[theme];
    const logo = getAssetById(logoId);
    const isDark = theme === "dark";
    const dims = FORMATS[format];
    const W = dims.width;
    const H = dims.height;

    const bg = isDark
      ? "radial-gradient(circle at 20% 15%,rgba(245,78,0,0.22),transparent 32%),radial-gradient(circle at 65% 90%,rgba(245,78,0,0.08),transparent 24%),#14120b"
      : "radial-gradient(circle at 20% 15%,rgba(245,78,0,0.14),transparent 32%),radial-gradient(circle at 65% 90%,rgba(245,78,0,0.05),transparent 24%),#f7f7f4";
    const fg = isDark ? "#edecec" : "#26251e";
    const fgSub = isDark ? "rgba(237,236,236,0.7)" : "rgba(38,37,30,0.7)";
    const fgMeta = isDark ? "rgba(237,236,236,0.55)" : "rgba(38,37,30,0.55)";
    const photoBorder = isDark ? "rgba(255,255,255,0.45)" : "rgba(38,37,30,0.18)";
    const placeholderBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(38,37,30,0.06)";

    const nameText = escapeHtml(state.fullName.trim() || "Name Surname");
    const titleText = escapeHtml(state.speakerTitle.trim() || "Role / Company");
    const topicText = escapeHtml(state.topicTitle.trim() || "Topic title");
    const eventText = escapeHtml(state.eventName.trim() || "Cursor community");
    const metaText = escapeHtml(state.datePlace.trim() || "");
    const hasPhoto = !!state.photoDataUrl;

    const px = (pct) => Math.round(W * pct / 100);
    const pxH = (pct) => Math.round(H * pct / 100);

    if (format === "horizontal") {
      const padSide = px(5);
      const padV = pxH(8);
      const photoSize = pxH(32);
      const colGap = px(3);
      const rowGap = pxH(1);
      const eventFs = pxH(3);
      const nameFs = pxH(11);
      const titleFs = pxH(4);
      const topicFs = pxH(5);
      const metaFs = pxH(3);
      const logoW = px(15);

      const photoStyle = `width:${photoSize}px;height:${photoSize}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);grid-area:photo;align-self:center;justify-self:center;`;
      const photoHtml = hasPhoto
        ? `<div style="${photoStyle}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>`
        : `<div style="${photoStyle}background:${placeholderBg};"></div>`;

      return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
        <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:grid;grid-template-columns:${photoSize + colGap * 2}px 1fr;grid-template-areas:'photo event' 'photo name' 'photo role' 'photo topic' 'photo meta';padding:${padV}px ${padSide}px;gap:${rowGap}px ${colGap}px;justify-items:start;align-content:center;text-align:left;">
          ${photoHtml}
          <p style="grid-area:event;margin:0;font-size:${eventFs}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.12em;font-weight:500;align-self:end;margin-bottom:${pxH(0.3)}px;">${eventText}</p>
          <h2 style="grid-area:name;margin:0;font-size:${nameFs}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
          <p style="grid-area:role;margin:0;font-size:${titleFs}px;color:${fgSub};font-weight:400;">${titleText}</p>
          <p style="grid-area:topic;margin:0;font-size:${topicFs}px;font-weight:700;color:${fg};margin-top:${pxH(0.8)}px;">${topicText}</p>
          ${metaText ? `<p style="grid-area:meta;margin:0;font-size:${metaFs}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
          <img src="${logo.src}" alt="" style="position:absolute;right:${padSide}px;bottom:${padV}px;width:${logoW}px;height:auto;opacity:0.85;"/>
        </div>
      </div>`;
    }

    if (format === "instagram") {
      const padSide = px(10);
      const photoSize = px(24);
      const gap = pxH(1.5);
      const eventFs = px(2.5);
      const nameFs = px(10);
      const titleFs = px(3.5);
      const topicFs = px(4.5);
      const metaFs = px(2.5);
      const logoW = px(24);

      const photoStyle = `width:${photoSize}px;height:${photoSize}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);`;
      const photoHtml = hasPhoto
        ? `<div style="${photoStyle}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>`
        : `<div style="${photoStyle}background:${placeholderBg};"></div>`;

      return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
        <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${pxH(6)}px ${padSide}px;gap:${gap}px;">
          ${photoHtml}
          <p style="margin:0;margin-top:${gap}px;font-size:${eventFs}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.12em;font-weight:500;">${eventText}</p>
          <h2 style="margin:0;font-size:${nameFs}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
          <p style="margin:0;font-size:${titleFs}px;color:${fgSub};font-weight:400;">${titleText}</p>
          <p style="margin:0;font-size:${topicFs}px;font-weight:700;color:${fg};margin-top:${gap}px;">${topicText}</p>
          ${metaText ? `<p style="margin:0;font-size:${metaFs}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
          <img src="${logo.src}" alt="" style="width:${logoW}px;height:auto;opacity:0.85;margin-top:${pxH(4)}px;"/>
        </div>
      </div>`;
    }

    const pad = px(5);
    const gap = px(1.8);
    const photoSize = px(22);
    const eventFs = px(2.2);
    const nameFs = px(9);
    const titleFs = px(3.2);
    const topicFs = px(4);
    const metaFs = px(2.2);
    const logoW = px(22);

    const photoStyle = `width:${photoSize}px;height:${photoSize}px;border-radius:50%;overflow:hidden;border:4px solid ${photoBorder};box-shadow:0 12px 32px rgba(20,18,11,0.3);`;
    const photoHtml = hasPhoto
      ? `<div style="${photoStyle}"><img src="${state.photoDataUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>`
      : `<div style="${photoStyle}background:${placeholderBg};"></div>`;

    return `<div style="position:relative;overflow:hidden;background:${bg};color:${fg};width:${W}px;height:${H}px;">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 75%,rgba(255,255,255,0.05),transparent 18%);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;display:grid;justify-items:center;align-content:center;text-align:center;padding:${pad}px;gap:${gap}px;">
        ${photoHtml}
        <p style="margin:0;font-size:${eventFs}px;color:${fgSub};text-transform:uppercase;letter-spacing:0.1em;font-weight:500;">${eventText}</p>
        <h2 style="margin:0;font-size:${nameFs}px;line-height:1.05;letter-spacing:-0.03em;font-weight:700;color:${fg};">${nameText}</h2>
        <p style="margin:0;font-size:${titleFs}px;color:${fgSub};font-weight:400;">${titleText}</p>
        <p style="margin:0;font-size:${topicFs}px;font-weight:700;color:${fg};">${topicText}</p>
        ${metaText ? `<p style="margin:0;font-size:${metaFs}px;color:${fgMeta};font-weight:400;">${metaText}</p>` : ""}
        <img src="${logo.src}" alt="" style="width:${logoW}px;height:auto;margin-top:${px(1.5)}px;opacity:0.85;"/>
      </div>
    </div>`;
  }

  function fileSlug(v) {
    return (v || "speaker")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 42);
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function makeFileName(format, theme) {
    const name = fileSlug(state.fullName || "speaker");
    const eventSlug = fileSlug(state.eventName || "event");
    return `cursor-${eventSlug}-${name}-${format}-${theme}.png`;
  }

  async function renderCard(format, theme) {
    const dims = FORMATS[format];
    const wrapper = document.createElement("div");
    wrapper.innerHTML = buildExportHtml(format, theme);
    const root = /** @type {HTMLElement} */ (wrapper.firstElementChild);
    exportStage.innerHTML = "";
    exportStage.appendChild(root);
    await delay(250);
    return toPng(root, {
      cacheBust: true,
      pixelRatio: 1,
      width: dims.width,
      height: dims.height,
    });
  }

  function dataUrlToBlob(dataUrl) {
    const [header, b64] = dataUrl.split(",");
    const mime = header.match(/:(.*?);/)?.[1] || "image/png";
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  async function downloadCurrent() {
    if (location.protocol === "file:") {
      setMessage("Export requires http(s). Open this page via localhost or GitHub Pages.");
      return;
    }
    try {
      setMessage("Exporting...");
      const dataUrl = await renderCard(state.format, state.theme);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = makeFileName(state.format, state.theme);
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage("Downloaded current asset.");
    } catch (err) {
      console.error("Export error:", err);
      setMessage("Export failed. Use localhost/http(s), then try again.");
    }
  }

  async function downloadAll() {
    if (location.protocol === "file:") {
      setMessage("Export requires http(s). Open this page via localhost or GitHub Pages.");
      return;
    }
    try {
      const zip = new JSZip();
      const jobs = ["square", "horizontal", "instagram"].flatMap((f) => ["dark", "light"].map((t) => [f, t]));
      let count = 0;
      for (const [f, t] of jobs) {
        count++;
        setMessage(`Rendering ${count} of ${jobs.length}...`);
        // eslint-disable-next-line no-await-in-loop
        const dataUrl = await renderCard(
          /** @type {"square"|"horizontal"|"instagram"} */ (f),
          /** @type {"dark"|"light"} */ (t),
        );
        const blob = dataUrlToBlob(dataUrl);
        zip.file(makeFileName(f, t), blob);
      }
      setMessage("Packing zip...");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const name = fileSlug(state.fullName || "speaker");
      const eventSlug = fileSlug(state.eventName || "event");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(zipBlob);
      a.download = `cursor-${eventSlug}-${name}-assets.zip`;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      setMessage("Downloaded zip with 6 assets.");
    } catch (err) {
      console.error("Download all error:", err);
      setMessage("Download all failed. Use localhost/http(s), then try again.");
    }
  }

  ["#sg-name", "#sg-title", "#sg-topic", "#sg-event", "#sg-meta"].forEach((selector) => {
    const input = /** @type {HTMLInputElement | null} */ (el(selector));
    input?.addEventListener("input", () => {
      state.fullName = /** @type {HTMLInputElement} */ (el("#sg-name")).value;
      state.speakerTitle = /** @type {HTMLInputElement} */ (el("#sg-title")).value;
      state.topicTitle = /** @type {HTMLInputElement} */ (el("#sg-topic")).value;
      state.eventName = /** @type {HTMLInputElement} */ (el("#sg-event")).value;
      state.datePlace = /** @type {HTMLInputElement} */ (el("#sg-meta")).value;
      updatePreview();
    });
  });

  /** @type {HTMLInputElement|null} */ (el("#sg-photo"))?.addEventListener("change", (ev) => {
    const file = /** @type {HTMLInputElement} */ (ev.currentTarget).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.photoDataUrl = String(reader.result || "");
      updatePreview();
    };
    reader.readAsDataURL(file);
  });

  el("#sg-clear-photo")?.addEventListener("click", () => {
    state.photoDataUrl = "";
    const photoInput = /** @type {HTMLInputElement | null} */ (el("#sg-photo"));
    if (photoInput) {
      photoInput.value = "";
    }
    updatePreview();
  });

  el("#sg-download-current")?.addEventListener("click", () => {
    void downloadCurrent();
  });
  el("#sg-download-all")?.addEventListener("click", () => {
    void downloadAll();
  });
  container.querySelector("[data-back]")?.addEventListener("click", () => navigate("hub"));
  container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
  container.querySelector("[data-colours]")?.addEventListener("click", onColours);
  updatePreview();
}

function escapeHtml(s) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
