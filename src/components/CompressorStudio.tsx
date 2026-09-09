import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, FileCode, Cpu, ShieldCheck } from 'lucide-react';
import { sampleTypeScriptFile } from '../data/mockFinOps';

export const CompressorStudio: React.FC = () => {
  const [sourceCode, setSourceCode] = useState(sampleTypeScriptFile);
  const [copied, setCopied] = useState(false);

  // Client-side quick estimator & compressor for instant visual feedback
  const originalTokens = Math.ceil(sourceCode.length / 3.8);

  const compressedLines: string[] = [];
  const lines = sourceCode.split('\n');
  let insideFn = false;
  let depth = 0;
  let collapsed = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('export interface') || trimmed.startsWith('interface') || trimmed.startsWith('export type')) {
      compressedLines.push(line);
      continue;
    }

    const isMethod = trimmed.startsWith('public') || trimmed.startsWith('async') || trimmed.startsWith('export function');
    if (isMethod && line.includes('{')) {
      compressedLines.push(line);
      insideFn = true;
      depth = 1;
      collapsed = 0;
      continue;
    }

    if (insideFn) {
      for (const char of line) {
        if (char === '{') depth++;
        if (char === '}') depth--;
      }
      collapsed++;
      if (depth <= 0) {
        insideFn = false;
        compressedLines.push(`    /* ... [AST Collapsed: ${collapsed} internal logic lines] ... */`);
        compressedLines.push(line);
      }
      continue;
    }
    compressedLines.push(line);
  }

  const compressedCode = compressedLines.join('\n');
  const compressedTokens = Math.ceil(compressedCode.length / 3.8);
  const savedTokens = Math.max(0, originalTokens - compressedTokens);
  const reductionPercent = ((savedTokens / originalTokens) * 100).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(compressedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold">
              Rule 3: AST Context Compression
            </span>
            <span className="text-xs text-slate-500 font-medium">Zero Reasoning Loss</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Intelligent Codebase & Prompt Compactor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Preserves exported types, interfaces, and function signatures while collapsing internal logic bodies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Token Reduction</span>
            <span className="text-xl font-black text-emerald-600">-{reductionPercent}%</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Prompt' : 'Copy Packed Context'}</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Code Compare Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Original Code */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <FileCode className="w-4 h-4 text-slate-400" />
              <span>Raw Codebase / Prompt Input</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
              {originalTokens} tokens
            </span>
          </div>

          <textarea
            rows={16}
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="w-full font-mono text-xs text-slate-800 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
          />
          <span className="text-[11px] text-slate-400 mt-2 block">
            Edit or paste any TypeScript, Python, or raw prompt to test compression.
          </span>
        </div>

        {/* Right: Packed Context Output */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 font-bold text-sky-700">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>ContextPrism Packed Manifest</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
              {compressedTokens} tokens ({savedTokens} saved)
            </span>
          </div>

          <pre className="font-mono text-xs text-slate-800 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 leading-relaxed overflow-x-auto h-[352px] whitespace-pre-wrap">
            {compressedCode}
          </pre>
          <span className="text-[11px] text-emerald-600 font-semibold mt-2 block">
            ✔ Feeds downstream LLMs only essential structural interfaces.
          </span>
        </div>
      </div>
    </div>
  );
};
