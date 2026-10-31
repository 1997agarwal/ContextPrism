# ContextPrism Roadmap

Living execution status of ContextPrism milestones.

## Phase 1: Core FinOps Architecture (Completed)
- [x] Standalone repository initialization with MIT license
- [x] 4-File Parity standard (`AGENTS.md`, `CLAUDE.md`, `ROADMAP.md`, `CONTRIBUTING.md`)
- [x] AST Context Pruner (strips internal bodies, retains public types & exports)
- [x] Model Router engine (complexity scoring & Tier 1 vs Tier 2 routing)
- [x] In-memory exact-match cache layer ($0 instant replay; matches identical prompts only, process-local)
- [x] Modern 2026 Light Theme Web Studio layout

## Phase 2: Benchmarking & Multi-Language FinOps (Completed)
- [ ] Standalone CLI (`bin/cli.mjs`) that packs repos and routes prompts for real (current `pack`/`route` output is fixed demo text)
- [x] Python (.py) AST context compression (docstrings, signatures, and type hints preserved)
- [x] Interactive Token FinOps ROI Calculator widget for CFOs and Engineering Managers
- [x] Multi-language Compressor Studio with live TypeScript and Python switcher
- [ ] Measured token & dollar savings telemetry (current figures are sample data in `src/data/mockFinOps.ts`)
- [x] Executive brief export from the ROI calculator

## Phase 3: Enterprise Gateway & Advanced Pruning (In Progress)
- [x] Python (.py) AST context compression (docstrings, signatures, and type hints preserved)
- [x] Interactive Token FinOps ROI Calculator widget for CFOs and Engineering Managers
- [x] Reproducible compression benchmark on bundled samples (`npm run bench`)
- [ ] Benchmarks on real repositories with published inputs
- [ ] Tree-sitter native parser bindings for Rust & Go
- [ ] Redis persistent distributed cache adapter
- [ ] Reverse proxy middleware (`localhost:4200/v1/chat/completions`)
- [ ] Per-user token budget enforcement & alerts (current budget guard is advisory and per-query only)
- [ ] Slack webhook integration for runaway token warnings
