import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { FONTS, type DrawFn } from "@/components/home/journey/scene/scene-kit";

export type Fragment = { width: number; height: number; draw: DrawFn };

/** Pieces of outdated, chaotic websites, painted into textures for the first chapter. */
export function getChaosFragments(copy: JourneySceneCopy): Fragment[] {
  return [
    {
      width: 640, height: 220,
      draw(ctx, w, h) {
        for (let x = -h, stripe = 0; x < w; x += 44, stripe += 1) {
          ctx.fillStyle = stripe % 2 === 0 ? "#111111" : "#f5c400";
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 44, 0); ctx.lineTo(x + 44 + h, h); ctx.lineTo(x + h, h); ctx.fill();
        }
        ctx.fillStyle = "#f5c400"; ctx.fillRect(24, 40, w - 48, h - 80);
        ctx.fillStyle = "#111111"; ctx.font = `44px ${FONTS.impact}`; ctx.textAlign = "center";
        ctx.fillText(copy.underConstruction[0], w / 2, 100, w - 80);
        ctx.fillText(copy.underConstruction[1], w / 2, 152, w - 80);
      }
    },
    {
      width: 640, height: 300,
      draw(ctx, w, h) {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, "#00c2c7"); gradient.addColorStop(1, "#ff00cc");
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
        ctx.font = `bold 46px ${FONTS.comic}`;
        ctx.fillStyle = "#000000"; ctx.fillText(copy.welcome, 34, 84);
        ctx.fillStyle = "#ffff00"; ctx.fillText(copy.welcome, 30, 80);
        ctx.font = `26px ${FONTS.times}`; ctx.fillStyle = "#0000ee";
        copy.oldNav.forEach((link, i) => {
          const x = 30 + i * 150;
          ctx.fillText(link, x, 170);
          ctx.fillRect(x, 175, ctx.measureText(link).width, 2);
        });
        ctx.fillStyle = "#551a8b"; ctx.fillText(copy.lastUpdated, 30, 250);
      }
    },
    {
      width: 520, height: 180,
      draw(ctx, w, h) {
        ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#cccccc"; ctx.font = `24px ${FONTS.times}`; ctx.fillText(copy.visitorNumber, 24, 52);
        "0001274".split("").forEach((digit, i) => {
          ctx.fillStyle = "#222222"; ctx.fillRect(24 + i * 66, 74, 58, 80);
          ctx.fillStyle = "#39ff14"; ctx.font = "bold 60px 'Courier New', monospace"; ctx.fillText(digit, 36 + i * 66, 136);
        });
      }
    },
    {
      width: 480, height: 360,
      draw(ctx, w, h) {
        ctx.fillStyle = "#e6e6e6"; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "#999999"; ctx.lineWidth = 4; ctx.strokeRect(2, 2, w - 4, h - 4);
        ctx.fillStyle = "#ffffff"; ctx.fillRect(40, 40, 70, 84);
        ctx.strokeStyle = "#777777"; ctx.lineWidth = 3; ctx.strokeRect(40, 40, 70, 84);
        ctx.fillStyle = "#4caf50";
        ctx.beginPath(); ctx.moveTo(48, 112); ctx.lineTo(70, 82); ctx.lineTo(86, 100); ctx.lineTo(102, 76); ctx.lineTo(102, 116); ctx.lineTo(48, 116); ctx.fill();
        ctx.strokeStyle = "#dd3333"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(36, 36); ctx.lineTo(116, 128); ctx.stroke();
        ctx.fillStyle = "#444444"; ctx.font = `24px ${FONTS.times}`;
        ctx.fillText("snimka_final_FINAL2.jpg", 40, 180);
        ctx.fillText(copy.brokenImage, 40, 216, w - 60);
      }
    },
    {
      width: 520, height: 340,
      draw(ctx, w, h) {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "#0a246a"; ctx.lineWidth = 8; ctx.strokeRect(4, 4, w - 8, h - 8);
        ctx.fillStyle = "#0a246a"; ctx.fillRect(4, 4, w - 8, 44);
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 22px Tahoma, sans-serif"; ctx.fillText("!", 18, 34); ctx.fillText("x", w - 30, 32);
        ctx.fillStyle = "#000000"; ctx.font = `bold 34px ${FONTS.comic}`;
        ctx.fillText(copy.newsletter[0], 30, 112, w - 60);
        ctx.fillText(copy.newsletter[1], 30, 156, w - 60);
        ctx.fillStyle = "#e00000"; ctx.fillRect(30, 200, 220, 70);
        ctx.fillStyle = "#ffffff"; ctx.font = `40px ${FONTS.impact}`; ctx.fillText(copy.newsletterYes, 82, 250);
        ctx.fillStyle = "#aaaaaa"; ctx.font = "13px sans-serif"; ctx.fillText(copy.newsletterNo, 300, 250);
      }
    },
    {
      width: 560, height: 220,
      draw(ctx) {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 560, 220);
        ctx.fillStyle = "#000000"; ctx.font = `bold 64px ${FONTS.times}`; ctx.fillText("404", 28, 88);
        ctx.font = `28px ${FONTS.times}`; ctx.fillText("Not Found", 28, 132);
        ctx.font = `20px ${FONTS.times}`; ctx.fillText("The requested URL /uslugi.html was not found.", 28, 176);
      }
    },
    {
      width: 600, height: 300,
      draw(ctx, w, h) {
        ctx.fillStyle = "#ffffe0"; ctx.fillRect(0, 0, w, h);
        const columnX = [0, 214, 368];
        const columnWidth = [210, 150, 200];
        ctx.strokeStyle = "#000000"; ctx.lineWidth = 3; ctx.font = `24px ${FONTS.times}`;
        copy.priceRows.forEach((row, r) => row.forEach((cell, c) => {
          const y = 16 + r * 68;
          ctx.strokeRect(16 + columnX[c], y, columnWidth[c], 64);
          ctx.fillStyle = r > 0 && c === 2 && r !== 2 ? "#e00000" : "#000000";
          ctx.fillText(cell, 26 + columnX[c] + (r % 2) * 18, y + 42, columnWidth[c] - 20);
        }));
      }
    },
    {
      width: 640, height: 120,
      draw(ctx, w) {
        ctx.fillStyle = "#333333"; ctx.fillRect(0, 0, w, 120);
        ctx.fillStyle = "#ffffff"; ctx.font = "22px Arial, sans-serif"; ctx.fillText(copy.cookies, 22, 50, w - 40);
        ctx.fillStyle = "#888888"; ctx.fillRect(w - 120, 64, 96, 40);
        ctx.fillStyle = "#000000"; ctx.font = "bold 20px Arial"; ctx.fillText("OK", w - 88, 92);
      }
    },
    {
      width: 480, height: 320,
      draw(ctx, w, h) {
        ctx.fillStyle = "#f2f2f2"; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#d4d4d4"; ctx.font = `bold 30px ${FONTS.times}`; ctx.fillText(copy.aboutTitle, 24, 52);
        ctx.font = `16px ${FONTS.times}`;
        for (let line = 0; line < 12; line += 1) ctx.fillText(copy.aboutLine, 24, 92 + line * 19, w - 40);
      }
    },
    {
      width: 420, height: 260,
      draw(ctx, w) {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, 260);
        ctx.lineWidth = 12; ctx.strokeStyle = "#dddddd"; ctx.beginPath(); ctx.arc(w / 2, 100, 48, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = "#1e88e5"; ctx.beginPath(); ctx.arc(w / 2, 100, 48, -1.4, 0.6); ctx.stroke();
        ctx.fillStyle = "#555555"; ctx.font = "26px Arial"; ctx.textAlign = "center"; ctx.fillText(copy.loadingPercent, w / 2, 210);
      }
    },
    {
      width: 480, height: 170,
      draw(ctx, w, h) {
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, "#ff4d4d"); gradient.addColorStop(1, "#990000");
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "#ffeb3b"; ctx.lineWidth = 8; ctx.strokeRect(6, 6, w - 12, h - 12);
        ctx.fillStyle = "#ffeb3b"; ctx.font = `58px ${FONTS.impact}`; ctx.textAlign = "center"; ctx.fillText(copy.clickHere, w / 2, 106, w - 40);
      }
    },
    {
      width: 720, height: 110,
      draw(ctx, w) {
        ctx.fillStyle = "#0000aa"; ctx.fillRect(0, 0, w, 110);
        ctx.fillStyle = "#fff200"; ctx.font = `bold 32px ${FONTS.comic}`; ctx.fillText(copy.promo, 20, 68, w - 40);
      }
    }
  ];
}