import { AgentInfo } from '../types';
import { Cpu, CheckCircle, HelpCircle, AlertTriangle } from 'lucide-react';

interface CortexAgentCardProps {
  agents: AgentInfo[];
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
}

export default function CortexAgentCard({
  agents,
  selectedAgentId,
  onSelectAgent,
}: CortexAgentCardProps) {
  const getStatusStyle = (status: AgentInfo['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-900 border-emerald-500';
      case 'DEBATING':
        return 'bg-amber-100 text-amber-900 border-amber-500 animate-pulse';
      case 'HALTED':
        return 'bg-rose-100 text-rose-900 border-rose-500';
      default:
        return 'bg-[#D1D0CC] text-[#141414] border-[#141414]';
    }
  };

  const getStatusIcon = (status: AgentInfo['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-700" id="icon-completed" />;
      case 'DEBATING':
        return <Cpu className="w-3.5 h-3.5 text-amber-700 animate-spin" id="icon-debating" />;
      case 'HALTED':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-700" id="icon-halted" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-stone-700" id="icon-stable" />;
    }
  };

  return (
    <div className="space-y-3" id="cortex-agent-container">
      <div className="flex justify-between items-center" id="cortex-header-row">
        <span className="font-serif italic text-xs block opacity-60" id="lbl-helix-meta">
          02. Helix Cortex Architecture
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider bg-[#141414] text-[#E4E3E0] px-1.5" id="lbl-agent-pool">
          6 Consensus Agents Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1" id="agent-grid">
        {agents.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          return (
            <button
              key={agent.id}
              id={`btn-agent-${agent.id}`}
              onClick={() => onSelectAgent(agent.id)}
              className={`border p-2 text-left flex flex-col justify-between transition-all outline-none text-[10px] font-mono select-none h-[54px] ${
                isSelected
                  ? 'bg-[#141414] text-[#E4E3E0] border-[#141414] scale-[0.98]'
                  : 'bg-[#D1D0CC] hover:bg-[#c3c2be] text-[#141414] border-[#141414]'
              }`}
            >
              <div className="flex justify-between items-start w-full" id={`agent-top-${agent.id}`}>
                <span className="font-bold text-[9px]" id={`agent-name-${agent.id}`}>{agent.name}</span>
                {!isSelected && getStatusIcon(agent.status)}
              </div>
              <span className={`text-[8px] truncate tracking-tight uppercase leading-none ${
                isSelected ? 'text-[#e2e2df]' : 'text-stone-600'
              }`} id={`agent-role-${agent.id}`}>
                {agent.role}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Inspector */}
      {selectedAgentId && (
        <div
          id="agent-inspector-panel"
          className="border border-[#141414] p-3 bg-white/70 backdrop-blur-xs space-y-2 text-xs"
        >
          {agents
            .filter((a) => a.id === selectedAgentId)
            .map((agent) => (
              <div key={agent.id} className="space-y-2" id={`inspector-${agent.id}`}>
                <div className="flex justify-between items-center border-b border-[#141414] pb-1.5" id={`inspect-head-${agent.id}`}>
                  <span className="font-mono font-bold uppercase tracking-wider text-[11px]" id={`inspect-title-${agent.id}`}>
                    [{agent.name}] Configuration
                  </span>
                  <span
                    id={`inspect-status-${agent.id}`}
                    className={`px-1.5 py-0.5 text-[9px] font-mono border rounded-xs font-semibold ${getStatusStyle(
                      agent.status
                    )}`}
                  >
                    STATUS: {agent.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-700" id={`inspect-meta-${agent.id}`}>
                  <div id={`inspect-rules-${agent.id}`}>
                    <span className="block opacity-60 text-[8px]" id={`lbl-rules-${agent.id}`}>AXIOMS REGISTERED:</span>
                    <span className="font-bold text-[#141414]" id={`val-rules-${agent.id}`}>{agent.rulesCount} Axiomatic Chains</span>
                  </div>
                  <div className="text-right" id={`inspect-impact-${agent.id}`}>
                    <span className="block opacity-60 text-[8px]" id={`lbl-impact-${agent.id}`}>ENTROPIC LIMIT RATIO:</span>
                    <span className="font-bold text-[#141414]" id={`val-impact-${agent.id}`}>{(agent.entropyImpact * 100).toFixed(1)}% Bound</span>
                  </div>
                </div>

                <p className="text-[11px] leading-snug text-stone-800 font-medium" id={`inspect-desc-${agent.id}`}>
                  {agent.description}
                </p>

                <div className="bg-[#141414] text-[#E4E3E0] p-1.5 font-mono text-[9px] border border-[#141414] overflow-x-auto whitespace-pre rounded-xs" id={`inspect-assertion-${agent.id}`}>
                  <span className="text-amber-400 font-bold" id={`lbl-assert-tag-${agent.id}`}>PROVE-AXIOM // </span>
                  {agent.axiomaticAssertion}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
