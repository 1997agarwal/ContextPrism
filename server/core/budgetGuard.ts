/**
 * Budget guard (advisory)
 * Reports whether a request's token count exceeds the per-query ceiling. The gateway
 * attaches this result to /api/compress responses and never rejects a request with it.
 * Per-user and per-session enforcement is not implemented.
 */

export interface BudgetConfig {
  maxTokensPerQuery: number;
  maxCostPerSessionDollars: number;
  circuitBreakerTripped: boolean;
}

export const budgetConfig: BudgetConfig = {
  maxTokensPerQuery: 32_000,
  maxCostPerSessionDollars: 25.00,
  circuitBreakerTripped: false
};

export function checkBudgetGuard(requestedTokens: number): { allowed: boolean; reason?: string } {
  if (requestedTokens > budgetConfig.maxTokensPerQuery) {
    return {
      allowed: false,
      reason: `Circuit Breaker: Request requested ${requestedTokens} tokens, which exceeds hard ceiling of ${budgetConfig.maxTokensPerQuery} tokens.`
    };
  }
  return { allowed: true };
}
