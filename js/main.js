import { mountAvatarTool } from "./avatarTool.js";
import { mountTileEditor } from "./tileEditor.js";
import { renderAssetLibrary } from "./views/assetLibrary.js";
import { renderColours } from "./views/colours.js";
import { renderEventTemplates } from "./views/eventTemplates.js";
import { renderGuidelines } from "./views/guidelines.js";
import { renderHub } from "./views/hub.js";
import { mountSpeakerGenerator } from "./views/speakerGenerator.js";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root");
}

function navigate(hashPath) {
  const cleaned = hashPath.replace(/^#?\/?/, "");
  location.hash = `/${cleaned}`;
}

function parseRoute() {
  const raw = (location.hash.slice(1) || "/hub").replace(/^\//, "");
  const [pathPart, queryPart] = raw.split("?");
  const segment = pathPart.split("/").filter(Boolean)[0] || "hub";
  const params = new URLSearchParams(queryPart ?? "");
  return { screen: segment, boot: params.get("boot") ?? undefined };
}

function hubLayoutClass(screen) {
  return ["hub", "library", "guidelines", "colours", "event-templates"].includes(screen)
    ? "app-layout app-layout--hub"
    : "app-layout app-layout--editor";
}

function renderHubHeader() {
  return `
    <header class="app-top-bar app-top-bar-hub">
      <div class="app-top-bar-brand">
        <p class="eyebrow">Cursor ambassador studio</p>
        <h1 class="app-top-bar-title hub-header-compact">Ambassador assets center</h1>
        <p class="app-top-bar-tagline hub-tagline-wide">
          Square promos, chapter avatars, and brand reference-aligned with the official asset
          folders and guidelines.
        </p>
      </div>
      <div class="app-top-bar-actions">
        <nav class="app-top-bar-nav" aria-label="Reference">
          <button type="button" class="button-text" id="hdr-guidelines">Guidelines</button>
          <button type="button" class="button-text" id="hdr-colours">Colours</button>
        </nav>
      </div>
    </header>
  `;
}

function render() {
  const { screen, boot } = parseRoute();
  root.className = hubLayoutClass(screen);

  const ctx = {
    navigate,
    onGuidelines: () => navigate("guidelines"),
    onColours: () => navigate("colours"),
  };

  if (screen === "hub") {
    root.innerHTML = renderHubHeader() + '<div id="view"></div>';
    const view = document.getElementById("view");
    if (view) {
      renderHub(view, { navigate });
    }
    document.getElementById("hdr-guidelines")?.addEventListener("click", ctx.onGuidelines);
    document.getElementById("hdr-colours")?.addEventListener("click", ctx.onColours);
    return;
  }

  root.innerHTML = '<div id="view" class="view-root"></div>';
  const view = document.getElementById("view");
  if (!view) {
    return;
  }

  switch (screen) {
    case "library":
      renderAssetLibrary(view, ctx);
      break;
    case "guidelines":
      renderGuidelines(view, { navigate, onColours: ctx.onColours });
      break;
    case "colours":
      renderColours(view, { navigate, onGuidelines: ctx.onGuidelines });
      break;
    case "event-templates":
      renderEventTemplates(view, ctx);
      break;
    case "tile":
      mountTileEditor(view, { boot, navigate, onGuidelines: ctx.onGuidelines, onColours: ctx.onColours });
      break;
    case "avatar":
      mountAvatarTool(view, ctx);
      break;
    case "speaker-generator":
      mountSpeakerGenerator(view, ctx);
      break;
    default:
      navigate("hub");
  }
}

window.addEventListener("hashchange", render);
if (!location.hash || location.hash === "#") {
  location.hash = "/hub";
} else {
  render();
}
