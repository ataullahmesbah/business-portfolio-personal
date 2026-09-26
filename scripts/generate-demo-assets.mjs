// Generates the illustrated demo images in public/demo (SVG, no external assets).
// Run: npm run assets:generate
// Replace them from the admin dashboard with real photos before going live.
import { mkdirSync, writeFileSync } from "node:fs";

const out = new URL("../public/demo/", import.meta.url);
mkdirSync(out, { recursive: true });
const save = (name, svg) => writeFileSync(new URL(name, out), svg.trim() + "\n");

const FONT = "Arial, Helvetica, sans-serif";
const P = "#4f3cf0"; // brand purple
const C = "#14d4f0"; // brand cyan
const NAVY = "#0d0b2e";

const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}</svg>`;
const lin = (id, a, b, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

// ---------------------------------------------------------------------
// People (flat illustration). Drawn in a 400 × 470 box, bust from the chest up.
// ---------------------------------------------------------------------
function person({
  skin = "#efb893",
  skinShade = "#d99a72",
  hair = "#3a2a22",
  style = "short", // short | long | bun | curly
  jacket = "#1f2447",
  lapel = "#2d3468",
  shirt = "#ffffff",
  tie = P,
  glasses = false,
  beard = false,
  smile = true,
} = {}) {
  const back =
    style === "long"
      ? `<path d="M118 150C108 250 120 330 132 360L268 360C280 330 292 250 282 150Z" fill="${hair}"/>`
      : style === "curly"
        ? `<g fill="${hair}"><circle cx="140" cy="130" r="40"/><circle cx="260" cy="130" r="40"/><circle cx="150" cy="190" r="36"/><circle cx="250" cy="190" r="36"/><circle cx="200" cy="92" r="50"/></g>`
        : "";
  const top =
    style === "bun"
      ? `<circle cx="200" cy="60" r="30" fill="${hair}"/><path d="M136 146C130 90 166 72 202 72C240 72 272 92 266 146C256 116 236 104 204 104C172 104 148 116 136 146Z" fill="${hair}"/>`
      : style === "long"
        ? `<path d="M132 160C124 92 164 66 202 66C244 66 280 94 270 160C262 124 244 106 204 106C168 106 146 122 132 160Z" fill="${hair}"/>`
        : style === "curly"
          ? `<path d="M138 140C136 96 166 80 202 80C240 80 266 98 264 140C250 118 232 110 202 110C174 110 152 118 138 140Z" fill="${hair}"/>`
          : `<path d="M136 146C128 84 168 60 204 60C246 60 274 88 266 146C260 118 240 104 206 104C176 104 150 114 136 146Z" fill="${hair}"/>`;
  const collar = tie
    ? `<path d="M168 266L200 332L232 266Z" fill="${shirt}"/><path d="M194 330L206 330L213 420L200 436L187 420Z" fill="${tie}"/>`
    : `<path d="M168 266L200 318L232 266Z" fill="${shirt}"/><path d="M178 266L200 300L222 266Z" fill="${skinShade}"/>`;
  return `
  ${back}
  <rect x="172" y="196" width="56" height="74" rx="22" fill="${skinShade}"/>
  <path d="M34 470C44 336 108 272 200 264C292 272 356 336 366 470Z" fill="${jacket}"/>
  ${collar}
  <path d="M162 268L200 344L184 364L136 298Z" fill="${lapel}"/>
  <path d="M238 268L200 344L216 364L264 298Z" fill="${lapel}"/>
  <ellipse cx="138" cy="160" rx="11" ry="16" fill="${skinShade}"/>
  <ellipse cx="262" cy="160" rx="11" ry="16" fill="${skinShade}"/>
  <ellipse cx="200" cy="152" rx="62" ry="74" fill="${skin}"/>
  <ellipse cx="170" cy="182" rx="12" ry="7" fill="#f28b82" opacity="0.25"/>
  <ellipse cx="230" cy="182" rx="12" ry="7" fill="#f28b82" opacity="0.25"/>
  ${top}
  ${beard ? `<path d="M146 168C152 216 178 232 200 232C222 232 248 216 254 168C244 196 226 208 200 208C174 208 156 196 146 168Z" fill="${hair}" opacity="0.92"/>` : ""}
  <circle cx="178" cy="156" r="5" fill="#2a1d17"/>
  <circle cx="222" cy="156" r="5" fill="#2a1d17"/>
  <circle cx="180" cy="154" r="1.6" fill="#fff"/>
  <circle cx="224" cy="154" r="1.6" fill="#fff"/>
  ${glasses ? `<circle cx="178" cy="156" r="17" fill="none" stroke="#1c1c28" stroke-width="3"/><circle cx="222" cy="156" r="17" fill="none" stroke="#1c1c28" stroke-width="3"/><path d="M195 156h10M161 152l-22-4M239 152l22-4" stroke="#1c1c28" stroke-width="3"/>` : ""}
  <path d="M164 130q14-8 28 0M208 130q14-8 28 0" stroke="${hair}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M198 162q-6 14 4 16" stroke="${skinShade}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${smile ? `<path d="M184 192q16 12 32 0" stroke="${beard ? "#fff" : "#b5584a"}" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<path d="M188 194h24" stroke="#b5584a" stroke-width="4" stroke-linecap="round"/>`}`;
}

const owner = { glasses: true, beard: true };
const people = {
  owner,
  sarah: { skin: "#f3c5a4", skinShade: "#e0a47f", hair: "#6b3f22", style: "long", jacket: "#e8e6f7", lapel: "#d6d2f0", shirt: "#ffffff", tie: null },
  daniel: { skin: "#e8b48a", skinShade: "#cf966b", hair: "#15151b", style: "short", jacket: "#243b55", lapel: "#2f4a6b", tie: null },
  laura: { skin: "#a9714b", skinShade: "#8e5b39", hair: "#241612", style: "curly", jacket: "#b8465f", lapel: "#a13a52", shirt: "#fce7ef", tie: null },
  maya: { skin: "#f6d0b1", skinShade: "#e2ae8a", hair: "#2a2a35", style: "bun", jacket: "#0f766e", lapel: "#0d6b63", tie: null },
};

function portrait(name, w, h, bgA, bgB, who, { scale = 1, dy = 0, deco = "" } = {}) {
  const s = (w / 400) * scale;
  const x = (w - 400 * s) / 2;
  const y = h - 470 * s + dy;
  save(
    name,
    svg(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="url(#bg)"/>${deco}<g transform="translate(${x} ${y}) scale(${s})">${person(who)}</g>`,
      lin("bg", bgA, bgB, 0.3, 1)
    )
  );
}

// Circles + dots behind people, like a studio backdrop
const studioDeco = (w, h) =>
  `<circle cx="${w * 0.82}" cy="${h * 0.2}" r="${w * 0.2}" fill="#ffffff" opacity="0.35"/><circle cx="${w * 0.12}" cy="${h * 0.45}" r="${w * 0.08}" fill="#ffffff" opacity="0.35"/>` +
  Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<circle cx="${w * 0.08 + c * 18}" cy="${h * 0.08 + r * 18}" r="2.5" fill="${P}" opacity="0.25"/>`).join("")).join("");

portrait("hero-portrait.svg", 800, 1000, "#ece8ff", "#cfeef7", owner, { scale: 1.1, deco: studioDeco(800, 1000) });
portrait("about-portrait.svg", 800, 1000, "#f1eeff", "#e0f6fb", { ...owner, tie: null, jacket: "#2a3b8f", lapel: "#23327a", shirt: "#dbe7ff" }, { scale: 1.08, deco: studioDeco(800, 1000) });

// Avatars (square)
portrait("avatar-owner.svg", 400, 400, "#e3dcff", "#c6f1f8", owner, { scale: 1.25, dy: 150 });
portrait("avatar-1.svg", 400, 400, "#ffe3d3", "#ffd0e0", people.sarah, { scale: 1.25, dy: 150 });
portrait("avatar-2.svg", 400, 400, "#d9e8ff", "#cdeff6", people.daniel, { scale: 1.25, dy: 150 });
portrait("avatar-3.svg", 400, 400, "#fde2e8", "#efe0ff", people.laura, { scale: 1.25, dy: 150 });

// ---------------------------------------------------------------------
// Work photos (4:5 scenes)
// ---------------------------------------------------------------------
const W = 800, H = 1000;
function bust(who, x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">${person(who)}</g>`;
}

// Meeting: two people across a table with a laptop
save(
  "work-meeting.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="80" y="120" width="300" height="200" rx="18" fill="#ffffff" opacity="0.8"/>
    <rect x="110" y="150" width="140" height="16" rx="8" fill="${P}" opacity="0.5"/>
    <path d="M110 280l50-40 40 20 60-60 60 30" stroke="${C}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${bust(people.sarah, -60, 330, 1.05)}
    ${bust(owner, 380, 330, 1.05)}
    <rect x="0" y="780" width="${W}" height="220" fill="#8b6b4f"/>
    <rect x="0" y="780" width="${W}" height="24" fill="#a3825f"/>
    <path d="M300 780l20-150h200l20 150z" fill="#2b2d3a"/>
    <rect x="330" y="650" width="180" height="110" rx="6" fill="url(#screen)"/>
    <rect x="250" y="776" width="340" height="14" rx="7" fill="#3a3d4d"/>
    <rect x="620" y="720" width="60" height="64" rx="10" fill="#ffffff"/><path d="M680 736q24 0 24 18t-24 18" stroke="#ffffff" stroke-width="8" fill="none"/>`,
    lin("bg", "#e7e3ff", "#d3f1f8", 0.2, 1) + lin("screen", P, C)
  )
);

// Desk: laptop with dashboard, plant, coffee and notebook
save(
  "work-desk.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="90" y="120" width="220" height="280" rx="14" fill="#ffffff" opacity="0.7"/>
    <rect x="120" y="160" width="160" height="12" rx="6" fill="#f08a6b"/>
    <rect x="120" y="190" width="120" height="10" rx="5" fill="#f3b59b"/>
    <rect x="120" y="230" width="160" height="130" rx="10" fill="#ffe8de"/>
    <rect x="0" y="700" width="${W}" height="300" fill="#f3e9df"/>
    <rect x="0" y="700" width="${W}" height="20" fill="#e6d7c8"/>
    <rect x="200" y="400" width="420" height="280" rx="18" fill="#1f2033"/>
    <rect x="218" y="418" width="384" height="244" rx="8" fill="#ffffff"/>
    <rect x="236" y="436" width="90" height="208" rx="6" fill="#efeefe"/>
    <rect x="340" y="436" width="244" height="60" rx="6" fill="url(#g1)"/>
    <rect x="340" y="508" width="116" height="136" rx="6" fill="#e9fbfe"/>
    <rect x="468" y="508" width="116" height="136" rx="6" fill="#f3f0ff"/>
    <path d="M352 620l24-30 24 14 30-44" stroke="${P}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="526" cy="576" r="36" fill="none" stroke="${C}" stroke-width="14" stroke-dasharray="160 80"/>
    <path d="M160 700h500l-30 30H190z" fill="#2a2b3f"/>
    <rect x="640" y="600" width="70" height="100" rx="10" fill="#f08a6b"/>
    <path d="M675 600c-40-60-10-120 0-150c10 30 40 90 0 150z" fill="#3fa37a"/><path d="M675 600c-60-30-70-80-60-110c30 20 60 60 60 110z" fill="#2f8a64"/><path d="M675 600c50-30 70-80 60-110c-30 20-60 60-60 110z" fill="#4cbf8f"/>
    <rect x="80" y="640" width="80" height="60" rx="10" fill="#ffffff"/><path d="M160 654q24 0 24 16t-24 16" stroke="#ffffff" stroke-width="8" fill="none"/>
    <rect x="80" y="760" width="220" height="150" rx="10" fill="${P}" transform="rotate(-6 190 835)"/>
    <rect x="100" y="780" width="160" height="8" rx="4" fill="#ffffff" opacity="0.6" transform="rotate(-6 190 835)"/>`,
    lin("bg", "#fff1e8", "#ffe1ea", 0.2, 1) + lin("g1", P, C)
  )
);

// Team: three people together
save(
  "work-team.svg",
  svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>
    <circle cx="400" cy="380" r="300" fill="#ffffff" opacity="0.35"/>
    ${bust(people.maya, -40, 470, 1.0)}
    ${bust(people.laura, 440, 470, 1.0)}
    ${bust(people.daniel, 200, 380, 1.12)}
    <g transform="translate(560 120)"><rect width="170" height="70" rx="35" fill="#ffffff"/><text x="85" y="45" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="700" fill="${NAVY}">Team up!</text></g>`,
    lin("bg", "#dcf7ea", "#d6e9ff", 0.2, 1)
  )
);

// ---------------------------------------------------------------------
// Project covers (4:3 UI mockups)
// ---------------------------------------------------------------------
const PW = 1200, PH = 900;
const bar = (x, y, w, h, fill, r = h / 2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
function browser(x, y, w, h, inner, fill = "#ffffff") {
  return `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="22" fill="${fill}" filter="url(#sh)"/><rect width="${w}" height="44" rx="22" fill="#f1f1f7"/><rect y="22" width="${w}" height="22" fill="#f1f1f7"/><circle cx="26" cy="22" r="7" fill="#ff6b6b"/><circle cx="48" cy="22" r="7" fill="#ffc94d"/><circle cx="70" cy="22" r="7" fill="#4cd97b"/>${bar(110, 14, w * 0.4, 16, "#e2e2ee")}<g transform="translate(0 44)">${inner}</g></g>`;
}
function phone(x, y, w, h, inner, frame = NAVY) {
  return `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="36" fill="${frame}" filter="url(#sh)"/><rect x="12" y="12" width="${w - 24}" height="${h - 24}" rx="26" fill="#ffffff"/><rect x="${w / 2 - 36}" y="20" width="72" height="12" rx="6" fill="${frame}"/><g transform="translate(12 40)">${inner}</g></g>`;
}
const shadow = `<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#0d0b2e" flood-opacity="0.25"/></filter>`;
function cover(name, a, b, body) {
  save(name, svg(PW, PH, `<rect width="${PW}" height="${PH}" fill="url(#bg)"/><circle cx="1080" cy="120" r="220" fill="#ffffff" opacity="0.12"/><circle cx="120" cy="820" r="180" fill="#ffffff" opacity="0.1"/>${body}`, lin("bg", a, b) + shadow + lin("acc", P, C)));
}

cover(
  "project-learnhub.svg",
  "#6de0ea",
  "#3fb6d6",
  browser(
    110,
    130,
    720,
    620,
    `<rect x="36" y="36" width="648" height="240" rx="18" fill="#e8f8fa"/>
    <text x="70" y="120" font-family="${FONT}" font-size="44" font-weight="800" fill="${NAVY}">Learn skills that</text>
    <text x="70" y="172" font-family="${FONT}" font-size="44" font-weight="800" fill="#0891b2">pay the bills.</text>
    ${bar(70, 206, 170, 44, "#0891b2")}<text x="155" y="235" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="700" fill="#fff">Start learning</text>
    <circle cx="560" cy="156" r="90" fill="#bdeef5"/><path d="M510 170l50-50 50 50v50h-100z" fill="#0891b2"/>
    ${[0, 1, 2].map((i) => `<g transform="translate(${36 + i * 222} 304)"><rect width="204" height="210" rx="16" fill="#f7f9fb"/><rect x="14" y="14" width="176" height="100" rx="12" fill="${["#ffd6a5", "#caffbf", "#bdb2ff"][i]}"/>${bar(14, 130, 150, 14, "#1f2937")}${bar(14, 156, 110, 10, "#cbd5e1")}${bar(14, 178, 60, 18, "#0891b2")}</g>`).join("")}`
  ) +
    phone(
      880,
      300,
      220,
      460,
      `${bar(18, 10, 120, 14, NAVY)}<rect x="18" y="40" width="160" height="140" rx="14" fill="#e8f8fa"/><circle cx="98" cy="110" r="36" fill="#0891b2"/>${bar(18, 200, 150, 12, "#1f2937")}${bar(18, 222, 110, 10, "#cbd5e1")}${bar(18, 260, 160, 40, "#0891b2", 20)}${bar(18, 316, 160, 50, "#f1f5f9", 12)}`
    )
);

cover(
  "project-aurora.svg",
  "#b45cf0",
  "#6d3cf0",
  browser(
    120,
    120,
    960,
    660,
    `${bar(40, 30, 140, 22, "#1f1a3a", 6)}${[0, 1, 2, 3].map((i) => bar(560 + i * 90, 34, 64, 12, "#c4b5fd")).join("")}
    <rect x="40" y="80" width="880" height="230" rx="18" fill="#f3e8ff"/>
    <text x="80" y="170" font-family="${FONT}" font-size="52" font-weight="800" fill="#2e1065">New Season</text>
    <text x="80" y="222" font-family="${FONT}" font-size="26" fill="#6d28d9">Up to 40% off the autumn collection</text>
    ${bar(80, 246, 180, 44, "#6d28d9")}<text x="170" y="275" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="700" fill="#fff">Shop now</text>
    <circle cx="760" cy="195" r="95" fill="#ddd6fe"/><path d="M720 130h80l20 40-20 10v90h-80v-90l-20-10z" fill="#7c3aed"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="translate(${40 + i * 225} 338)"><rect width="205" height="230" rx="16" fill="#faf5ff"/><rect x="16" y="16" width="173" height="130" rx="12" fill="${["#fbcfe8", "#ddd6fe", "#c7d2fe", "#fde68a"][i]}"/>${bar(16, 162, 140, 14, "#1f1a3a")}${bar(16, 188, 70, 14, "#7c3aed")}<circle cx="172" cy="195" r="16" fill="#1f1a3a"/><path d="M165 195h14M172 188v14" stroke="#fff" stroke-width="3"/></g>`).join("")}`
  )
);

cover(
  "project-ledgerly.svg",
  "#1e1b4b",
  "#312e81",
  browser(
    120,
    110,
    960,
    680,
    `<rect x="0" y="0" width="200" height="636" fill="#f5f5ff"/>${bar(28, 28, 120, 22, P, 6)}${[0, 1, 2, 3, 4, 5].map((i) => bar(28, 90 + i * 46, i === 1 ? 150 : 120, 14, i === 1 ? P : "#c7c9e8")).join("")}
    ${[0, 1, 2].map((i) => `<g transform="translate(${228 + i * 236} 28)"><rect width="216" height="120" rx="16" fill="${["#eef2ff", "#ecfeff", "#f5f3ff"][i]}"/>${bar(20, 22, 90, 12, "#8b8fb8")}<text x="20" y="88" font-family="${FONT}" font-size="36" font-weight="800" fill="${NAVY}">${["$48.2k", "$12.9k", "126"][i]}</text></g>`).join("")}
    <rect x="228" y="176" width="468" height="300" rx="16" fill="#fafaff"/>
    ${Array.from({ length: 9 }, (_, i) => { const hgt = [120, 160, 110, 190, 150, 220, 180, 240, 200][i]; return `<rect x="${256 + i * 48}" y="${446 - hgt}" width="28" height="${hgt}" rx="8" fill="url(#acc)"/>`; }).join("")}
    <rect x="720" y="176" width="212" height="300" rx="16" fill="#fafaff"/><circle cx="826" cy="300" r="70" fill="none" stroke="#e0e7ff" stroke-width="26"/><circle cx="826" cy="300" r="70" fill="none" stroke="${P}" stroke-width="26" stroke-dasharray="300 140" transform="rotate(-90 826 300)"/>
    ${[0, 1].map((i) => `<g transform="translate(228 ${500 + i * 56})"><rect width="704" height="44" rx="10" fill="#f7f7fc"/>${bar(18, 16, 160, 12, "#4b4f7a")}${bar(560, 12, 120, 20, i ? "#dcfce7" : "#e0e7ff")}</g>`).join("")}`
  )
);

cover(
  "project-brewly.svg",
  "#ffb37a",
  "#ff7a8a",
  `<circle cx="600" cy="420" r="250" fill="#ffffff" filter="url(#sh)"/>
  <path d="M520 360h160v110c0 50-36 80-80 80s-80-30-80-80z" fill="#ff7a5c"/><path d="M680 380q50 0 50 40t-50 40" stroke="#ff7a5c" stroke-width="18" fill="none"/>
  <path d="M560 330q10-30 0-60M600 330q10-30 0-60M640 330q10-30 0-60" stroke="#ffb37a" stroke-width="10" fill="none" stroke-linecap="round"/>
  <text x="600" y="640" text-anchor="middle" font-family="${FONT}" font-size="64" font-weight="800" fill="#ff5a4e">brewly</text>
  <g transform="translate(120 560) rotate(-8)"><rect width="190" height="250" rx="18" fill="#fff4ec" filter="url(#sh)"/><circle cx="95" cy="100" r="50" fill="#ff7a5c"/>${bar(40, 180, 110, 16, "#ff7a5c")}</g>
  <g transform="translate(900 520) rotate(8)"><rect width="170" height="280" rx="30" fill="#ffffff" filter="url(#sh)"/><rect x="30" y="40" width="110" height="130" rx="10" fill="#ffd9c7"/>${bar(30, 200, 110, 14, "#ff5a4e")}${bar(30, 226, 70, 12, "#ffb37a")}</g>`
);

cover(
  "project-medicare.svg",
  "#34d399",
  "#0d9488",
  browser(
    130,
    120,
    940,
    660,
    `<rect x="40" y="30" width="420" height="260" rx="18" fill="#ecfdf5"/>
    <text x="70" y="110" font-family="${FONT}" font-size="40" font-weight="800" fill="#064e3b">Healthy smiles,</text>
    <text x="70" y="158" font-family="${FONT}" font-size="40" font-weight="800" fill="#059669">happy you.</text>
    ${bar(70, 196, 200, 46, "#059669")}<text x="170" y="226" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="700" fill="#fff">Book appointment</text>
    <rect x="490" y="30" width="410" height="260" rx="18" fill="#f8fafc"/>${bar(520, 60, 150, 14, "#475569")}
    <path d="M520 250l60-40 50 20 60-70 60 30 70-60" stroke="#059669" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="760" y="110" font-family="${FONT}" font-size="36" font-weight="800" fill="#059669">+212%</text>
    ${[0, 1, 2].map((i) => `<g transform="translate(${40 + i * 290} 320)"><rect width="270" height="220" rx="16" fill="#f0fdfa"/><circle cx="44" cy="50" r="24" fill="#99f6e4"/>${bar(84, 38, 150, 14, "#134e4a")}${bar(24, 100, 222, 10, "#a7c7c2")}${bar(24, 122, 200, 10, "#a7c7c2")}${bar(24, 164, 110, 30, "#059669", 15)}</g>`).join("")}`
  )
);

cover(
  "project-propnest.svg",
  "#fbbf24",
  "#f97316",
  browser(
    120,
    120,
    960,
    660,
    `${bar(40, 30, 140, 22, "#7c2d12", 6)}<rect x="40" y="76" width="880" height="80" rx="16" fill="#fff7ed"/>${[0, 1, 2].map((i) => bar(64 + i * 230, 104, 200, 24, "#fed7aa", 8)).join("")}${bar(760, 98, 140, 36, "#ea580c", 18)}
    ${[0, 1, 2].map((i) => `<g transform="translate(${40 + i * 300} 186)"><rect width="280" height="360" rx="18" fill="#fffbf5"/><rect x="16" y="16" width="248" height="180" rx="14" fill="${["#fde68a", "#fed7aa", "#fecaca"][i]}"/><path d="M${80} 150l60-60 60 60v40h-120z" fill="#ffffff" opacity="0.9"/><rect x="128" y="150" width="24" height="40" fill="${["#f59e0b", "#ea580c", "#ef4444"][i]}"/>${bar(16, 216, 200, 16, "#431407")}${bar(16, 246, 140, 12, "#c2a78f")}<text x="16" y="310" font-family="${FONT}" font-size="30" font-weight="800" fill="#ea580c">${["$420k", "$615k", "$298k"][i]}</text></g>`).join("")}`
  )
);

// ---------------------------------------------------------------------
// Blog covers (3:2)
// ---------------------------------------------------------------------
const BW = 1200, BH = 800;
function blog(name, a, b, body) {
  save(name, svg(BW, BH, `<rect width="${BW}" height="${BH}" fill="url(#bg)"/><circle cx="1050" cy="150" r="200" fill="#ffffff" opacity="0.25"/><circle cx="150" cy="700" r="160" fill="#ffffff" opacity="0.25"/>${body}`, lin("bg", a, b) + shadow + lin("acc", P, C)));
}
blog(
  "blog-seo.svg",
  "#dedaff",
  "#bfe9f2",
  `<g filter="url(#sh)"><rect x="260" y="180" width="560" height="420" rx="28" fill="#ffffff"/></g>
  ${bar(300, 220, 360, 40, "#f1f1f7", 20)}<circle cx="632" cy="240" r="12" fill="none" stroke="${P}" stroke-width="4"/>
  ${[0, 1, 2].map((i) => `<g transform="translate(300 ${290 + i * 96})">${bar(0, 0, 240, 16, i === 0 ? P : "#4b4f7a")}${bar(0, 28, 440, 10, "#d6d6e6")}${bar(0, 46, 360, 10, "#d6d6e6")}</g>`).join("")}
  <g transform="translate(720 420)"><circle r="110" fill="none" stroke="${NAVY}" stroke-width="30"/><circle r="95" fill="#ffffff" opacity="0.6"/><path d="M70 70l110 110" stroke="${NAVY}" stroke-width="40" stroke-linecap="round"/><text y="16" text-anchor="middle" font-family="${FONT}" font-size="52" font-weight="800" fill="${P}">#1</text></g>`
);
blog(
  "blog-speed.svg",
  "#ffe3d3",
  "#ffd0e0",
  `<g filter="url(#sh)"><rect x="340" y="160" width="520" height="480" rx="32" fill="#ffffff"/></g>
  <path d="M430 480a170 170 0 0 1 340 0" stroke="#fde2e2" stroke-width="44" fill="none" stroke-linecap="round"/>
  <path d="M430 480a170 170 0 0 1 300 -100" stroke="url(#acc)" stroke-width="44" fill="none" stroke-linecap="round"/>
  <path d="M600 480l110-120" stroke="${NAVY}" stroke-width="14" stroke-linecap="round"/><circle cx="600" cy="480" r="22" fill="${NAVY}"/>
  <text x="600" y="580" text-anchor="middle" font-family="${FONT}" font-size="56" font-weight="800" fill="${NAVY}">0.9s</text>`
);
blog(
  "blog-social.svg",
  "#d4f5e4",
  "#c8e6ff",
  `<g filter="url(#sh)"><rect x="470" y="110" width="270" height="560" rx="40" fill="${NAVY}"/></g><rect x="486" y="126" width="238" height="528" rx="28" fill="#ffffff"/>
  ${bar(510, 170, 190, 150, "#e0f2fe", 16)}${bar(510, 340, 150, 14, NAVY)}${bar(510, 366, 110, 10, "#94a3b8")}${bar(510, 410, 190, 48, P, 24)}
  <g filter="url(#sh)"><rect x="200" y="220" width="240" height="90" rx="45" fill="#ffffff"/><rect x="780" y="380" width="240" height="90" rx="45" fill="#ffffff"/><circle cx="330" cy="520" r="60" fill="#ffffff"/></g>
  ${bar(236, 256, 170, 18, "#cbd5e1")}${bar(816, 416, 170, 18, "#cbd5e1")}
  <path d="M330 552c-40-24-40-64-14-64 10 0 14 8 14 8s4-8 14-8c26 0 26 40-14 64z" fill="#f43f5e"/>`
);

// ---------------------------------------------------------------------
// Client logos (grey wordmarks on transparent)
// ---------------------------------------------------------------------
const GREY = "#4b4a60";
const logos = {
  northwind: `<path d="M24 6 8 15v18l16 9 16-9V15z" fill="none" stroke="${GREY}" stroke-width="5"/>`,
  lumen: `<circle cx="24" cy="24" r="17" fill="${GREY}"/>`,
  arcadia: `<path d="M6 40 24 8l18 32z" fill="none" stroke="${GREY}" stroke-width="5" stroke-linejoin="round"/>`,
  kinetic: `<rect x="7" y="7" width="34" height="34" rx="10" fill="none" stroke="${GREY}" stroke-width="5"/>`,
  novaco: `<path d="M24 5v38M5 24h38M11 11l26 26M37 11 11 37" stroke="${GREY}" stroke-width="5" stroke-linecap="round"/>`,
  orbit: `<circle cx="24" cy="24" r="17" fill="none" stroke="${GREY}" stroke-width="5"/><circle cx="24" cy="24" r="6" fill="${GREY}"/>`,
};
for (const [key, icon] of Object.entries(logos)) {
  save(`logo-${key}.svg`, svg(240, 48, `${icon}<text x="56" y="36" font-family="${FONT}" font-size="32" font-weight="800" letter-spacing="-0.5" fill="${GREY}">${key}</text>`));
}

// ---------------------------------------------------------------------
// Awards (16:10)
// ---------------------------------------------------------------------
function award(name, a, b, body) {
  save(name, svg(1280, 800, `<rect width="1280" height="800" fill="url(#bg)"/><circle cx="640" cy="400" r="300" fill="#ffffff" opacity="0.14"/>${body}`, lin("bg", a, b) + lin("gold", "#fde68a", "#f59e0b") + shadow));
}
award(
  "award-1.svg",
  P,
  C,
  `<g filter="url(#sh)"><path d="M540 200h200v90c0 70-45 120-100 120s-100-50-100-120z" fill="url(#gold)"/><path d="M540 230h-60q0 90 70 100M740 230h60q0 90-70 100" stroke="#fbbf24" stroke-width="18" fill="none"/><rect x="615" y="405" width="50" height="90" fill="#f59e0b"/><rect x="560" y="490" width="160" height="40" rx="8" fill="#fbbf24"/><rect x="530" y="526" width="220" height="50" rx="10" fill="${NAVY}"/></g><path d="M640 250l14 30 32 4-24 22 6 32-28-16-28 16 6-32-24-22 32-4z" fill="#ffffff"/>`
);
award(
  "award-2.svg",
  "#0d0b2e",
  "#312e81",
  `<g filter="url(#sh)"><circle cx="640" cy="360" r="150" fill="url(#gold)"/><path d="M570 480l-40 170 110-60 110 60-40-170" fill="${P}"/></g><circle cx="640" cy="360" r="110" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.7"/><text x="640" y="385" text-anchor="middle" font-family="${FONT}" font-size="72" font-weight="800" fill="${NAVY}">WIN</text>`
);
award(
  "award-3.svg",
  "#14d4f0",
  "#0ea5e9",
  `<g filter="url(#sh)"><rect x="380" y="180" width="520" height="400" rx="24" fill="#ffffff"/></g><rect x="410" y="210" width="460" height="340" rx="14" fill="none" stroke="#e2e8f0" stroke-width="4"/>
  ${bar(500, 260, 280, 20, NAVY)}${bar(540, 300, 200, 12, "#94a3b8")}${bar(460, 360, 360, 10, "#cbd5e1")}${bar(480, 384, 320, 10, "#cbd5e1")}
  <circle cx="780" cy="480" r="46" fill="url(#gold)"/><path d="M760 520l-10 60 30-18 30 18-10-60" fill="${P}"/>${bar(460, 470, 160, 8, NAVY)}`
);

console.log("Demo assets written to public/demo");
