/**
 * Brand asset paths + helpers (mirrors src/lumaTileAssets.ts).
 * SVGs live one level up: ../Cursor_Brand_Assets_Sept_2025/ (folder is at repo root).
 */

import { BRAND_TOKENS } from "./brandTokens.js";

export const ASSET_ROOT = "./assets/";

/** @typedef {{ id: string, category: string, label: string, fileName: string, src: string }} BrandAsset */

const RAW_ROWS = [
  ["General Logos/Cube/SVG/CUBE_25D.svg", "General Logos/Cube", "Cube 2.5D", "CUBE_25D.svg"],
  ["General Logos/Cube/SVG/CUBE_2D_DARK.svg", "General Logos/Cube", "Cube 2d Dark", "CUBE_2D_DARK.svg"],
  ["General Logos/Cube/SVG/CUBE_2D_LIGHT.svg", "General Logos/Cube", "Cube 2d Light", "CUBE_2D_LIGHT.svg"],
  ["General Logos/Wordmark/SVG/WORDMARK_DARK.svg", "General Logos/Wordmark", "Wordmark Dark", "WORDMARK_DARK.svg"],
  ["General Logos/Wordmark/SVG/WORDMARK_LIGHT.svg", "General Logos/Wordmark", "Wordmark Light", "WORDMARK_LIGHT.svg"],
  ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_DARK.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2.5D Dark", "LOCKUP_HORIZONTAL_25D_DARK.svg"],
  ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_25D_LIGHT.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2.5D Light", "LOCKUP_HORIZONTAL_25D_LIGHT.svg"],
  ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_DARK.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2d Dark", "LOCKUP_HORIZONTAL_2D_DARK.svg"],
  ["General Logos/Lockup Horizontal/SVG/LOCKUP_HORIZONTAL_2D_LIGHT.svg", "General Logos/Lockup Horizontal", "Lockup Horizontal 2d Light", "LOCKUP_HORIZONTAL_2D_LIGHT.svg"],
  ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_DARK.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2.5D Dark", "LOCKUP_VERTICAL_25D_DARK.svg"],
  ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_25D_LIGHT.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2.5D Light", "LOCKUP_VERTICAL_25D_LIGHT.svg"],
  ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_DARK.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2d Dark", "LOCKUP_VERTICAL_2D_DARK.svg"],
  ["General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_LIGHT.svg", "General Logos/Lockup Vertical", "Lockup Vertical 2d Light", "LOCKUP_VERTICAL_2D_LIGHT.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_DARK.svg", "Avatars/Circle", "Avatar Circle 2.5D Dark", "AVATAR_CIRCLE_25D_DARK.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_LIGHT.svg", "Avatars/Circle", "Avatar Circle 2.5D Light", "AVATAR_CIRCLE_25D_LIGHT.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_25D_WHITE.svg", "Avatars/Circle", "Avatar Circle 2.5D White", "AVATAR_CIRCLE_25D_WHITE.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_DARK.svg", "Avatars/Circle", "Avatar Circle 2d Dark", "AVATAR_CIRCLE_2D_DARK.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_LIGHT.svg", "Avatars/Circle", "Avatar Circle 2d Light", "AVATAR_CIRCLE_2D_LIGHT.svg"],
  ["Avatars/Circle/SVG/AVATAR_CIRCLE_2D_WHITE.svg", "Avatars/Circle", "Avatar Circle 2d White", "AVATAR_CIRCLE_2D_WHITE.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_25D_DARK.svg", "Avatars/Square", "Avatar Square 2.5D Dark", "AVATAR_SQUARE_25D_DARK.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_25D_LIGHT.svg", "Avatars/Square", "Avatar Square 2.5D Light", "AVATAR_SQUARE_25D_LIGHT.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_25D_WHITE.svg", "Avatars/Square", "Avatar Square 2.5D White", "AVATAR_SQUARE_25D_WHITE.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_2D_DARK.svg", "Avatars/Square", "Avatar Square 2d Dark", "AVATAR_SQUARE_2D_DARK.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_2D_LIGHT.svg", "Avatars/Square", "Avatar Square 2d Light", "AVATAR_SQUARE_2D_LIGHT.svg"],
  ["Avatars/Square/SVG/AVATAR_SQUARE_2D_WHITE.svg", "Avatars/Square", "Avatar Square 2d White", "AVATAR_SQUARE_2D_WHITE.svg"],
  ["App Icons/SVG_PSD/APP_ICON_25D_DARK.svg", "App Icons", "App Icon 2.5D Dark", "APP_ICON_25D_DARK.svg"],
  ["App Icons/SVG_PSD/APP_ICON_25D_LIGHT.svg", "App Icons", "App Icon 2.5D Light", "APP_ICON_25D_LIGHT.svg"],
  ["App Icons/SVG_PSD/APP_ICON_2D_DARK.svg", "App Icons", "App Icon 2d Dark", "APP_ICON_2D_DARK.svg"],
  ["App Icons/SVG_PSD/APP_ICON_2D_LIGHT.svg", "App Icons", "App Icon 2d Light", "APP_ICON_2D_LIGHT.svg"],
];

export function assetSrc(id) {
  return ASSET_ROOT + id.split("/").map(encodeURIComponent).join("/");
}

/** @type {BrandAsset[]} */
export const BRAND_ASSETS = RAW_ROWS.map(([id, category, label, fileName]) => ({
  id,
  category,
  label,
  fileName,
  src: assetSrc(id),
}));

export const BRAND_COLORS = {
  light: { bg: BRAND_TOKENS.light.bg, fg: BRAND_TOKENS.light.fg, card: BRAND_TOKENS.light.card },
  dark: { bg: BRAND_TOKENS.dark.bg, fg: BRAND_TOKENS.dark.fg, card: BRAND_TOKENS.dark.card },
};

export const LOCKUP_VERTICAL_2D_DARK = "General Logos/Lockup Vertical/SVG/LOCKUP_VERTICAL_2D_DARK.svg";

export const CATEGORY_ORDER = [
  "General Logos/Cube",
  "General Logos/Wordmark",
  "General Logos/Lockup Horizontal",
  "General Logos/Lockup Vertical",
  "Avatars/Circle",
  "Avatars/Square",
  "App Icons",
];

export const CATEGORY_LABELS = {
  "General Logos/Cube": "General logos / cube",
  "General Logos/Wordmark": "General logos / wordmark",
  "General Logos/Lockup Horizontal": "General logos / lockup horizontal",
  "General Logos/Lockup Vertical": "General logos / lockup vertical",
  "Avatars/Circle": "Avatars / circle",
  "Avatars/Square": "Avatars / square",
  "App Icons": "App icons",
};

export const EXPORT_SIZE_MIN_PX = 64;
export const EXPORT_SIZE_MAX_PX = 8192;
export const DEFAULT_EXPORT_PX = 800;

export const EXPORT_SIZE_SHORTCUTS = [
  { label: "800", size: 800 },
  { label: "1080", size: 1080 },
  { label: "1200", size: 1200 },
  { label: "2048", size: 2048 },
  { label: "4096", size: 4096 },
  { label: "8000", size: 8000 },
  { label: "8192", size: 8192 },
];

export function clampExportSizePx(raw) {
  if (!Number.isFinite(raw)) {
    return DEFAULT_EXPORT_PX;
  }
  return Math.min(EXPORT_SIZE_MAX_PX, Math.max(EXPORT_SIZE_MIN_PX, Math.round(raw)));
}

const BRAND_ASSET_IDS = new Map(BRAND_ASSETS.map((a) => [a.id, a]));

export const DEFAULT_PRIMARY_ASSET_ID = "General Logos/Cube/SVG/CUBE_2D_DARK.svg";
export const DEFAULT_SECONDARY_ASSET_ID = "General Logos/Wordmark/SVG/WORDMARK_DARK.svg";

export function getAssetById(assetId) {
  return BRAND_ASSET_IDS.get(assetId) ?? BRAND_ASSETS[0];
}

export function getCategoryAssets(category) {
  return BRAND_ASSETS.filter((a) => a.category === category);
}

export function getThemedVariantId(assetId, nextTheme) {
  const asset = getAssetById(assetId);
  const themedFileName = asset.fileName.replace(/_(LIGHT|DARK)(?=\.svg$)/, nextTheme === "dark" ? "_DARK" : "_LIGHT");
  const themedAsset = BRAND_ASSETS.find(
    (c) => c.category === asset.category && c.fileName === themedFileName,
  );
  return themedAsset?.id ?? assetId;
}

export function getAssetWidth(category, scale, slot) {
  const baseWidthByCategory = {
    "General Logos/Cube": { primary: 30, secondary: 20 },
    "General Logos/Wordmark": { primary: 70, secondary: 54 },
    "General Logos/Lockup Horizontal": { primary: 76, secondary: 58 },
    "General Logos/Lockup Vertical": { primary: 48, secondary: 34 },
    "Avatars/Circle": { primary: 34, secondary: 22 },
    "Avatars/Square": { primary: 34, secondary: 22 },
    "App Icons": { primary: 34, secondary: 24 },
  };
  const baseW = baseWidthByCategory[category]?.[slot] ?? 30;
  return `${Math.round(baseW * (scale / 100))}%`;
}

/** @param {BrandAsset} asset */
export function getBrandAssetMeta(asset) {
  const stem = asset.fileName.replace(/\.svg$/i, "");
  const upper = stem.toUpperCase();
  let dimensions = "-";
  if (upper.includes("25D")) {
    dimensions = "2.5D";
  } else if (upper.includes("2D")) {
    dimensions = "2D";
  }
  let theme = "-";
  if (/_WHITE$/i.test(stem) || upper.includes("_WHITE")) {
    theme = "White";
  } else if (/_DARK$/i.test(stem)) {
    theme = "Dark";
  } else if (/_LIGHT$/i.test(stem)) {
    theme = "Light";
  }
  /** @type {string | null} */
  let avatarShape = null;
  if (asset.category.startsWith("Avatars/")) {
    avatarShape = asset.category.includes("Circle") ? "Circle" : "Square";
  }
  return { dimensions, theme, avatarShape, format: "SVG" };
}

/** @typedef {"luma-dark" | "luma-light" | "lockup"} BootPreset */

/** Chapter avatar tool options */
export function getAvatarOptions() {
  return BRAND_ASSETS.filter((a) => a.id.startsWith("Avatars/")).map((a) => ({
    id: a.id,
    src: a.src,
    label: a.label,
    shape: a.category.includes("Circle") ? "circle" : "square",
  }));
}
