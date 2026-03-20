/** Mirrors src/brandTokens.ts */

export const LIGHT_COLOR_TABLE = [
  { name: "bg", hex: "#f7f7f4", rgb: "247, 247, 244", hsl: "60, 16%, 96%", description: "Main background color" },
  { name: "fg", hex: "#26251e", rgb: "38, 37, 30", hsl: "53, 12%, 13%", description: "Primary foreground and text. Secondary text at 60% opacity." },
  { name: "accent", hex: "#f54e00", rgb: "245, 78, 0", hsl: "19, 100%, 48%", description: "Primary accent - use sparingly" },
  { name: "card", hex: "#f2f1ed", rgb: "242, 241, 237", hsl: "48, 16%, 94%", description: "Default card background" },
  { name: "card-01", hex: "#f0efeb", rgb: "240, 239, 235", hsl: "48, 14%, 93%", description: "Card background level 1 (~1% darker)" },
  { name: "card-02", hex: "#ebeae5", rgb: "235, 234, 229", hsl: "50, 13%, 91%", description: "Card background level 2 (~2.5% darker)" },
  { name: "card-03", hex: "#e6e5e0", rgb: "230, 229, 224", hsl: "50, 11%, 89%", description: "Card background level 3 (~5% darker)" },
  { name: "card-04", hex: "#e1e0db", rgb: "225, 224, 219", hsl: "50, 9%, 87%", description: "Card background level 4 (~7.5% darker)" },
];

export const DARK_COLOR_TABLE = [
  { name: "bg", hex: "#14120b", rgb: "20, 18, 11", hsl: "47, 29%, 6%", description: "Main background color" },
  { name: "fg", hex: "#edecec", rgb: "237, 236, 236", hsl: "0, 3%, 93%", description: "Primary foreground and text. Secondary text at 60% opacity." },
  { name: "accent", hex: "#f54e00", rgb: "245, 78, 0", hsl: "19, 100%, 48%", description: "Primary accent - use sparingly" },
  { name: "card", hex: "#1b1913", rgb: "27, 25, 19", hsl: "45, 17%, 9%", description: "Default card background" },
  { name: "card-01", hex: "#1d1b15", rgb: "29, 27, 21", hsl: "45, 16%, 10%", description: "Card level 1 (~1% lighter)" },
  { name: "card-02", hex: "#201e18", rgb: "32, 30, 24", hsl: "45, 14%, 11%", description: "Card level 2 (~2.5% lighter)" },
  { name: "card-03", hex: "#26241e", rgb: "38, 36, 30", hsl: "45, 12%, 13%", description: "Card level 3 (~5% lighter)" },
  { name: "card-04", hex: "#2b2923", rgb: "43, 41, 35", hsl: "45, 10%, 15%", description: "Card level 4 (~7.5% lighter)" },
];

export const BRAND_TOKENS = {
  light: {
    bg: "#f7f7f4",
    fg: "#26251e",
    accent: "#f54e00",
    card: "#f2f1ed",
    card01: "#f0efeb",
    card02: "#ebeae5",
    card03: "#e6e5e0",
    card04: "#e1e0db",
  },
  dark: {
    bg: "#14120b",
    fg: "#edecec",
    accent: "#f54e00",
    card: "#1b1913",
    card01: "#1d1b15",
    card02: "#201e18",
    card03: "#26241e",
    card04: "#2b2923",
  },
};

export function buildTokensJson() {
  return (
    JSON.stringify(
      {
        $schema: "A flat token map for Cursor community branding",
        source: "cursor-branding-guidelines.md",
        light: BRAND_TOKENS.light,
        dark: BRAND_TOKENS.dark,
      },
      null,
      2,
    ) + "\n"
  );
}

export function buildTokensCss() {
  const lines = [
    "/* Auto-generated - Cursor community colors */",
    ":root {",
    "  color-scheme: light dark;",
    "}",
    "",
    "[data-cursor-theme='light'] {",
    ...Object.entries(BRAND_TOKENS.light).map(([key, value]) => `  --cursor-${key}: ${value};`),
    "}",
    "",
    "[data-cursor-theme='dark'] {",
    ...Object.entries(BRAND_TOKENS.dark).map(([key, value]) => `  --cursor-${key}: ${value};`),
    "}",
    "",
  ];
  return lines.join("\n");
}

function triggerDownload(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadBrandTokensJson() {
  triggerDownload("cursor-brand-colors.json", buildTokensJson(), "application/json");
}

export function downloadBrandTokensCss() {
  triggerDownload("cursor-brand-colors.css", buildTokensCss(), "text/css");
}
