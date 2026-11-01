# CLAUDE.md — ContextPrism Developer Guide

## Commands
- **Install dependencies:** `npm install`
- **Run dev (Frontend + Backend):** `npm run dev`
- **Run Backend only:** `npm run dev:server` (Port 4200)
- **Run Frontend only:** `npm run dev:client` (Port 5174)
- **Build full stack:** `npm run build`
- **CLI Compression scan:** `node bin/cli.mjs pack --target ./src`
- **CLI Route test:** `node bin/cli.mjs route "classify intent"`
- **Lint / Typecheck:** `npm run typecheck`

## Code Guidelines
- **UI Design Standard:** Clean, Intuitive & Modern 2026 Light Theme.
- **Language:** TypeScript with native Node.js execution.
- **Architecture:**
  - AST Compressor (`core/astCompressor.ts`): Multi-language pruner for TypeScript and Python (.py), preserving docstrings, signatures, and type hints.
  - Model Router (`core/modelRouter.ts`): Task-aware prompt classifier.
  - Semantic Cache (`core/semanticCache.ts`): Zero-cost instant lookup cache.
  - Web Studio (`src/`): Light-theme dashboard with interactive FinOps ROI Calculator, Cache Inspector, Router Playground, and Compressor Studio.
