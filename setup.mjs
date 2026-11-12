#!/usr/bin/env node
// Idempotent: clones missing repos from repos.json, fast-forwards existing ones. Never merges or discards work.
// Repos marked "optional": true are skipped when not already cloned.
// Usage: node setup.mjs [--include-optional] [--only <name>]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
process.chdir(root);
const git = (args, opts = {}) => spawnSync('git', args, { stdio: 'inherit', ...opts });
const { repos = [] } = JSON.parse(readFileSync('repos.json', 'utf8'));

const args = process.argv.slice(2);
const includeOptional = args.includes('--include-optional');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
if (onlyIdx >= 0 && !only) { console.error('--only needs a repo name'); process.exit(1); }
if (only && !repos.some((r) => r.name === only)) { console.error(`No repo named '${only}' in repos.json`); process.exit(1); }

for (const { name, remote, branch, optional } of repos) {
  if (!name || !remote) continue;
  if (only && name !== only) continue;
  const cloned = existsSync(join(name, '.git'));
  if (optional && !cloned && !includeOptional && name !== only) {
    console.log(`skip   ${name} (optional, not cloned; use --include-optional or --only ${name})`);
    continue;
  }
  if (cloned) {
    console.log(`update ${name}`);
    if (git(['-C', name, 'fetch', '--quiet']).status !== 0 || git(['-C', name, 'pull', '--ff-only', '--quiet']).status !== 0)
      console.log(`  ! ${name} needs manual attention`);
  } else {
    console.log(`clone  ${name}`);
    if (git(['clone', ...(branch ? ['--branch', branch] : []), remote, name]).status !== 0) console.log(`  ! clone failed: ${name}`);
  }
  if (existsSync(name) && git(['check-ignore', '-q', name], { stdio: 'ignore' }).status !== 0)
    console.log(`  ! ${name} is not git-ignored here: check .gitignore (top-level folders should be ignored by default)`);
}
