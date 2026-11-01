import React, { useState } from 'react';
import { Database, Zap, CheckCircle2, Clock, DollarSign, Search } from 'lucide-react';

interface CacheItem {
  prompt: string;
  response: string;
  hits: number;
  tokensSaved: number;
  dollarsSaved: string;
  latencyMs: number;
}

export const CacheInspector: React.FC = () => {
  const [query, setQuery] = useState('');
  const [cachedItems] = useState<CacheItem[]>([
    {
      prompt: 'Explain Stripe webhook signature verification workflow',
      response: 'Stripe HMAC signature is verified using stripe.webhooks.constructEvent(payload, header, secret) with constant-time equality.',
      hits: 142,
      tokensSaved: 426000,
      dollarsSaved: '$6.39',
      latencyMs: 2
    },
    {
      prompt: 'What are the main entities in the User Authentication schema?',
      response: 'Users table contains id, email, password_hash, role, session_token, and created_at timestamps.',
      hits: 89,
      tokensSaved: 222500,
      dollarsSaved: '$3.34',
      latencyMs: 3
    },
    {
      prompt: 'Summarize standard API error response format',
      response: 'All REST errors follow RFC 7807 problem details: { type, title, status, detail, instance }.',
      hits: 310,
      tokensSaved: 775000,
      dollarsSaved: '$11.62',
      latencyMs: 1
    }
  ]);

  const [testResult, setTestResult] = useState<{ isHit: boolean; cost: string; latency: string } | null>(null);

  const handleCheckQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    const isHit = cachedItems.some(item => lower.includes('stripe') || lower.includes('auth') || lower.includes('error'));

    setTestResult({
      isHit,
      cost: isHit ? '$0.00' : '$0.03',
      latency: isHit ? '2ms (Local Cache)' : '1,420ms (Frontier LLM API)'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
              Rule 2: Cache Everything Possible
            </span>
            <span className="text-xs text-slate-500 font-medium">100 Users, 1 API Call</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Zero-Cost Semantic Caching Gateway
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            If 100 users ask the same question, call the API once. Store the answer. Return it 99 times for $0.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cache Serving Cost</span>
            <span className="text-xl font-black text-emerald-600">$0.00</span>
          </div>
        </div>
      </div>

      {/* Query Search / Intercept Simulator */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
        <form onSubmit={handleCheckQuery} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Test prompt interception (e.g., 'What is the stripe webhook signature check?')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shrink-0"
          >
            Check Cache
          </button>
        </form>

        {testResult && (
          <div className={`mt-4 p-4 rounded-xl border text-xs flex items-center justify-between ${
            testResult.isHit
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {testResult.isHit
                  ? '⚡ Cache Hit! Intercepted identical prompt. Response served from zero-cost memory.'
                  : 'Miss: Prompt routed to external API provider.'}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono font-bold">
              <span>Cost: {testResult.cost}</span>
              <span>Latency: {testResult.latency}</span>
            </div>
          </div>
        )}
      </div>

      {/* Cached Queries Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Active High-Frequency Cached Prompts
        </h3>

        <div className="space-y-3">
          {cachedItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 max-w-xl">
                <span className="font-bold text-slate-900 block">{item.prompt}</span>
                <p className="text-slate-600 text-[11px] italic">"{item.response}"</p>
              </div>

              <div className="flex items-center gap-6 shrink-0 font-mono text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-400 block">Repeated Hits</span>
                  <span className="font-bold text-indigo-600">{item.hits} times</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Dollars Saved</span>
                  <span className="font-bold text-emerald-600">{item.dollarsSaved}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Latency</span>
                  <span className="font-bold text-slate-700">{item.latencyMs}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
