# ContextPrism 💎

<p align="center">
  <b>Cut Enterprise AI Bills by 80% with Intelligent Context Compression & Token FinOps.</b>
</p>

<p align="center">
  <a href="#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"></a>
  <a href="#cost-savings"><img src="https://img.shields.io/badge/Cost_Reduction-Up_to_90%25-emerald.svg" alt="Cost Reduction"></a>
  <a href="#3-golden-rules"><img src="https://img.shields.io/badge/Architecture-3_Golden_Rules-orange.svg" alt="3 Golden Rules"></a>
  <a href="#typescript"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="SPECIFICATION.md"><img src="https://img.shields.io/badge/PRD_Spec-Complete_v0.1-purple.svg" alt="PRD Spec"></a>
</p>

---

## ⚡ The Crisis: Runaway Enterprise AI Bills

Enterprises gave coding agents (Claude Code, Cursor, AntiGravity, Copilot) to hundreds of employees. Instead of making teams lean, companies were hit with **"LLM Cost Shock"**:
- **The Repo-Dumping Trap:** Prompting *"add a retry button"* dumps 150,000 repository tokens into the context.
- **The Multi-Turn Multiplier:** 10 tool iterations $\times$ 150,000 tokens = **1.5M tokens for a single user prompt** (\$15-\$25 per query).
- **The Result:** Annual AI budgets burned in 60 days, forcing CFOs to clamp down on AI access.

**ContextPrism** stops token maxing at the infrastructure layer before expensive API calls are made.

---

## 🏆 The 3 Golden Rules of AI Cost Optimization

```
                    [ User Prompt / Codebase Input ]
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                ContextPrism FinOps Gateway                  │
    ├─────────────────────────────────────────────────────────────┤
    │  Rule 1: Task-Aware Model Router                            │
    │  • Simple classify/format ──► Claude 3.5 Haiku / GPT-4o-mini│
    │  • Complex architecture   ──► Claude 3.5 Sonnet / GPT-4o    │
    ├─────────────────────────────────────────────────────────────┤
    │  Rule 2: Zero-Cost Semantic Cache                           │
    │  • Duplicate or similar query? ──► Return response ($0, 2ms)│
    ├─────────────────────────────────────────────────────────────┤
    │  Rule 3: AST Context Compression                            │
    │  • Strips internal function bodies & dead dependencies      │
    │  • Reduces 120,000 tokens ──► 18,000 tokens (-85%)         │
    ├─────────────────────────────────────────────────────────────┤
    │  Budget Circuit Breaker                                     │
    │  • Enforces per-task / per-user spend ceilings              │
    └─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
          [ Optimized Execution: Up to 90% Cost Reduction ]
```

1. **Match the Model to the Task:** Route simple classification and formatting to micro-models (\$0.25/M tokens). Reserve frontier models (\$3.00-\$15.00/M tokens) strictly for complex multi-step reasoning.
2. **Cache Everything You Can:** If 100 developers or automated agents inspect the same codebase segment, call the API once. Return cached responses 99 more times for \$0.
3. **AST Context Compression:** Parse source code using Abstract Syntax Trees (AST). Preserve exported interfaces, schemas, and type definitions while collapsing internal implementation bodies.

---

## 📊 Token & Cost Impact Benchmark

| Workflow | Raw LLM Tokens | ContextPrism Packed | Token Savings | Cost per 1,000 Queries |
|---|---|---|---|---|
| **Full Repo Feature Planning** | 148,000 tokens | 21,500 tokens | **-85.4%** | \$2,220 $\to$ **\$322.50** |
| **Bug Investigation / Tracing** | 82,000 tokens | 14,800 tokens | **-81.9%** | \$1,230 $\to$ **\$222.00** |
| **Repeated CI/CD Prompt Runs** | 45,000 tokens | 0 tokens (Cache Hit) | **-100%** | \$675 $\to$ **\$0.00** |

---

## 🚀 Quick Start

### 1. Launch the 2026 Light Theme Studio
```bash
# Clone the repository
git clone https://github.com/1997agarwal/ContextPrism.git
cd ContextPrism

# Install dependencies
npm install

# Start both API and Discovery Studio
npm run dev
```
Open **`http://localhost:5174`** to launch the interactive Token FinOps Studio.

### 2. Run via Headless CLI
```bash
# Compress a codebase for coding agents
npx contextprism pack --target ./src --budget 8000

# Analyze model routing recommendation for a prompt
npx contextprism route "classify customer feedback sentiment"
```

---

## 📂 Repository Architecture

```
ContextPrism/
├── AGENTS.md                 # Constitution & cost boundaries
├── CLAUDE.md                 # CLI commands and developer guide
├── ROADMAP.md                # Phase-by-phase execution tracking
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # MIT License
├── README.md                 # Showcase documentation
├── bin/
│   └── cli.mjs               # Executable binary for npx contextprism
├── server/
│   ├── index.ts              # Express API server (Port 4200)
│   └── core/
│       ├── astCompressor.ts  # AST pruner (Rule 3)
│       ├── modelRouter.ts    # Dynamic model router (Rule 1)
│       ├── semanticCache.ts  # Zero-cost cache (Rule 2)
│       └── budgetGuard.ts    # Circuit breaker & spend ceilings
└── src/                      # 2026 Clean Light Web Studio
    ├── App.tsx               # FinOps dashboard & workspace
    ├── components/
    │   ├── CompressorStudio.tsx # AST compression visualizer
    │   ├── RouterPlayground.tsx # Model routing tier tester
    │   ├── CacheInspector.tsx   # Cache hit telemetry
    │   └── FinOpsSummary.tsx    # Live ROI & dollar savings meter
    └── data/
        └── mockFinOps.ts     # Pre-configured benchmark datasets
```

---

## 👤 Author

**Harshit Agarwal**  
*AI Product Manager & 0-to-1 Systems Builder*  

<p align="left">
  <a href="https://www.linkedin.com/in/1997agarwal" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-181717?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://x.com/1997agarwal" target="_blank">
    <img src="https://img.shields.io/badge/X-Follow_%401997agarwal-181717?style=flat-square&logo=x&logoColor=white" alt="X" />
  </a>
  <a href="https://github.com/1997agarwal" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Explore_Repos-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

- **GitHub:** [@1997agarwal](https://github.com/1997agarwal)  
- **LinkedIn:** [1997agarwal](https://www.linkedin.com/in/1997agarwal)  
- **X (Twitter):** [@1997agarwal](https://x.com/1997agarwal)  

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
