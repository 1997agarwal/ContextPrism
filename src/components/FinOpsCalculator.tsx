import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  Layers,
  Database,
  Cpu,
  Copy,
  Check,
  Sparkles,
  Users,
  Repeat,
  Sliders,
  ShieldCheck,
  BarChart3,
  Calendar,
  Building2
} from 'lucide-react';
import { finOpsPresets, FinOpsPreset } from '../data/mockFinOps';

export const FinOpsCalculator: React.FC = () => {
  // Active Preset or custom
  const [selectedPresetId, setSelectedPresetId] = useState<string>('growth');

  // Interactive State Variables
  const [engineers, setEngineers] = useState<number>(35);
  const [turnsPerDay, setTurnsPerDay] = useState<number>(40);
  const [contextTokens, setContextTokens] = useState<number>(90_000);
  const [workingDays] = useState<number>(22);

  // Pricing Parameters ($/1M tokens)
  const [frontierCostPerM, setFrontierCostPerM] = useState<number>(3.50);
  const [microCostPerM, setMicroCostPerM] = useState<number>(0.30);

  // 3 Golden Rules Levers
  const [routerTier1Percent, setRouterTier1Percent] = useState<number>(72); // Rule 1
  const [cacheHitPercent, setCacheHitPercent] = useState<number>(42);       // Rule 2
  const [astPruningPercent, setAstPruningPercent] = useState<number>(84);     // Rule 3

  const [copied, setCopied] = useState<boolean>(false);

  // Handle Preset Switching
  const handleSelectPreset = (preset: FinOpsPreset) => {
    setSelectedPresetId(preset.id);
    setEngineers(preset.engineers);
    setTurnsPerDay(preset.turnsPerDay);
    setContextTokens(preset.contextTokens);
    setFrontierCostPerM(preset.frontierCostPerM);
    setMicroCostPerM(preset.microCostPerM);
    setRouterTier1Percent(preset.routerTier1Percent);
    setCacheHitPercent(preset.cacheHitPercent);
    setAstPruningPercent(preset.astPruningPercent);
  };

  // Perform Calculations
  const calculations = useMemo(() => {
    // 1. Total volume per month
    const totalPromptsPerMonth = engineers * turnsPerDay * workingDays;
    const totalRawTokensPerMonth = totalPromptsPerMonth * contextTokens;

    // 2. Baseline Unoptimized Costs (all prompts hit frontier model with 100% raw context)
    const baselineMonthlyCost = (totalRawTokensPerMonth / 1_000_000) * frontierCostPerM;
    const baselineAnnualCost = baselineMonthlyCost * 12;

    // 3. Rule 2: Zero-Cost Semantic Cache
    // Prompts served from cache at $0 and 0 tokens
    const cachedPrompts = Math.round(totalPromptsPerMonth * (cacheHitPercent / 100));
    const uncachedPrompts = totalPromptsPerMonth - cachedPrompts;
    const tokensAvoidedByCache = cachedPrompts * contextTokens;
    const cacheMonthlySavings = (tokensAvoidedByCache / 1_000_000) * frontierCostPerM;

    // 4. Rule 3: AST Context Compression
    // Remaining uncached prompts have their context pruned
    const prunedContextTokens = Math.round(contextTokens * (1 - astPruningPercent / 100));
    const tokensSavedByPruning = uncachedPrompts * (contextTokens - prunedContextTokens);
    const pruningMonthlySavings = (tokensSavedByPruning / 1_000_000) * frontierCostPerM;

    // 5. Rule 1: Task-Aware Model Router
    // Uncached, pruned queries are routed between Micro and Frontier
    const microPrompts = Math.round(uncachedPrompts * (routerTier1Percent / 100));
    const frontierPrompts = uncachedPrompts - microPrompts;

    const microTokens = microPrompts * prunedContextTokens;
    const frontierTokens = frontierPrompts * prunedContextTokens;

    const microCost = (microTokens / 1_000_000) * microCostPerM;
    const frontierCost = (frontierTokens / 1_000_000) * frontierCostPerM;

    // Total Optimized Cost
    const optimizedMonthlyCost = microCost + frontierCost;
    const optimizedAnnualCost = optimizedMonthlyCost * 12;

    // Rule 1 savings is the price delta between running micro vs frontier on micro prompts
    const routerMonthlySavings = (microTokens / 1_000_000) * (frontierCostPerM - microCostPerM);

    // Net Savings
    const netMonthlySavings = Math.max(0, baselineMonthlyCost - optimizedMonthlyCost);
    const netAnnualSavings = netMonthlySavings * 12;
    const percentageReduction = baselineMonthlyCost > 0
      ? ((netMonthlySavings / baselineMonthlyCost) * 100).toFixed(1)
      : '0.0';

    const tokensSavedTotal = totalRawTokensPerMonth - (microTokens + frontierTokens);

    return {
      totalPromptsPerMonth,
      totalRawTokensPerMonth,
      baselineMonthlyCost,
      baselineAnnualCost,
      optimizedMonthlyCost,
      optimizedAnnualCost,
      netMonthlySavings,
      netAnnualSavings,
      percentageReduction,
      tokensSavedTotal,
      prunedContextTokens,
      cacheMonthlySavings,
      pruningMonthlySavings,
      routerMonthlySavings,
      cachedPrompts,
      uncachedPrompts,
      microPrompts,
      frontierPrompts
    };
  }, [
    engineers,
    turnsPerDay,
    contextTokens,
    workingDays,
    frontierCostPerM,
    microCostPerM,
    routerTier1Percent,
    cacheHitPercent,
    astPruningPercent
  ]);

  const copyExecutiveSummary = () => {
    const text = `
### 💎 ContextPrism — Enterprise Token FinOps ROI Report
**Target Organization Profile:**
• Engineering Team Size: ${engineers} Engineers / Agent Seats
• Daily Agent Prompts: ${turnsPerDay} turns/engineer (${calculations.totalPromptsPerMonth.toLocaleString()} turns/mo)
• Raw Codebase Context: ${contextTokens.toLocaleString()} tokens/turn
• Model Rates: Frontier $${frontierCostPerM.toFixed(2)}/M | Micro $${microCostPerM.toFixed(2)}/M

**Financial Impact Under The 3 Golden Rules:**
• Unoptimized Baseline Spend: $${calculations.baselineMonthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month ($${calculations.baselineAnnualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/year)
• ContextPrism Optimized Spend: $${calculations.optimizedMonthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month ($${calculations.optimizedAnnualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/year)
• **Net Monthly Savings: $${calculations.netMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month**
• **Net Annual Run-Rate Savings: $${calculations.netAnnualSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / year**
• **Net Spend Reduction: ${calculations.percentageReduction}%**

**Savings Breakdown by Golden Rule:**
1. Rule 1 (Task-Aware Router @ ${routerTier1Percent}% Micro): $${calculations.routerMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
2. Rule 2 (Semantic Cache @ ${cacheHitPercent}% Hit Rate): $${calculations.cacheMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
3. Rule 3 (AST Context Pruner @ ${astPruningPercent}% Reduction): $${calculations.pruningMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo

*Generated by ContextPrism Open Source FinOps Gateway*
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Presets */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              Executive FinOps ROI Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">CFO & VP Eng Budget Modeling</span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Token FinOps ROI & Savings Calculator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Model your team's exact monthly and annual AI spend reduction under the 3 Golden Rules.
          </p>
        </div>

        {/* Presets Button Group */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Scale:</span>
          </span>
          {finOpsPresets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{preset.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-sky-500 text-white' : 'bg-white text-slate-600'}`}>
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Executive Cards: ROI Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Net Monthly Dollar Savings */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white border border-emerald-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Net Monthly Savings
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-700">
              ${calculations.netMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              <span className="text-xs font-bold text-emerald-600 ml-1">/ mo</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{calculations.percentageReduction}% net bill reduction</span>
            </p>
          </div>
        </div>

        {/* Card 2: Annual Run-Rate Impact */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Annual Run-Rate Savings
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              ${calculations.netAnnualSavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              <span className="text-xs font-bold text-slate-400 ml-1">/ yr</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Capital preserved for engineering hiring
            </p>
          </div>
        </div>

        {/* Card 3: Unoptimized vs Optimized Spend */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Monthly Cost Shock
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
              Unoptimized
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-400 line-through">
              ${calculations.baselineMonthlyCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <span>Optimized:</span>
              <span className="text-sky-600 font-black">
                ${calculations.optimizedMonthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Tokens Saved Total */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Monthly Tokens Pruned
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {(calculations.tokensSavedTotal / 1_000_000).toFixed(1)}M
              <span className="text-xs font-bold text-slate-400 ml-1">tokens</span>
            </div>
            <p className="text-[11px] text-indigo-600 font-medium mt-1">
              {calculations.totalPromptsPerMonth.toLocaleString()} agent turns accelerated
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Controls on Left, Golden Rules Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">Interactive Team & Usage Controls</h3>
            </div>
            <span className="text-xs text-slate-400">Slide to test scenarios</span>
          </div>

          <div className="space-y-5">
            {/* Slider 1: Team Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Engineering Team Size (AI Coding Agent Seats)</span>
                </span>
                <span className="font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                  {engineers} engineers
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                step="1"
                value={engineers}
                onChange={(e) => {
                  setSelectedPresetId('custom');
                  setEngineers(Number(e.target.value));
                }}
                className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 seat</span>
                <span>50 seats</span>
                <span>150 seats</span>
                <span>250 seats</span>
              </div>
            </div>

            {/* Slider 2: Daily Turns */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Repeat className="w-3.5 h-3.5 text-slate-400" />
                  <span>Agent Turns / Prompts per Engineer / Day</span>
                </span>
                <span className="font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                  {turnsPerDay} turns/day
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={turnsPerDay}
                onChange={(e) => {
                  setSelectedPresetId('custom');
                  setTurnsPerDay(Number(e.target.value));
                }}
                className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5 turns</span>
                <span>35 turns (avg)</span>
                <span>70 turns</span>
                <span>100 turns</span>
              </div>
            </div>

            {/* Slider 3: Average Raw Context Window */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Average Raw Context Size per Turn</span>
                </span>
                <span className="font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                  {contextTokens.toLocaleString()} tokens
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={contextTokens}
                onChange={(e) => {
                  setSelectedPresetId('custom');
                  setContextTokens(Number(e.target.value));
                }}
                className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10k tokens</span>
                <span>65k (mid)</span>
                <span>120k (large)</span>
                <span>200k (max)</span>
              </div>
            </div>

            {/* Model Pricing Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Frontier Model ($/1M)</span>
                  <span className="font-mono font-bold text-slate-800">${frontierCostPerM.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.00"
                  max="8.00"
                  step="0.25"
                  value={frontierCostPerM}
                  onChange={(e) => {
                    setSelectedPresetId('custom');
                    setFrontierCostPerM(Number(e.target.value));
                  }}
                  className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Claude 3.5 Sonnet / GPT-4o</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Micro Model ($/1M)</span>
                  <span className="font-mono font-bold text-slate-800">${microCostPerM.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="1.50"
                  step="0.05"
                  value={microCostPerM}
                  onChange={(e) => {
                    setSelectedPresetId('custom');
                    setMicroCostPerM(Number(e.target.value));
                  }}
                  className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Claude 3.5 Haiku / GPT-4o-mini</span>
              </div>
            </div>

            {/* 3 Golden Rules Efficiency Levers */}
            <div className="pt-3 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                The 3 Golden Rules Efficiency Levers
              </h4>

              {/* Lever 1: Rule 1 Router */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                    <span>Rule 1: % Simple Tasks Routed to Micro-Model</span>
                  </span>
                  <span className="font-mono font-bold text-sky-700">{routerTier1Percent}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="1"
                  value={routerTier1Percent}
                  onChange={(e) => {
                    setSelectedPresetId('custom');
                    setRouterTier1Percent(Number(e.target.value));
                  }}
                  className="w-full accent-sky-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Lever 2: Rule 2 Cache */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Rule 2: Semantic Cache Hit Rate (% at $0 cost)</span>
                  </span>
                  <span className="font-mono font-bold text-indigo-700">{cacheHitPercent}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={cacheHitPercent}
                  onChange={(e) => {
                    setSelectedPresetId('custom');
                    setCacheHitPercent(Number(e.target.value));
                  }}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Lever 3: Rule 3 AST Pruner */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rule 3: AST Context Pruning Volume Reduction</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-700">-{astPruningPercent}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="1"
                  value={astPruningPercent}
                  onChange={(e) => {
                    setSelectedPresetId('custom');
                    setAstPruningPercent(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Golden Rules Financial Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Executive Summary Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Monthly Savings Breakdown by Rule
              </h3>
              <button
                onClick={copyExecutiveSummary}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-semibold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Briefing' : 'Copy Briefing'}</span>
              </button>
            </div>

            {/* Breakdown Item: Rule 3 AST Compression */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    R3
                  </div>
                  <span className="font-bold text-slate-800">AST Context Compression</span>
                </div>
                <span className="font-bold text-emerald-700 font-mono">
                  +${calculations.pruningMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Collapses internal Python & TypeScript function bodies, reducing payload from{' '}
                <strong className="text-slate-800">{contextTokens.toLocaleString()}</strong> to{' '}
                <strong className="text-emerald-700">{calculations.prunedContextTokens.toLocaleString()}</strong> tokens.
              </p>
            </div>

            {/* Breakdown Item: Rule 2 Zero-Cost Semantic Cache */}
            <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    R2
                  </div>
                  <span className="font-bold text-slate-800">Zero-Cost Semantic Cache</span>
                </div>
                <span className="font-bold text-indigo-700 font-mono">
                  +${calculations.cacheMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Intercepts <strong className="text-slate-800">{calculations.cachedPrompts.toLocaleString()}</strong> duplicate team queries, serving instant responses at $0.00 in sub-5ms.
              </p>
            </div>

            {/* Breakdown Item: Rule 1 Model Router */}
            <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                    R1
                  </div>
                  <span className="font-bold text-slate-800">Task-Aware Model Router</span>
                </div>
                <span className="font-bold text-sky-700 font-mono">
                  +${calculations.routerMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Routes <strong className="text-slate-800">{calculations.microPrompts.toLocaleString()}</strong> routine prompts to micro-models ($0.30/M) instead of frontier models.
              </p>
            </div>

            {/* Net Total Summary Card */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                  Net Budget Saved
                </span>
                <span className="text-xl font-black text-emerald-600">
                  ${calculations.netMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / mo
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                  CFO ROI Multiple
                </span>
                <span className="text-xl font-black text-sky-600">
                  {(calculations.baselineMonthlyCost / Math.max(1, calculations.optimizedMonthlyCost)).toFixed(1)}x ROI
                </span>
              </div>
            </div>
          </div>

          {/* CFO Value Proposition Note */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-sky-900">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Budget Circuit Breaker Guaranteed</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Enforcing ContextPrism prevents runaway multi-turn agent loops from exhausting quarterly OpenAI and Anthropic budgets within days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
