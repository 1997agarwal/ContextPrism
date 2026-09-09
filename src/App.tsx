import React, { useState } from 'react';
import { FinOpsSummary } from './components/FinOpsSummary';
import { CompressorStudio } from './components/CompressorStudio';
import { RouterPlayground } from './components/RouterPlayground';
import { CacheInspector } from './components/CacheInspector';
import { Zap, Github, Layers, Database, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  // Tabs for the 3 Golden Rules
  const [activeTab, setActiveTab] = useState<'router' | 'cache' | 'compressor'>('router');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200/80 px-6 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-600/30">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">ContextPrism</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 text-[10px] font-bold">
                  Token FinOps Gateway
                </span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">3 Golden Rules Active</span>
            <span>• Slashing AI API Costs by 90%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/1997agarwal/ContextPrism"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/1997agarwal"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition"
          >
            <span>Harshit Agarwal</span>
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 flex-1 space-y-8">
        {/* Top Hero & Enterprise Context */}
        <div className="bg-gradient-to-r from-sky-500/5 via-sky-500/10 to-transparent border border-sky-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-100 text-sky-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Enterprise Cost Control for Claude Code, Cursor & AntiGravity</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Stop Token Maxing. Protect Your Annual AI Budget.
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              When employees dump repos into coding agents, context explodes into 1.5M tokens per query. ContextPrism acts as an intelligent FinOps buffer enforcing the 3 Golden Rules of cost optimization.
            </p>
          </div>
        </div>

        {/* Live FinOps Telemetry Metrics */}
        <FinOpsSummary />

        {/* 3 Golden Rules Tab Switcher */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('router')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'router'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Rule 1: Task-Aware Model Router</span>
              </button>

              <button
                onClick={() => setActiveTab('cache')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'cache'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Rule 2: Zero-Cost Semantic Cache</span>
              </button>

              <button
                onClick={() => setActiveTab('compressor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'compressor'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Rule 3: AST Context Compressor</span>
              </button>
            </div>

            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              Simulating Real Enterprise Production Workloads
            </span>
          </div>

          {/* Active Tab Content */}
          <div>
            {activeTab === 'router' && <RouterPlayground />}
            {activeTab === 'cache' && <CacheInspector />}
            {activeTab === 'compressor' && <CompressorStudio />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
        <p>
          <strong>ContextPrism</strong> — Open Source Enterprise Token FinOps Gateway • Built by{' '}
          <a
            href="https://www.linkedin.com/in/1997agarwal"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 font-semibold hover:underline"
          >
            Harshit Agarwal (@1997agarwal)
          </a>
        </p>
      </footer>
    </div>
  );
};
