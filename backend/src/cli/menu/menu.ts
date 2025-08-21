import MessageLogger from "@/cli/messageLogger/messageLogger";
import path from "path";
import fs from "fs";
import os from "os";

const logger = new MessageLogger("Menu");
const loadLogoTxt = path.join(process.cwd(), "logo.txt");

// ====== simple styling utils ======
const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  gray: "\x1b[90m",
};

const termWidth = Math.max(60, (process.stdout.columns || 80));

function center(line: string, width = termWidth) {
  const len = stripAnsi(line).length;
  const left = Math.max(0, Math.floor((width - len) / 2));
  return " ".repeat(left) + line;
}
function stripAnsi(s: string) {
  return s.replace(/\x1b\[[0-9;]*m/g, "");
}

// Draws a box around a set of lines
function box(
  lines: string[],
  {
    padding = { x: 2, y: 0 }, // y=0 means no empty lines inside the box
    color = C.cyan,
    width = termWidth,
  } = {}
) {
  const contentWidth = width - 2 - 2 * padding.x;
  const normalized = lines.map((l) => {
    const plain = stripAnsi(l);
    if (plain.length > contentWidth) {
      const cut = [...plain].slice(0, contentWidth - 1).join("") + "…";
      return l.replace(plain, cut);
    }
    const padRight = contentWidth - plain.length;
    return l + " ".repeat(padRight);
  });

  const top = color + "┏" + "━".repeat(width - 2) + "┓" + C.reset;
  const bottom = color + "┗" + "━".repeat(width - 2) + "┛" + C.reset;

  const body = normalized.map(
    (l) =>
      color +
      "┃" +
      C.reset +
      " ".repeat(padding.x) +
      l +
      " ".repeat(padding.x) +
      color +
      "┃" +
      C.reset
  );

  return [top, ...body, bottom].join("\n");
}

function kv(label: string, value: string) {
  return `${C.gray}${label}:${C.reset} ${value}`;
}

async function showIntro() {
  try {
    const logo = await fs.promises.readFile(loadLogoTxt, "utf-8");

    // Clear screen + small top margin
    process.stdout.write("\x1Bc\n\n");

    // Show logo (centered, blue)
    const logoLines = logo
      .replace(/\r/g, "")
      .split("\n")
      .map((l) => center(C.blue + l + C.reset));
    console.log(logoLines.join("\n"));

    console.log();

    // Header (centered, bold)
    const title = center(`${C.yellow}${C.bold}🚀 WleciCore Backend 🚀${C.reset}`);
    console.log(title);
    console.log(center(`${C.dim}— fast dev server for the Wleci ecosystem —${C.reset}`));
    console.log();

    // Application info (reads from CONFIG if available)

    const appMode = (global as any).CONFIG?.application?.mode ?? "development";
    const appName = (global as any).CONFIG?.application?.name ?? "WleciCore";
    const appVersion = (global as any).CONFIG?.application?.version ?? "0.0.1";
    const appAuthor = (global as any).CONFIG?.application?.author ?? "Unknown";

    const modeColor = appMode === "production" ? C.yellow : C.cyan;

    const sys = [
      kv("App", `${C.green}${appName}${C.reset}`),
      kv("Version", `${C.green}${appVersion}${C.reset}`),
      kv("Author", `${C.green}${appAuthor}${C.reset}`),
      kv("Mode", `${modeColor}${appMode}${C.reset}`),
      kv("Node", `${process.version}`),
      kv("Platform", `${os.platform()} ${os.release()}`),
    ].map((s) => center(s));

    // Print system/app info inside a box (no vertical padding)
    console.log(box(sys, { padding: { x: 3, y: 0 }, color: C.cyan, width: termWidth }));

    console.log(); // one extra blank line at the end
  } catch (err) {
    logger.error("Error loading logo.txt", err);
  }
}

showIntro();
