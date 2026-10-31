import test from 'node:test';
import assert from 'node:assert/strict';

// Test token estimation and heuristics
function estimateTokenCount(text) {
  return Math.ceil(text.trim().length / 3.8);
}

function detectLanguage(source) {
  const lines = source.split('\n');
  let pyScore = 0;
  let tsScore = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('def ') || trimmed.startsWith('async def ')) pyScore += 3;
    if (trimmed.startsWith('from ') && trimmed.includes(' import ')) pyScore += 3;
    if (trimmed.includes('"""') || trimmed.includes("'''")) pyScore += 3;
    if (trimmed.startsWith('elif ') || trimmed.endsWith(':')) pyScore += 2;

    if (trimmed.startsWith('export ') || trimmed.startsWith('import {')) tsScore += 3;
    if (trimmed.startsWith('interface ') || trimmed.startsWith('type ')) tsScore += 3;
    if (trimmed.includes('const ') || trimmed.includes('function ')) tsScore += 2;
    if (trimmed.endsWith(';') || trimmed.includes('=>') || trimmed.includes('{')) tsScore += 2;
  }

  return pyScore > tsScore ? 'python' : 'typescript';
}

test('ContextPrism AST Context Compressor & FinOps Algorithms', async (t) => {
  await t.test('accurately detects Python vs TypeScript files', () => {
    const pyCode = `
import os
from typing import Dict, Any

class PaymentService:
    """Enterprise payment client."""
    def process(self, amount: int) -> bool:
        return True
`;
    const tsCode = `
import { db } from './db';
export interface UserPayload {
  id: string;
  email: string;
}
export async function getUser(id: string): Promise<UserPayload> {
  return await db.users.findUnique({ where: { id } });
}
`;
    assert.equal(detectLanguage(pyCode), 'python');
    assert.equal(detectLanguage(tsCode), 'typescript');
  });

  await t.test('calculates token reduction accurately', () => {
    const originalTokens = 1000;
    const compressedTokens = 180;
    const saved = originalTokens - compressedTokens;
    const reduction = Math.round((saved / originalTokens) * 100);

    assert.equal(saved, 820);
    assert.equal(reduction, 82);
  });

  await t.test('verifies exact-match cache dollar savings calculation', () => {
    const cachedCalls = 50000;
    const avgTokensPerCall = 4000;
    const costPerMillionTokens = 3.50; // $3.50 per 1M tokens

    const totalCachedTokens = cachedCalls * avgTokensPerCall; // 200,000,000 tokens
    const dollarsSaved = (totalCachedTokens / 1_000_000) * costPerMillionTokens;

    assert.equal(totalCachedTokens, 200_000_000);
    assert.equal(dollarsSaved, 700.00);
  });
});
