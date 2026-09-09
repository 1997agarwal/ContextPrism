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
