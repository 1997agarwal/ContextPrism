# ContextPrism 💎

<p align="center">
  <b>Cut Enterprise AI Bills by 80% with Intelligent Context Compression & Token FinOps.</b>
</p>

<p align="center">
  <a href="https://1997agarwal.github.io/ContextPrism"><img src="https://img.shields.io/badge/🌐_Live_Demo-Try_ContextPrism_Studio-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo"></a>
</p>

<p align="center">
  <a href="https://1997agarwal.github.io/ContextPrism"><img src="https://img.shields.io/badge/Live_Demo-Interactive_Studio-0284c7.svg?logo=googlechrome&logoColor=white" alt="Live Demo"></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"></a>
  <a href="#cost-savings"><img src="https://img.shields.io/badge/Cost_Reduction-Up_to_90%25-emerald.svg" alt="Cost Reduction"></a>
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
    │  Rule 2: Zero-Cost Semantic Cache                           │
    │  • Duplicate or similar query? ──► Return response ($0, 2ms)│
    ├─────────────────────────────────────────────────────────────┤
    │  Rule 3: AST Context Compression (TypeScript & Python)      │
    │  • Strips internal function bodies & dead dependencies      │
    │  • Preserves docstrings, parameter signatures & type hints  │
    │  • Reduces 120,000 tokens ──► 18,000 tokens (-85%)         │
    ├─────────────────────────────────────────────────────────────┤
    │  Budget Circuit Breaker                                     │
    │  • Enforces per-task / per-user spend ceilings              │
    └─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
          [ Optimized Execution: Up to 90% Cost Reduction ]
```

1. **Match the Model to the Task (Rule 1):** Route simple classification and formatting to micro-models (\$0.25/M tokens). Reserve frontier models (\$3.00-\$15.00/M tokens) strictly for complex multi-step reasoning.
2. **Cache Everything You Can (Rule 2):** If 100 developers or automated agents inspect the same codebase segment, call the API once. Return cached responses 99 more times for \$0.
3. **AST Context Compression (Rule 3):** Parse source code using Abstract Syntax Trees across **TypeScript** and **Python (`.py`)**. Preserve exported interfaces, signatures, type hints, dataclasses, and full docstrings while stripping internal function and method bodies (-80% token reduction).

---

## 🐍 Python (.py) AST Context Compression

ContextPrism's core pruner strips internal method bodies while strictly retaining architectural context for downstream LLMs:

```python
# ContextPrism Packed Output (Feeds LLMs with 80% fewer tokens)
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
- **Scale Presets**: Instant modeling for **Seed / Series A** (8 seats), **Growth Scaleup** (35 seats), and **Enterprise Fleet** (150 seats).
- **Rule-by-Rule Breakdown**: Telemetry showing exact dollar contributions from Rule 1 (Router), Rule 2 (Cache), and Rule 3 (AST Pruner).
- **Executive Briefing Export**: One-click formatted report ready to paste into Slack, Notion, or CFO budget memos.

---

## 📊 Token & Cost Impact Benchmark

| Workflow | Raw LLM Tokens | ContextPrism Packed | Token Savings | Cost per 1,000 Queries |
|---|---|---|---|---|
| **Python FastAPI Backend** | 125,000 tokens | 22,100 tokens | **-82.3%** | \$1,875 $\to$ **\$331.50** |
| **Full TS Repo Feature Planning** | 148,000 tokens | 21,500 tokens | **-85.4%** | \$2,220 $\to$ **\$322.50** |
| **Bug Investigation / Tracing** | 82,000 tokens | 14,800 tokens | **-81.9%** | \$1,230 $\to$ **\$222.00** |
| **Repeated CI/CD Prompt Runs** | 45,000 tokens | 0 tokens (Cache Hit) | **-100%** | \$675 $\to$ **\$0.00** |

---

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

### 2. Run via Headless CLI
```bash
# Compress TypeScript or Python repositories for coding agents
npx contextprism pack --target ./src
npx contextprism pack --target ./services/backend # Compresses Python .py services

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
    │   ├── CompressorStudio.tsx # Multi-language AST compressor (TS & Python)
    │   ├── FinOpsCalculator.tsx # Executive Token FinOps ROI Calculator
    │   ├── RouterPlayground.tsx # Model routing tier tester
    │   ├── CacheInspector.tsx   # Cache hit telemetry
    │   └── FinOpsSummary.tsx    # Live ROI & dollar savings meter
    └── data/
        └── mockFinOps.ts     # Pre-configured benchmark datasets & presets
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
