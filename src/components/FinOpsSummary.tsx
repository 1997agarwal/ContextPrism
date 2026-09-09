import React from 'react';
import { DollarSign, Percent, Zap, Database, ShieldAlert } from 'lucide-react';
import { initialSummary } from '../data/mockFinOps';

export const FinOpsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Dollars Saved */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Dollars Saved</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900">{initialSummary.totalDollarSavings}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            +84.2% cost reduction vs uncompressed
          </p>
        </div>
      </div>

      {/* Metric 2: Average Token Reduction */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Token Compression</span>
          <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900">{initialSummary.averageTokenReduction}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {initialSummary.totalTokensSaved} tokens stripped
          </p>
        </div>
      </div>

      {/* Metric 3: Semantic Cache Hit Rate */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zero-Cost Cache Hits</span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Database className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900">{initialSummary.cacheHitRate}</div>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            Returned in sub-5ms at $0 cost
          </p>
        </div>
      </div>

      {/* Metric 4: Budget Guardrail */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Budget Ceiling</span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900">{initialSummary.monthlyBudgetUsage}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Circuit breaker: 32k tokens/query max
          </p>
        </div>
      </div>
    </div>
  );
};
