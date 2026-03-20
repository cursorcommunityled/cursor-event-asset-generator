import {
  BRAND_ASSETS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "../lumaTileAssets.js";

const HUB_KIT_PREVIEW_BY_CATEGORY = {
  "General Logos/Cube": "General Logos/Cube/SVG/CUBE_25D.svg",
  "General Logos/Wordmark": "General Logos/Wordmark/SVG/WORDMARK_DARK.svg",
  "General Logos/Lockup Horizontal": "General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_DARK.svg",
  "General Logos/Lockup Vertical": "General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_DARK.svg",
  "Avatars/Circle": "Avatars/Circle/SVG/AVATAR_CIRCLE_25D_DARK.svg",
  "Avatars/Square": "Avatars/Square/SVG/AVATAR_SQUARE_25D_DARK.svg",
  "App Icons": "App Icons/SVG_PSD/APP_ICON_25D_DARK.svg",
};

const HUB_PREVIEW_ASSETS = CATEGORY_ORDER.map((cat) => {
  const preferredId = HUB_KIT_PREVIEW_BY_CATEGORY[cat];
  const byId = preferredId ? BRAND_ASSETS.find((a) => a.id === preferredId) : undefined;
  return byId ?? BRAND_ASSETS.find((a) => a.category === cat);
}).filter(Boolean);

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (path: string) => void }} ctx
 */
export function renderHub(container, { navigate }) {
  container.innerHTML = `
    <div class="hub-page">
      <section class="hub-hero panel hub-hero--compact">
        <p class="eyebrow">Cursor ambassador studio</p>
        <h1 class="hub-title">Ambassador assets center</h1>
        <p class="hub-lead">
          Logos, avatars, event copy starters, and references-square designer, templates for Luma/Meetup, SVG
          library, and brand pages.
        </p>
        <div class="hub-hero-links">
          <button type="button" class="hub-secondary-link" data-nav="guidelines">Guidelines</button>
          <button type="button" class="hub-secondary-link" data-nav="colours">Colours &amp; tokens</button>
        </div>
      </section>

      <section class="hub-start-panel panel" aria-label="Tools">
        <h2 class="hub-start-heading">Tools</h2>
        <p class="hub-start-lead">
          <strong>Square designer</strong> covers Luma, Meetup, and social squares-open Export in the tool to
          choose <strong>PNG or SVG</strong> and pixel size. Other tiles jump in with a layout starter.
        </p>
        <ul class="hub-action-grid">
          <li>
            <button type="button" class="hub-action-tile hub-action-tile--primary" data-nav="tile" data-boot="luma-dark">
              <p class="hub-action-tile-kicker">Square 1:1</p>
              <p class="hub-action-tile-title">Square designer</p>
              <p class="hub-action-tile-desc">Event pages, feeds, print-set size &amp; format when you export.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="tile" data-boot="luma-light">
              <p class="hub-action-tile-kicker">Starter</p>
              <p class="hub-action-tile-title">Light tile</p>
              <p class="hub-action-tile-desc">Light theme + cube &amp; wordmark to tweak.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="tile" data-boot="lockup">
              <p class="hub-action-tile-kicker">Starter</p>
              <p class="hub-action-tile-title">Lockup only</p>
              <p class="hub-action-tile-desc">Vertical lockup solo-hide secondary mark.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="avatar">
              <p class="hub-action-tile-kicker">PNG</p>
              <p class="hub-action-tile-title">Chapter avatar</p>
              <p class="hub-action-tile-desc">Circle or square from <code>Avatars/</code>.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="speaker-generator">
              <p class="hub-action-tile-kicker">Batch output</p>
              <p class="hub-action-tile-title">Speaker generator</p>
              <p class="hub-action-tile-desc">Upload photo + details, then download square/horizontal/Instagram in dark and light.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="event-templates">
              <p class="hub-action-tile-kicker">Luma &amp; email</p>
              <p class="hub-action-tile-title">Event descriptions</p>
              <p class="hub-action-tile-desc">Starters for meetups, cafés, hackathons-pick, set city, copy or download.</p>
            </button>
          </li>
          <li>
            <button type="button" class="hub-action-tile" data-nav="library">
              <p class="hub-action-tile-kicker">Browse</p>
              <p class="hub-action-tile-title">Asset library</p>
              <p class="hub-action-tile-desc">Preview every mark and download SVGs directly.</p>
            </button>
          </li>
        </ul>
      </section>

      <section class="hub-kit-strip panel" aria-label="Kit families">
        <div class="hub-kit-strip-header">
          <h2 class="hub-kit-strip-title">Families in the pack</h2>
          <button type="button" class="button-text hub-kit-strip-link" data-nav="library">Open full library →</button>
        </div>
        <ul class="hub-kit-grid hub-kit-grid--compact" id="hub-kit-grid"></ul>
      </section>

      <h2 class="hub-section-title">More from the brand pack</h2>
      <div class="hub-grid hub-grid-single">
        <article class="hub-card hub-card-muted">
          <p class="hub-card-kicker">Motion &amp; platform</p>
          <h3 class="hub-card-title">Animations &amp; app icons</h3>
          <p class="hub-card-body">
            Logo animations for video and store app icons ship with the official brand pack-this site
            doesn't edit video. Grab SVGs from the library or the full zip from your brand contact.
          </p>
          <button type="button" class="button-text hub-inline-link" data-nav="library">Open asset library →</button>
        </article>
      </div>
    </div>
  `;

  const kitGrid = container.querySelector("#hub-kit-grid");
  if (kitGrid) {
    kitGrid.innerHTML = HUB_PREVIEW_ASSETS.map(
      (asset) => `
      <li class="hub-preview-cell">
        <div class="hub-preview-thumb${
          asset.category === "General Logos/Wordmark" ? " hub-preview-thumb--wordmark" : ""
        }${asset.category === "Avatars/Circle" ? " hub-preview-thumb--circle" : ""}" title="${escapeAttr(asset.label)}">
          <img src="${escapeAttr(asset.src)}" alt="" loading="lazy" />
        </div>
        <span class="hub-preview-caption">${CATEGORY_LABELS[asset.category] ?? asset.category}</span>
      </li>
    `,
    ).join("");
  }

  container.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
      const screen = el.getAttribute("data-nav");
      const boot = el.getAttribute("data-boot");
      if (screen === "tile" && boot) {
        navigate(`tile?boot=${encodeURIComponent(boot)}`);
      } else if (screen) {
        navigate(screen);
      }
    });
  });
}

function escapeAttr(s) {
  return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}
