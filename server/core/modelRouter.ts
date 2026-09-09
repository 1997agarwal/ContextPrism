/**
 * Task-Aware Model Router (Rule 1)
 * Evaluates prompt complexity and routes tasks to Tier 1 (micro-models @ $0.25/M tokens)
 * vs Tier 2 (frontier models @ $3.00/M tokens).
 */

export interface RoutingDecision {
  prompt: string;
  recommendedModel: 'claude-3-5-haiku' | 'gpt-4o-mini' | 'claude-3-5-sonnet' | 'gpt-4o';
  tier: 'Tier 1 (Micro-Model)' | 'Tier 2 (Frontier)';
  reasoning: string;
  complexityScore: number; // 1 to 10
  estimatedCostMicro: number;
  estimatedCostFrontier: number;
  potentialDollarSavings: number;
}

export function routePrompt(prompt: string): RoutingDecision {
  const lower = prompt.toLowerCase();
  let complexity = 3; // Baseline simple task

  const highComplexityTriggers = [
    'refactor', 'architect', 'security', 'race condition', 'concurrency',
    'distributed', 'optimize algorithm', 'design system', 'data contract', 'migration'
  ];

  const lowComplexityTriggers = [
    'classify', 'summarize', 'extract', 'format json', 'regex',
    'spelling', 'translate', 'rename', 'parse', 'csv'
  ];

  for (const trigger of highComplexityTriggers) {
    if (lower.includes(trigger)) complexity += 2.5;
  }

  for (const trigger of lowComplexityTriggers) {
    if (lower.includes(trigger)) complexity -= 1.5;
  }

  complexity = Math.max(1, Math.min(10, Math.round(complexity)));

  const isFrontier = complexity >= 6;
  const promptTokens = Math.ceil(prompt.length / 3.8);

  // Pricing per million tokens:
  // Tier 1 (Haiku / 4o-mini): $0.25 / M
  // Tier 2 (Sonnet / GPT-4o): $3.00 / M
  const estimatedCostMicro = Number(((promptTokens / 1_000_000) * 0.25).toFixed(6));
  const estimatedCostFrontier = Number(((promptTokens / 1_000_000) * 3.00).toFixed(6));
  const potentialDollarSavings = isFrontier ? 0 : Number((estimatedCostFrontier - estimatedCostMicro).toFixed(6));

  return {
    prompt,
    recommendedModel: isFrontier ? 'claude-3-5-sonnet' : 'claude-3-5-haiku',
    tier: isFrontier ? 'Tier 2 (Frontier)' : 'Tier 1 (Micro-Model)',
    complexityScore: complexity,
    reasoning: isFrontier
      ? 'Task demands deep multi-step spatial reasoning or complex architectural synthesis.'
      : 'Task is straightforward transformation or extraction. Frontier model is wasteful.',
    estimatedCostMicro,
    estimatedCostFrontier,
    potentialDollarSavings
  };
}
