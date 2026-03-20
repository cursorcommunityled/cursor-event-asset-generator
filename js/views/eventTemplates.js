import { EVENT_TEMPLATES, fillCity, getEventTemplateById } from "../eventTemplates.js";

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
export function renderEventTemplates(container, { navigate, onGuidelines, onColours }) {
  let templateId = EVENT_TEMPLATES[0]?.id ?? "";
  let city = "";

  container.innerHTML = `
    <div class="reference-page event-templates-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>← Assets center</button>
          <p class="eyebrow">Community</p>
          <h1 class="app-top-bar-title hub-header-compact">Event description templates</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Pick a format, type your city, then copy or download. Edit the rest after pasting into Luma,
            Meetup, or wherever you publish.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-guidelines>Guidelines</button>
            <button type="button" class="button-text" data-colours>Colours</button>
          </nav>
        </div>
      </header>

      <div class="event-templates-body">
        <section class="panel event-templates-picker" aria-label="Choose a template">
          <div class="event-templates-top-row">
            <h2 class="event-templates-section-title">Template</h2>
            <div class="event-templates-city-inline">
              <label for="evt-city" class="event-templates-city-label">City</label>
              <input id="evt-city" type="text" class="event-templates-city-input" placeholder="Your city" />
            </div>
          </div>
          <ul class="event-templates-chip-list" id="chip-list"></ul>
        </section>

        <section class="panel event-templates-preview-block" aria-label="Preview and actions">
          <div class="event-templates-preview-header">
            <h2 class="event-templates-section-title" id="preview-title"></h2>
            <div class="event-templates-preview-actions">
              <button type="button" class="button button-secondary" id="btn-copy">Copy</button>
              <button type="button" class="button button-primary" id="btn-dl">Download .txt</button>
            </div>
          </div>
          <p class="event-templates-toast" id="toast" aria-live="polite" hidden></p>
          <pre class="event-templates-preview" id="preview"></pre>
        </section>
      </div>
    </div>
  `;

  function slugFromCityOrName() {
    const t = getEventTemplateById(templateId);
    return (
      (city.trim() || t?.name || "event")
        .toLowerCase()
        .replaceAll(/\s+/g, "-")
        .replaceAll(/[^a-z0-9-]/g, "")
        .slice(0, 40) || "event"
    );
  }

  function downloadTextFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(msg) {
    const toast = container.querySelector("#toast");
    if (toast) {
      toast.textContent = msg;
      toast.hidden = false;
      globalThis.setTimeout(() => {
        toast.hidden = true;
      }, 2200);
    }
  }

  function sync() {
    const t = getEventTemplateById(templateId);
    const preview = container.querySelector("#preview");
    const titleEl = container.querySelector("#preview-title");
    if (!t || !preview || !titleEl) {
      return;
    }
    titleEl.textContent = t.name;
    preview.textContent = fillCity(t.body, city);
  }

  const chipList = container.querySelector("#chip-list");
  if (chipList) {
    chipList.innerHTML = EVENT_TEMPLATES.map(
      (item) => `
      <li>
        <button type="button" class="event-template-chip${item.id === templateId ? " event-template-chip--active" : ""}" data-id="${escapeHtml(item.id)}">
          <span class="event-template-chip-name">${escapeHtml(item.name)}</span>
          <span class="event-template-chip-tagline">${escapeHtml(item.tagline)}</span>
        </button>
      </li>`,
    ).join("");

    chipList.querySelectorAll("[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        templateId = btn.getAttribute("data-id") ?? "";
        chipList.querySelectorAll(".event-template-chip").forEach((b) => {
          b.classList.toggle("event-template-chip--active", b.getAttribute("data-id") === templateId);
        });
        sync();
      });
    });
  }

  const cityInput = /** @type {HTMLInputElement | null} */ (container.querySelector("#evt-city"));
  cityInput?.addEventListener("input", () => {
    city = cityInput.value;
    sync();
  });

  container.querySelector("#btn-copy")?.addEventListener("click", async () => {
    const t = getEventTemplateById(templateId);
    const text = t ? fillCity(t.body, city) : "";
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy blocked - use Download instead");
    }
  });

  container.querySelector("#btn-dl")?.addEventListener("click", () => {
    const t = getEventTemplateById(templateId);
    const text = t ? fillCity(t.body, city) : "";
    const slug = slugFromCityOrName();
    downloadTextFile(`cursor-${t?.id ?? "event"}-${slug}.txt`, text);
    showToast("Downloaded .txt");
  });

  container.querySelector("[data-back]")?.addEventListener("click", () => navigate("hub"));
  container.querySelector("[data-guidelines]")?.addEventListener("click", onGuidelines);
  container.querySelector("[data-colours]")?.addEventListener("click", onColours);
  sync();
}
