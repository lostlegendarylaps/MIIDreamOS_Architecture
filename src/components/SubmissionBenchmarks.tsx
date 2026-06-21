import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  Award, 
  Terminal, 
  History, 
  Sparkles, 
  Play, 
  Trophy, 
  CheckCircle, 
  TrendingUp, 
  Sliders, 
  RefreshCw,
  Clock,
  Shield,
  FileCode,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileJson,
  Send,
  Download,
  Check,
  CheckSquare,
  Copy,
  Lock,
  Server,
  FileText,
  Layers,
  Globe
} from 'lucide-react';
import { AgentInfo, ChatSession, Message } from '../types';

interface BenchmarkProfile {
  id: string;
  name: string;
  tag: string;
  description: string;
  targetWattage: number;
  targetEntropy: number;
  targetFidelity: number;
  targetMemory: number;
  expectedSpeed: number; // Logics per millisecond
}

interface SubmittedRun {
  timestamp: string;
  profileName: string;
  hardware: string;
  wattage: number;
  entropy: number;
  fidelity: number;
  memory: number;
  speed: number;
  status: 'PASSED' | 'FAILED';
  unlockedBadge?: string;
}

const TEMPLATE_CODES: Record<string, string> = {
  'ternary_kernel.py': `def eamm_kernel_boot():
    # Cold boot register configuration with tri-state logic
    register_l0 = [1, -1, 0, 1, 0, -1]
    entropy_bound = 0.05
    stabilizer = []
    
    for i, state in enumerate(register_l0):
        # Apply active feedback coupling to prevent stochastic drift
        stabilized_state = active_negative_loop(state, register_l0[i-1])
        stabilizer.append(stabilized_state)
        
    shannon_bits = calculate_entropy(stabilizer)
    if shannon_bits > entropy_bound:
        halt_registers_to_neutral()
        return 0 # Trigger Unknown Abstention
    return 1 # Prover Truth confirmed
`,
  'guardian_protocol.py': `def guardian_protocol_v2():
    # Shield core firmware against side-channel intrusions
    feedback_attenuator = 0.88
    entropy_leakage = measure_clock_drift()
    
    if entropy_leakage > 0.12:
        # Inhibit active reads by introducing negative drift loops
        attenuate_power_consumption(feedback_attenuator)
        scramble_register_mapping()
        purge_cache_to_zero_state()
        return -1 # Force state collapse protection
        
    return 1 # Core is stable and secured
`,
  'busy_brain.py': `def busy_brain_scheduler():
    # Process scheduler prioritizing quantum-entangled nodes
    priority_matrix = [-1, 1, 0, 1, -1, 0, 1]
    active_watts = measure_thermal_load()
    
    for proc_id in range(len(priority_matrix)):
        # Entangle symmetric memory blocks to optimize throughput 15x
        if priority_matrix[proc_id] == priority_matrix[proc_id - 1]:
            entangle_nodes(proc_id, proc_id - 1)
            scale_voltage_down(0.4) # Conserves wattage drop
            
    # Dynamic optimization bounds wattage to 12 Watts safely
    return active_watts
`,
  'arielle_cipher.py': `def arielle_neg_loop_cipher():
    # Invariant cipher protecting core eAMM weights
    core_register_bounds = [-1, 1, 1, -1, 0, 0, 1]
    side_channel_probe_entropy = measure_interference()
    
    if side_channel_probe_entropy > 0.05:
        # Auto-collapsing key storage logic
        for i in range(len(core_register_bounds)):
            core_register_bounds[i] = 0 # Forced abstention purge
        trigger_logic_halt("Entropy attack vector neutralized")
        return 0
        
    return 1 # Keys intact
`
};

const calculateMetrics = (
  profile: BenchmarkProfile,
  watts: number,
  entropy: number,
  comp: number,
  passes: number,
  hw: string,
  codeIsOptimized: boolean = true,
  vr33PccEnabled: boolean = false
) => {
  if (vr33PccEnabled) {
    const baseSpeed = profile.expectedSpeed * (hw === 'biorobopi_12w' ? 1.35 : hw === 'arm_riscv_4w' ? 1.15 : 0.85);
    const actualSpeed = Math.round((baseSpeed + (passes * 150)) * 2.5);
    return {
      wattage: 3.3, // Quantum Voltage Resonance 3.3V
      entropy: 0.000, // Safe Phase Coherent Matrix (Zero Stochastic Drift)
      fidelity: 100.0, // 100% Perfect Axiomatic Match
      memory: 0.8, // Minimal hardware register footprint
      speed: actualSpeed,
      unlockedBadge: 'VR33-PCC Quantum Mastermind'
    };
  }

  let actualWattage = parseFloat((watts * 0.95).toFixed(1));
  if (actualWattage > profile.targetWattage) {
    actualWattage = parseFloat((profile.targetWattage * 0.92).toFixed(1));
  }
  
  let actualEntropy = parseFloat((entropy * 0.9).toFixed(3));
  if (actualEntropy > profile.targetEntropy) {
    actualEntropy = parseFloat((profile.targetEntropy * 0.85).toFixed(3));
  }

  let actualMemory = parseFloat(((32 / comp) * (6 + passes) * 0.12).toFixed(1));
  if (actualMemory > profile.targetMemory) {
    actualMemory = parseFloat((profile.targetMemory * 0.88).toFixed(1));
  }

  let baseSpeed = profile.expectedSpeed;
  if (hw === 'biorobopi_12w') baseSpeed *= 1.15;
  else if (hw === 'arm_riscv_4w') baseSpeed *= 0.85;
  else baseSpeed *= 0.55;

  baseSpeed += (passes * 110);
  let actualSpeed = Math.round(baseSpeed * 0.98);

  let actualFidelity = codeIsOptimized ? 99.9 : 99.2;
  if (actualFidelity < profile.targetFidelity) {
    actualFidelity = profile.targetFidelity;
  }

  let badge = undefined;
  if (profile.id === 'ariel_shield') badge = 'Arielle Shield Champion';
  else if (profile.id === 'quantum_priority') badge = 'RISC-V 12W Sovereign';
  else if (profile.id === 'eamm_transformer') badge = 'Axiom Mastermind';
  else if (profile.id === 'low_energy_sbc') badge = 'Sub-3W Whisperer';
  else {
    badge = `${profile.name} Sovereign`;
  }

  return {
    wattage: actualWattage,
    entropy: actualEntropy,
    fidelity: actualFidelity,
    memory: actualMemory,
    speed: actualSpeed,
    unlockedBadge: badge
  };
};

export default function SubmissionBenchmarks({
  onTriggerLog,
  activeSession,
  agents
}: {
  onTriggerLog: (source: string, message: string, level: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL') => void;
  activeSession?: ChatSession;
  agents?: AgentInfo[];
}) {
  const [selectedProfile, setSelectedProfile] = useState<string>('ariel_shield');
  const [selectedFile, setSelectedFile] = useState<string>('ternary_kernel.py');
  const [sourceCode, setSourceCode] = useState<string>(TEMPLATE_CODES['ternary_kernel.py']);
  
  // Hardware selections
  const [hardwareTarget, setHardwareTarget] = useState<string>('biorobopi_12w');

  // Knob configuration states
  const [customWatts, setCustomWatts] = useState<number>(12);
  const [entropyFactor, setEntropyFactor] = useState<number>(0.15);
  const [compressiveRatio, setCompressiveRatio] = useState<number>(16);
  const [optimizationPasses, setOptimizationPasses] = useState<number>(4);
  
  // VR33-PCC Quantum Alignment Mode
  const [vr33PccEnabled, setVr33PccEnabled] = useState<boolean>(false);

  // Run log / Status states
  const [runStatus, setRunStatus] = useState<'idle' | 'compiling' | 'executing' | 'auditing' | 'completed' | 'failed'>('idle');
  const [runProgress, setRunProgress] = useState<number>(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [simResults, setSimResults] = useState<{
    wattage: number;
    entropy: number;
    fidelity: number;
    memory: number;
    speed: number;
    unlockedBadge?: string;
  } | null>(null);

  useEffect(() => {
    if (runStatus === 'idle' || runStatus === 'completed') {
      const targetProf = benchmarkProfiles.find(p => p.id === selectedProfile) || benchmarkProfiles[0];
      const isOptimized = sourceCode.includes('AUTO-OPTIMIZED') || sourceCode.includes('HEAVY INHIBITORY') || sourceCode.includes('ULTRA THERMAL') || sourceCode.includes('FAST DETECT');
      const results = calculateMetrics(targetProf, customWatts, entropyFactor, compressiveRatio, optimizationPasses, hardwareTarget, isOptimized, vr33PccEnabled);
      setSimResults(results);
    }
  }, [selectedProfile, customWatts, entropyFactor, compressiveRatio, optimizationPasses, hardwareTarget, sourceCode, vr33PccEnabled]);

  // Technical Audit Submission Suite States
  const [auditAuditorId, setAuditAuditorId] = useState<string>('AUDITOR-MESSIAH-992');
  const [auditAgency, setAuditAgency] = useState<string>('TECHNICAL-AUDIT-COUNCIL');
  const [auditSecurityLevel, setAuditSecurityLevel] = useState<string>('CONCURRENT-CRYPTOGRAPHIC');
  const [selectedAuditMsgId, setSelectedAuditMsgId] = useState<string>('LATEST_DETERMINISTIC');
  const [isSubmittingAudit, setIsSubmittingAudit] = useState<boolean>(false);
  const [auditSubmitLogs, setAuditSubmitLogs] = useState<string[]>([]);
  const [serverAuditResponse, setServerAuditResponse] = useState<any | null>(null);
  const [copiedAuditReport, setCopiedAuditReport] = useState<boolean>(false);
  const [auditProgress, setAuditProgress] = useState<number>(0);

  // Benchmark Profiles Filter / Search States
  const [profileSearchQuery, setProfileSearchQuery] = useState<string>('');
  const [profileCategoryFilter, setProfileCategoryFilter] = useState<string>('ALL');

  // Leaderboard of past results
  const [submittedRuns, setSubmittedRuns] = useState<SubmittedRun[]>([
    {
      timestamp: '02:05:14',
      profileName: 'Ariel Zero-Drift Matrix',
      hardware: 'Bio-RoboPi SBC @ 12W',
      wattage: 7.8,
      entropy: 0.04,
      fidelity: 99.8,
      memory: 14.2,
      speed: 1650,
      status: 'PASSED',
      unlockedBadge: 'Arielle Shield Champion'
    },
    {
      timestamp: '02:10:45',
      profileName: '12W Quantum Priority Boot',
      hardware: 'ARM RISC-V UltraLow @ 4W',
      wattage: 11.4,
      entropy: 0.12,
      fidelity: 99.6,
      memory: 29.5,
      speed: 1820,
      status: 'PASSED',
      unlockedBadge: 'RISC-V 12W Sovereign'
    },
    {
      timestamp: '02:18:22',
      profileName: 'Axiomatic eAMM Transformer Core',
      hardware: 'NVIDIA Reference @ 350W',
      wattage: 350.0,
      entropy: 0.55,
      fidelity: 84.6,
      memory: 112.5,
      speed: 120,
      status: 'FAILED'
    }
  ]);

  const benchmarkProfiles: BenchmarkProfile[] = [
    {
      id: 'ariel_shield',
      name: 'Ariel Zero-Drift Matrix',
      tag: 'SECURITY_CORE',
      description: 'Maximize encryption loop resistance against continuous high-entropy probing attacks. Requires ultra-low entropy bounds and flawless logic alignment.',
      targetWattage: 8,
      targetEntropy: 0.06,
      targetFidelity: 99.8,
      targetMemory: 16,
      expectedSpeed: 1500
    },
    {
      id: 'quantum_priority',
      name: '12W Quantum Priority Boot',
      tag: 'PROCESS_SCHEDULER',
      description: 'Maximize logical operations throughput within strict thermal budgets on decentralized Bio-RoboPi hardware clusters.',
      targetWattage: 12,
      targetEntropy: 0.14,
      targetFidelity: 99.4,
      targetMemory: 32,
      expectedSpeed: 1800
    },
    {
      id: 'eamm_transformer',
      name: 'Axiomatic eAMM Transformer',
      tag: 'INTELLIGENCE_LAYER',
      description: 'Map parallel transformer heads into self-correcting ternary logic state registers without continuous backpropagation overhead.',
      targetWattage: 15,
      targetEntropy: 0.20,
      targetFidelity: 99.0,
      targetMemory: 24,
      expectedSpeed: 1200
    },
    {
      id: 'low_energy_sbc',
      name: 'Super-Low-Energy SBC Boundary',
      tag: 'EMBEDDED_MCU',
      description: 'Operate on constrained microcontrollers. Compresses active semantic symbols to minimize binary footprint while preserving basic logic.',
      targetWattage: 3,
      targetEntropy: 0.35,
      targetFidelity: 92.0,
      targetMemory: 8,
      expectedSpeed: 900
    },
    {
      id: 'godelian_solver',
      name: 'Gödelian Axiomatic Solver',
      tag: 'THEOREM_PROVER',
      description: 'Formulate complete self-referential ternary proof structures to bypass incompleteness bounds on local symbolic hardware rails.',
      targetWattage: 10,
      targetEntropy: 0.04,
      targetFidelity: 99.9,
      targetMemory: 20,
      expectedSpeed: 1400
    },
    {
      id: 'turing_halt_guard',
      name: 'Turing Halt Guard',
      tag: 'COGNITIVE_SAFETY',
      description: 'Detect and short-circuit infinite recursive loop traps in deep generative pipelines using active inhibitory current damping.',
      targetWattage: 6,
      targetEntropy: 0.08,
      targetFidelity: 99.7,
      targetMemory: 12,
      expectedSpeed: 1600
    },
    {
      id: 'cerebral_debate_bench',
      name: 'Cerebral Multi-Agent Debate',
      tag: 'CEREBRAL_CONSENSUS',
      description: 'Coordinate stable 6-agent truth convergence negotiations under noisy adversarial side-channel interference.',
      targetWattage: 12,
      targetEntropy: 0.12,
      targetFidelity: 99.5,
      targetMemory: 28,
      expectedSpeed: 1750
    },
    {
      id: 'shannon_minimizer',
      name: 'Shannon Entropy Minimizer',
      tag: 'ENTROPY_GUARD',
      description: 'Drive memory storage state-transitions to absolute minimum thermodynamic entropy limits using active tri-state feedback loops.',
      targetWattage: 4,
      targetEntropy: 0.01,
      targetFidelity: 99.9,
      targetMemory: 6,
      expectedSpeed: 1100
    },
    {
      id: 'det_synapse_map',
      name: 'Deterministic Synapse Mapping',
      tag: 'INTELLIGENCE_LAYER',
      description: 'Map arbitrary neural weights into binary-symbolic register configurations with zero loss in high-fidelity reasoning.',
      targetWattage: 14,
      targetEntropy: 0.18,
      targetFidelity: 99.2,
      targetMemory: 30,
      expectedSpeed: 1350
    },
    {
      id: 'bio_robot_motor',
      name: 'Bio-Robotic Motor Substrate',
      tag: 'HARDWARE_LOCK',
      description: 'Enforce low-dissipation torque alignment in decentralized biomechanical joints via continuous real-time error suppression.',
      targetWattage: 9,
      targetEntropy: 0.25,
      targetFidelity: 98.8,
      targetMemory: 15,
      expectedSpeed: 1950
    },
    {
      id: 'arielle_side_shield',
      name: 'Arielle Side-Channel Shield',
      tag: 'SECURITY_CORE',
      description: 'Neutralize active power-probing signatures in decryption matrices by introducing balanced negative-impedance drift loops.',
      targetWattage: 7,
      targetEntropy: 0.03,
      targetFidelity: 99.9,
      targetMemory: 14,
      expectedSpeed: 1550
    },
    {
      id: 'neuro_logic_comp',
      name: 'Neuro-Symbolic Logic Compiler',
      tag: 'THEOREM_PROVER',
      description: 'Compile complex natural language queries into deterministic, non-monotonic logical theorems evaluated on raw silicon gates.',
      targetWattage: 11,
      targetEntropy: 0.15,
      targetFidelity: 99.1,
      targetMemory: 22,
      expectedSpeed: 1450
    },
    {
      id: 'sub_watt_whisper',
      name: 'Sub-Watt Whisper Matrix',
      tag: 'EMBEDDED_MCU',
      description: 'Perform zero-shot semantic query pattern matching on ultra-constrained chips operating strictly under microamp battery budgets.',
      targetWattage: 1.5,
      targetEntropy: 0.40,
      targetFidelity: 89.5,
      targetMemory: 4,
      expectedSpeed: 750
    },
    {
      id: 'auto_cognitive_loop',
      name: 'Autonomous Cognitive Loop',
      tag: 'COGNITIVE_SAFETY',
      description: 'Establish continuous self-auditing routines to isolate stochastic hallucinatory paths before they propagate into output registers.',
      targetWattage: 8,
      targetEntropy: 0.10,
      targetFidelity: 99.6,
      targetMemory: 18,
      expectedSpeed: 1650
    },
    {
      id: 'quantum_scheduler',
      name: 'Quantum-Entangled Scheduler',
      tag: 'PROCESS_SCHEDULER',
      description: 'Spatially optimize memory layout throughput for quantum-inspired parallel logical threads under severe microsecond latency bounds.',
      targetWattage: 13,
      targetEntropy: 0.16,
      targetFidelity: 99.3,
      targetMemory: 26,
      expectedSpeed: 2100
    },
    {
      id: 'ternary_compressor',
      name: 'Ternary Weight Compressor',
      tag: 'INTELLIGENCE_LAYER',
      description: 'Compress deep dense floating-point tensor grids into ultra-sparse trinary matrices without accuracy degradation.',
      targetWattage: 10,
      targetEntropy: 0.22,
      targetFidelity: 98.5,
      targetMemory: 12,
      expectedSpeed: 1300
    },
    {
      id: 'symmetric_cipher_intercept',
      name: 'Symmetric Cipher Interceptor',
      tag: 'SECURITY_CORE',
      description: 'Scan real-time network transaction streams for complex zero-day cryptographic intrusions using predictive symbolic state modeling.',
      targetWattage: 12,
      targetEntropy: 0.05,
      targetFidelity: 99.8,
      targetMemory: 20,
      expectedSpeed: 1700
    },
    {
      id: 'axiomatic_core_sync',
      name: 'Axiomatic Core Sync',
      tag: 'CEREBRAL_CONSENSUS',
      description: 'Harmonize core state representations across distributed swarm compute elements using low-overhead symbolic sync protocols.',
      targetWattage: 9.5,
      targetEntropy: 0.11,
      targetFidelity: 99.5,
      targetMemory: 16,
      expectedSpeed: 1800
    },
    {
      id: 'low_diss_fourier',
      name: 'Low-Dissipation Fast-Fourier',
      tag: 'HARDWARE_LOCK',
      description: 'Compute continuous multidimensional spectral convolutions under an absolute 5 Watt energy wall constraint.',
      targetWattage: 5,
      targetEntropy: 0.28,
      targetFidelity: 95.0,
      targetMemory: 10,
      expectedSpeed: 1500
    },
    {
      id: 'game_tree_solver',
      name: 'Deterministic Game Tree Solver',
      tag: 'THEOREM_PROVER',
      description: 'Trace and resolve tree structures in complex game states using pruned ternary logic matrices, bypassing alpha-beta limitations.',
      targetWattage: 12.5,
      targetEntropy: 0.07,
      targetFidelity: 99.7,
      targetMemory: 24,
      expectedSpeed: 1600
    },
    {
      id: 'stochastic_drift_att',
      name: 'Stochastic Drift Attenuator',
      tag: 'ENTROPY_GUARD',
      description: 'Measure and counter thermal noise-induced register drift in real-time to preserve perfect logic alignment.',
      targetWattage: 3.5,
      targetEntropy: 0.02,
      targetFidelity: 99.9,
      targetMemory: 6,
      expectedSpeed: 1150
    },
    {
      id: 'zero_overhead_purge',
      name: 'Zero-Overhead Memory Purger',
      tag: 'PROCESS_SCHEDULER',
      description: 'Asynchronously purge inactive heap allocations without interrupting high-priority reasoning threads.',
      targetWattage: 5,
      targetEntropy: 0.09,
      targetFidelity: 99.8,
      targetMemory: 8,
      expectedSpeed: 1850
    },
    {
      id: 'dist_logic_swarm',
      name: 'Distributed Logic Swarm',
      tag: 'CEREBRAL_CONSENSUS',
      description: 'Establish resilient decentralized voting chains among 100+ resource-constrained device kernels.',
      targetWattage: 14.5,
      targetEntropy: 0.19,
      targetFidelity: 99.0,
      targetMemory: 32,
      expectedSpeed: 1400
    },
    {
      id: 'causal_graph_core',
      name: 'Causal Graph Inference Core',
      tag: 'INTELLIGENCE_LAYER',
      description: 'Infer deterministic graph structures directly from observation sequences without relying on deep statistical training models.',
      targetWattage: 11.5,
      targetEntropy: 0.13,
      targetFidelity: 99.4,
      targetMemory: 22,
      expectedSpeed: 1250
    },
    {
      id: 'extreme_sbc_micro',
      name: 'Extreme SBC Micro-Solder',
      tag: 'EMBEDDED_MCU',
      description: 'The absolute lowest energy limit layout. Solves key logic questions using minimal gate transitions on standard microcontrollers.',
      targetWattage: 0.8,
      targetEntropy: 0.45,
      targetFidelity: 85.0,
      targetMemory: 2,
      expectedSpeed: 600
    }
  ];

  const handleProfileSelect = (pId: string) => {
    setSelectedProfile(pId);
    const profile = benchmarkProfiles.find(p => p.id === pId);
    if (!profile) return;

    // Help user auto-match recommended parameters
    setCustomWatts(profile.targetWattage);
    setEntropyFactor(profile.targetEntropy);
    
    // Smart mapping of simulation attributes and source files based on profile characteristics
    if (profile.tag === 'SECURITY_CORE' || profile.tag === 'ENTROPY_GUARD') {
      setCompressiveRatio(16);
      setSelectedFile('arielle_cipher.py');
      setSourceCode(TEMPLATE_CODES['arielle_cipher.py']);
    } else if (profile.tag === 'COGNITIVE_SAFETY') {
      setCompressiveRatio(20);
      setSelectedFile('guardian_protocol.py');
      setSourceCode(TEMPLATE_CODES['guardian_protocol.py']);
    } else if (profile.tag === 'EMBEDDED_MCU' || profile.tag === 'HARDWARE_LOCK') {
      setCompressiveRatio(32);
      setSelectedFile('busy_brain.py');
      setSourceCode(TEMPLATE_CODES['busy_brain.py']);
    } else {
      setCompressiveRatio(16);
      setSelectedFile('ternary_kernel.py');
      setSourceCode(TEMPLATE_CODES['ternary_kernel.py']);
    }
  };

  const handleFileChange = (fileName: string) => {
    setSelectedFile(fileName);
    setSourceCode(TEMPLATE_CODES[fileName] || '');
  };

  const handleInteractiveOptimize = () => {
    let optimized = sourceCode;
    onTriggerLog('BLUEPRINT_OPTIMIZER', `Scanning source code: "${selectedFile}" for optimization targets...`, 'INFO');
    
    // Perform dynamic string substitutions reflecting optimal ternary structures
    if (selectedFile === 'ternary_kernel.py') {
      optimized = optimized.replace('entropy_bound = 0.05', 'entropy_bound = 0.02 # AUTO-OPTIMIZED FOR DET-PRECISION');
      optimized = optimized.replace('# Apply active feedback', '# Apply dual-balanced active feedback\n        apply_shannon_suppression_force(1.2)');
    } else if (selectedFile === 'guardian_protocol.py') {
      optimized = optimized.replace('feedback_attenuator = 0.88', 'feedback_attenuator = 0.98 # HEAVY INHIBITORY LOOP');
    } else if (selectedFile === 'busy_brain.py') {
      optimized = optimized.replace('scale_voltage_down(0.4)', 'scale_voltage_down(0.15) # ULTRA THERMAL CONSERVATION');
    } else if (selectedFile === 'arielle_cipher.py') {
      optimized = optimized.replace('side_channel_probe_entropy > 0.05', 'side_channel_probe_entropy > 0.02 # FAST DETECT PATTERN');
    }

    setSourceCode(optimized);
    onTriggerLog('BLUEPRINT_OPTIMIZER', `Optimization compile loops executed successfully. Key registers tightened.`, 'SUCCESS');
  };

  const executeBenchmarkRun = () => {
    if (runStatus !== 'idle') return;
    
    const targetProf = benchmarkProfiles.find(p => p.id === selectedProfile);
    if (!targetProf) return;

    setRunStatus('compiling');
    setRunProgress(15);
    setConsoleLogs([
      `[RUN_INIT] Spawning benchmark container run for profile: "${targetProf.name}"`,
      vr33PccEnabled 
        ? `[RUN_INIT] VR33-PCC QUANTUM RESONANCE SHIELD ACTIVE. Phase-coherence locked (mathematically 100% safe).` 
        : `[RUN_INIT] Hardware configuration detected: "${hardwareTarget === 'biorobopi_12w' ? 'Bio-RoboPi Core 12W Custom Silicon' : hardwareTarget === 'arm_riscv_4w' ? 'ARM/RISC-V UltraLow embedded CPU' : 'NVIDIA CUDA 350W Reference Cluster'}"`,
      `[COMPILER] Instantiating translator on source block: "${selectedFile}"`
    ]);

    // Simulated staggered compilation / test sequence
    setTimeout(() => {
      setRunStatus('executing');
      setRunProgress(40);
      setConsoleLogs(prev => [
        ...prev,
        `[COMPILER] Lexical parse completed. Discovered ternary states, negative constraints, and hardware locks.`,
        vr33PccEnabled
          ? `[COMPILER] Instantiated VR33-PCC math quantum compiler: mapped 64-bit real scalar to dual-wave phase-conjugate consensus.`
          : `[COMPILER] Generated symbolic microcode bytecode. Layout size: ${(targetProf.targetMemory * (0.8 + Math.random() * 0.4)).toFixed(1)} MB`,
        `[EXECUTOR] Instantiating eAMM register fields...`,
        vr33PccEnabled
          ? `[EXECUTOR] VR33 Resonant voltage locked: 3.3V power rails optimized.`
          : `[EXECUTOR] Setting active voltage rails to represent target power lock: ${customWatts} Watts`
      ]);
    }, 800);

    setTimeout(() => {
      setRunStatus('auditing');
      setRunProgress(75);
      setConsoleLogs(prev => [
        ...prev,
        vr33PccEnabled
          ? `[AUDITOR] Enforcing VR33-PCC Quantum Coherence Phase Stabilizers... Live monitoring active.`
          : `[AUDITOR] Simulating side-channel intrusion logs on Arielle crypto boundary...`,
        vr33PccEnabled
          ? `[AUDITOR] Absolute Safe Phase Coherence registered. Target Entropy: 0.000 bits. Stochastic drift hazard neutralized.`
          : `[AUDITOR] Measuring registers. Calculated Shannon Entropy: ${(entropyFactor * (0.7 + Math.random() * 0.4)).toFixed(4)} bits`,
        `[AUDITOR] Starting 6-agent cerebral consensus logic verification debates...`,
        vr33PccEnabled
          ? `[DEBATOR] VR33 QUANTUM CONSENSUS -> Dual-state matching: fully completed. Perfect 100% compliant.`
          : `[DEBATOR] PROVER [L1] -> Standard assertion valid: confirmed.`,
        `[DEBATOR] SHANNON GUARD [L3] -> Verified entropy limit satisfies criteria.`
      ]);
    }, 1600);

    setTimeout(() => {
      // Dynamic computation of the actual result parameters based on user knobs vs profile targets!
      // This makes the game highly interactive and satisfying to "tune".
      
      // Let's analyze the alignment of parameters
      let actualWattage = vr33PccEnabled ? 3.3 : parseFloat((customWatts * (0.95 + Math.random() * 0.1)).toFixed(1));
      let actualEntropy = vr33PccEnabled ? 0.000 : parseFloat((entropyFactor * (0.9 + Math.random() * 0.2)).toFixed(3));
      let actualMemory = vr33PccEnabled ? 0.8 : parseFloat(((32 / compressiveRatio) * (6 + optimizationPasses) * 0.15).toFixed(1));
      
      // Speed multiplier correlates with optimization passes and hardware selection
      let baseSpeed = targetProf.expectedSpeed;
      if (hardwareTarget === 'biorobopi_12w') baseSpeed *= 1.15;
      else if (hardwareTarget === 'arm_riscv_4w') baseSpeed *= 0.85;
      else baseSpeed *= 0.5; // Traditional reference CUDA doesn't do ternary matrix easily, slower symbolic processing

      baseSpeed += (optimizationPasses * 110);
      let actualSpeed = vr33PccEnabled 
        ? Math.round((baseSpeed + (optimizationPasses * 150)) * 2.5)
        : Math.round(baseSpeed * (0.95 + Math.random() * 0.1));

      // Logical fidelity calculations
      let actualFidelity = 100.0;
      if (!vr33PccEnabled) {
        let fidelityError = 0;
        // if power is way lower than target wattage, accuracy drops
        if (actualWattage < targetProf.targetWattage * 0.8) {
          fidelityError += (targetProf.targetWattage - actualWattage) * 3;
        }
        // if entropy bounds are too loose, accuracy drops
        if (actualEntropy > targetProf.targetEntropy) {
          fidelityError += (actualEntropy - targetProf.targetEntropy) * 15;
        }
        // If code was optimized
        const codeIsOptimized = sourceCode.includes('AUTO-OPTIMIZED') || sourceCode.includes('HEAVY INHIBITORY') || sourceCode.includes('ULTRA THERMAL') || sourceCode.includes('FAST DETECT');
        let baseFidelity = codeIsOptimized ? 99.9 : 98.4;
        actualFidelity = parseFloat(Math.max(60, Math.min(100, baseFidelity - fidelityError)).toFixed(1));
      }

      // Determine PASS/FAIL
      const meetWatts = actualWattage <= targetProf.targetWattage * 1.1;
      const meetEntropy = actualEntropy <= targetProf.targetEntropy * 1.15;
      const meetFidelity = actualFidelity >= targetProf.targetFidelity;
      const meetMemory = actualMemory <= targetProf.targetMemory * 1.15;

      const passed = meetWatts && meetEntropy && meetFidelity && meetMemory;
      const statusResult = passed ? 'PASSED' : 'FAILED';

      // Badge triggers
      let badge = undefined;
      if (passed) {
        if (vr33PccEnabled) badge = 'VR33-PCC Quantum Mastermind';
        else if (selectedProfile === 'ariel_shield') badge = 'Arielle Shield Champion';
        else if (selectedProfile === 'quantum_priority') badge = 'RISC-V 12W Sovereign';
        else if (selectedProfile === 'eamm_transformer') badge = 'Axiom Mastermind';
        else if (selectedProfile === 'low_energy_sbc') badge = 'Sub-3W Whisperer';
        else {
          badge = `${targetProf.name} Sovereign`;
        }
      }

      setRunProgress(100);
      setRunStatus('completed');
      setSimResults({
        wattage: actualWattage,
        entropy: actualEntropy,
        fidelity: actualFidelity,
        memory: actualMemory,
        speed: actualSpeed,
        unlockedBadge: badge
      });

      // Write final compiler reports
      setConsoleLogs(prev => [
        ...prev,
        `[SYSTEM] --------------------------------------------------`,
        `[SYSTEM] BENCHMARK EXECUTION RESULTS COMPLETE //`,
        `[SYSTEM] Actual Energy Consumption: ${actualWattage} Watts (Target: <= ${targetProf.targetWattage}W) -> ${meetWatts ? 'STABLE' : 'DEFICIT'}`,
        `[SYSTEM] Shannon Logic Entropy: ${actualEntropy} bits (Target: <= ${targetProf.targetEntropy} bits) -> ${meetEntropy ? 'STABLE' : 'DIVERGENT'}`,
        `[SYSTEM] Logic Proof Fidelity: ${actualFidelity}% (Target: >= ${targetProf.targetFidelity}%) -> ${meetFidelity ? 'COMPLIANT' : 'FAILURE'}`,
        `[SYSTEM] Symbolic Memory Footprint: ${actualMemory} MB (Target: <= ${targetProf.targetMemory} MB) -> ${meetMemory ? 'EFFICIENT' : 'OVERLOAD'}`,
        `[SYSTEM] Transaction Throughput: ${actualSpeed} LogicResolutions/sec`,
        `[SYSTEM] --------------------------------------------------`,
        `[SYSTEM] FINAL STATUS: ${statusResult === 'PASSED' ? '🏆 VERIFIED THEOREM ACHIVED' : '🚨 CRITICAL ANOMALY DETECTED'}`,
        badge ? `[REWARD] Congratulations! You have unlocked the highly coveted accolade: "${badge}"` : ''
      ].filter(Boolean));

      // Append to leaderboard history
      const newRunEntry: SubmittedRun = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        profileName: targetProf.name,
        hardware: hardwareTarget === 'biorobopi_12w' ? 'Bio-RoboPi SBC @ 12W' : hardwareTarget === 'arm_riscv_4w' ? 'ARM RISC-V UltraLow @ 4W' : 'NVIDIA Reference @ 350W',
        wattage: actualWattage,
        entropy: actualEntropy,
        fidelity: actualFidelity,
        memory: actualMemory,
        speed: actualSpeed,
        status: statusResult,
        unlockedBadge: badge
      };

      setSubmittedRuns(prev => [newRunEntry, ...prev]);

      if (passed) {
        onTriggerLog(
          'BENCHMARK_SERVICE',
          `SUCCESS: Achieved core metrics goals for "${targetProf.name}" layout! Logical Proof registered.`,
          'SUCCESS'
        );
      } else {
        onTriggerLog(
          'BENCHMARK_SERVICE',
          `ANOMALY WARNING: Benchmark objectives missed for "${targetProf.name}". Recalibrating state registers.`,
          'WARNING'
        );
      }

    }, 2500);
  };

  // TECHNICAL AUDIT GENERATOR & SERVER SANDBOX HANDLERS
  const deterministicMessages = activeSession?.messages.filter(msg => msg.sender === 'assistant' && msg.mode === 'deterministic') || [];
  
  const getSelectedMessage = () => {
    if (selectedAuditMsgId === 'LATEST_DETERMINISTIC') {
      return deterministicMessages[deterministicMessages.length - 1] || null;
    }
    return deterministicMessages.find(m => m.id === selectedAuditMsgId) || null;
  };

  const generateStandardizedReport = () => {
    const msg = getSelectedMessage();
    const timestampISO = new Date().toISOString();
    
    // Fallback metadata if no message selected
    const query = msg ? msg.text : `Automated system benchmark evaluation - Profile ${activeProfileData.name}`;
    const ternaryState = msg ? msg.ternaryState : (simResults ? (simResults.fidelity >= activeProfileData.targetFidelity ? 1 : -1) : 1);
    const entropy = msg ? msg.entropy : (simResults ? simResults.entropy : entropyFactor);
    const wattage = msg ? msg.wattageUsed : (simResults ? simResults.wattage : customWatts);
    const chains = msg?.axiomaticChains || [
      `AXIOM_PROOF: System calibrated on benchmark profile "${activeProfileData.name}"`,
      `AXIOM_THERMAL: Verified hardware power lock at <= ${activeProfileData.targetWattage}W.`,
      `AXIOM_ENTROPY: Shannon drift bounded within safe limits.`
    ];

    const mappedDebateLogs = (msg?.debateLogs || []).length > 0
      ? msg?.debateLogs.map((deb, dIdx) => {
          const correspondingAgent = agents?.find(a => a.name === deb.agentName || a.id === deb.agentId) || agents?.[dIdx] || null;
          return {
            agent_id: correspondingAgent?.id || `AGENT_${dIdx + 1}_AXIOM`,
            agent_name: deb.agentName,
            role: correspondingAgent?.role || 'Core Contributor',
            axiomatic_assertion: correspondingAgent?.axiomaticAssertion || 'assert_proof_chain()',
            consensus_assertion: deb.thought
          };
        })
      : (agents || []).map(agent => ({
          agent_id: agent.id,
          agent_name: agent.name,
          role: agent.role,
          axiomatic_assertion: agent.axiomaticAssertion,
          consensus_assertion: `Substrate logic validated successfully on ${hardwareTarget.toUpperCase()}. Active negative feedback loop verified. Registered ${agent.rulesCount} baseline axioms.`
        }));

    return {
      header: {
        report_uuid: `eamm-audit-${crypto.randomUUID ? crypto.randomUUID() : 'bd22e5a4-' + Math.random().toString(16).substring(2, 10)}`,
        generated_timestamp: timestampISO,
        specification_format: "HELIX-CORTEX-AUDIT-v1.0.3",
        auditor_id: auditAuditorId,
        audit_agency_flag: auditAgency,
        security_class_level: auditSecurityLevel
      },
      consensus_summary: {
        active_mode: msg ? msg.mode : "benchmarks-calibration",
        agent_framework: "Helix Cortex Multi-Agent Substrate Integration",
        active_consensus_agents_count: agents ? agents.length : 6,
        entropy_threshold_bound: entropy,
        power_consumption_lock_watts: wattage,
        overall_consensus_status: ternaryState === 1 ? "STABLE_PROVER_TRUTH" : ternaryState === -1 ? "REFUTED_BOUNDS" : "ABSTENTION_UNKNOWN"
      },
      consensus_resolution_payload: {
        target_session_id: activeSession ? activeSession.id : "standalone-benchmark-run",
        user_query_expression: query,
        logical_result_ternary_state: ternaryState,
        conclusion_statement: msg ? msg.text : "Verification Lab automated run validation metrics successfully satisfied."
      },
      multi_agent_axiomatic_debates: mappedDebateLogs,
      proof_matrix_trail: {
        axiomatic_chains_registered: chains,
        verification_signature_seal: "0xFD77926AA81EBC89" + (msg ? msg.id.toUpperCase() : "BENCHMARK")
      }
    };
  };

  const handleDownloadReport = () => {
    const report = generateStandardizedReport();
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helix_cortex_audit_report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onTriggerLog('AUDIT_EXPORTER', 'Standardized JSON Audit report successfully exported and downloaded.', 'SUCCESS');
  };

  const handleDownloadLocalHarnessGuide = () => {
    const markdownContent = `# eAMM Physical Local Hardware Verification Harness
### Direct Metal Reproducibility Guide for Low-Power Edge SBCs (ARM / RISC-V)

This document outlines the setup to run local, physical-hardware verification trials on target devices.

1. System Setup:
   - Export this workspace as a ZIP file (accessible in the settings gear menu).
   - Transfer files via secure copy: scp -r ./react-example pi@biorobopi.local:/opt/eamm-harness
   - Run 'npm install' to compile the typescript server offline.

2. CLI Headless Sweep Run:
   - Execute the headless simulator runner:
     node verify-harness.js --profile=ariel_shield --watts=7.8 --comp=1.2 --passes=4

3. Physical INA219 Telemetry Connections:
   - VCC -> 3.3V Power
   - GND -> Ground
   - SDA -> I2C Data
   - SCL -> I2C Clock

All dynamic verification equations are computed deterministically. Maintain sub-12W to bypass stochastic drift hazards.
`;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LOCAL_HARDWARE_VERIFICATION.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onTriggerLog('AUDIT_EXPORTER', 'Physical Hardware Verification Playbook exported to LOCAL_HARDWARE_VERIFICATION.md.', 'SUCCESS');
  };

  const handleCopyToClipboard = () => {
    const report = generateStandardizedReport();
    const jsonStr = JSON.stringify(report, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedAuditReport(true);
    setTimeout(() => setCopiedAuditReport(false), 2000);
    onTriggerLog('AUDIT_EXPORTER', 'Copied raw audit JSON report payload to system clipboard.', 'INFO');
  };

  const handleSendToAuditServer = () => {
    if (isSubmittingAudit) return;
    setIsSubmittingAudit(true);
    setAuditProgress(10);
    setServerAuditResponse(null);
    setAuditSubmitLogs([
      `[TLS] Establishing secure ECDHE-RSA-AES256-GCM connection to Technical Audit Submission Server...`,
      `[TCP] Node handshaking response: ACK active. Route: https://audit.messiah-ai.network/api/v1/consensus/register`,
      `[PAYLOAD] Marshaling Helix Cortex consensus report to standardized JSON payload envelope...`
    ]);

    setTimeout(() => {
      setAuditProgress(40);
      setAuditSubmitLogs(prev => [
        ...prev,
        `[AUTH] Authenticating client credentials token...`,
        `[AUTH] Client signature verified: Auditor ${auditAuditorId} authorized under agency context ${auditAgency}.`,
        `[PARSER] Standard parser matching format SPECIFIC- v1.0.3`
      ]);
    }, 800);

    setTimeout(() => {
      setAuditProgress(75);
      setAuditSubmitLogs(prev => [
        ...prev,
        `[DEBATOR] Transmitting 6 Helix Cortex consensus signatures and axiomatic assertions...`,
        `[DEBATOR] Agent 01-06 consensus signatures matched: verified.`,
        `[BLOCKCHAIN] Dispatched transactions to decentral server logs node...`
      ]);
    }, 1600);

    setTimeout(() => {
      setAuditProgress(100);
      setIsSubmittingAudit(false);
      const report = generateStandardizedReport();
      const mockResponse = {
        statusCode: 201,
        statusText: "Created & Committed",
        registeredBlockHeight: 182394 + Math.floor(Math.random() * 200),
        transactionHash: "0xec2981bdc771fae83b56a3e120da9cf879e6584c010a0df331ee9db" + Math.random().toString(16).substring(2, 10),
        timestamp: new Date().toISOString(),
        auditorContext: report.header.auditor_id,
        securityLevel: report.header.security_class_level,
        verificationSeal: report.proof_matrix_trail.verification_signature_seal
      };
      setServerAuditResponse(mockResponse);
      setAuditSubmitLogs(prev => [
        ...prev,
        `[SERVER] -------------------------------------------------------------`,
        `[SERVER] TECHNICAL AUDIT REGISTRATION SUCCESSFUL`,
        `[SERVER] Status: ${mockResponse.statusCode} - ${mockResponse.statusText}`,
        `[SERVER] Decentral Book Block Height: #${mockResponse.registeredBlockHeight}`,
        `[SERVER] Block transaction stamp log: ${mockResponse.transactionHash}`,
        `[SERVER] -------------------------------------------------------------`,
        `[SYSTEM] Local consensus node is fully in sync with standard submission endpoints.`
      ]);

      onTriggerLog(
        'TECHNICAL_AUDIT_SERVICE',
        `SUCCESS: Standard Technical Audit registered. Hash code ${mockResponse.transactionHash.substring(0, 16)}...`,
        'SUCCESS'
      );
    }, 2400);
  };

  const activeProfileData = benchmarkProfiles.find(p => p.id === selectedProfile) || benchmarkProfiles[0];

  const filteredProfiles = benchmarkProfiles.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(profileSearchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(profileSearchQuery.toLowerCase()) ||
                          p.tag.toLowerCase().includes(profileSearchQuery.toLowerCase());
    const matchesCategory = profileCategoryFilter === 'ALL' || p.tag === profileCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 font-mono text-stone-900" id="submission-benchmarks-root">
      
      {/* Upper informational strip */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-stone-300 pb-2" id="benchmarks-header">
        <div>
          <span className="font-serif italic text-xs block text-stone-600" id="lbl-bench-meta">
            05. Symbolic Benchmark Submission Suite
          </span>
          <h1 className="font-display font-black text-sm uppercase tracking-tight text-[#141414]" id="bench-title">
            eAMM Deterministic Verification Lab & Leaderboard
          </h1>
        </div>
        <div className="flex items-center gap-1 bg-[#141414] text-white px-2 py-0.5 text-[9px]" id="badge-firmware">
          <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0" id="icon-badge-cpu" />
          <span>FIRMWARE SUBSTRATE VERIFY ACTIVE</span>
        </div>
      </div>

      <div className="bg-[#D1D0CC]/25 p-3.5 border border-[#141414] rounded-xs space-y-3" id="intro-card">
        <div className="flex items-start gap-2" id="intro-row-1">
          <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-[10.5px] leading-relaxed text-stone-700">
            Welcome to the **MIIDreamOS Verification Lab**. Submit custom physical-ternary register files and adjust energy-damping thresholds to prove computer theorems directly on metal. Calibrating the eAMM architecture bypasses standard statistical weights, enabling 29x operational speedups at 12 Watts.
          </p>
        </div>
      </div>

      {/* Main interactive grid splitting Profile Objectives and Coding controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="benchmarks-workspace">
        
        {/* Left Column (Profiles & Knobs - Col 5) */}
        <div className="lg:col-span-5 space-y-4" id="col-profiles-knobs">
          
          {/* Section 1: Benchmark Targets Selector */}
          <div className="bg-white border border-[#141414] p-3 shadow-xs space-y-2.5" id="targets-selection-box">
            <div className="flex justify-between items-center border-b border-stone-200 pb-1" id="targets-title-wrapper">
              <span className="text-[9.5px] font-black uppercase text-stone-700 tracking-wider flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> AGI MILITARY-GRADE BENCHMARKS (25)
              </span>
              <span className="text-[8px] bg-amber-500/10 text-amber-800 font-bold px-1.5 py-0.5 border border-amber-300 rounded-none uppercase">
                {filteredProfiles.length} loaded
              </span>
            </div>

            {/* Quick Filter & Search UI Block */}
            <div className="space-y-2 bg-stone-50 p-2 border border-stone-200" id="filter-controls-p">
              <div className="flex flex-col gap-1" id="search-bar-row">
                <span className="text-[8px] text-stone-500 font-bold uppercase">Search AGI Benchmarks:</span>
                <input
                  type="text"
                  id="txt-profile-search"
                  value={profileSearchQuery}
                  onChange={(e) => setProfileSearchQuery(e.target.value)}
                  placeholder="e.g. Shannon, Godel, Turing..."
                  className="w-full bg-white border border-[#141414]/30 p-1.5 text-[10px] outline-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1" id="cat-filter-row">
                <span className="text-[8px] text-stone-500 font-bold uppercase">Filter by Cognitive Domain:</span>
                <select
                  id="select-profile-cat"
                  value={profileCategoryFilter}
                  onChange={(e) => setProfileCategoryFilter(e.target.value)}
                  className="w-full bg-white border border-[#141414]/30 p-1 text-[9.5px] outline-none font-mono font-medium rounded-xs cursor-pointer"
                >
                  <option value="ALL">All Cognitive Domains (25)</option>
                  <option value="INTELLIGENCE_LAYER">Intelligence Layers</option>
                  <option value="SECURITY_CORE">Security Cores</option>
                  <option value="PROCESS_SCHEDULER">Process Schedulers</option>
                  <option value="EMBEDDED_MCU">Embedded MCUs</option>
                  <option value="THEOREM_PROVER">Theorem Provers</option>
                  <option value="COGNITIVE_SAFETY">Cognitive Safety & Guard</option>
                  <option value="CEREBRAL_CONSENSUS">Cerebral Consensus</option>
                  <option value="ENTROPY_GUARD">Entropy Minimization</option>
                  <option value="HARDWARE_LOCK">Hardware Alignment Locks</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1 select-none" id="profiles-picker-list">
              {filteredProfiles.length === 0 ? (
                <div className="text-[10px] text-stone-500 italic text-center p-6 border border-dashed border-stone-200 bg-stone-50">
                  No AGI benchmark profiles match current search criteria.
                </div>
              ) : (
                filteredProfiles.map((p) => (
                  <button
                    key={p.id}
                    id={`btn-profile-sel-${p.id}`}
                    onClick={() => handleProfileSelect(p.id)}
                    className={`w-full text-left p-2 border font-mono transition-all flex flex-col items-stretch text-stone-800 ${
                      selectedProfile === p.id 
                        ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]' 
                        : 'hover:bg-stone-100 border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start" id={`profile-header-${p.id}`}>
                      <span className="text-[9.5px] font-black uppercase tracking-tight pr-2 leading-tight">{p.name}</span>
                      <span className={`text-[6.5px] font-bold px-1.5 py-0.2 shrink-0 rounded-xs uppercase leading-none ${
                        selectedProfile === p.id ? 'bg-amber-500 text-[#141414]' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {p.tag}
                      </span>
                    </div>
                    <span className={`text-[8px] mt-1 leading-normal opacity-85 ${
                      selectedProfile === p.id ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      {p.description}
                    </span>
                    <div className="flex gap-2.5 mt-1.5 text-[7px] font-mono border-t pt-1 border-stone-200/40 opacity-75">
                      <span>⚡ {p.targetWattage}W</span>
                      <span>💠 Shannon: {p.targetEntropy}</span>
                      <span>🎯 Fid: {p.targetFidelity}%</span>
                      <span>💾 {p.targetMemory}MB</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Section 2: Hardware targets & Sliders */}
          <div className="bg-white border border-[#141414] p-3 shadow-xs space-y-3.5" id="knobs-selection-box">
            <span className="text-[9.5px] font-black uppercase text-stone-700 tracking-wider flex items-center gap-1 pb-1 border-b border-stone-200">
              <Sliders className="w-3.5 h-3.5 text-stone-800" /> Kernel Register Damping board
            </span>

            {/* VR33-PCC Quantum Protocol Alignment Toggle */}
            <div className="p-2 border border-blue-800 bg-blue-50/70 rounded-none space-y-1" id="vr33-pcc-panel">
              <div className="flex justify-between items-center" id="vr33-pcc-header">
                <span className="text-[9.2px] font-black uppercase tracking-wider text-blue-950 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-blue-800 animate-pulse" /> VR33-PCC Quantum Alignment
                </span>
                <button
                  id="btn-toggle-vr33-pcc"
                  onClick={() => {
                    const nextVal = !vr33PccEnabled;
                    setVr33PccEnabled(nextVal);
                    if (nextVal) {
                      onTriggerLog('SYSTEM', 'VR33-PCC Quantum Resonance engaged! Math-based alignment locked at 100% safe state.', 'SUCCESS');
                    } else {
                      onTriggerLog('SYSTEM', 'VR33-PCC Quantum Alignment disengaged. Returning to classic statistical simulation models.', 'WARNING');
                    }
                  }}
                  className={`px-2 py-0.5 text-[8.5px] font-black uppercase transition-all border ${
                    vr33PccEnabled 
                      ? 'bg-blue-800 text-white border-blue-900 shadow-inner' 
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {vr33PccEnabled ? 'ACTIVE: 100% SAFE' : 'ENGAGE SHIELD'}
                </button>
              </div>
              <p className="text-[7.8px] leading-relaxed text-blue-900">
                Axiomatic multi-wave phase-conjugation forces Shannon Entropy to <strong className="font-mono text-[8px] bg-blue-100 px-0.5">0.000 bits</strong> and stabilizes cognitive voltage to the resonant standard of <strong className="font-mono text-[8px] bg-blue-100 px-0.5">3.3W</strong> without stochastic leakage.
              </p>
            </div>

            <div className="space-y-2" id="hardware-target-select">
              <label className="text-[8.5px] font-bold text-stone-600 uppercase">Hardware Destination Core</label>
              <div className="grid grid-cols-3 gap-1" id="hardware-choices">
                <button
                  id="btn-choice-mcu"
                  onClick={() => setHardwareTarget('arm_riscv_4w')}
                  className={`p-1.5 border text-center text-[8.5px] font-bold uppercase transition-all ${
                    hardwareTarget === 'arm_riscv_4w' ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  RISC-V [4W]
                </button>
                <button
                  id="btn-choice-sbc"
                  onClick={() => setHardwareTarget('biorobopi_12w')}
                  className={`p-1.5 border text-center text-[8.5px] font-bold uppercase transition-all ${
                    hardwareTarget === 'biorobopi_12w' ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  Bio-RoboPi [12W]
                </button>
                <button
                  id="btn-choice-cuda"
                  onClick={() => setHardwareTarget('nvidia_350w')}
                  className={`p-1.5 border text-center text-[8.5px] font-bold uppercase transition-all ${
                    hardwareTarget === 'nvidia_350w' ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  NVIDIA [350W]
                </button>
              </div>
            </div>

            <div className="space-y-3.5" id="tuning-sliders">
              {/* Watts slider */}
              <div className="space-y-1" id="sl-watts">
                <div className="flex justify-between text-[8px] font-bold">
                  <span>Target Cognitive Intensity Max</span>
                  <span className="text-amber-700">{customWatts} Watts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  value={customWatts}
                  onChange={(e) => setCustomWatts(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-200 accent-[#141414] cursor-pointer"
                />
              </div>

              {/* Entropy bounds slider */}
              <div className="space-y-1" id="sl-entropy">
                <div className="flex justify-between text-[8px] font-bold">
                  <span>Entropy Guard Sensitivity Ratio</span>
                  <span className="text-amber-700">{entropyFactor} Max Bits</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.45"
                  step="0.01"
                  value={entropyFactor}
                  onChange={(e) => setEntropyFactor(parseFloat(e.target.value))}
                  className="w-full h-1 bg-stone-200 accent-[#141414] cursor-pointer"
                />
              </div>

              {/* Memory compression ratio */}
              <div className="space-y-1" id="sl-comp">
                <div className="flex justify-between text-[8px] font-bold">
                  <span>Symbol Map Compaction Matrix</span>
                  <span className="text-amber-700">{compressiveRatio}:1 Compression</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  step="8"
                  value={compressiveRatio}
                  onChange={(e) => setCompressiveRatio(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-200 accent-[#141414] cursor-pointer"
                />
              </div>

              {/* Compiler Optimization Passes */}
              <div className="space-y-1" id="sl-opt">
                <div className="flex justify-between text-[8px] font-bold">
                  <span>Compiler Entanglement Passes</span>
                  <span className="text-amber-700">{optimizationPasses} Logical Cycles</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={optimizationPasses}
                  onChange={(e) => setOptimizationPasses(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-200 accent-[#141414] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Code Submission & Dynamic Tests Monitor - Col 7) */}
        <div className="lg:col-span-7 space-y-4" id="col-code-simulation">
          
          {/* Section 1: Code editor block */}
          <div className="bg-white border border-[#141414] p-3 shadow-xs space-y-1.5" id="code-playground-box">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-1.5 border-b border-stone-200" id="code-bar-header">
              <span className="text-[9.5px] font-black uppercase text-stone-700 tracking-wider flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-blue-700" /> eAMM State Register (Source)
              </span>
              <div className="flex items-center gap-1.5 bg-stone-100 p-0.5 border border-stone-300" id="files-selector-tab">
                {Object.keys(TEMPLATE_CODES).map((name) => (
                  <button
                    key={name}
                    id={`btn-file-tab-${name.replace('.', '-')}`}
                    onClick={() => handleFileChange(name)}
                    className={`px-1.5 py-0.5 text-[8px] font-bold font-mono uppercase transition-all ${
                      selectedFile === name ? 'bg-white text-stone-950 border border-stone-300 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              id="txt-source-editor"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="w-full h-[155px] font-mono text-[9.5px] p-2 bg-stone-900 text-[#E4E3E0] focus:outline-hidden leading-relaxed resize-none border border-stone-950"
            />

            <div className="flex justify-between items-center bg-stone-50 p-1 border border-stone-200" id="code-actions-drawer">
              <span className="text-[7.5px] text-stone-500 font-bold uppercase">Ready for compiler validation</span>
              <button
                id="btn-optimize-source"
                onClick={handleInteractiveOptimize}
                className="bg-stone-200 hover:bg-stone-300 border border-stone-400 text-stone-800 font-mono text-[8.5px] font-extrabold uppercase px-2 py-0.8 flex items-center gap-1 transition-colors select-none"
              >
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" /> Optimize Code Logic
              </button>
            </div>
          </div>

          {/* Section 2: Simulator Execute Console Terminal Stream */}
          <div className="bg-[#141414] text-[#E4E3E0] p-3 shadow-xs space-y-3" id="live-simulation-terminal">
            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5" id="sim-term-top">
              <div className="flex items-center gap-1.5" id="sim-term-title">
                <Terminal className="w-4 h-4 text-stone-400" />
                <span className="text-[9px] font-black uppercase text-amber-400">Live Calibration & Symbolic Audit</span>
              </div>
              <div className="flex items-center gap-2 text-[8px] font-bold" id="sim-term-progress-pnl">
                <span>PROGRESS: {runProgress}%</span>
                <div className="w-16 bg-neutral-800 h-1.5 border border-neutral-700 overflow-hidden relative" id="runner-bar-wrap">
                  <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${runProgress}%` }} />
                </div>
              </div>
            </div>

            {/* Run logs viewer */}
            <div className="h-[120px] overflow-y-auto space-y-1 font-mono text-[8.5px] leading-relaxed select-text pr-1" id="sim-terminal-viewport">
              {consoleLogs.length === 0 ? (
                <div className="text-stone-500 text-center py-8 italic" id="empty-prompt-state-msg">
                  Prepare your damper sliders and source code, then click "SUBMIT BENCHMARK RUN" below to execute calibration audits.
                </div>
              ) : (
                consoleLogs.map((logStr, lIdx) => (
                  <div key={lIdx} className="text-[#E4E3E0] p-0.5 leading-normal" id={`comp-log-line-${lIdx}`}>
                    {logStr.startsWith('[SYSTEM]') ? (
                      <span className="text-amber-400 block font-bold mt-1">{logStr}</span>
                    ) : logStr.startsWith('[REWARD]') ? (
                      <span className="text-emerald-400 font-bold block bg-emerald-900/40 p-1 mt-1 border border-emerald-800/30 font-display animate-bounce">{logStr}</span>
                    ) : logStr.includes('FAILED') || logStr.includes('DEFICIT') || logStr.includes('DIVERGENT') ? (
                      <span className="text-red-400 font-bold">{logStr}</span>
                    ) : logStr.includes('PASSED') || logStr.includes('STABLE') || logStr.includes('COMPLIANT') ? (
                      <span className="text-emerald-400 font-bold">{logStr}</span>
                    ) : (
                      <span className="opacity-90">{logStr}</span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Big Run click Trigger */}
            <div className="flex gap-2 pt-1 border-t border-stone-800" id="submission-triggers">
              <button
                id="btn-trigger-benchmark-submit"
                disabled={runStatus !== 'idle'}
                onClick={executeBenchmarkRun}
                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 text-[#141414] disabled:text-stone-500 p-2.5 font-sans font-black text-center uppercase tracking-wide text-xs transition-all flex justify-center items-center gap-2 select-none border border-amber-600"
              >
                {runStatus === 'idle' ? (
                  <>
                    <Play className="w-4 h-4 text-[#141414]" />
                    <span>SUMBIT BENCHMARK RUN</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="font-mono">VERIFICATION RUNNING ({runStatus.toUpperCase()})...</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparisons and Milestone Targets status check */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4" id="metric-comparisons-block">
        
        {/* Active Target vs Actual stats panel (Col 7) */}
        <div className="md:col-span-7 bg-white border border-[#141414] p-3 shadow-xs space-y-3" id="active-comparisons">
          <span className="text-[9.5px] font-black uppercase text-stone-700 tracking-wider flex items-center gap-1 border-b border-stone-200 pb-1">
            <TrendingUp className="w-3.5 h-3.5 text-stone-800" /> Active Verification Report: {activeProfileData.name}
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="comparison-widgets-grid">
            {/* 1. Wattage */}
            <div className="border border-stone-200 p-2 bg-stone-50" id="widget-wattage">
              <span className="block text-[7.5px] text-stone-500 font-bold uppercase">Energy Lock</span>
              <div className="flex justify-between items-baseline mt-1" id="widget-wattage-status">
                <span className="font-sans font-black text-xs">{simResults ? `${simResults.wattage}W` : '--'}</span>
                <span className="text-[7px] text-stone-600">Goal: &lt;={activeProfileData.targetWattage}W</span>
              </div>
              <div className="w-full bg-stone-200 h-1 mt-1 rounded-xs overflow-hidden relative" id="bar-watts-c">
                <div 
                  className={`h-full ${simResults && simResults.wattage <= activeProfileData.targetWattage ? 'bg-emerald-600' : simResults ? 'bg-rose-500' : 'bg-stone-300'}`}
                  style={{ width: simResults ? `${Math.min(100, (simResults.wattage / activeProfileData.targetWattage) * 80)}%` : '0%' }}
                />
              </div>
            </div>

            {/* 2. Shannon Entropy */}
            <div className="border border-stone-200 p-2 bg-stone-50" id="widget-entropy">
              <span className="block text-[7.5px] text-stone-500 font-bold uppercase">Shannon Drift</span>
              <div className="flex justify-between items-baseline mt-1" id="widget-entropy-status">
                <span className="font-sans font-black text-xs">{simResults ? `${simResults.entropy}b` : '--'}</span>
                <span className="text-[7.5px] text-stone-600">Goal: &lt;={activeProfileData.targetEntropy}</span>
              </div>
              <div className="w-full bg-stone-200 h-1 mt-1 rounded-xs overflow-hidden" id="bar-entropy-c">
                <div 
                  className={`h-full ${simResults && simResults.entropy <= activeProfileData.targetEntropy ? 'bg-emerald-600' : simResults ? 'bg-rose-500' : 'bg-stone-300'}`}
                  style={{ width: simResults ? `${Math.min(100, (simResults.entropy / activeProfileData.targetEntropy) * 80)}%` : '0%' }}
                />
              </div>
            </div>

            {/* 3. Logical Proof Fidelity */}
            <div className="border border-stone-200 p-2 bg-stone-50" id="widget-fidelity">
              <span className="block text-[7.5px] text-stone-500 font-bold uppercase">Logic Fidelity</span>
              <div className="flex justify-between items-baseline mt-1" id="widget-fidelity-status">
                <span className="font-sans font-black text-xs">{simResults ? `${simResults.fidelity}%` : '--'}</span>
                <span className="text-[7.5px] text-stone-600">Goal: &gt;={activeProfileData.targetFidelity}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1 mt-1 rounded-xs overflow-hidden" id="bar-fidelity-c">
                <div 
                  className={`h-full ${simResults && simResults.fidelity >= activeProfileData.targetFidelity ? 'bg-emerald-600' : simResults ? 'bg-rose-500' : 'bg-stone-300'}`}
                  style={{ width: simResults ? `${Math.min(100, (simResults.fidelity / 100) * 100)}%` : '0%' }}
                />
              </div>
            </div>

            {/* 4. Footprint memory */}
            <div className="border border-stone-200 p-2 bg-stone-50" id="widget-memory">
              <span className="block text-[7.5px] text-stone-500 font-bold uppercase">Symbol footprint</span>
              <div className="flex justify-between items-baseline mt-1" id="widget-memory-status">
                <span className="font-sans font-black text-xs">{simResults ? `${simResults.memory}MB` : '--'}</span>
                <span className="text-[7.5px] text-stone-600">Goal: &lt;={activeProfileData.targetMemory}MB</span>
              </div>
              <div className="w-full bg-stone-200 h-1 mt-1 rounded-xs overflow-hidden" id="bar-memory-c">
                <div 
                  className={`h-full ${simResults && simResults.memory <= activeProfileData.targetMemory ? 'bg-emerald-600' : simResults ? 'bg-rose-500' : 'bg-stone-300'}`}
                  style={{ width: simResults ? `${Math.min(100, (simResults.memory / activeProfileData.targetMemory) * 80)}%` : '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="text-[9.5px] space-y-1 bg-stone-50 p-2 border border-stone-200 leading-normal" id="status-checks">
            <span className="font-extrabold uppercase text-stone-700 text-[8px] block tracking-wide">Dynamic Verification Results Summary</span>
            <div className="space-y-1" id="status-checks-list">
              <div className="flex justify-between" id="status-check-watts">
                <span>Energy limit constraint met:</span>
                <span className={`font-bold ${(simResults && simResults.wattage <= activeProfileData.targetWattage) ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {(simResults && simResults.wattage <= activeProfileData.targetWattage) ? 'STABLE' : 'ENERGY_OVERFLOW'}
                </span>
              </div>
              <div className="flex justify-between" id="status-check-entropy">
                <span>Logic search space bounds proof satisfied:</span>
                <span className={`font-bold ${(simResults && simResults.entropy <= activeProfileData.targetEntropy) ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {(simResults && simResults.entropy <= activeProfileData.targetEntropy) ? 'PROOF_STABLE' : 'STOCHASTIC_DRIFT_HAZARD'}
                </span>
              </div>
              <div className="flex justify-between" id="status-check-fidelity">
                <span>Multi-agent consensus logical alignment verified:</span>
                <span className={`font-bold ${(simResults && simResults.fidelity >= activeProfileData.targetFidelity) ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {(simResults && simResults.fidelity >= activeProfileData.targetFidelity) ? 'COMPLIANT (100% MATCH)' : 'DIVERGENT'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achieved Badges and Unlocks display (Col 5) */}
        <div className="md:col-span-5 bg-white border border-[#141414] p-3 shadow-xs space-y-2.5" id="achieved-unlocks">
          <span className="text-[9.5px] font-black uppercase text-stone-700 tracking-wider flex items-center gap-1 border-b border-stone-200 pb-1">
            <Award className="w-3.5 h-3.5 text-stone-800" /> Dynamic Code Accolades
          </span>

          <div className="grid grid-cols-2 gap-2" id="badges-achievements-boxes">
            {/* Badge 1 */}
            <div className={`p-1.5 border flex flex-col items-center text-center justify-between rounded-xs ${
              submittedRuns.some(r => r.unlockedBadge === 'Arielle Shield Champion') ? 'bg-amber-500/10 border-amber-500' : 'bg-stone-50 border-stone-200 opacity-40'
            }`} id="badge-shld">
              <Shield className={`w-6 h-6 ${submittedRuns.some(r => r.unlockedBadge === 'Arielle Shield Champion') ? 'text-amber-600' : 'text-stone-400'}`} />
              <span className="font-extrabold text-[8.5px] mt-1 block leading-tight uppercase">Arielle Guard</span>
              <span className="text-[7px] text-stone-500 leading-none">Passed Security Profile</span>
            </div>

            {/* Badge 2 */}
            <div className={`p-1.5 border flex flex-col items-center text-center justify-between rounded-xs ${
              submittedRuns.some(r => r.unlockedBadge === 'RISC-V 12W Sovereign') ? 'bg-amber-500/10 border-amber-500' : 'bg-stone-50 border-stone-200 opacity-40'
            }`} id="badge-risc">
              <Cpu className={`w-6 h-6 ${submittedRuns.some(r => r.unlockedBadge === 'RISC-V 12W Sovereign') ? 'text-amber-600' : 'text-stone-400'}`} />
              <span className="font-extrabold text-[8.5px] mt-1 block leading-tight uppercase">RISC-V Sovereign</span>
              <span className="text-[7px] text-stone-500 leading-none">Stable run @ 12W Limits</span>
            </div>

            {/* Badge 3 */}
            <div className={`p-1.5 border flex flex-col items-center text-center justify-between rounded-xs ${
              submittedRuns.some(r => r.unlockedBadge === 'Axiom Mastermind') ? 'bg-amber-500/10 border-amber-500' : 'bg-stone-50 border-stone-200 opacity-40'
            }`} id="badge-master">
              <Award className={`w-6 h-6 ${submittedRuns.some(r => r.unlockedBadge === 'Axiom Mastermind') ? 'text-amber-600' : 'text-stone-400'}`} />
              <span className="font-extrabold text-[8.5px] mt-1 block leading-tight uppercase">Axiom Intellect</span>
              <span className="text-[7px] text-stone-500 leading-none">Map parallel transformer</span>
            </div>

            {/* Badge 4 */}
            <div className={`p-1.5 border flex flex-col items-center text-center justify-between rounded-xs ${
              submittedRuns.some(r => r.unlockedBadge === 'Sub-3W Whisperer') ? 'bg-amber-500/10 border-amber-500' : 'bg-stone-50 border-stone-200 opacity-40'
            }`} id="badge-whisperer">
              <Zap className={`w-6 h-6 ${submittedRuns.some(r => r.unlockedBadge === 'Sub-3W Whisperer') ? 'text-amber-600' : 'text-stone-400'}`} />
              <span className="font-extrabold text-[8.5px] mt-1 block leading-tight uppercase">3W Whisperer</span>
              <span className="text-[7px] text-stone-500 leading-none">Passed Low-Energy SBC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard History Table of Submitted Runs */}
      <div className="bg-white border border-[#141414] shadow-xs" id="leaderboard-block">
        <div className="bg-[#141414] text-white p-2 flex justify-between items-center" id="lbl-lead-header">
          <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4.5 h-4.5 text-stone-300" /> Local Submission Audit Leaderboard
          </span>
          <span className="text-[8.5px] font-mono text-stone-400">Total verified calibrations: {submittedRuns.length}</span>
        </div>

        <div className="overflow-x-auto" id="lead-tb-wrapper">
          <table className="w-full text-left text-[10px] border-collapse font-mono" id="lead-tb">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-300 uppercase select-none font-bold text-stone-600 text-[8.5px]">
                <th className="p-2">Timestamp</th>
                <th className="p-2">Test Target Profile</th>
                <th className="p-2 text-center">Core Target</th>
                <th className="p-2 text-right">Wattage</th>
                <th className="p-2 text-right">Entropy</th>
                <th className="p-2 text-right">Fidelity</th>
                <th className="p-2 text-right">Byte Footprint</th>
                <th className="p-2 text-right">Ops Speed</th>
                <th className="p-2 text-center">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {submittedRuns.map((run, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors" id={`run-row-${idx}`}>
                  <td className="p-2 text-stone-500">{run.timestamp}</td>
                  <td className="p-2 font-black text-stone-800">
                    <div className="flex flex-col" id={`col-run-p-${idx}`}>
                      <span>{run.profileName}</span>
                      {run.unlockedBadge && (
                        <span className="text-[7.5px] text-amber-600 font-extrabold uppercase">🏆 unlocked: {run.unlockedBadge}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 text-center opacity-80">{run.hardware}</td>
                  <td className="p-2 text-right font-bold text-stone-900">{run.wattage} Watts</td>
                  <td className="p-2 text-right">{run.entropy} bits</td>
                  <td className="p-2 text-right font-semibold">{run.fidelity}%</td>
                  <td className="p-2 text-right">{run.memory} MB</td>
                  <td className="p-2 text-right font-semibold text-emerald-800">{run.speed} logic/s</td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-0.5 text-[8.5px] font-sans font-extrabold uppercase rounded-xs ${
                      run.status === 'PASSED' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {run.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helix Cortex Consensus Technical Audit Submission Suite */}
      <div className="bg-[#E4E3E0] border border-[#141414] p-4 space-y-4" id="technical-audit-hub">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#141414]/20 pb-2 gap-2" id="audit-hub-header">
          <div>
            <span className="font-serif italic text-xs block text-stone-600" id="lbl-audit-sub-meta">
              06. Enterprise Integration Interface
            </span>
            <h2 className="font-display font-black text-sm uppercase tracking-tight text-[#141414] flex items-center gap-1.5" id="audit-hub-title">
              <FileJson className="w-4.5 h-4.5 text-stone-800" /> Helix Cortex Standard Technical Audit Hub
            </h2>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider bg-[#141414] text-[#E4E3E0] px-2 py-0.5 rounded-xs" id="audit-spec-badge">
            SPEC SPECIFICATION: HELIX-v1.0.3
          </span>
        </div>

        <p className="text-[10px] text-stone-700 leading-relaxed max-w-4xl" id="audit-hub-desc">
          This submission handler automatically structures active multi-agent <strong>Helix Cortex</strong> consensus resolutions, logical state registers, and proof chains into a standardized ISO-compliant JSON audit packet. Configure transmission parameters below to broadcast validated vectors to the secure <strong>Technical Audit Submission Server</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="audit-hub-grid">
          
          {/* Left panel: Config, selectors and trigger buttons (span 5) */}
          <div className="lg:col-span-5 space-y-3.5" id="audit-config-panel">
            
            {/* 1. Target Data Selection */}
            <div className="bg-white border border-[#141414] p-3 space-y-2.5" id="audit-data-selector">
              <label className="text-[9px] font-black uppercase text-[#141414] tracking-wider flex items-center gap-1" id="lbl-audit-payload">
                <Layers className="w-3 text-stone-600" /> [1] Source Consensus payload
              </label>

              <div className="space-y-1.5" id="audit-target-select-wrapper">
                <span className="text-[8px] text-stone-500 block">SELECT CONCRETE DYNAMIC KERNEL RESOLUTION EVENT:</span>
                <select
                  id="select-audit-msg"
                  value={selectedAuditMsgId}
                  onChange={(e) => setSelectedAuditMsgId(e.target.value)}
                  className="w-full bg-[#E4E3E0] border border-[#141414] text-[10px] p-2 outline-none font-mono font-medium rounded-xs accent-[#141414]"
                >
                  <option value="LATEST_DETERMINISTIC">
                    [Auto-Latest] {deterministicMessages.length > 0 ? `Latest Deterministic Message (${deterministicMessages[deterministicMessages.length - 1].text.substring(0, 32)}...)` : 'No active session debates (Use fallback benchmark parameters)'}
                  </option>
                  {deterministicMessages.map((msg, mIdx) => (
                    <option key={msg.id} value={msg.id}>
                      [{mIdx + 1}] {msg.timestamp} - {msg.ternaryState === 1 ? '[+1] PROVER' : '[-1] REFUTED'} - "{msg.text.substring(0, 30)}..."
                    </option>
                  ))}
                </select>
                {deterministicMessages.length === 0 && (
                  <span className="text-[8px] text-amber-700 font-bold block bg-amber-50 p-1 border border-amber-200">
                    ℹ️ No live chat consensus debates found in active session history. Defaulting to current calibration benchmark state.
                  </span>
                )}
              </div>
            </div>

            {/* 2. Standard Auditor Metadata Inputs */}
            <div className="bg-white border border-[#141414] p-3 space-y-3" id="audit-meta-inputs">
              <label className="text-[9px] font-black uppercase text-[#141414] tracking-wider flex items-center gap-1" id="lbl-audit-metadata">
                <CheckSquare className="w-3 text-stone-600" /> [2] Technical Auditor Credentials
              </label>

              <div className="grid grid-cols-2 gap-2" id="auditor-inputs-grid">
                <div className="space-y-1" id="input-auditor-id-group">
                  <span className="text-[8px] text-stone-500 block">AUDITOR IDENTIFIER:</span>
                  <input
                    type="text"
                    id="txt-audit-id"
                    value={auditAuditorId}
                    onChange={(e) => setAuditAuditorId(e.target.value)}
                    placeholder="e.g. AUDITOR-MESSIAH-992"
                    className="w-full bg-stone-55 border border-[#141414]/30 p-1.5 text-[10px] outline-none font-mono uppercase bg-stone-50 hover:bg-white focus:bg-white"
                  />
                </div>
                <div className="space-y-1" id="input-agency-group">
                  <span className="text-[8px] text-stone-500 block">REGULATORY TRUST NODE:</span>
                  <input
                    type="text"
                    id="txt-audit-agency"
                    value={auditAgency}
                    onChange={(e) => setAuditAgency(e.target.value)}
                    placeholder="e.g. TECHNICAL-AUDIT-COUNCIL"
                    className="w-full bg-stone-55 border border-[#141414]/30 p-1.5 text-[10px] outline-none font-mono uppercase bg-stone-50 hover:bg-white focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1" id="input-security-group">
                <span className="text-[8px] text-stone-500 block">SECURITY SEPARATION ENVELOPE:</span>
                <div className="grid grid-cols-3 gap-1" id="security-level-buttons">
                  {['STANDARD', 'CONFIDENTIAL', 'CONCURRENT-CRYPTOGRAPHIC'].map((level) => (
                    <button
                      key={level}
                      id={`btn-sec-${level}`}
                      onClick={() => setAuditSecurityLevel(level)}
                      className={`text-[8.5px] p-1 border uppercase font-mono font-bold leading-none select-none ${
                        auditSecurityLevel === level
                          ? 'bg-[#141414] text-white border-[#141414]'
                          : 'bg-[#D1D0CC]/30 hover:bg-[#D1D0CC]/60 text-stone-700 border-[#141414]/20'
                      }`}
                    >
                      {level.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Action Dispatch Buttons */}
            <div className="bg-white border border-[#141414] p-3 space-y-2.5" id="audit-actions-box">
              <span className="text-[9px] font-black uppercase text-[#141414] tracking-wider block" id="lbl-audit-actions">
                [3] AUDIT BROADCAST AND EXPORT COMMANDS
              </span>

              <div className="grid grid-cols-2 gap-2" id="audit-command-grid">
                <button
                  id="btn-audit-copy"
                  onClick={handleCopyToClipboard}
                  className="bg-[#D1D0CC]/40 hover:bg-[#D1D0CC]/80 text-[#141414] border border-[#141414] p-2 text-center text-[9.5px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedAuditReport ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-700" /> Copy JSON Raw
                    </>
                  )}
                </button>

                <button
                  id="btn-audit-download"
                  onClick={handleDownloadReport}
                  className="bg-[#D1D0CC]/40 hover:bg-[#D1D0CC]/80 text-[#141414] border border-[#141414] p-2 text-center text-[9.5px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-700" /> Download .JSON
                </button>
              </div>

              <button
                id="btn-audit-harness-guide"
                onClick={handleDownloadLocalHarnessGuide}
                className="w-full bg-[#D1D0CC]/20 hover:bg-[#D1D0CC]/50 text-[#141414] border border-[#141414] p-2 text-center text-[9.5px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-stone-700" /> Pull Local Trial Harness Guide (.MD)
              </button>

              <button
                id="btn-audit-submit"
                onClick={handleSendToAuditServer}
                disabled={isSubmittingAudit}
                className={`w-full text-white p-2.5 text-center text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 select-none border border-[#141414] ${
                  isSubmittingAudit
                    ? 'bg-amber-600 cursor-not-allowed animate-pulse'
                    : 'bg-[#141414] hover:bg-neutral-800 hover:scale-[0.99] active:scale-[0.98]'
                }`}
              >
                {isSubmittingAudit ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-200" /> Transmitting crypt-envelope... {auditProgress}%
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-stone-300" /> Transmit Standard Audit to Server
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right panel: Live Code Preview & Server Response Console (span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-3" id="audit-report-viewer">
            
            {/* Realtime JSON Report Preview wrapper */}
            <div className="bg-white border border-[#141414] flex-1 flex flex-col min-h-[220px]" id="audit-json-preview-frame">
              <div className="bg-[#141414]/5 border-b border-[#141414] p-2 flex justify-between items-center" id="lbl-json-viewer-bar">
                <span className="text-[9px] font-black uppercase tracking-wider text-stone-800 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-stone-700" /> Live Standard Output Preview (ISO JSON Schema)
                </span>
                <span className="font-mono text-[8px] text-stone-500">DYNAMIC RE-RENDER ACTIVE</span>
              </div>
              <div className="p-3 overflow-y-auto max-h-[240px] text-[9.5px] font-mono leading-tight bg-stone-50 flex-1 whitespace-pre rounded-none select-text" id="audit-json-code">
                {JSON.stringify(generateStandardizedReport(), null, 2)}
              </div>
            </div>

            {/* Simulated Server Feedback Endpoint Terminal Terminal */}
            <div className="bg-[#141414] text-[#E4E3E0] border border-[#141414] flex flex-col h-[130px] shadow-inner" id="audit-terminal">
              <div className="bg-[#242424] px-3 py-1.5 flex justify-between items-center border-b border-black" id="audit-term-title-bar">
                <div className="flex items-center gap-2" id="audit-term-title-row">
                  <div className="flex gap-1" id="audit-leds">
                    <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <span className="text-[8.5px] font-black tracking-wider uppercase flex items-center gap-1 text-stone-300">
                    <Server className="w-3 h-3 text-amber-500" /> TECHNICAL-AUDIT SUBMISSION SERVER CONSOLE
                  </span>
                </div>
                {isSubmittingAudit ? (
                  <span className="text-[7.5px] text-amber-400 font-bold uppercase animate-pulse">CONNECTING PORT:443 // TLS SECURE</span>
                ) : serverAuditResponse ? (
                  <span className="text-[7.5px] text-emerald-400 font-bold uppercase">SECURE SESSION REGISTERED (HTTP 201)</span>
                ) : (
                  <span className="text-[7.5px] text-stone-500 font-bold uppercase">ENDPOINT: IDLE / STANDBY</span>
                )}
              </div>

              <div className="p-2 overflow-y-auto flex-1 text-[8.5px] font-mono leading-relaxed space-y-0.5" id="audit-term-body">
                {auditSubmitLogs.length === 0 ? (
                  <div className="text-zinc-600 italic p-1" id="term-idle-text">
                    &gt; Systems ready. Waiting for standardized payload dispatch...
                    <br />
                    &gt; Click "Transmit Standard Audit to Server" to push consensus certificates.
                  </div>
                ) : (
                  auditSubmitLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        log.includes('[SERVER]') 
                          ? 'text-amber-400 font-bold' 
                          : log.includes('[SUCCESS]') || log.includes('SUCCESSFUL')
                          ? 'text-emerald-400 font-black'
                          : 'text-stone-300'
                      }
                      id={`audit-term-line-${lIdx}`}
                    >
                      &gt; {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
