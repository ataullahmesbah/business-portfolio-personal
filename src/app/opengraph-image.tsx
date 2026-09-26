import { ImageResponse } from "next/og";
import { getProfile, getSettings } from "@/lib/data";
import { safeHex } from "@/lib/utils";

export const alt = "Website preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [s, p] = await Promise.all([getSettings(), getProfile()]);
  const accent = safeHex(s.accent_color, "#4f3cf0");
  const accent2 = safeHex(s.accent_color_2, "#14d4f0");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0d0b2e",
          color: "#c9c7e6",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -160, right: -120, width: 520, height: 520, borderRadius: 9999, background: accent, opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: -200, left: -140, width: 520, height: 520, borderRadius: 9999, background: accent2, opacity: 0.18, display: "flex" }} />
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: accent2, display: "flex" }}>{p.professional_title}</div>
        <div style={{ fontSize: 88, fontWeight: 800, color: "#ffffff", marginTop: 20, display: "flex" }}>{p.full_name}</div>
        <div style={{ fontSize: 44, marginTop: 16, display: "flex" }}>{`${p.hero_headline} ${p.typed_roles[0] ?? ""}`.trim()}</div>
        <div style={{ width: 160, height: 8, borderRadius: 8, marginTop: 36, background: `linear-gradient(90deg, ${accent}, ${accent2})`, display: "flex" }} />
        <div style={{ fontSize: 26, marginTop: 32, color: "#a3a1c2", display: "flex" }}>{p.location}</div>
      </div>
    ),
    size
  );
}
