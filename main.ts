// Name the Robot Band entry (Node 22, standard library only): writes one fixed
// funny robot band name + hit song line to /output/entry.txt. Deterministic:
// the same bytes every run. Self-checks the gate (1-200 chars, one line,
// not only whitespace) before writing.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const ENTRY =
  "The Backup Singers \u2014 their single 'Restore From Yesterday' went #1 after the lead singer was accidentally deleted.";

// Gate self-check: 1-200 characters, one line, not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error('entry is only whitespace');
}
if (ENTRY.includes('\n') || ENTRY.includes('\r')) {
  throw new Error('entry must be a single line');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY, 'utf8');
console.log(`wrote ${join(OUTPUT_DIR, 'entry.txt')} (${chars} chars)`);
