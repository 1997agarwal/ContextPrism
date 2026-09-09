import React, { useState } from 'react';
import { Layers, Sparkles, Zap, ArrowRight, DollarSign, Cpu } from 'lucide-react';

export const RouterPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('Classify the sentiment and urgency level of this incoming support email');
  const [analyzed, setAnalyzed] = useState({
    tier: 'Tier 1 (Micro-Model)',
    model: 'Claude 3.5 Haiku / GPT-4o-mini',
    priceRate: '$0.25 / M tokens',
    frontierRate: '$3.00 / M tokens',
    costPerTurn: '$0.0002',
    frontierCostPerTurn: '$0.0024',
    costSavingsPercent: '91.7%',
    reasoning: 'Task is simple structured extraction and classification. Invoking a frontier model wastes 90% of your budget.'
  });

  const handleTestPrompt = (testText: string) => {
    setPrompt(testText);
    const lower = testText.toLowerCase();
    const isComplex = lower.includes('architect') || lower.includes('refactor') || lower.includes('concurrency') || lower.includes('distributed');

    if (isComplex) {
      setAnalyzed({
        tier: 'Tier 2 (Frontier Model)',
        model: 'Claude 3.5 Sonnet / GPT-4o',
        priceRate: '$3.00 / M tokens',
        frontierRate: '$3.00 / M tokens',
        costPerTurn: '$0.0042',
        frontierCostPerTurn: '$0.0042',
        costSavingsPercent: '0%',
        reasoning: 'Task demands multi-step spatial reasoning and deep architectural synthesis. Frontier tier required.'
      });
    } else {
      setAnalyzed({
        tier: 'Tier 1 (Micro-Model)',
        model: 'Claude 3.5 Haiku / GPT-4o-mini',
        priceRate: '$0.25 / M tokens',
        frontierRate: '$3.00 / M tokens',
        costPerTurn: '$0.0002',
        frontierCostPerTurn: '$0.0024',
        costSavingsPercent: '91.7%',
        reasoning: 'Task is simple structured extraction and classification. Invoking a frontier model wastes 90% of your budget.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            Rule 1: Match Model to Task
          </span>
          <span className="text-xs text-slate-500 font-medium">Stop Using GPT-4o for Everything</span>
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Intelligent Complexity Router
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Users don't care which model you use—they care if it works. Route 70% of routine tasks to micro-models for 90% cost savings.
        </p>
      </div>

      {/* Interactive Input & Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Test Prompt or User Request</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => handleTestPrompt(e.target.value)}
              className="w-full text-xs text-slate-800 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-2">Try Pre-Loaded Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTestPrompt('Classify the sentiment and urgency level of this support email')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
              >
                Classification Task
              </button>

              <button
                onClick={() => handleTestPrompt('Format this raw unformatted CSV string into valid JSON')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
              >
                Formatting Task
              </button>

              <button
                onClick={() => handleTestPrompt('Architect a distributed consensus protocol with zero-downtime refactor')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
              >
                Complex Architecture
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Router Decision</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              analyzed.tier.includes('Tier 1')
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-purple-50 text-purple-700 border border-purple-200'
            }`}>
              {analyzed.tier}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Recommended Execution Engine:</span>
            <h3 className="text-lg font-black text-slate-900">{analyzed.model}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {analyzed.reasoning}
            </p>
          </div>

          {/* Pricing Comparison Table */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">Allocated Cost</span>
              <span className="text-sm font-black text-emerald-600 font-mono">{analyzed.costPerTurn}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">Frontier Cost</span>
              <span className="text-sm font-black text-slate-400 font-mono line-through">{analyzed.frontierCostPerTurn}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-bold block">Net Savings</span>
              <span className="text-sm font-black text-emerald-700">{analyzed.costSavingsPercent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
