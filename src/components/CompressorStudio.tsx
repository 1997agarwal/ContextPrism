import React, { useState, useMemo } from 'react';
import { Copy, Check, FileCode, Cpu, Code2, Sparkles, CheckCircle2, Columns, Split, SlidersHorizontal } from 'lucide-react';
import { sampleTypeScriptFile, samplePythonFile, sampleLangChainFile, sampleNextActionFile } from '../data/mockFinOps';
import { compressCode, estimateTokenCount } from '../../server/core/astCompressor';

export const CompressorStudio: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'python'>('python');
  const [selectedPreset, setSelectedPreset] = useState<string>('py-stripe');
  const [sourceCode, setSourceCode] = useState<string>(samplePythonFile);
  const [viewMode, setViewMode] = useState<'split' | 'diff'>('split');
  const [copied, setCopied] = useState<boolean>(false);

  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId);
    if (presetId === 'py-stripe') {
      setSelectedLanguage('python');
      setSourceCode(samplePythonFile);
    } else if (presetId === 'py-langchain') {
      setSelectedLanguage('python');
      setSourceCode(sampleLangChainFile);
    } else if (presetId === 'ts-stripe') {
      setSelectedLanguage('typescript');
      setSourceCode(sampleTypeScriptFile);
    } else if (presetId === 'ts-next') {
      setSelectedLanguage('typescript');
      setSourceCode(sampleNextActionFile);
    }
  };

  const handleLanguageChange = (lang: 'typescript' | 'python') => {
    setSelectedLanguage(lang);
    if (lang === 'python') {
      setSelectedPreset('py-stripe');
      setSourceCode(samplePythonFile);
    } else {
      setSelectedPreset('ts-stripe');
      setSourceCode(sampleTypeScriptFile);
    }
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

  // Generate visual AST diff lines
  const diffLines = useMemo(() => {
    const originalLines = sourceCode.split('\n');
    const compressedSet = new Set(result.compressedContent.split('\n').map((l) => l.trim()));

    return originalLines.map((line, idx) => {
      const trimmed = line.trim();
      const isPreserved = compressedSet.has(trimmed) || trimmed.startsWith('def ') || trimmed.startsWith('class ') || trimmed.startsWith('export ') || trimmed.startsWith('interface ');
      const isStrippedBody = !isPreserved && trimmed.length > 0 && !trimmed.startsWith('import ') && !trimmed.startsWith('from ');
      return {
        lineNum: idx + 1,
        text: line,
        status: isStrippedBody ? 'stripped' : 'preserved'
      };
    });
  }, [sourceCode, result.compressedContent]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold">
              Rule 3: AST Context Compression
            </span>
            <span className="text-xs text-slate-500 font-medium">TypeScript & Python AST Engine</span>
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

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'split' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('diff')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'diff' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Visual AST Diff</span>
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

      {/* Preset Snippets & Preserved Contracts Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
            <span>Presets:</span>
          </span>
          <button
            onClick={() => handlePresetSelect('py-stripe')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
              selectedPreset === 'py-stripe'
                ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🐍 Stripe Ledger (.py)
          </button>
          <button
            onClick={() => handlePresetSelect('py-langchain')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
              selectedPreset === 'py-langchain'
                ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🦜 LangChain Agent (.py)
          </button>
          <button
            onClick={() => handlePresetSelect('ts-stripe')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
              selectedPreset === 'ts-stripe'
                ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            💳 Stripe Gateway (.ts)
          </button>
          <button
            onClick={() => handlePresetSelect('ts-next')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
              selectedPreset === 'ts-next'
                ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            ⚛️ Server Action (.ts)
          </button>
        </div>

        {/* Preserved Contracts Pills */}
        {result.symbolsPreserved.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400">Preserved:</span>
            {result.symbolsPreserved.slice(0, 4).map((sym, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold"
              >
                {sym}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Studio Viewport */}
      {viewMode === 'split' ? (
        /* Side-by-Side Code Compare Deck */
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
      ) : (
        /* Visual AST Diff View */
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Split className="w-4 h-4 text-sky-600" />
              <span>Visual AST Compaction Diff (Red = Internal Logic Stripped, Green = Preserved Signatures)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Original: {result.originalTokens} tokens</span>
              <span className="text-xs text-slate-300">→</span>
              <span className="text-xs text-emerald-600 font-bold">Packed: {result.compressedTokens} tokens (-{result.reductionPercentage}%)</span>
            </div>
          </div>

          <div className="font-mono text-xs bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto max-h-[500px]">
            {diffLines.map((line) => (
              <div
                key={line.lineNum}
                className={`flex items-start py-0.5 px-2 rounded ${
                  line.status === 'stripped'
                    ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500/80'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className="w-8 shrink-0 text-slate-600 select-none text-[10px]">{line.lineNum}</span>
                <span className="w-4 shrink-0 select-none font-bold text-[11px] text-slate-500">
                  {line.status === 'stripped' ? '-' : ' '}
                </span>
                <span className="whitespace-pre flex-1">{line.text}</span>
                {line.status === 'stripped' && (
                  <span className="ml-2 text-[9px] uppercase px-1.5 py-0.2 rounded bg-rose-900/60 text-rose-300 font-sans font-bold">
                    Stripped
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
