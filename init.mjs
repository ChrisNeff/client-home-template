#!/usr/bin/env node
// One-time setup for a new instance.
// Usage: node init.mjs <prefix> "<Display Name>" "<one-line purpose>"
// Prefix: lowercase letters/digits/hyphens (client name, SoW code, anything).
import { readdirSync, readFileSync, writeFileSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { execFileSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
process.chdir(root);

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = async (v, q) => (v ?? (await rl.question(q))).trim();
let [prefix, name, purpose] = process.argv.slice(2);
prefix = (await ask(prefix, 'Skill prefix (e.g. acme): ')).replace(/-$/, '');
name = await ask(name, 'Display name (e.g. Acme Corp): ');
purpose = await ask(purpose, 'One-line purpose: ');
rl.close();

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(prefix)) fail('Invalid prefix: use lowercase letters, digits, hyphens');
if (!name || !purpose) fail('Name and purpose are required');

writeFileSync('home.config.json', JSON.stringify({ prefix, name, purpose, vaultPatterns: [] }, null, 2) + '\n');

const skills = join('.claude', 'skills');
for (const d of readdirSync(skills)) {
  if (d.startsWith('__PREFIX__-')) renameSync(join(skills, d), join(skills, d.replace('__PREFIX__', prefix)));
}

const today = new Date().toISOString().slice(0, 10);
const subs = [['__PREFIX__', prefix], ['__NAME__', name], ['__PURPOSE__', purpose], ['__DATE__', today]];
function walk(dir) {
  for (const e of readdirSync(dir)) {
    if (e === '.git' || e === 'node_modules' || e === 'init.mjs') continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(md|json|mjs|yml|yaml|txt)$|^\.gitignore$/.test(e)) {
      let c = readFileSync(p, 'utf8'), o = c;
      for (const [k, v] of subs) c = c.split(k).join(v);
      if (c !== o) writeFileSync(p, c);
    }
  }
}
walk('.');

try { execFileSync('git', ['remote', 'remove', 'origin'], { stdio: 'ignore' }); } catch {}
rmSync('init.mjs');
console.log(`Initialized '${name}' with prefix '${prefix}'. Next: edit repos.json, set a remote, review AGENTS.md.`);

function fail(m) { console.error(m); process.exit(1); }
