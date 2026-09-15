import React, { useState, useMemo } from 'react';
import { Copy, Check, FileCode, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { sampleTypeScriptFile, samplePythonFile } from '../data/mockFinOps';
import { compressCode, estimateTokenCount } from '../../server/core/astCompressor';

export const CompressorStudio: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'python'>('python');
  const [sourceCode, setSourceCode] = useState<string>(samplePythonFile);
  const [copied, setCopied] = useState<boolean>(false);

  const handleLanguageChange = (lang: 'typescript' | 'python') => {
    setSelectedLanguage(lang);
    setSourceCode(lang === 'python' ? samplePythonFile : sampleTypeScriptFile);
  };

  // Run the core AST compressor on the active source code
  const result = useMemo(() => {
    return compressCode(sourceCode, selectedLanguage);
  }, [sourceCode, selectedLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.compressedContent);
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
            <span className="text-xs text-slate-500 font-medium">TypeScript & Python AST Support</span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Intelligent Codebase & Prompt Compactor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedLanguage === 'python'
              ? 'Preserves Python docstrings, parameter signatures, and type hints while stripping internal function/method bodies.'
              : 'Preserves exported types, interfaces, and function signatures while collapsing internal logic bodies.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Language Selector Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => handleLanguageChange('python')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedLanguage === 'python'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python (.py)</span>
            </button>

            <button
              onClick={() => handleLanguageChange('typescript')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedLanguage === 'typescript'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>TypeScript (.ts)</span>
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Token Reduction</span>
            <span className="text-xl font-black text-emerald-600">-{result.reductionPercentage}%</span>
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

      {/* Preserved Symbols Bar */}
      {result.symbolsPreserved.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3 shadow-xs flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preserved AST Contracts:</span>
          </span>
          {result.symbolsPreserved.map((sym, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-mono font-medium"
            >
              {sym}
            </span>
          ))}
        </div>
      )}

      {/* Side-by-Side Code Compare Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Original Code */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <FileCode className="w-4 h-4 text-slate-400" />
              <span>Raw Codebase / Prompt Input ({selectedLanguage === 'python' ? 'Python' : 'TypeScript'})</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
              {result.originalTokens} tokens
            </span>
          </div>

          <textarea
            rows={18}
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="w-full font-mono text-xs text-slate-800 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
          />
          <span className="text-[11px] text-slate-400 mt-2 block">
            Edit or paste any Python (.py) or TypeScript (.ts) code to test instant AST compaction.
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
              {result.compressedTokens} tokens ({result.tokensSaved} saved)
            </span>
          </div>

          <pre className="font-mono text-xs text-slate-800 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 leading-relaxed overflow-x-auto h-[386px] whitespace-pre-wrap">
            {result.compressedContent}
          </pre>
          <span className="text-[11px] text-emerald-600 font-semibold mt-2 block">
            ✔ Preserves docstrings, parameter signatures & type contracts for 100% LLM reasoning retention.
          </span>
        </div>
      </div>
    </div>
  );
};

