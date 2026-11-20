// The package's example images: tables laid out by tableFor and tvScreen for a phone, a computer and a television, with
// plain name tags as seats, rendered by classes/render_images.py in headless Chrome.
import { tableFor, tvScreen } from "../implementation/web/table-view.ts";

type Scene = { name: string; caption: string; width: number; height: number; look?: string; render: (root: HTMLElement) => void };

const NAMES = ["You", "Ana", "Ben", "Chloé", "Dev", "Eli", "Fay", "Gus", "Hana"];

function tag(text: string, turn = false): HTMLElement {
  const node = document.createElement("span");
  node.textContent = text;
  Object.assign(node.style, { display: "inline-block", padding: "6px 12px", borderRadius: "999px", whiteSpace: "nowrap", fontWeight: "600",
    background: turn ? "var(--primary)" : "var(--surface)", color: turn ? "var(--on-primary)" : "var(--text)", border: "1px solid var(--edge)", transform: "translate(-50%, -50%)" });
  return node;
}

function centre(text: string): HTMLElement {
  const node = document.createElement("span");
  node.textContent = text;
  Object.assign(node.style, { color: "var(--muted)", fontSize: "14px", letterSpacing: "0.05em" });
  return node;
}

function table(seats: number, width: number, height: number, turn: number, tv = false): HTMLElement {
  return tableFor({ seats, width, height, tv, turn, seat: (i) => tag(NAMES[i], i === turn), centre: centre(`${seats} seats`) }).element;
}

function fit(root: HTMLElement, node: HTMLElement, width: string): void {
  Object.assign(root.style, { display: "flex", alignItems: "center", justifyContent: "center", padding: "36px" });
  node.style.width = width;
  root.append(node);
}

export const scenes: Scene[] = [
  { name: "computer-9-seats", caption: "Nine seats around a landscape table on a computer screen, night look", width: 1280, height: 800, look: "night",
    render: (root) => fit(root, table(9, 1280, 800, 3), "1100px") },
  { name: "computer-6-seats-lounge", caption: "Six seats on a computer screen in the lounge look", width: 1280, height: 800, look: "lounge",
    render: (root) => fit(root, table(6, 1280, 800, 0), "1100px") },
  { name: "phone-portrait", caption: "Six seats on a portrait phone, the viewer at the bottom", width: 390, height: 844, look: "night",
    render: (root) => fit(root, table(6, 390, 844, 2), "300px") },
  {
    name: "television", caption: "The television screen: title, banner and the table filling the rest", width: 1280, height: 720, look: "night",
    render: (root) => {
      const banner = document.createElement("div");
      banner.textContent = "Hand 12 · blinds 100/200";
      Object.assign(banner.style, { color: "var(--primary)", fontWeight: "600" });
      root.append(tvScreen({ title: "Casino", banner, table: table(8, 1280, 720, 5, true) }));
    },
  },
];
