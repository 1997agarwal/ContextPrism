import test from 'node:test';
import assert from 'node:assert/strict';
import { compressCode } from '../server/core/astCompressor.ts';
import { checkBudgetGuard, budgetConfig } from '../server/core/budgetGuard.ts';
import { sampleTypeScriptFile } from '../src/data/mockFinOps.ts';

test('real AST compressor keeps exported interfaces and shrinks the TypeScript sample', () => {
  const result = compressCode(sampleTypeScriptFile, 'typescript');
  assert.ok(result.compressedContent.includes('export interface PaymentIntentPayload'));
  assert.ok(result.compressedTokens < result.originalTokens);
  assert.ok(result.reductionPercentage > 0);
});

test('budget guard is advisory: reports over-ceiling requests with a reason', () => {
  assert.deepEqual(checkBudgetGuard(budgetConfig.maxTokensPerQuery), { allowed: true });
  const over = checkBudgetGuard(budgetConfig.maxTokensPerQuery + 1);
  assert.equal(over.allowed, false);
  assert.match(over.reason ?? '', /exceeds hard ceiling/);
});
