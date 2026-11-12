#!/usr/bin/env node
// Idempotent: clones missing repos from repos.json, fast-forwards existing ones. Never merges or discards work.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
process.chdir(root);
const git = (args, opts = {}) => spawnSync('git', args, { stdio: 'inherit', ...opts });
const { repos = [] } = JSON.parse(readFileSync('repos.json', 'utf8'));
const ignore = existsSync('.gitignore') ? readFileSync('.gitignore', 'utf8').split(/\r?\n/) : [];

for (const { name, remote, branch } of repos) {
  if (!name || !remote) continue;
  if (existsSync(join(name, '.git'))) {
    console.log(`update ${name}`);
    if (git(['-C', name, 'fetch', '--quiet']).status !== 0 || git(['-C', name, 'pull', '--ff-only', '--quiet']).status !== 0)
      console.log(`  ! ${name} needs manual attention`);
  } else {
    console.log(`clone  ${name}`);
    if (git(['clone', ...(branch ? ['--branch', branch] : []), remote, name]).status !== 0) console.log(`  ! clone failed: ${name}`);
  }
  if (!ignore.includes(`/${name}/`)) console.log(`  ! add '/${name}/' to .gitignore`);
}
