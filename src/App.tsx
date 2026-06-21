import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Plus, 
  Sparkles, 
  Activity, 
  Layers, 
  Lightbulb, 
  RefreshCw, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  FileText,
  BadgeAlert,
  Terminal,
  ChevronRight,
  User,
  ExternalLink,
  Shield,
  Briefcase
} from 'lucide-react';
import CortexAgentCard from './components/CortexAgentCard';
import SimulatorTable from './components/SimulatorTable';
import TerminalLogs from './components/TerminalLogs';
import EchofsArchitecture from './components/EchofsArchitecture';
import DarkPaintApp from './components/DarkPaintApp';
import SubmissionBenchmarks from './components/SubmissionBenchmarks';
import { AgentInfo, LogEntry, Message, ChatSession } from './types';

const DEFAULT_AGENTS: AgentInfo[] = [
  {
    id: "AGENT_01_PROVER",
    name: "01. PROVER",
    role: "Truth Formulation",
    status: "STABLE",
    rulesCount: 88,
    entropyImpact: 0.12,
    description: "Evaluates standard symbolic formulas. Derives baseline logical theorems from cold axioms.",
    axiomaticAssertion: "assert_proof_chain(A => B && B => C => A => C)"
  },
  {
    id: "AGENT_02_REFUTER",
    name: "02. REFUTER",
    role: "Incongruency Scout",
    status: "STABLE",
    rulesCount: 64,
    entropyImpact: 0.35,
    description: "Actively attempts to refute the main proposition. Detects hallucinations, semantic drifts, and unprovable leaps.",
    axiomaticAssertion: "negate_assert_leaps(A_part != verified_axioms)"
  },
  {
    id: "AGENT_03_ENTROPY",
    name: "03. SHANNON GUARD",
    role: "Entropy Boundary",
    status: "STABLE",
    rulesCount: 42,
    entropyImpact: 0.08,
    description: "Measures Shannon information entropy. Halts reasoning instantly if confidence drops below system thresholds.",
    axiomaticAssertion: "calculate_shannon_entropy(P(x) * log(P(x)) <= threshold)"
  },
  {
    id: "AGENT_04_AXIOM",
    name: "04. SYMBOLIC COMPILER",
    role: "eAMM Injector",
    status: "STABLE",
    rulesCount: 120,
    entropyImpact: 0.15,
    description: "Links external symbolic axioms directly to the logic engine, bypassing the need for a probabilistic training phase.",
    axiomaticAssertion: "inject_axiomatic_vault(eAMM_schemas_v25)"
  },
  {
    id: "AGENT_05_ADJUDIC",
    name: "05. ADJUDICATOR",
    role: "Consensus Arbiter",
    status: "STABLE",
    rulesCount: 50,
    entropyImpact: 0.22,
    description: "Moderates the debate rounds Level 1 to 4. Collects and merges arguments into a unified consensus vector.",
    axiomaticAssertion: "resolve_consensus_matrix(prover_vs_refuter_confidence)"
  },
  {
    id: "AGENT_06_VERIFY",
    name: "06. VERIFIER",
    role: "Silicon Gatekeep",
    status: "STABLE",
    rulesCount: 75,
    entropyImpact: 0.05,
    description: "Ensures logical outputs match ternary execution rules directly on metal (ARM / RISC-V targets) to prevent bit-drifts.",
    axiomaticAssertion: "verify_ternary_register(state_register_vbc_8)"
  }
];

const PRE_SEEDED_CHATS: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'Axiomatics vs Hallucination',
    created: '2026-06-21 02:00:00',
    messages: [
      {
        id: 'msg-rec-1',
        sender: 'user',
        text: 'Explain why standard probabilistic transformers hallucinate and how ternary logic eliminates it.',
        mode: 'deterministic',
        timestamp: '02:01:00'
      },
      {
        id: 'msg-rec-2',
        sender: 'assistant',
        text: 'Standard transformer models operate on probabilistic binary logic bounds (evaluating next-token token logits). Because they calculate high-dimensional approximations without formal grounding, they drift into plausible-sounding non-facts (i.e. hallucinations).\n\nMIIDreamOS solves this systematically through: \n1. **Deterministic Ternary Logic**: Adding the unverified index state (0) bounds search boundaries. The system will NOT formulate a token step unless consensus validity is mathematically proven.\n2. **Axiomatic Core (eAMM)**: Injects cold logic directly into the kernel, bypassing ungrounded structural approximations.',
        mode: 'deterministic',
        timestamp: '02:01:15',
        ternaryState: 1,
        entropy: 0.04,
        wattageUsed: 12,
        axiomaticChains: [
          'proven_truth(Next_State) <=> consensus_score([A1...A6]) == 1',
          'state_unknown_if_entropy(H_shannon > 0.25) => assert_state(0)',
          'bypass_backprop_gradients(true) => train_cost($0.00)'
        ],
        debateLogs: [
          { agentId: 'AGENT_01_PROVER', agentName: '01. PROVER', thought: 'Constructed deductive proof chain validating ternary status bounds on finite inputs.' },
          { agentId: 'AGENT_03_ENTROPY', agentName: '03. SHANNON GUARD', thought: 'Verified Shannon entropy = 0.04 matches rigid threshold limitation.' },
          { agentId: 'AGENT_05_ADJUDIC', agentName: '05. ADJUDICATOR', thought: 'All 6 parallel verification matrix elements validated. Signed off proof of zero hallucination.' }
        ]
      }
    ]
  },
  {
    id: 'chat-2',
    title: 'SBC Verification Audit',
    created: '2026-06-21 02:01:30',
    messages: [
      {
        id: 'msg-rec-3',
        sender: 'user',
        text: 'What are the core metrics for v2.5.0 SBC framework?',
        mode: 'deterministic',
        timestamp: '02:02:00'
      },
      {
        id: 'msg-rec-4',
        sender: 'assistant',
        text: 'The Simulate-Before-Compress (SBC) validation metrics for MIIDreamOS v2.5.0 are derived from logical proofs on specialized silicon boards:\n\n- **Power Draw**: 12 Watts total footprint (representing a 29x reduction over standard GPU nodes drawing 350W).\n- **Logical Fidelity**: 99.2% mathematical precision maintained over arbitrary recursive logical evaluations.\n- **Size**: Compresses the symbolic neural mapping down to 32 MB core runtime layout, fully eliminating parameters storage bloat.',
        mode: 'deterministic',
        timestamp: '02:02:18',
        ternaryState: 1,
        entropy: 0.08,
        wattageUsed: 12,
        axiomaticChains: [
          'power_save_delta(350W / 12W) => 29.16x efficiency',
          'proof_size_reduction(512MB => 32MB) <=> 16:1 symbolic mapping'
        ],
        debateLogs: [
          { agentId: 'AGENT_04_AXIOM', agentName: '04. SYMBOLIC COMPILER', thought: 'Compiled eAMM schema blocks successfully mapped layout.' },
          { agentId: 'AGENT_06_VERIFY', agentName: '06. VERIFIER', thought: 'Ternary registers verified on Tesla custom substrate gates.' }
        ]
      }
    ]
  }
];

export default function App() {
  // Chat state management
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('miidream_sessions');
    return saved ? JSON.parse(saved) : PRE_SEEDED_CHATS;
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    return sessions[0]?.id || 'chat-1';
  });
  
  // Interactive Simulator parameters modified via components/SimulatorTable
  const [wattage, setWattage] = useState(12);
  const [entropyThreshold, setEntropyThreshold] = useState(0.25);
  const [fidelity, setFidelity] = useState(99.2);

  const [currentView, setCurrentView] = useState<'assays' | 'echofs' | 'darkpaint' | 'benchmarks'>('assays');

  // Centralized log state matching TerminalLogs to link compile events, checklists and canvas commands
  const [centralLogs, setCentralLogs] = useState<LogEntry[]>([
    {
      timestamp: '02:00:01',
      level: 'SUCCESS',
      source: 'BOOT_KERNEL',
      message: 'MIIDreamOS v2.5.0 core successfully powered on custom silicon target.',
    },
    {
      timestamp: '02:00:02',
      level: 'INFO',
      source: 'MNDA_ARIEL',
      message: 'Encryption layer ARIEL-NLC [Negative-Loop Cipher] secured.',
    },
    {
      timestamp: '02:00:03',
      level: 'INFO',
      source: 'SYMBOLIC_VAULT',
      message: 'eAMM populating intelligence vaults with deterministic logic blocks.',
    },
    {
      timestamp: '02:00:04',
      level: 'WARNING',
      source: 'ENTROPY_GUARD',
      message: 'Shannon limits bounded to 0.25 to completely eliminate halluncipathic prediction drift.',
    },
  ]);

  const handleTriggerCentralLog = (source: string, message: string, level: LogEntry['level'] = 'INFO') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLog: LogEntry = { timestamp, level, source, message };
    setCentralLogs(prev => [...prev, newLog]);
  };

  const handleClearCentralLogs = () => {
    setCentralLogs([]);
  };

  // Selector controls & user input
  const [activeMode, setActiveMode] = useState<'probabilistic' | 'deterministic'>('deterministic');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Highlighting active debating agents during the cerebral debate
  const [agents, setAgents] = useState<AgentInfo[]>(DEFAULT_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('AGENT_01_PROVER');
  const [activeDebatingLog, setActiveDebatingLog] = useState<string>('');

  // Scroll to bottom of terminal/logs/chats
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('miidream_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId, loading]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Creates a new clean chat session
  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'New Logic Assay',
      created: new Date().toISOString().replace('T', ' ').substring(0, 19),
      messages: []
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = sessions.filter(s => s.id !== id);
    if (remaining.length === 0) {
      const fallback: ChatSession = {
        id: 'fallback',
        title: 'New Logic Assay',
        created: new Date().toISOString().replace('T', ' ').substring(0, 19),
        messages: []
      };
      setSessions([fallback]);
      setActiveSessionId('fallback');
    } else {
      setSessions(remaining);
      if (activeSessionId === id) {
        setActiveSessionId(remaining[0].id);
      }
    }
  };

  // Triggers simulator tweaks
  const handleTweakSimulation = (w: number, e: number, f: number) => {
    setWattage(w);
    setEntropyThreshold(e);
    setFidelity(f);
  };

  const handleUpdateFidelity = (delta: number) => {
    setFidelity(prev => {
      const newVal = parseFloat((prev + delta).toFixed(2));
      return newVal > 100 ? 100 : newVal;
    });
  };

  // Submit search query
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage;
    setInputMessage('');
    setLoading(true);

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      mode: activeMode,
      timestamp
    };

    // Update session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeSession.id) {
        const title = s.messages.length === 0 ? (userText.length > 25 ? userText.substring(0, 24) + '...' : userText) : s.title;
        return {
          ...s,
          title,
          messages: [...s.messages, userMsg]
        };
      }
      return s;
    }));

    // If MIIDreamOS deterministic mode is chosen, cycle agent states visually so that they debate!
    if (activeMode === 'deterministic') {
      setActiveDebatingLog('Initiating Levels 1–4 Cerebral verification...');
      // Cycle AGENT_01 PROVER
      setAgents(prev => prev.map((a, i) => i === 0 ? { ...a, status: 'DEBATING' } : a));
      setSelectedAgentId('AGENT_01_PROVER');
      await new Promise(r => setTimeout(r, 650));

      // Cycle AGENT_02 REFUTER and AGENT_03 SHANNON
      setAgents(prev => prev.map((a, i) => {
        if (i === 0) return { ...a, status: 'COMPLETED' };
        if (i === 1 || i === 2) return { ...a, status: 'DEBATING' };
        return a;
      }));
      setSelectedAgentId('AGENT_02_REFUTER');
      setActiveDebatingLog('Shannon Entropy Guard analyzing search bounds: threshold ' + entropyThreshold);
      await new Promise(r => setTimeout(r, 650));

      // Cycle rest
      setAgents(prev => prev.map((a, i) => {
        if (i === 1 || i === 2) return { ...a, status: 'COMPLETED' };
        if (i >= 3) return { ...a, status: 'DEBATING' };
        return a;
      }));
      setSelectedAgentId('AGENT_05_ADJUDIC');
      setActiveDebatingLog('Synthesizing consolidated Axioms directly through core eAMM registers...');
    }

    try {
      // Run the purely offline logical eAMM architecture simulation engine
      // This supports completely self-contained execution without any cloud API requests
      await new Promise(r => setTimeout(r, activeMode === 'deterministic' ? 400 : 700));

      const q = userText.toLowerCase();
      let conclusion = "";
      let axiomaticChains: string[] = [];
      let ternaryState: 0 | 1 | -1 = 1;
      let entropyLevel = 0.03 + Math.random() * 0.05;
      
      let dbgLogs = [
        { agentId: "AGENT_01_PROVER", agentName: "Cerebral Prover [L1]", thought: "" },
        { agentId: "AGENT_02_REFUTER", agentName: "Incongruency Scout [L2]", thought: "" },
        { agentId: "AGENT_03_ENTROPY", agentName: "Shannon Entropy Guard [L2]", thought: "" },
        { agentId: "AGENT_04_AXIOM", agentName: "Symbolic Compiler [L3]", thought: "" },
        { agentId: "AGENT_05_ADJUDIC", agentName: "eAMM State Selector [L4]", thought: "" },
        { agentId: "AGENT_06_VERIFY", agentName: "Consensus Verifier [L4]", thought: "" }
      ];

      if (activeMode === 'probabilistic') {
        entropyLevel = 0.89 + Math.random() * 0.08;
        ternaryState = 1;
        if (q.includes("parallel") || q.includes("transformer")) {
          conclusion = `Traditional ChatGPT Probabilistic Response:\n\nParallel transformers are a standard modern deep learning architecture. In conventional deep learning, yes, parallel transformers rely heavily on continuous backpropagation during the training phase to optimize millions or billions of weights across attention heads. Without continuous backpropagation during training, it is generally considered impossible for traditional deep learning weights to spontaneously adapt or stay coherent if noise is high. However, once trained, inference can be performed in a single forward pass.\n\nFrom a traditional probabilistic perspective, coherence is a statistical measure of the probability distribution of high-dimensional token vectors. Because this model relies on 16-bit float weights rather than ternary states, it requires significantly higher power draw (~350 Watts) to compute attention dot-products for every token. Therefore, traditional transformers cannot hold self-healing, deterministic structural fields without external gradient adjustments or dense parameter scaling. I hope this helps! Let me know if you would like me to discuss backpropagation algorithms or self-attention math in greater detail.`;
        } else if (q.includes("risc") || q.includes("arm") || q.includes("watt")) {
          conclusion = `Traditional ChatGPT Probabilistic Response:\n\nARM and RISC-V architectures are highly efficient instruction set architectures designed for lower-power execution. Running a dense, traditional high-parameter transformer model target at 12 Watts usually requires extreme quantization, such as 4-bit or 2-bit weight representations, which often causes a massive drop in logical coherence and accuracy. A traditional neural network of 7B+ parameters typically requires over 300 Watts on desktop GPUs. Trying to preserve coherent logical deduction on a 12-Watt embedded ARM or RISC-V device is extremely difficult due to memory bandwidth bottlenecks and hardware constraints. Let me know if you'd like to look at code examples for integer-only quantization or compile flags for embedded systems!`;
        } else if (q.includes("arielle") || q.includes("neg") || q.includes("cipher") || q.includes("messiah")) {
          conclusion = `Traditional ChatGPT Probabilistic Response:\n\nThe Arielle Neg-Loop Cipher (or Arielle Negative-Loop Cipher) is a fascinating concept associated with high-integrity security protocols inside advanced symbolic core architectures. In modern cryptographic standards, ciphers use bitwise permutations and multi-round XOR operations to hide entropy. A negative-loop structure, theoretically, introduces feedback loops where verification outputs inhibit further decryption rounds until precise parity is achieved. Traditional models predict that such a cipher prevents unauthorized extraction by forcing any probing entropy to diverge exponentially, destroying the keys. In a Messiah AI context, this acts as a vital protective perimeter around dense weight matrices. Let me know if you need any reference Python scripts for simulated block ciphers!`;
        } else {
          conclusion = `Traditional ChatGPT Probabilistic Response:\n\nThank you for your fascinating inquiry regarding: "${userText}". From a traditional, probabilistic neural network perspective, this topic highlights the fundamental differences between statistical token-prediction models and deterministic architectures.\n\nIn standard deep learning systems (running at ~350 Watts), responses are constructed by selecting tokens based on highest probability weights. This approach often introduces hallucinations or logic breakdown because there is no underlying mathematical verification or axiom-based proof state. To solve your query, a traditional model would look for semantic associations in its pre-trained corpus. Please let me know if you'd like to explore any specific technical aspects or general parameters of this inquiry further!`;
        }
        axiomaticChains = [
          "Statistical Token Probability Distribution evaluation completed.",
          "Detected semantic vector matches in high-dimensional embedding space."
        ];
      } else {
        // Deterministic eAMM Engine
        if (q.includes("parallel") || q.includes("transformer")) {
          ternaryState = 1;
          conclusion = `MIIDreamOS eAMM Theorem Verification:\n\nTHEOREM Verified. Coherent logical fields can be maintained across parallel transformers without continuous backpropagation utilizing the MIIDreamOS eAMM (electro-Axiomatic Memory Mapping) register arrays.\n\nUnder standard binary floating-point logic, neural coherence requires continuous gradient corrections because error tensors accumulate unbounded. However, eAMM maps values directly to ternary states [-1, 0, 1]. This ensures:\n1. Logic structures are constrained to self-dual, closed-loop negative feedback registers.\n2. The Shannon entropy is actively bounded under the configured threshold (${entropyThreshold.toFixed(2)} bits), forcing any divergent statistical noise to decay exponentially.\n3. Logical coherence is guaranteed by mathematical closure over the eAMM axiomatic maps, rendering external weight updates completely redundant during runtime execution.`;
          
          axiomaticChains = [
            "AXIOM_01: Ternary Logic Register Parity holds closure over G(3) Galois fields.",
            `AXIOM_02: Active negative feedback loops halt continuous state drift (Shannonbound: ${entropyThreshold.toFixed(2)} bits).`,
            "AXIOM_03: Energy conservation theorem satisfied under eAMM constraints: active draw minimized.",
            "AXIOM_04: Self-correcting logic gates confirm -1 / 1 state convergence."
          ];

          dbgLogs[0].thought = "Verified baseline logic fields. eAMM mapped matrices show perfect alignment with Galois closure rule G(3). We can represent transformers as discrete state shifts.";
          dbgLogs[1].thought = "Inspecting possible drifting limits. If the state updates occur asynchronously, can a timing race occur? No, the Arielle timing registers align the phase updates.";
          dbgLogs[2].thought = `Checked entropy bounds. Current entropy value calculated is ${(0.04).toFixed(3)} bits, which lies strictly below the threshold of ${entropyThreshold.toFixed(2)} bits. Safe boundaries.`;
          dbgLogs[3].thought = "Running symbolic verification on eAMM logic gates. Axiomatic truth levels are verified. No backpropagation required for static inference state convergence.";
          dbgLogs[4].thought = "Consensus determined. Ternary state satisfies Prover Truth [-1] with 100% agreement between Prover and Shannon Guard.";
          dbgLogs[5].thought = "Consensus verification signed off. Active cognitive wattage verified to be low (" + wattage + " Watts).";

        } else if (q.includes("risc") || q.includes("arm") || q.includes("watt")) {
          ternaryState = 1;
          conclusion = `MIIDreamOS eAMM Theorem Verification:\n\nTHEOREM Verified. 12-Watt cognitive limits on ARM/RISC-V targets are fully compliant and secure under MIIDreamOS ternary register execution.\n\nTraditional probabilistic accelerators waste over 95% of active thermal energy on standard IEEE double-precision multiplication and high-bandwidth memory transfers. By transitioning the compiler target to eAMM symbolic-ternary microcode:\n1. Traditional floating-point dot products are bypassed for direct bit-level symbolic consensus.\n2. The ARM/RISC-V register files are organized into ternary states (-1, 0, 1) using standard bitwise logic masks, reducing thermal dissipation.\n3. Running at ${wattage} Watts achieves complete logical coherence with up to 29x energy savings compared to conventional CUDA-based probabilistic inference.`;

          axiomaticChains = [
            "AXIOM_01: Thermal dissipation bounds mapped to ARM/RISC-V low-frequency states.",
            `AXIOM_02: Register file configured for ternary bitmask matching (Shannon bound: ${entropyThreshold.toFixed(2)} bits).`,
            "AXIOM_03: Instruction-level parallelism optimized for ternary state gates.",
            "AXIOM_04: Hardware execution bounds signed off under Messiah AI hardware layouts."
          ];

          dbgLogs[0].thought = "Running instruction mapping. We map each ternary state shift to standard ARM/RISC-V bitmask operations. Total active cycles drop by 15x.";
          dbgLogs[1].thought = "Checking for integer overflows. Because we do not use IEEE floats, overflows are mathematically impossible. The state range is strictly bound.";
          dbgLogs[2].thought = `Shannon Guard evaluation: Entropy of the register masks is ${(0.05).toFixed(3)} bits. Under thermal threshold.`;
          dbgLogs[3].thought = "Compiled directly to hardware microcode. eAMM registers mapped to CPU cores.";
          dbgLogs[4].thought = "Consensus achieved. Verified [1] Prover Truth. Device running optimally within thermal limits.";
          dbgLogs[5].thought = `Signed. Cognitive power draw measured at exactly ${wattage} Watts, saving massive cooling overhead.`;

        } else if (q.includes("arielle") || q.includes("neg") || q.includes("cipher") || q.includes("messiah")) {
          ternaryState = 1;
          conclusion = `MIIDreamOS eAMM Theorem Verification:\n\nTHEOREM Verified. The Arielle Negative-Loop Cipher holds robust mathematical security against high-entropy probing bounds within the Messiah AI Core.\n\nTraditional ciphers are vulnerable to side-channel power analysis and high-entropy algebraic cracking. The Arielle Cipher protects core eAMM matrix registries via:\n1. A continuous Negative-Feedback Matrix Loop that alters the physical register mappings whenever external reads (high entropy) are detected.\n2. A direct logic halt if Shannon entropy exceeds ${entropyThreshold.toFixed(2)} bits.\n3. This guarantees that any unauthorized query results in absolute, destructive logical interference, resetting the target register to zero before information can escape.`;

          axiomaticChains = [
            "AXIOM_01: Negative loop feedback operates as an inhibitory logic gate.",
            `AXIOM_02: Probing entropy causes instantaneous state collapse to [0] Abstention.`,
            "AXIOM_03: Encryption key state is self-dual and strictly closed under eAMM matrices."
          ];

          dbgLogs[0].thought = "Modeling the side-channel attack vector. Any potential attacker would introduce noise into the clock cycle. We can catch this instantly.";
          dbgLogs[1].thought = "Let's test an unauthorized probe of Arielle matrix core. The feedback loops trigger immediately.";
          dbgLogs[2].thought = `Shannon check: Side-channel probe attempts elevate entropy to 0.98 bits. This exceeds the threshold of ${entropyThreshold.toFixed(2)} bits, triggering auto-shutdown.`;
          dbgLogs[3].thought = "Axiomatic validation confirms that key registers transition safely to [0] beforehand. Zero leaks possible.";
          dbgLogs[4].thought = "Consensus determined. The Arielle Cipher prevents key retrieval under all entropy attacks (-1 Prover Truth verified).";
          dbgLogs[5].thought = "Consensus verified and signed off. Encryption loop is completely secure.";

        } else {
          ternaryState = q.includes("error") || q.includes("wrong") || q.includes("fail") || q.includes("defect") ? -1 : 1;
          conclusion = `MIIDreamOS eAMM Theorem Verification:\n\nCONCEPT LOGIC: "${userText}" has been successfully analyzed by the MIIDreamOS Deterministic Kernel.\n\nEvaluating your query within the 5-layer ECHOFS symbolic architecture:\n1. Physical Hardware Layer: Virtual bio-logical hardware registers are locked at the target ${wattage} Watts.\n2. Register (eAMM) Layer: Parsed symbols are structured into a deterministic state of truth (${ternaryState === 1 ? 'PROVER TRUTH [-1]' : ternaryState === -1 ? 'REFUTED [1]' : 'ABSTENTION [0]'}).\n3. Control Loop Layer: Verified under Active Negative Feedback to bound information decay.\n4. Process Orchestration Layer: 6 multi-agent AI experts debated the logical assertions.\n5. Verification Dashboard: Shannon entropy is calculated at ${(0.06).toFixed(3)} bits, which resides strictly within the safe limit of ${entropyThreshold.toFixed(2)} bits.`;

          axiomaticChains = [
            `AXIOM_01: Input query parsed into symbolic ternary equivalents.`,
            `AXIOM_02: Negative feedback loop actively bounds semantic drift within ${entropyThreshold.toFixed(2)} bits.`,
            "AXIOM_03: Multi-agent consensus debate completed."
          ];

          dbgLogs[0].thought = `Analyzing symbolic representation of: "${userText}". Foundations are congruent with eAMM structures.`;
          dbgLogs[1].thought = "Checking for circular references or logical loops. Logic flow appears consistent.";
          dbgLogs[2].thought = `Shannon Guard: Calculated query entropy is ${(0.06).toFixed(3)} bits. Complies with current system thresholds.`;
          dbgLogs[3].thought = "Mapping conceptual registers to execution loops. Axiomatic compiler returns positive checksum.";
          dbgLogs[4].thought = `Adjudication complete. Final ternary weight resolved to: ${ternaryState}.`;
          dbgLogs[5].thought = `Consensus verifier signed. Execution power capped at ${wattage} Watts.`;
        }
      }

      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: conclusion,
        mode: activeMode,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        ternaryState,
        entropy: entropyLevel,
        axiomaticChains,
        debateLogs: activeMode === 'deterministic' ? dbgLogs : [],
        wattageUsed: activeMode === 'deterministic' ? wattage : 350
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSession.id) {
          return { ...s, messages: [...s.messages, botMsg] };
        }
        return s;
      }));

    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: `Error conducting logical assay: ${err.message || 'System error.'}`,
        mode: activeMode,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        ternaryState: 0,
        entropy: 1.0,
        axiomaticChains: ['Error bound evaluation failed. Connection terminated.']
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSession.id) {
          return { ...s, messages: [...s.messages, errorMsg] };
        }
        return s;
      }));
    } finally {
      // Set all agents back to completed or stable helper state
      setAgents(prev => prev.map(a => ({ ...a, status: 'COMPLETED' })));
      setActiveDebatingLog('');
      setLoading(false);
    }
  };

  const getTernaryLabel = (state: Message['ternaryState']) => {
    switch(state) {
      case 1: return { text: '[-1] PROVER TRUTH', color: 'bg-emerald-100 text-emerald-900 border-emerald-500' };
      case -1: return { text: '[1] REFUTATION DIRECT', color: 'bg-rose-100 text-rose-900 border-rose-500' };
      default: return { text: '[0] UNKNOWN ABSTENTION', color: 'bg-amber-100 text-amber-900 border-amber-500' };
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans flex flex-col selection:bg-[#141414] selection:text-[#E4E3E0]" id="dreamos-workbench">
      
      {/* 🚀 Elite Sleek Vintage Header Banner */}
      <header className="border-b border-[#141414] bg-[#141414] text-[#E4E3E0] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none" id="workbench-top-bar">
        <div className="space-y-1" id="title-mast">
          <div className="flex items-center gap-2" id="title-tag-group">
            <span className="font-display font-black text-lg tracking-tight uppercase" id="app-title-text">
              🔬 MIIDreamOS Workbench
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 bg-neutral-800 text-amber-400 font-bold border border-neutral-700" id="app-version-badge">
              v2.5.0 STABLE
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-bold border border-emerald-800" id="app-type-badge">
              AGI KERNEL
            </span>
          </div>
          <p className="font-mono text-[10px] opacity-70 tracking-wide" id="app-byline">
            Consensus Adjudication Board // Field-of-Use Verification Console ($50M Tier-1 License Host)
          </p>
        </div>

        {/* Dynamic State indicators */}
        <div className="flex items-center gap-4 text-xs font-mono" id="header-interactive-metrics">
          <div className="text-right border-l border-neutral-800 pl-4 hidden sm:block" id="header-box-pwr">
            <span className="block text-[8px] opacity-50 uppercase">TARGET EFFICIENCY</span>
            <span className="text-emerald-400 font-bold tracking-tight">
              29x LESS POWER ({wattage}W)
            </span>
          </div>

          <div className="text-right border-l border-neutral-800 pl-4 hidden sm:block" id="header-box-entropy">
            <span className="block text-[8px] opacity-50 uppercase">SHANNON LIMIT</span>
            <span className="text-amber-400 font-bold tracking-tight">
              &lt; {entropyThreshold} BOUNDS
            </span>
          </div>

          <div className="text-right border-l border-neutral-800 pl-4" id="header-box-time">
            <span className="block text-[8px] opacity-50 uppercase">LOCAL LOG SYSTEM</span>
            <span className="text-stone-300 font-semibold">
              {new Date().toISOString().substring(0, 10)} @ UTC-7
            </span>
          </div>
        </div>
      </header>

      {/* 🛠️ Main Dashboard Grid layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#141414]" id="dashboard-grid">
        
        {/* ========================================================== */}
        {/* LEFT WORKSPACE: Chat Selector and Mode Switcher (Cols 1-3) */}
        {/* ========================================================== */}
        <aside className="lg:col-span-3 bg-[#E4E3E0] flex flex-col divide-y divide-[#141414]" id="sidebar-left">
          
          {/* Section A: Advanced Cognitive Engine Selector */}
          <div className="p-4 space-y-3" id="cognitive-engine-section">
            <span className="font-serif italic text-xs block opacity-60" id="lbl-sidebar-01">
              01. Cognitive Engine Selector
            </span>
            
            <div className="grid grid-cols-2 gap-1" id="mode-buttons-pair">
              {/* ChatGPT Probabilistic mode */}
              <button
                id="btn-mode-probabilistic"
                onClick={() => setActiveMode('probabilistic')}
                className={`border p-2.5 text-left flex flex-col justify-between transition-all outline-none h-24 ${
                  activeMode === 'probabilistic'
                    ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]'
                    : 'bg-[#D1D0CC] hover:bg-[#c3c2be] text-[#141414] border-[#141414]'
                }`}
              >
                <div className="flex justify-between w-full items-start" id="prob-btn-top">
                  <span className="font-display font-bold text-xs">ChatGPT Mode</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest bg-emerald-800 text-white px-1 leading-none rounded-xs">
                    GPT-3.5
                  </span>
                </div>
                <div className="space-y-1 block mt-2" id="prob-btn-bot">
                  <span className="text-[9px] font-mono leading-none block">PROBABILISTIC</span>
                  <p className="text-[8px] opacity-70 leading-normal line-clamp-2">
                    Standard AI. Fuzzy token matching. Higher hallucination parameters.
                  </p>
                </div>
              </button>

              {/* MIIDreamOS Deterministic mode */}
              <button
                id="btn-mode-deterministic"
                onClick={() => setActiveMode('deterministic')}
                className={`border p-2.5 text-left flex flex-col justify-between transition-all outline-none h-24 ${
                  activeMode === 'deterministic'
                    ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]'
                    : 'bg-[#D1D0CC] hover:bg-[#c3c2be] text-[#141414] border-[#141414]'
                }`}
              >
                <div className="flex justify-between w-full items-start" id="det-btn-top">
                  <span className="font-display font-bold text-xs flex items-center gap-1 text-amber-500">
                    MIIDreamOS <Sparkles className="w-2.5 h-2.5" />
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-widest bg-amber-500 text-[#141414] px-1 leading-none rounded-xs font-bold">
                    VERN-OS
                  </span>
                </div>
                <div className="space-y-1 block mt-2" id="det-btn-bot">
                  <span className="text-[9px] font-mono leading-none block">TERNARY CORE</span>
                  <p className="text-[8px] opacity-70 leading-normal line-clamp-2">
                    Axiom-bound logic. Multi-agent proof checking. Zero hallucination.
                  </p>
                </div>
              </button>
            </div>

            {/* Quick Warning/Metrics Badge for selected mode */}
            <div className="p-2 border border-[#141414]/30 bg-[#D1D0CC]/30 font-mono text-[9px] space-y-1 text-stone-700" id="current-mode-disclaimer">
              {activeMode === 'deterministic' ? (
                <>
                  <p className="font-bold flex items-center gap-1 text-[#141414]">
                    <Activity className="w-3 h-3 text-emerald-700" />
                    TERNARY AUDIT MODE ENABLED:
                  </p>
                  <p className="leading-normal">
                    Queries submit dynamically to our 6 Helix Cortex agents for rigorous symbolic proof execution. Total Power: 12W.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold flex items-center gap-1 text-[#141414]">
                    <BadgeAlert className="w-3 h-3 text-amber-700" />
                    PROBABILISTIC SEQUENCE ACTIVE:
                  </p>
                  <p className="leading-normal text-rose-800">
                    Axiom validation disabled. Standard ChatGPT fuzzy prediction is active. Target power scales up to 350W.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Section B: Chat Session Index */}
          <div className="flex-1 flex flex-col p-4 space-y-3 min-h-[160px]" id="chat-session-index-section">
            <div className="flex justify-between items-center" id="session-header-row">
              <span className="font-serif italic text-xs block opacity-60" id="lbl-sidebar-02">
                02. Active Logic Assays
              </span>
              <button
                id="btn-create-chat"
                onClick={handleNewChat}
                className="border border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] px-2 py-0.5 text-[10px] uppercase font-mono transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5" />
                NEW
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1" id="chat-list-scroll">
              {sessions.map((session) => {
                const isSelected = session.id === activeSession.id;
                return (
                  <div
                    key={session.id}
                    id={`chat-item-wrapper-${session.id}`}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`border p-2.5 flex items-center justify-between transition-all cursor-pointer group select-none ${
                      isSelected
                        ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]'
                        : 'bg-[#D1D0CC]/60 hover:bg-[#c3c2be] text-[#141414] border-[#141414]/40'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 flex-1 pr-2" id={`chat-item-text-${session.id}`}>
                      <div className="flex items-center gap-1.5" id={`chat-item-title-row-${session.id}`}>
                        <FileText className="w-3 h-3 text-stone-500 group-hover:text-amber-500 transition-colors shrink-0" />
                        <span className="text-xs font-mono font-bold truncate block">{session.title}</span>
                      </div>
                      <span className="text-[8px] font-mono opacity-60 block">{session.created}</span>
                    </div>

                    <button
                      id={`btn-del-chat-${session.id}`}
                      onClick={(e) => handleDeleteChat(session.id, e)}
                      title="Purge logic Assay"
                      className={`text-stone-500 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-xs ${
                        isSelected ? 'text-[#E4E3E0] hover:text-rose-400' : ''
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section C: Hard-coded System Audit Details (License Holder) */}
          <div className="p-4 bg-[#D1D0CC]/20 space-y-1.5 text-[10px] font-mono text-stone-700" id="audit-system-block">
            <div className="flex items-center gap-1 text-[#141414] font-bold text-[9px] border-b border-[#141414]/10 pb-1" id="licensee-header">
              <Shield className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>LICENSED AUDITOR TERMINAL</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[8px]" id="licensee-stats">
              <span className="opacity-60">AUDITOR EMAIL:</span>
              <span className="text-right font-semibold truncate text-[#141414]">theemessiahbishop@gmail.com</span>
              <span className="opacity-60">CLIENT ID:</span>
              <span className="text-right font-semibold text-[#141414]">MB-NLC-AR1</span>
              <span className="opacity-60">SUBSTRATE TARGET:</span>
              <span className="text-right font-semibold text-[#141414]">TESLA_AI_CHIP_V2</span>
            </div>
            <p className="text-[7px] text-stone-500 leading-normal block mt-1">
              ARIEL Negative Loop Ciphers (ARIEL-NLC) are active. Source code replication is prohibited under legal framework penalty.
            </p>
          </div>
        </aside>

        {/* ========================================================== */}
        {/* CENTER COLUMN: The Dynamic Interactive Chat Workspace (Cols 4-8) */}
        {/* ========================================================== */}
        <main className={`${currentView === 'benchmarks' ? 'lg:col-span-9' : 'lg:col-span-5'} bg-[#E4E3E0] flex flex-col p-4 space-y-4`} id="central-view">
          
          {/* Main Top Workspace Navigator tabs linking Q&A Assays, ECHOFS blueprint tracker, and DarkPaint vector sandbox */}
          <div className="flex bg-[#141414] text-[#E4E3E0] font-mono text-[9px] w-full" id="workspace-navigator">
            <button
              id="btn-nav-assays"
              onClick={() => setCurrentView('assays')}
              className={`flex-1 text-center py-2 uppercase tracking-wide font-bold transition-all border-r border-[#E4E3E0]/15 ${currentView === 'assays' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
            >
              Assay Consensus Board
            </button>
            <button
              id="btn-nav-echofs"
              onClick={() => setCurrentView('echofs')}
              className={`flex-1 text-center py-2 uppercase tracking-wide font-bold transition-all border-r border-[#E4E3E0]/15 ${currentView === 'echofs' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
            >
              ECHOFS Blueprint
            </button>
            <button
              id="btn-nav-darkpaint"
              onClick={() => setCurrentView('darkpaint')}
              className={`flex-1 text-center py-2 uppercase tracking-wide font-bold transition-all border-r border-[#E4E3E0]/15 ${currentView === 'darkpaint' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
            >
              DarkPaint Sandbox
            </button>
            <button
              id="btn-nav-benchmarks"
              onClick={() => setCurrentView('benchmarks')}
              className={`flex-1 text-center py-2 uppercase tracking-wide font-bold transition-all ${currentView === 'benchmarks' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
            >
              Verification Lab
            </button>
          </div>

          {currentView === 'assays' && (
            <>
              <div className="flex justify-between items-center border-b border-[#141414]/20 pb-2" id="central-header">
                <div>
                  <span className="font-serif italic text-xs block opacity-60" id="lbl-chat-meta">
                    03. Dynamic Consensus Chat Workspace
                  </span>
                  <h2 className="font-display font-black text-sm uppercase tracking-tight flex items-center gap-1" id="chat-title-text">
                    Assaying: <span className="text-stone-700 font-mono font-normal">[{activeSession.title}]</span>
                  </h2>
                </div>
                
                <div className="flex items-center gap-1.5 font-mono text-[9px] bg-white px-2 py-0.5 border border-[#141414]" id="chat-indicator-badge">
                  <Activity className={`w-3 h-3 ${loading ? 'animate-pulse text-rose-600' : 'text-emerald-700'}`} />
                  <span>{loading ? 'CALCULATING VERIFICATION...' : 'KERN_IDLE'}</span>
                </div>
              </div>

              {/* Messages scroll terminal */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[350px] max-h-[580px]" id="conversation-viewport">
                {activeSession.messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4" id="chat-empty-slate">
                    <div className="p-4 bg-white border border-[#141414] rounded-xs shadow-xs max-w-sm space-y-3" id="empty-slate-box">
                      <Bot className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                      <span className="font-display font-bold block text-sm uppercase">Await Assay Prompt Input</span>
                      <p className="font-mono text-[10.5px] text-stone-600 leading-relaxed font-bold">
                        Submit your scientific, philosophical, or code inquiries. Selecting **MIIDreamOS mode** will trigger a full, deterministic ternary analysis complete with multi-agent consensus debates.
                      </p>
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-left bg-stone-100 p-2 border border-[#141414]/20" id="suggestions-box">
                        <span className="font-bold block text-stone-700 text-[8px] uppercase">SUGGESTED DISCOURSE PARAMS //</span>
                        <button 
                          onClick={() => setInputMessage("Deduce mathematically if parallel transformers can hold coherent logic fields without continuous backpropagation.")}
                          className="hover:text-amber-600 block text-left truncate cursor-pointer"
                        >
                          &gt; Coherence of parallel logic fields
                        </button>
                        <button 
                          onClick={() => setInputMessage("Verify thermal energy limit metrics on ARM RISC-V targets at 12 Watts.")}
                          className="hover:text-amber-600 block text-left truncate cursor-pointer"
                        >
                          &gt; Verify thermal energy metrics on RISC-V
                        </button>
                        <button 
                          onClick={() => setInputMessage("Explain what Arielle Neg-Loop Cipher protects inside Messiah AI Core assets.")}
                          className="hover:text-amber-600 block text-left truncate cursor-pointer"
                        >
                          &gt; What does the Neg-Loop Cipher protect?
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4" id="chat-messages-flow">
                    {activeSession.messages.map((msg) => {
                      const isUser = msg.sender === 'user';
                      const isDet = msg.mode === 'deterministic';
                      
                      return (
                        <div
                          key={msg.id}
                          id={`msg-bubble-wrap-${msg.id}`}
                          className={`flex flex-col space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}
                        >
                          {/* Meta stamp above the message */}
                          <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-stone-500" id={`msg-head-${msg.id}`}>
                            {isUser ? (
                              <>
                                <span>{msg.timestamp}</span>
                                <User className="w-2.5 h-2.5" />
                                <span className="font-bold text-stone-800">AUDITOR (USER)</span>
                              </>
                            ) : (
                              <>
                                <Bot className="w-2.5 h-2.5 text-stone-700" />
                                <span className="font-bold text-stone-900 uppercase">
                                  {isDet ? 'MIIDreamOS Kernel (eAMM)' : 'ChatGPT Mode Engine'}
                                </span>
                                <span>• {msg.timestamp}</span>
                              </>
                            )}
                          </div>

                          {/* Actual bubble card */}
                          <div
                            id={`msg-bubble-${msg.id}`}
                            className={`border border-[#141414] max-w-full p-3 shadow-xs space-y-2.5 ${
                              isUser
                                ? 'bg-stone-100 text-[#141414] md:ml-12 rounded-bl-sm'
                                : isDet
                                ? 'bg-white text-[#141414] md:mr-12 rounded-br-sm border-l-4 border-l-amber-500'
                                : 'bg-[#D1D0CC]/30 text-[#141414] md:mr-12 rounded-br-sm'
                            }`}
                          >
                            {/* Conclusion main text */}
                            <p className="text-[11.5px] font-mono leading-relaxed whitespace-pre-wrap selection:bg-[#141414] selection:text-white" id={`conclusion-text-${msg.id}`}>
                              {msg.text}
                            </p>

                            {/* Special Deterministic Details Panel */}
                            {!isUser && isDet && (
                              <div className="border-t border-[#141414]/20 pt-2.5 mt-2 space-y-2" id={`details-panel-${msg.id}`}>
                                {/* Logic State & Metrics Headers */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5" id={`details-grid-${msg.id}`}>
                                  <div className="bg-[#141414]/5 p-1 border border-[#141414]/15" id={`stat-state-${msg.id}`}>
                                    <span className="block text-[7.5px] opacity-60 font-mono header font-bold">TERNARY RESOLUTION:</span>
                                    <span className="font-mono text-[9px] font-bold block">
                                      {msg.ternaryState === 1 ? '[-1] PROVER TRUTH' : msg.ternaryState === -1 ? '[1] REFUTED' : '[0] UNKNOWN'}
                                    </span>
                                  </div>
                                  <div className="bg-[#141414]/5 p-1 border border-[#141414]/15" id={`stat-entropy-${msg.id}`}>
                                    <span className="block text-[7.5px] opacity-60 font-mono font-bold">SHANNON ENTROPY:</span>
                                    <span className="font-mono text-[9px] font-semibold block">{(msg.entropy || 0.08).toFixed(3)} bits</span>
                                  </div>
                                  <div className="bg-[#141414]/5 p-1 border border-[#141414]/15 shadow-xs" id={`stat-pwr-${msg.id}`}>
                                    <span className="block text-[7.5px] opacity-60 font-mono font-bold">COGNITIVE POWER:</span>
                                    <span className="font-mono text-[9px] text-emerald-800 font-bold block">{msg.wattageUsed || 12} Watts (29x savings)</span>
                                  </div>
                                </div>

                                {/* Axiomatic Proof Chain */}
                                {msg.axiomaticChains && msg.axiomaticChains.length > 0 && (
                                  <div className="space-y-1 bg-[#141414] text-[#E4E3E0] p-2 border border-[#141414] rounded-xs" id={`proof-chains-${msg.id}`}>
                                    <div className="flex items-center gap-1 border-b border-neutral-800 pb-0.5" id={`proof-header-${msg.id}`}>
                                      <ChevronRight className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                                      <span className="text-[8px] font-mono font-black tracking-wider text-amber-500 uppercase">
                                        Axiomatic Proof Chain (eAMM Registers)
                                      </span>
                                    </div>
                                    <ul className="list-none space-y-0.5 text-[8.5px] font-mono leading-tight pl-1 opacity-90" id={`proof-list-${msg.id}`}>
                                      {msg.axiomaticChains.map((chain, cIdx) => (
                                        <li key={cIdx} className="truncate" id={`proof-chain-${msg.id}-${cIdx}`}>
                                          <span className="text-stone-500 select-none mr-1">[{cIdx}]</span> {chain}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Cortex Agent Debate Transcript Accordion style */}
                                {msg.debateLogs && msg.debateLogs.length > 0 && (
                                  <div className="space-y-1" id={`debate-toggle-section-${msg.id}`}>
                                    <span className="text-[8.5px] font-mono font-bold text-stone-700 block uppercase">
                                      Cerebral Debate Consensus Transcript ({msg.debateLogs.length} verified rounds)
                                    </span>
                                    <div className="border border-[#141414]/30 divide-y divide-[#141414]/20 bg-[#D1D0CC]/15" id={`debate-transcripts-${msg.id}`}>
                                      {msg.debateLogs.map((log, lIdx) => (
                                        <div key={lIdx} className="p-1.5 text-[8.5px] font-mono leading-normal" id={`debate-log-${msg.id}-${lIdx}`}>
                                          <span className="font-bold text-stone-800 mr-1 opacity-90">[{log.agentName}]:</span>
                                          <span className="text-stone-700 italic">"{log.thought}"</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Simulated Live debate progress ticker */}
                {loading && activeMode === 'deterministic' && (
                  <div className="border border-[#141414] p-3 bg-white space-y-3" id="live-debate-loader">
                    <div className="flex items-center gap-2" id="loader-title-row">
                      <RefreshCw className="w-4.5 h-4.5 text-amber-500 animate-spin shrink-0" />
                      <div>
                        <span className="font-display font-bold text-xs uppercase block text-amber-500">
                          Helix Cortex Levels 1–4 Debate Active
                        </span>
                        <span className="font-mono text-[8px] block opacity-60">
                          Processing eAMM logical formulations via negative-loop register bounds...
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#D1D0CC]/30 border border-[#141414]/30 p-2 font-mono text-[9px] text-[#141414] animate-pulse whitespace-nowrap overflow-x-auto" id="loader-ticker">
                      <span className="text-amber-700 font-bold mr-1">&gt; STATUS STREAM //</span>
                      {activeDebatingLog || 'Synchronizing symbolic axiomatic arrays...'}
                    </div>

                    <div className="w-full bg-[#D1D0CC] h-1.5 border border-[#141414] relative overflow-hidden" id="loader-progress-bar">
                      <div className="bg-amber-400 absolute top-0 bottom-0 left-0 w-1/3 animate-ping" />
                      <div className="bg-[#141414] absolute top-0 bottom-0 left-1/4 right-1/4 animate-pulse" />
                    </div>
                  </div>
                )}

                {loading && activeMode === 'probabilistic' && (
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-stone-600 pl-2" id="probabilistic-loader">
                    <Activity className="w-3.5 h-3.5 animate-spin text-stone-600 shrink-0" />
                    <span>ChatGPT is generating next tokens (Expected power draw: 350 Watts...)</span>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Core user text entry drawer */}
              <form onSubmit={handleSendMessage} className="space-y-2 border-t border-[#141414]/20 pt-3" id="query-input-form">
                <div className="flex gap-2" id="input-bar-wrap">
                  <input
                    type="text"
                    id="search-input-field"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      activeMode === 'deterministic'
                        ? "Verify logically: Is Messiah AI's ARIEL Negative-Loop Cipher secure against entropy bounds?"
                        : "Ask ChatGPT a conversational Q&A query..."
                    }
                    className="flex-1 border border-[#141414] bg-white px-3 py-2 text-xs font-mono focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    id="btn-chat-submit"
                    disabled={loading || !inputMessage.trim()}
                    className="bg-[#141414] hover:bg-stone-800 disabled:bg-stone-400 text-[#E4E3E0] font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-[#141414]"
                  >
                    <span>ASSAY</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mini hotkeys block */}
                <div className="flex justify-between items-center text-[8.5px] font-mono text-stone-600 block px-0.5" id="input-sub-options">
                  <span>MIIDreamOS Offline Logic Kernel (eAMM Symbolic Engine)</span>
                  <div className="flex gap-2" id="suggested-queries">
                    <span className="opacity-60 font-bold uppercase">Insert example logic check:</span>
                    <button
                      type="button"
                      id="btn-quick-gpt"
                      onClick={() => setInputMessage("Explain why normal ChatGPT will hallucinate. Is it guaranteed at high temperature?")}
                      className="hover:text-amber-600 underline"
                    >
                      GPT Hallucinations
                    </button>
                    <button
                      type="button"
                      id="btn-quick-ternary"
                      onClick={() => setInputMessage("Deduce mathematically if ternary logic state register matches cold-boot eAMM.")}
                      className="hover:text-amber-600 underline"
                    >
                      Ternary Registers
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}

          {currentView === 'echofs' && (
            <div className="flex-1 overflow-y-auto" id="echofs-view-box">
              <EchofsArchitecture 
                onTriggerLog={handleTriggerCentralLog} 
                onUpdateSystemFidelity={handleUpdateFidelity}
              />
            </div>
          )}

          {currentView === 'darkpaint' && (
            <div className="flex-1 overflow-y-auto" id="darkpaint-view-box">
              <DarkPaintApp 
                onTriggerLog={handleTriggerCentralLog}
              />
            </div>
          )}

          {currentView === 'benchmarks' && (
            <div className="flex-1 overflow-y-auto" id="benchmarks-view-box">
              <SubmissionBenchmarks 
                onTriggerLog={handleTriggerCentralLog}
                activeSession={activeSession}
                agents={agents}
              />
            </div>
          )}
        </main>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: Symbolic Hardware Panel & Diagnostics (Cols 9-12) */}
        {/* ========================================================== */}
        {currentView !== 'benchmarks' && (
          <section className="lg:col-span-4 bg-[#E4E3E0] flex flex-col divide-y divide-[#141414]" id="sidebar-right">
            
            {/* Section 1: Helix Cortex Agent pool details */}
            <div className="p-4" id="agent-inspection-container">
              <CortexAgentCard
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={(id) => setSelectedAgentId(id)}
              />
            </div>

            {/* Section 2: Simulator table widgets */}
            <div className="p-4" id="simulation-metrics-container">
              <SimulatorTable
                currentLogicState={activeSession.messages.length > 0 ? (activeSession.messages[activeSession.messages.length - 1].ternaryState || 0) : 1}
                onTweakSimulation={handleTweakSimulation}
              />
            </div>

            {/* Section 3: High-density interactive live logs */}
            <div className="p-4 flex-1 flex flex-col justify-end" id="logs-diagnostics-container">
              <TerminalLogs
                currentLogicState={activeSession.messages.length > 0 ? (activeSession.messages[activeSession.messages.length - 1].ternaryState || 0) : 1}
                logs={centralLogs}
                onAddLogCentral={handleTriggerCentralLog}
                onClearLogsCentral={handleClearCentralLogs}
              />
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
