export const sampleTypeScriptFile = `
import { db } from './database';
import { Stripe } from 'stripe';

export interface PaymentIntentPayload {
  id: string;
  amount: number;
  currency: string;
  customerEmail: string;
  status: 'requires_payment_method' | 'succeeded' | 'canceled';
}

export interface DisputeEvent {
  disputeId: string;
  chargeId: string;
  reason: string;
  amountRefunded: number;
}

export class StripePaymentService {
  private stripeClient: Stripe;

  constructor(apiKey: string) {
    this.stripeClient = new Stripe(apiKey, { apiVersion: '2024-06-20' });
  }

  public async processReconciliation(payload: PaymentIntentPayload): Promise<boolean> {
    // 45 lines of heavy internal verification logic
    const record = await db.query('SELECT * FROM payments WHERE id = ?', [payload.id]);
    if (!record) {
      console.log('Payment record missing from ledger, creating new record...');
      await db.insert('payments', payload);
    }
    const signatureValid = true;
    for (let i = 0; i < 100; i++) {
      // Simulate heavy internal calculation
      const temp = i * 2;
    }
    return signatureValid;
  }

  public async handleDispute(event: DisputeEvent): Promise<{ resolved: boolean; noticeSent: boolean }> {
    // 30 lines of internal dispute mitigation logic
    console.log('Dispute received for charge:', event.chargeId);
    await db.update('disputes', { status: 'reviewing', reason: event.reason });
    const isUnderReview = true;
    return { resolved: false, noticeSent: isUnderReview };
  }
}
`.trim();

export const initialSummary = {
  totalTokensSaved: '14,250,000',
  totalDollarSavings: '$2,137.50',
  averageTokenReduction: '83.4%',
  cacheHitRate: '42.8%',
  monthlyBudgetUsage: '$412.00 / $2,500.00'
};

export const samplePythonFile = `
import os
import logging
from typing import Optional, List, Dict, Any, Union
from datetime import datetime
from pydantic import BaseModel, Field

logger = logging.getLogger("payments.ledger")

class PaymentIntentPayload(BaseModel):
    id: str
    amount_cents: int = Field(gt=0, description="Amount in cents")
    currency: str = Field(default="usd", max_length=3)
    customer_email: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
    capture_method: str = "automatic"

class DisputeEvent(BaseModel):
    dispute_id: str
    charge_id: str
    reason: str
    amount_refunded: float
    evidence_due_by: Optional[datetime] = None

class EnterpriseStripeService:
    """Enterprise Stripe payment processor with audit trail & dispute mitigation."""

    def __init__(self, api_key: str, webhook_secret: str, environment: str = "production"):
        """Initialize the payment service client with enterprise credential verification.
        
        Args:
            api_key: Secret API key for payment provider.
            webhook_secret: HMAC secret used to verify webhook signatures.
            environment: Deployment target ('production' or 'sandbox').
        """
        self.api_key = api_key
        self.webhook_secret = webhook_secret
        self.environment = environment
        self._ledger_cache = {}
        self._client = None
        logger.info("Initialized EnterpriseStripeService in %s mode", environment)

    async def process_reconciliation(
        self,
        payload: PaymentIntentPayload,
        strict_idempotency: bool = True
    ) -> Dict[str, Union[str, bool]]:
        """Reconcile incoming payment intent with enterprise ledger and clearinghouse.
        
        Args:
            payload: Validated payment intent payload.
            strict_idempotency: When True, halts duplicate transaction processing.
        Returns:
            Dictionary containing transaction settlement status and ledger receipt hash.
        """
        if strict_idempotency and payload.id in self._ledger_cache:
            logger.warning("Duplicate payment attempt detected for intent %s", payload.id)
            return {"status": "rejected", "reason": "idempotency_violation", "settled": False}

        raw_signature = f"{payload.id}:{payload.amount_cents}:{payload.currency}"
        reconciliation_hash = hex(abs(hash(raw_signature)))

        # 45 lines of heavy internal verification, SQL ledger insertions, and audit logging
        for attempt in range(3):
            try:
                logger.debug("Executing ledger verification attempt %d for %s", attempt, payload.id)
                db_record = {"tx": payload.id, "amount": payload.amount_cents, "state": "validating"}
                if payload.amount_cents > 5000000:
                    logger.info("High-value transaction flagged for compliance review: %s", payload.id)
                self._ledger_cache[payload.id] = reconciliation_hash
                break
            except Exception as err:
                logger.error("Ledger communication failure on attempt %d: %s", attempt, err)
                if attempt == 2:
                    raise RuntimeError(f"Clearinghouse timeout for {payload.id}") from err

        return {"status": "succeeded", "receipt": reconciliation_hash, "settled": True}

    async def handle_dispute(
        self,
        event: DisputeEvent,
        auto_submit_evidence: bool = True
    ) -> Dict[str, Any]:
        """Mitigate incoming chargeback disputes and assemble evidentiary documentation.
        
        Args:
            event: Verified dispute payload from gateway webhook.
            auto_submit_evidence: Automatically submit stored KYC and shipping docs.
        Returns:
            Dispute acknowledgment payload including resolution deadline.
        """
        logger.warning("Dispute initiated for charge %s. Reason: %s", event.charge_id, event.reason)
        evidence_packet = {
            "dispute_id": event.dispute_id,
            "charge_id": event.charge_id,
            "submitted_at": datetime.utcnow().isoformat(),
            "status": "under_review"
        }

        # 30 lines of internal document collection, PDF generation, and legal dispatch
        for step in ["fetch_receipt", "compile_access_logs", "sign_affidavit"]:
            logger.debug("Executing dispute defense subtask: %s", step)
            evidence_packet[step] = "completed"

        return evidence_packet

    @property
    def is_connected(self) -> bool:
        """Check payment engine connection health."""
        return self._client is not None or self.api_key.startswith("sk_")
`.trim();

export interface FinOpsPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  engineers: number;
  turnsPerDay: number;
  contextTokens: number;
  frontierCostPerM: number;
  microCostPerM: number;
  routerTier1Percent: number;
  cacheHitPercent: number;
  astPruningPercent: number;
}

export const finOpsPresets: FinOpsPreset[] = [
  {
    id: 'startup',
    name: 'Seed / Series A',
    badge: '8 Seats',
    description: 'Fast-moving team adopting Cursor & Claude Code for rapid prototyping.',
    engineers: 8,
    turnsPerDay: 30,
    contextTokens: 65_000,
    frontierCostPerM: 3.50,
    microCostPerM: 0.30,
    routerTier1Percent: 68,
    cacheHitPercent: 35,
    astPruningPercent: 82,
  },
  {
    id: 'growth',
    name: 'Growth Scaleup',
    badge: '35 Seats',
    description: 'Scaling engineering org experiencing LLM cost shock and budget ceilings.',
    engineers: 35,
    turnsPerDay: 40,
    contextTokens: 90_000,
    frontierCostPerM: 3.50,
    microCostPerM: 0.30,
    routerTier1Percent: 72,
    cacheHitPercent: 42,
    astPruningPercent: 84,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Org',
    badge: '150 Seats',
    description: 'Global engineering fleet deploying autonomous multi-turn agents at scale.',
    engineers: 150,
    turnsPerDay: 45,
    contextTokens: 125_000,
    frontierCostPerM: 3.50,
    microCostPerM: 0.30,
    routerTier1Percent: 75,
    cacheHitPercent: 45,
    astPruningPercent: 85,
  }
];

export const sampleLangChainFile = `
import asyncio
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class AgentState(BaseModel):
    messages: List[Dict[str, str]]
    next_step: str = "retrieve_context"
    memory_buffer: Dict[str, Any] = Field(default_factory=dict)

class RetrievalAugmentedAgent:
    """Multi-step reasoning agent with semantic tool-calling memory."""

    def __init__(self, model_name: str = "gpt-4o", temperature: float = 0.2):
        """Configure agent hyperparameters and vector index connection.
        
        Args:
            model_name: Frontier LLM identifier.
            temperature: Sampling temperature for structured reasoning.
        """
        self.model_name = model_name
        self.temperature = temperature
        self._history = []

    async def execute_task(self, prompt: str, state: AgentState) -> Dict[str, Any]:
        """Execute autonomous retrieval loop against knowledge base.
        
        Args:
            prompt: User objective or prompt instructions.
            state: Current session state with execution graph.
        Returns:
            JSON object with synthesized final response and citations.
        """
        # 60 lines of heavy retrieval, embeddings reranking, and vector lookup
        chunks = []
        for i in range(50):
            chunks.append(f"document_chunk_{i}_embedding_vector")
        
        final_answer = f"Synthesized insight for: {prompt}"
        return {"answer": final_answer, "confidence": 0.96, "iterations": len(chunks)}
`.trim();

export const sampleNextActionFile = `
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const CreateWorkspaceSchema = z.object({
  name: z.string().min(3).max(50),
  tier: z.enum(['starter', 'pro', 'enterprise']),
  teamSize: z.number().int().positive()
});

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export async function createWorkspaceAction(
  input: CreateWorkspaceInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  // 40 lines of authentication, database insertion, and stripe billing verification
  const parsed = CreateWorkspaceSchema.parse(input);
  const workspaceId = "ws_" + Math.random().toString(36).substring(7);
  
  // Heavy ORM transaction logic simulated here
  const timestamp = Date.now();
  revalidatePath('/dashboard');
  return { success: true, data: { id: workspaceId, slug: parsed.name.toLowerCase() } };
}
`.trim();
