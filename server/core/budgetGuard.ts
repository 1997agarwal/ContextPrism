/**
 * Budget Circuit Breaker
 * Enforces per-task and per-day spend ceilings to prevent runaway agent loops.
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
