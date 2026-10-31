# ContextPrism 💎

<p align="center">
  <b>Shrink AI context with AST compression, model routing and an exact-match cache. Measured: 35.3% fewer estimated tokens on the bundled samples.</b>
</p>

<p align="center">
  <a href="https://1997agarwal.github.io/ContextPrism"><img src="https://img.shields.io/badge/🌐_Live_Demo-Try_ContextPrism_Studio-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo"></a>
</p>

<p align="center">
  <a href="https://1997agarwal.github.io/ContextPrism"><img src="https://img.shields.io/badge/Live_Demo-Interactive_Studio-0284c7.svg?logo=googlechrome&logoColor=white" alt="Live Demo"></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"></a>
  <a href="#benchmark-status"><img src="https://img.shields.io/badge/Measured-35.3%25_fewer_tokens_(samples)-emerald.svg" alt="Measured token reduction"></a>
  <a href="#3-golden-rules"><img src="https://img.shields.io/badge/Architecture-3_Golden_Rules-orange.svg" alt="3 Golden Rules"></a>
  <a href="#typescript"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#python"><img src="https://img.shields.io/badge/Python-AST_Pruner-3776AB.svg?logo=python&logoColor=white" alt="Python AST"></a>
  <a href="#finops-calculator"><img src="https://img.shields.io/badge/Token_FinOps-ROI_Calculator-10B981.svg" alt="Token FinOps ROI Calculator"></a>
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
    │  Rule 2: Zero-Cost Exact-Match Cache                        │
    │  • Identical query (after normalization)? ──► Cached reply │
    ├─────────────────────────────────────────────────────────────┤
    │  Rule 3: AST Context Compression (TypeScript & Python)      │
    │  • Strips internal function bodies & dead dependencies      │
    │  • Preserves docstrings, parameter signatures & type hints  │
    │  • Measured: 35.3% fewer estimated tokens on 4 samples     │
    ├─────────────────────────────────────────────────────────────┤
    │  Budget guard (advisory)                                    │
    │  • Flags requests over the 32k-token ceiling; never blocks  │
    └─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
          [ Optimized Execution: cost depends on your model pricing ]
```

1. **Match the Model to the Task (Rule 1):** Route simple classification and formatting to micro-models (\$0.25/M tokens). Reserve frontier models (\$3.00-\$15.00/M tokens) strictly for complex multi-step reasoning.
2. **Cache Everything You Can (Rule 2):** If 100 developers or automated agents send the same prompt, call the API once and return the stored answer for \$0. The cache matches only identical prompts after lowercasing and punctuation removal. It is not semantic.
3. **AST Context Compression (Rule 3):** Parse source code using Abstract Syntax Trees across **TypeScript** and **Python (`.py`)**. Preserve exported interfaces, signatures, type hints, dataclasses, and full docstrings while stripping internal function and method bodies (35.3% measured on the bundled samples; see [Benchmark status](#benchmark-status)).

---

## 🐍 Python (.py) AST Context Compression

ContextPrism's core pruner strips internal method bodies while strictly retaining architectural context for downstream LLMs:

```python
# ContextPrism Packed Output (illustrative shape of the output)
class EnterpriseStripeService:
    """Enterprise Stripe payment processor with audit trail & dispute mitigation."""

    def __init__(self, api_key: str, webhook_secret: str, environment: str = "production"):
        """Initialize payment service with enterprise credential verification."""
        ...  # [AST Collapsed: 8 lines of internal logic]

    async def process_reconciliation(
        self,
        payload: PaymentIntentPayload,
        strict_idempotency: bool = True
    ) -> Dict[str, Union[str, bool]]:
        """Reconcile incoming payment intent with enterprise ledger and clearinghouse.
        
        Args:
            payload: Validated payment intent payload.
            strict_idempotency: When True, halts duplicate transaction processing.
        Returns:
            Dictionary containing transaction settlement status and ledger receipt hash.
        """
        ...  # [AST Collapsed: 45 lines of internal logic]
```

- **Docstring Retention**: Single-line and multi-line docstrings are preserved verbatim.
- **Type Safety**: Preserves Pydantic models, dataclass fields, type hints, and return type annotations.
- **Syntactically Valid**: Outputs valid Python with standard `...` block collapse.

---

## 💰 Interactive Token FinOps ROI Calculator

Built into the Web Studio for Engineering Managers, Directors, and CFOs to model exact team savings:
- **Interactive Levers**: Team size (1-250 engineers), daily turns/day, context window size, Frontier vs Micro rates, and efficiency percentages.
- **Scale Presets**: Instant modeling for **Seed / Series A** (8 seats), **Growth Scaleup** (35 seats), and **Enterprise Fleet** (150 seats). Presets and rates are illustrative assumptions, not measurements.
- **Rule-by-Rule Breakdown**: Dollar contributions from Rule 1 (Router), Rule 2 (Exact-Match Cache), and Rule 3 (AST Pruner), computed from the inputs you enter.
- **Executive Briefing Export**: One-click formatted report ready to paste into Slack, Notion, or CFO budget memos.

---

## 📊 Benchmark status

<a id="benchmark-status"></a>

- **Reproducible:** `npm run bench` runs the real AST compressor on the four sample files in `src/data/mockFinOps.ts` and prints estimated tokens (characters / 3.8). Result: 2,276 to 1,472 estimated tokens, **35.3% reduction**. Per-file results range from 0% to 44.7%.
- **Not reproducible yet:** the earlier table (82–85% on FastAPI, TypeScript repo, bug-tracing and CI workloads) and the "62%" figure have no script, data, or source in this repository. They are removed.
- **Dollar savings:** not measured. They depend on your model prices, which the calculator takes as inputs.
- **Estimates only:** token counts use a character heuristic, not a real tokenizer.

## 🚀 Quick Start
> 🌐 **Live Web Studio:** Try ContextPrism instantly without installation at **[https://1997agarwal.github.io/ContextPrism](https://1997agarwal.github.io/ContextPrism)**

### 1. Launch the 2026 Light Theme Studio locally
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

### 2. Run the benchmark
```bash
npm run bench
```

### 3. Headless CLI (status: demo output)
```bash
# Compress TypeScript or Python repositories for coding agents
npx contextprism pack --target ./src
npx contextprism route "classify customer feedback sentiment"
```
The `pack` and `route` commands currently print fixed demo text. They do not read your files yet, and `npx contextprism` is not published.

---

## 📂 Repository Structure

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
│       ├── semanticCache.ts  # Zero-cost exact-match cache (Rule 2)
│       └── budgetGuard.ts    # Advisory token ceiling check (not enforced)
└── src/                      # 2026 Clean Light Web Studio
    ├── App.tsx               # FinOps dashboard & workspace
    ├── components/
    │   ├── CompressorStudio.tsx # Multi-language AST compressor (TS & Python)
    │   ├── FinOpsCalculator.tsx # Executive Token FinOps ROI Calculator
    │   ├── RouterPlayground.tsx # Model routing tier tester
    │   ├── CacheInspector.tsx   # Exact-match cache telemetry (sample entries)
    │   └── FinOpsSummary.tsx    # Live ROI & dollar savings meter
    └── data/
        └── mockFinOps.ts     # Sample data: savings figures, presets, sample files
├── scripts/
│   └── bench-compression.mjs # `npm run bench` (bundled samples only)
```

---

## 👤 Author

**Harshit Agarwal**  
*AI Product Manager & 0-to-1 Systems Builder*  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-181717?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/1997agarwal)
[![X](https://img.shields.io/badge/X-Follow_%401997agarwal-181717?style=flat-square&logo=x&logoColor=white)](https://x.com/1997agarwal)
[![GitHub](https://img.shields.io/badge/GitHub-Explore_Repos-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/1997agarwal)
[![Email](https://img.shields.io/badge/Email-Get_in_Touch-181717?style=flat-square&logo=gmail&logoColor=white)](mailto:agarwal.harshit97@gmail.com)

- **GitHub:** [@1997agarwal](https://github.com/1997agarwal)  
- **LinkedIn:** [1997agarwal](https://www.linkedin.com/in/1997agarwal)  
- **X (Twitter):** [@1997agarwal](https://x.com/1997agarwal)  

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
