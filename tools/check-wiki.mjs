#!/usr/bin/env node
// Fails if wiki/ or raw/ carry any knowledge-vault artifact. Run before every commit that touches them.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const patterns = [
  /\[\[/, /obsidian:\/\//, /\.obsidian/, /^```dataview/i, /Linked from/i, /Backlinks/i,
];
// Per-instance extras (e.g. your vault folder names) live in home.config.json -> "vaultPatterns": ["MyVault/"]
const cfg = join(root, 'home.config.json');
if (existsSync(cfg)) {
  for (const x of JSON.parse(readFileSync(cfg, 'utf8')).vaultPatterns ?? [])
    patterns.push(new RegExp(x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

function* md(dir) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* md(p);
    else if (e.endsWith('.md')) yield p;
  }
}

let hits = 0;
for (const d of ['wiki', 'raw']) {
  for (const f of md(join(root, d))) {
    readFileSync(f, 'utf8').split(/\r?\n/).forEach((line, i) => {
      if (patterns.some((r) => r.test(line))) { console.log(`${f.slice(root.length + 1)}:${i + 1}: ${line}`); hits++; }
    });
  }
}
if (hits) { console.log('\nFAIL: vault references found'); process.exit(1); }
console.log('OK: no vault references in wiki/ or raw/');
