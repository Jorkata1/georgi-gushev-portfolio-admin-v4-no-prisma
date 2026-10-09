import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { FONTS, roundRect } from "@/components/home/journey/scene/scene-kit";

export type SiteLayout = "wide" | "narrow";

const INK = "#08111f";
const GOLD = "#e8a44a";
const TEXT = "#eef2f8";
const MUTED = "#a9b6c9";

function drawNav(ctx: CanvasRenderingContext2D, copy: JourneySceneCopy, x: number, w: number, top: number, pad: number, unit: number, isWide: boolean) {
  roundRect(ctx, x + pad, top - unit * 2, unit * 3.4, unit * 3.4, unit * 0.8);
  ctx.fillStyle = GOLD;
  ctx.fill();
  ctx.fillStyle = TEXT;
  ctx.font = `600 ${unit * 2.2}px ${FONTS.sans}`;
  ctx.textBaseline = "middle";
  ctx.fillText(copy.siteBrand, x + pad + unit * 4.6, top - unit * 0.3);
  if (!isWide) {
    [0, 1, 2].forEach((i) => {
      ctx.fillStyle = MUTED;
      ctx.fillRect(x + w - pad - unit * 5, top - unit * 1.6 + i * unit * 1.3, unit * 5, unit * 0.45);
    });
    return;
  }
  ctx.fillStyle = MUTED;
  ctx.font = `500 ${unit * 1.7}px ${FONTS.sans}`;
  copy.siteNav.forEach((item, i) => ctx.fillText(item, x + w - pad - unit * 40 + i * unit * 9.5, top - unit * 0.3));
  roundRect(ctx, x + w - pad - unit * 11, top - unit * 2.4, unit * 11, unit * 4.2, unit * 0.9);
  ctx.fillStyle = GOLD;
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = `700 ${unit * 1.6}px ${FONTS.sans}`;
  ctx.fillText(copy.siteCta, x + w - pad - unit * 9.6, top - unit * 0.3, unit * 9);
}

function drawArtwork(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  const art = ctx.createLinearGradient(x, y, x + w, y + h);
  art.addColorStop(0, "#1d3a6b");
  art.addColorStop(0.55, "#3b5c96");
  art.addColorStop(1, GOLD);
  roundRect(ctx, x, y, w, h, radius);
  ctx.fillStyle = art;
  ctx.fill();
  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.beginPath();
  ctx.arc(x + w * 0.72, y + h * 0.38, w * 0.26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(8,17,31,0.35)";
  ctx.beginPath();
  ctx.arc(x + w * 0.25, y + h * 0.95, w * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** A small, believable homepage drawn into a screen rectangle; "wide" is the desktop layout. */
export function drawSite(ctx: CanvasRenderingContext2D, copy: JourneySceneCopy, x: number, y: number, w: number, h: number, layout: SiteLayout) {
  const isWide = layout === "wide";
  const unit = w / (isWide ? 100 : 60);
  const pad = unit * 5;
  ctx.save();
  roundRect(ctx, x, y, w, h, unit * 1.2);
  ctx.clip();
  ctx.fillStyle = INK;
  ctx.fillRect(x, y, w, h);
  const glow = ctx.createRadialGradient(x + w * 0.85, y + h * 0.1, 0, x + w * 0.85, y + h * 0.1, w * 0.7);
  glow.addColorStop(0, "rgba(232,164,74,0.22)");
  glow.addColorStop(1, "rgba(232,164,74,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(x, y, w, h);

  let cursor = y + unit * (isWide ? 5 : 7);
  drawNav(ctx, copy, x, w, cursor, pad, unit, isWide);

  const columnWidth = isWide ? w * 0.46 : w - pad * 2;
  const bodySize = unit * (isWide ? 1.7 : 2.2);
  cursor += unit * (isWide ? 10 : 9);
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = GOLD;
  ctx.font = `700 ${unit * 1.4}px ${FONTS.mono}`;
  ctx.fillText(copy.siteEyebrow, x + pad, cursor);
  cursor += unit * (isWide ? 7.5 : 8);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${unit * (isWide ? 6.2 : 6.6)}px ${FONTS.serif}`;
  ctx.fillText(copy.siteTitle[0], x + pad, cursor, columnWidth);
  cursor += unit * (isWide ? 6.8 : 7.4);
  ctx.fillStyle = GOLD;
  ctx.fillText(copy.siteTitle[1], x + pad, cursor, columnWidth);
  cursor += unit * (isWide ? 5 : 5.4);
  ctx.fillStyle = MUTED;
  ctx.font = `400 ${bodySize}px ${FONTS.sans}`;
  ctx.fillText(copy.siteText, x + pad, cursor, columnWidth);
  cursor += unit * (isWide ? 4 : 4.4);

  const buttonHeight = unit * (isWide ? 4.4 : 5.4);
  const primaryWidth = unit * (isWide ? 13 : 20);
  roundRect(ctx, x + pad, cursor, primaryWidth, buttonHeight, unit * 0.9);
  ctx.fillStyle = GOLD;
  ctx.fill();
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.font = `700 ${bodySize}px ${FONTS.sans}`;
  ctx.fillText(copy.siteCta, x + pad + unit * 2, cursor + buttonHeight / 2, primaryWidth - unit * 3);
  const secondaryX = x + pad + primaryWidth + unit * 2;
  const secondaryWidth = unit * (isWide ? 12 : 18);
  roundRect(ctx, secondaryX, cursor, secondaryWidth, buttonHeight, unit * 0.9);
  ctx.strokeStyle = "rgba(238,242,248,0.25)";
  ctx.lineWidth = Math.max(1, unit * 0.18);
  ctx.stroke();
  ctx.fillStyle = TEXT;
  ctx.font = `600 ${bodySize}px ${FONTS.sans}`;
  ctx.fillText(copy.siteSecondary, secondaryX + unit * 2.2, cursor + buttonHeight / 2, secondaryWidth - unit * 3);
  ctx.textBaseline = "alphabetic";

  const imageX = isWide ? x + w * 0.54 : x + pad;
  const imageY = isWide ? y + unit * 13 : cursor + buttonHeight + unit * 4;
  const imageW = isWide ? w * 0.46 - pad : w - pad * 2;
  const imageH = isWide ? h * 0.5 : Math.min(h - (imageY - y) - pad, imageW * 0.9);
  drawArtwork(ctx, imageX, imageY, imageW, imageH, unit * 1.6);

  if (isWide) {
    const statsY = y + h - unit * 9;
    copy.siteStats.forEach(([value, label], i) => {
      const statX = x + pad + i * unit * 14;
      ctx.fillStyle = "#34d399";
      ctx.font = `700 ${unit * 2.8}px ${FONTS.mono}`;
      ctx.fillText(value, statX, statsY);
      ctx.fillStyle = MUTED;
      ctx.font = `500 ${unit * 1.4}px ${FONTS.sans}`;
      ctx.fillText(label, statX, statsY + unit * 2.6);
    });
  }
  ctx.restore();
}