#!/usr/bin/env node
/**
 * Reproduces the compression numbers for the bundled sample files.
 * Runs the real AST compressor (server/core/astCompressor.ts) on each sample in
 * src/data/mockFinOps.ts and prints estimated token counts (chars / 3.8).
 *
 * This measures only the bundled samples. It does not measure any real repository,
 * and it does not measure dollar cost, which depends on your model pricing.
 *
 * Run: npm run bench
 */

import { compressCode, estimateTokenCount } from '../server/core/astCompressor.ts';
import {
  sampleTypeScriptFile,
  samplePythonFile,
  sampleLangChainFile,
  sampleNextActionFile,
} from '../src/data/mockFinOps.ts';

const samples = [
  ['sampleTypeScriptFile', sampleTypeScriptFile],
  ['samplePythonFile', samplePythonFile],
  ['sampleLangChainFile', sampleLangChainFile],
  ['sampleNextActionFile', sampleNextActionFile],
];

let totalOriginal = 0;
let totalCompressed = 0;
const rows = [];

for (const [name, source] of samples) {
  const result = compressCode(source, 'auto');
  const original = estimateTokenCount(source);
  const compressed = estimateTokenCount(result.compressedContent);
  totalOriginal += original;
  totalCompressed += compressed;
  const reduction = original === 0 ? 0 : ((original - compressed) / original) * 100;
  rows.push({
    sample: name,
    language: result.detectedLanguage ?? 'unknown',
    originalTokens: original,
    compressedTokens: compressed,
    reductionPercent: Number(reduction.toFixed(1)),
  });
}

const totalReduction = ((totalOriginal - totalCompressed) / totalOriginal) * 100;

console.table(rows);
console.log(
  `Total: ${totalOriginal} -> ${totalCompressed} estimated tokens (${totalReduction.toFixed(1)}% reduction on ${samples.length} bundled samples)`,
);
