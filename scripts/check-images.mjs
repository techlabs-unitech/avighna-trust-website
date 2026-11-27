#!/usr/bin/env node
/**
 * Checks every Wikimedia Commons photograph listed in src/content/images.ts.
 *
 *   node scripts/check-images.mjs
 *
 * For each picture it lists the candidate files in order and marks which ones load. The site tries
 * the candidates in order and shows the first that works, so a picture is only "MISSING" if every
 * candidate fails — then add or correct a file name, or put the Trust's own photograph in
 * /public/images/ and list its path ("/images/...") first.
 */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/content/images.ts", import.meta.url), "utf8");
const commons = (f) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f.replace(/ /g, "_"))}?width=400`;

// every make([...]) / make("...") call → [key, [files]]
const entries = [];
for (const m of src.matchAll(/^\s*(\w+):\s*(?:make|hero)\(\s*(?:"([^"]+)"|\[([^\]]*)\])/gm)) {
  const files = m[2] ? [m[2]] : [...m[3].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  entries.push([m[1], files.filter((f) => !f.startsWith("/"))]);
}
// hero(...) entries carry two lists (desktop, mobile)
for (const m of src.matchAll(/^\s*(\w+): hero\(\s*"[^"]*",\s*"[^"]*",\s*\{ files: \[([^\]]*)\][^}]*\},\s*\{ files: \[([^\]]*)\]/gm)) {
  for (const [label, list] of [["desktop", m[2]], ["mobile", m[3]]]) {
    entries.push([`hero.${m[1]}.${label}`, [...list.matchAll(/"([^"]+)"/g)].map((x) => x[1])]);
  }
}

const ok = async (file) => {
  try {
    const r = await fetch(commons(file), { method: "HEAD", redirect: "follow" });
    return r.ok;
  } catch {
    return false;
  }
};

let missing = 0;
for (const [key, files] of entries) {
  if (!files.length) continue;
  const results = await Promise.all(files.map(ok));
  const any = results.some(Boolean);
  if (!any) missing++;
  console.log(`${any ? "OK     " : "MISSING"} ${key}`);
  files.forEach((f, i) => console.log(`          ${results[i] ? "✓" : "✗"} ${f}`));
}
console.log(`\n${entries.length - missing} of ${entries.length} pictures have at least one working file.`);
process.exitCode = missing ? 1 : 0;
