import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { Terminal, ShieldAlert, Cpu, Database, Play } from 'lucide-react';

interface TerminalLogsProps {
  currentLogicState: number;
  logs?: LogEntry[];
  onAddLogCentral?: (level: LogEntry['level'], source: string, message: string) => void;
  onClearLogsCentral?: () => void;
}

export default function TerminalLogs({ 
  currentLogicState,
  logs: propLogs,
  onAddLogCentral,
  onClearLogsCentral
}: TerminalLogsProps) {
  
  // Local logs state if parents don't provide it
  const [localLogs, setLocalLogs] = useState<LogEntry[]>([
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

  const logs = propLogs || localLogs;
  const [enteredCommand, setEnteredCommand] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle live logic state updates as state transitions in logs
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const stateLabels: Record<number, string> = {
      [-1]: '[-1] PROVER TRUTH',
      [0]: '[0] UNKNOWN ABSTENTION',
      [1]: '[1] VERIFIED THEOREM',
    };
    const message = `Kernel Logic State reassigned to ${stateLabels[currentLogicState]}. Entropy recalculating.`;
    
    if (onAddLogCentral) {
      onAddLogCentral(currentLogicState === 0 ? 'WARNING' : 'SUCCESS', 'REG_K_ENG', message);
    } else {
      const nextLog: LogEntry = {
        timestamp,
        level: currentLogicState === 0 ? 'WARNING' : 'SUCCESS',
        source: 'REG_K_ENG',
        message,
      };
      setLocalLogs((prev) => [...prev, nextLog]);
    }
  }, [currentLogicState]);

  const addLog = (level: LogEntry['level'], source: string, message: string) => {
    if (onAddLogCentral) {
      onAddLogCentral(level, source, message);
    } else {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const newEntry: LogEntry = { timestamp, level, source, message };
      setLocalLogs((prev) => [...prev, newEntry]);
    }
  };

  const handleClearLogs = () => {
    if (onClearLogsCentral) {
      onClearLogsCentral();
    } else {
      setLocalLogs([]);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCommand.trim()) return;

    const cmd = enteredCommand.toLowerCase().trim();
    addLog('INFO', 'USER_TERM', `Executed: "${enteredCommand}"`);

    setTimeout(() => {
      switch (cmd) {
        case 'help':
          addLog('INFO', 'TERM_SYS', 'Available commands: help | run-audit | inject-axiom | purge-entropy | clear');
          break;
        case 'clear':
          handleClearLogs();
          break;
        case 'run-audit':
          addLog('INFO', 'CEREBRAL_DEBATE', 'Starting Helix Cortex Levels 1–4 parallel audit sequence...');
          setTimeout(() => {
            addLog('SUCCESS', 'AGENT_01_PROVER', 'Axiom validation consensus confirmed: [-1].');
            addLog('SUCCESS', 'AGENT_06_VERIFY', 'Zero-weight logic proofs aligned. Verification complete.');
          }, 600);
          break;
        case 'inject-axiom':
          addLog('SUCCESS', 'SYMBOLIC_VAULT', 'Successfully injected new axiomatic block: eAMM-P_K5.1.');
          break;
        case 'purge-entropy':
          addLog('SUCCESS', 'ENTROPY_GUARD', 'Entropy purge initiated. System thermal index stabilized.');
          break;
        default:
          addLog('WARNING', 'TERM_SYS', `Command parser: Ignored unknown string "${cmd}". Type "help" for controls.`);
      }
    }, 150);

    setEnteredCommand('');
  };

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'SUCCESS':
        return 'text-emerald-700 font-bold';
      case 'WARNING':
        return 'text-amber-700 font-bold';
      case 'CRITICAL':
        return 'text-rose-700 font-bold';
      default:
        return 'text-[#141414] opacity-80';
    }
  };

  return (
    <div className="space-y-2 font-mono text-[11px]" id="logs-container">
      <div className="flex justify-between items-center bg-[#141414] text-[#E4E3E0] px-3 py-1.5" id="logs-header">
        <div className="flex items-center gap-1.5" id="logs-title-wrap">
          <Terminal className="w-3.5 h-3.5 text-stone-300" id="icon-terminal" />
          <span className="font-bold uppercase tracking-wider text-[10px]">Deterministic Logs trace</span>
        </div>
        <span className="font-mono text-[8px] opacity-60">ARIEL-STREAM ENABLED</span>
      </div>

      <div
        id="logs-viewport"
        className="border border-[#141414] bg-[#D1D0CC]/15 p-3 h-[142px] overflow-y-auto space-y-1.5 font-mono select-text"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="leading-snug flex items-start gap-1" id={`log-item-${idx}`}>
            <span className="text-stone-500 flex-shrink-0">[{log.timestamp}]</span>
            <span className="text-stone-700 font-bold uppercase flex-shrink-0">[{log.source}]</span>
            <span className={getLevelColor(log.level)} id={`log-msg-${idx}`}>{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-stone-400 py-6 text-center italic" id="log-empty-msg">
            Terminal buffer empty. Submit simulated diagnostic inputs below.
          </div>
        )}
        <div ref={logEndRef} />
      </div>

      {/* Quick Simulated Tasks */}
      <div className="flex gap-1 flex-wrap" id="term-utils">
        <button
          id="btn-run-audit"
          onClick={() => {
            addLog('INFO', 'CEREBRAL_DEBATE', 'Running Levels 1–4 parallel debate sequence...');
            setTimeout(() => {
              addLog('SUCCESS', 'AGENT_03_ADJUDIC', 'Consensus established. Standard non-divergent exit state reached.');
            }, 650);
          }}
          className="border border-[#141414] bg-[#D1D0CC] hover:bg-[#c3c2be] px-2 py-1 text-[9px] font-bold uppercase inline-flex items-center gap-1 transition-colors select-none cursor-pointer"
        >
          <Play className="w-2.5 h-2.5" id="icon-btn-audit" />
          Run Consensus Debate
        </button>

        <button
          id="btn-inject-axiom"
          onClick={() => addLog('SUCCESS', 'SYMBOLIC_VAULT', 'Axiomatic Block dynamic injection: eAMM-P_K4.2 deployed.')}
          className="border border-[#141414] bg-[#D1D0CC] hover:bg-[#c3c2be] px-2 py-1 text-[9px] font-bold uppercase inline-flex items-center gap-1 transition-colors select-none cursor-pointer"
        >
          <Database className="w-2.5 h-2.5" id="icon-btn-db" />
          Inject Symbolic Axiom
        </button>

        <button
          id="btn-purge-entropy"
          onClick={() => addLog('SUCCESS', 'ENTROPY_GUARD', 'Shannon Entropy purge initiated. Loop bounds locked.')}
          className="border border-[#141414] bg-[#D1D0CC] hover:bg-[#c3c2be] px-2 py-1 text-[9px] font-bold uppercase inline-flex items-center gap-1 transition-colors select-none cursor-pointer"
        >
          <ShieldAlert className="w-2.5 h-2.5" id="icon-btn-shield" />
          Purge Shannon Entropy
        </button>

        <button
          id="btn-clear-logs"
          onClick={handleClearLogs}
          className="border border-[#141414] bg-[#D1D0CC]/30 hover:bg-[#D1D0CC]/60 px-2 py-1 text-[9px] font-bold uppercase select-none transition-colors ml-auto cursor-pointer"
        >
          Clear Log Buffer
        </button>
      </div>

      {/* Raw console entry form */}
      <form onSubmit={handleCommandSubmit} className="flex border border-[#141414] bg-white text-[#141414]" id="term-form">
        <span className="bg-[#141414] text-[#E4E3E0] px-2 py-1 inline-flex items-center font-bold text-[9px]" id="prompt-char">
          AUDIT_SHELL:$
        </span>
        <input
          type="text"
          id="term-input"
          value={enteredCommand}
          onChange={(e) => setEnteredCommand(e.target.value)}
          placeholder="Type 'help', 'run-audit', 'inject-axiom' or custom audit strings..."
          className="flex-1 bg-transparent px-2 py-1 focus:outline-hidden text-xs font-mono"
        />
        <button
          type="submit"
          id="btn-term-submit"
          className="bg-[#141414] hover:bg-stone-800 text-stone-200 px-3 py-1 font-bold text-[9px] uppercase transition-colors cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
