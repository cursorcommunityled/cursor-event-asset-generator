import { BRAND_TOKENS } from "../brandTokens.js";

const PHOTO_SRC = "../photos_guideliness.png";

/**
 * @param {HTMLElement} container
 * @param {{ navigate: (p: string) => void, onColours: () => void }} ctx
 */
export function renderGuidelines(container, { navigate, onColours }) {
  container.innerHTML = `
    <div class="reference-page guidelines-page">
      <header class="app-top-bar app-top-bar-hub reference-page-top-bar">
        <div class="app-top-bar-brand">
          <button type="button" class="button-back" data-back>← Assets center</button>
          <p class="eyebrow">Brand reference</p>
          <h1 class="app-top-bar-title hub-header-compact">Guidelines</h1>
          <p class="app-top-bar-tagline hub-tagline-wide">
            Community brand rules from <code>cursor-branding-guidelines.md</code>-logos, type, voice,
            photography, and motion. Full hex tables live on the
            <button type="button" class="button-text reference-inline-nav" data-colours>Colours</button>
            page.
          </p>
        </div>
        <div class="app-top-bar-actions">
          <nav class="app-top-bar-nav" aria-label="Reference">
            <button type="button" class="button-text" data-colours-nav>Colours →</button>
          </nav>
        </div>
      </header>

      <div class="reference-page-body">
        <p class="reference-page-source">
          Source: <code>cursor-branding-guidelines.md</code> in this repo. Asset zips named in that file.
        </p>

        <section class="reference-section panel" id="logos" aria-labelledby="guidelines-logos-heading">
          <h2 id="guidelines-logos-heading" class="reference-section-title">Logos</h2>
          <p class="reference-section-lead">
            Logos are Cursor's most visible marker (cube and wordmark). Use at modest sizes and leave
            enough breathing room for a refined feel.
          </p>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Use the provided horizontal and vertical lockups.</li>
                <li>Keep clear space around the cube (at least ⅓ cube width).</li>
                <li>Prefer the 2D logo for primary use.</li>
                <li>Use the logo with restraint and modesty.</li>
              </ul>
            </div>
            <div class="reference-dont">
              <h3 class="reference-do-dont-title">Don't</h3>
              <ul class="reference-list">
                <li>Don't create your own lockups.</li>
                <li>Don't crowd the logo-give it space.</li>
                <li>Don't build custom patterns from the logo.</li>
                <li>Don't place the logo where it feels oversized.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="colour" aria-labelledby="guidelines-colour-heading">
          <h2 id="guidelines-colour-heading" class="reference-section-title">Colour</h2>
          <p class="reference-section-lead">
            Neutrals as the base, with a bright orange accent
            <code class="reference-mono-inline">${BRAND_TOKENS.light.accent}</code>. Keep accent use sharp and
            intentional-see the full
            <button type="button" class="button-text reference-inline-nav" data-colours2>colour tables</button>.
          </p>
        </section>

        <section class="reference-section panel" id="typography" aria-labelledby="guidelines-type-heading">
          <h2 id="guidelines-type-heading" class="reference-section-title">Typography</h2>
          <p class="reference-section-lead">
            <strong>Cursor Gothic</strong> is the official brand typeface and should be used whenever
            possible (this site uses system UI fonts for portability).
          </p>
        </section>

        <section class="reference-section panel" id="voice" aria-labelledby="guidelines-voice-heading">
          <h2 id="guidelines-voice-heading" class="reference-section-title">Voice &amp; tone</h2>
          <p class="reference-section-lead">
            Quiet confidence: clear, concise, approachable. Technical when needed, light when possible.
            Professional, sometimes witty, never forced.
          </p>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Say things simply and directly.</li>
                <li>Be clear and concise, but complete.</li>
                <li>Stay professional and considerate.</li>
              </ul>
            </div>
            <div class="reference-dont">
              <h3 class="reference-do-dont-title">Don't</h3>
              <ul class="reference-list">
                <li>Don't oversell or exaggerate.</li>
                <li>Don't try too hard to be funny or casual.</li>
                <li>Don't hide meaning in jargon or corporate speak.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="casing" aria-labelledby="guidelines-casing-heading">
          <h2 id="guidelines-casing-heading" class="reference-section-title">Casing &amp; punctuation</h2>
          <p class="reference-section-lead">
            Use <strong>sentence case</strong> for headings, labels, and titles
            <em>outside the Cursor IDE</em>. Only capitalise proper nouns.
          </p>
          <div class="reference-examples-grid">
            <div class="reference-example-card reference-example-card--do">
              <h3 class="reference-example-label">Do</h3>
              <ul class="reference-list reference-list--examples">
                <li>Improved Agent tools, steerability, and usage visibility</li>
                <li>Bringing the Cursor Agent to Linear</li>
                <li>New API key</li>
                <li>Only run when mentioned</li>
              </ul>
            </div>
            <div class="reference-example-card reference-example-card--dont">
              <h3 class="reference-example-label">Don't</h3>
              <ul class="reference-list reference-list--examples">
                <li>Improved Agent Tools, Steerability, and Usage Visibility</li>
                <li>New API Key</li>
                <li>Only Run When Mentioned</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="reference-section panel" id="motion" aria-labelledby="guidelines-motion-heading">
          <h2 id="guidelines-motion-heading" class="reference-section-title">Logo animations</h2>
          <p class="reference-section-lead">
            Animated logos suit video end cards, loading states, and UI motion. Use where motion adds
            delight-avoid overuse or distracting loops. Grab official packs from the brand download linked
            in the markdown source.
          </p>
        </section>

        <section class="reference-section panel" id="photography" aria-labelledby="guidelines-photo-heading">
          <h2 id="guidelines-photo-heading" class="reference-section-title">Photography</h2>
          <p class="reference-section-lead">
            Warm, not overproduced, precise in intent. Natural light, candid shots, real energy. Film /
            disposable cameras can add spontaneity and texture.
          </p>
          <ul class="reference-keyword-list" aria-label="Photography keywords">
            <li>rich</li>
            <li>warm</li>
            <li>natural</li>
            <li>not overproduced</li>
            <li>spontaneous</li>
          </ul>
          <figure class="reference-photo-figure">
            <img src="${PHOTO_SRC}" alt="Mood board: warm candid photography examples with natural light and social scenes, matching brand photography direction"
              class="reference-photo-img" loading="lazy" />
            <figcaption class="reference-photo-caption">
              Reference mood board from brand guidelines-warm tones, natural light, candid moments.
            </figcaption>
          </figure>
          <div class="reference-do-dont">
            <div class="reference-do">
              <h3 class="reference-do-dont-title">Do</h3>
              <ul class="reference-list">
                <li>Shoot with warm, natural tones.</li>
                <li>Use natural light when possible.</li>
                <li>Embrace candid and spontaneous shots.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  const goColours = () => onColours();
  container.querySelector("[data-back]")?.addEventListener("click", () => navigate("hub"));
  container.querySelector("[data-colours]")?.addEventListener("click", goColours);
  container.querySelector("[data-colours-nav]")?.addEventListener("click", goColours);
  container.querySelector("[data-colours2]")?.addEventListener("click", goColours);
}
