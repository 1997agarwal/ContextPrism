import express from 'express';
import cors from 'cors';
import { compressCode } from './core/astCompressor.ts';
import { routePrompt } from './core/modelRouter.ts';
import { semanticCache } from './core/semanticCache.ts';
import { checkBudgetGuard, budgetConfig } from './core/budgetGuard.ts';

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req: any, res: any) => {
  res.json({
    status: 'healthy',
    service: 'ContextPrism FinOps Gateway',
    version: '0.1.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/compress', (req: any, res: any) => {
  const { source, language } = req.body;
  if (!source) {
    return res.status(400).json({ error: 'Source code content is required.' });
  }

  const result = compressCode(source, language);
  res.json(result);
});

app.post('/api/route', (req: any, res: any) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt string is required.' });
  }

  const decision = routePrompt(prompt);
  res.json(decision);
});

app.post('/api/cache/check', (req: any, res: any) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const hit = semanticCache.get(prompt);
  res.json({
    isHit: !!hit,
    entry: hit || null,
    cost: hit ? 0.00 : 0.03
  });
});

app.get('/api/cache', (req: any, res: any) => {
  res.json({
    entries: semanticCache.getAll()
  });
});

app.get('/api/finops/summary', (req: any, res: any) => {
  const cacheEntries = semanticCache.getAll();
  const totalCacheHits = cacheEntries.reduce((acc, c) => acc + c.hitCount, 0);
  const totalCacheSavings = cacheEntries.reduce((acc, c) => acc + c.dollarsSavedTotal, 0);

  res.json({
    totalTokensSaved: 14_250_000,
    totalDollarSavings: 2_137.50 + totalCacheSavings,
    averageTokenReductionPercent: 82.4,
    cacheHitRatePercent: 41.8,
    budgetCeiling: budgetConfig.maxTokensPerQuery
  });
});

app.listen(PORT, () => {
  console.log(`💎 ContextPrism FinOps Gateway running on http://localhost:${PORT}`);
});
