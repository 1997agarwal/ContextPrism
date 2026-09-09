# AGENTS.md — Constitution of ContextPrism

> **Read this first.** This file is the constitution of the ContextPrism repository. It applies to every engineer and AI agent (AntiGravity, Claude Code, Cursor, Windsurf, Codex, Copilot).

---

## 1. What ContextPrism Is
ContextPrism is an open-source Token FinOps & Intelligent Context Optimizer that slashes enterprise AI API bills by **70% to 90%** using the **3 Golden Rules of AI Cost Optimization**:

1. **Match the Model to the Task:** Route simple classification/extraction tasks to nano/micro models (Claude 3.5 Haiku, GPT-4o-mini); reserve frontier models (Claude 3.5 Sonnet, GPT-4o) exclusively for complex multi-step reasoning.
2. **Cache Everything Possible:** Intercept identical or semantically duplicate queries and serve them at $0 cost with sub-5ms latency.
3. **AST Context Compression:** Strip internal function bodies, dead dependencies, and repetitive logs using Abstract Syntax Trees before sending code to LLMs.

---

## 2. The 4-File Parity Standard

All updates to this repository must maintain the 4-file parity:
- `AGENTS.md`: Agent constitution, execution protocols, and safety bounds.
- `CLAUDE.md`: CLI commands, shortcuts, and code-style guidelines.
- `ROADMAP.md`: Living status of all phases and features.
- `CONTRIBUTING.md`: Contribution guide and pull request rules.

---

## 3. Engineering & UI Principles

1. **Mandatory UI Standard — Clean, Intuitive & Modern 2026 Light Theme:** All interfaces must use a crisp modern light theme (`#f8fafc` canvas, `#ffffff` cards, subtle `#e2e8f0` borders, high-contrast `#0f172a` typography, and focused accents). No cramped dark terminal dumps; prioritize guided, step-by-step flows.
2. **Zero Semantic Loss:** Context pruning must strictly preserve type declarations, exported function signatures, and interface contracts so downstream LLMs can reason with 100% accuracy.
3. **Transparent FinOps Telemetry:** Every compression or routing action must report exact before-and-after token metrics and calculated dollar savings.
4. **Zero-Config Portability:** Core utilities must run locally without mandatory external cloud infrastructure.
