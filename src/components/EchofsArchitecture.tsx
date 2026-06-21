import React, { useState } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  Settings, 
  Cpu, 
  Terminal, 
  Compass, 
  Workflow, 
  Play, 
  CheckCircle, 
  Activity, 
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ComponentProgress {
  name: string;
  category: string;
  progress: number;
  status: 'PENDING' | 'CONVERTING' | 'COMPLETED' | 'STABLE';
  description: string;
  tasks: { name: string; done: boolean }[];
}

interface EchofsArchitectureProps {
  onTriggerLog: (source: string, message: string, level: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL') => void;
  onUpdateSystemFidelity: (delta: number) => void;
}

export default function EchofsArchitecture({ onTriggerLog, onUpdateSystemFidelity }: EchofsArchitectureProps) {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'timeline'>('blueprint');
  const [expandedLayer, setExpandedLayer] = useState<string | null>('DARK');

  const [components, setComponents] = useState<ComponentProgress[]>([
    {
      name: "Layer 0: DARK (Deep Architecture Runtime Kernel)",
      category: "ECHOFS 5-Layer Architecture",
      progress: 65,
      status: 'STABLE',
      description: "Low-level boot/kernel with ternary logic processing.",
      tasks: [
        { name: "Convert the ternary_kernel.py to Bio-RoboPi", done: true },
        { name: "Implement the entropy_engine.py in Bio-RoboPi", done: true },
        { name: "Create the symbol_loader module for dynamic symbol management", done: true },
        { name: "Implement the ternary logic ALU integration", done: false },
        { name: "Develop the hardware abstraction layer for ternary computing", done: false },
        { name: "Create the memory management system with three-state logic support", done: false }
      ]
    },
    {
      name: "Layer 1: HALO (Hierarchical Admin Logic Operations)",
      category: "ECHOFS 5-Layer Architecture",
      progress: 40,
      status: 'PENDING',
      description: "Administrative services with AI-assisted management.",
      tasks: [
        { name: "Implement the Guardian Protocol in Bio-RoboPi", done: true },
        { name: "Create the security validation system", done: true },
        { name: "Develop the administrative service management", done: false },
        { name: "Implement the AI-assisted system administration", done: false },
        { name: "Create the system monitoring and logging framework", done: false },
        { name: "Develop the resource allocation and management system", done: false }
      ]
    },
    {
      name: "Layer 2: DOM0 (Default Operations Management Zero)",
      category: "ECHOFS 5-Layer Architecture",
      progress: 33,
      status: 'PENDING',
      description: "Core application runtime with AI integration.",
      tasks: [
        { name: "Implement the application runtime environment", done: true },
        { name: "Create the AI integration framework", done: true },
        { name: "Develop the application management system", done: false },
        { name: "Implement the resource allocation for applications", done: false },
        { name: "Create the application security sandbox", done: false },
        { name: "Develop the application communication framework", done: false }
      ]
    },
    {
      name: "Layer 3: HAVEN (Human-AI Virtualized Environment Network)",
      category: "ECHOFS 5-Layer Architecture",
      progress: 16,
      status: 'PENDING',
      description: "User environment with AI collaboration.",
      tasks: [
        { name: "Implement the user interface framework", done: true },
        { name: "Create the AI collaboration system", done: false },
        { name: "Develop the personalization framework", done: false },
        { name: "Implement the user data management system", done: false },
        { name: "Create the user security and privacy controls", done: false },
        { name: "Develop the AI assistant integration", done: false }
      ]
    },
    {
      name: "Layer 4: XSPELL (eXtended Symbolic Processing Engine Logic Layer)",
      category: "ECHOFS 5-Layer Architecture",
      progress: 50,
      status: 'PENDING',
      description: "Natural language terminal and symbolic processing.",
      tasks: [
        { name: "Implement the natural language interpreter", done: true },
        { name: "Create the symbolic processing engine", done: true },
        { name: "Develop the multi-shell compatibility system", done: true },
        { name: "Implement the command translation framework", done: false },
        { name: "Create the context-aware processing system", done: false },
        { name: "Develop the intent recognition and disambiguation system", done: false }
      ]
    },
    {
      name: "Busy-Brain (Process Manager)",
      category: "Specialized System Components",
      progress: 50,
      status: 'STABLE',
      description: "Enhanced process management system with AI optimization.",
      tasks: [
        { name: "Convert the existing Process Scheduler to the Busy-Brain system", done: true },
        { name: "Implement quantum-enhanced process prioritization", done: true },
        { name: "Create the process entanglement for related processes", done: true },
        { name: "Develop the AI-assisted resource allocation", done: false },
        { name: "Implement the ternary state tracking for processes", done: false },
        { name: "Create the process prediction system", done: false }
      ]
    },
    {
      name: "Social Manager (Network Stack)",
      category: "Specialized System Components",
      progress: 33,
      status: 'PENDING',
      description: "Advanced network management with social interaction metaphors.",
      tasks: [
        { name: "Convert the existing Network Stack to the Social Manager system", done: true },
        { name: "Implement the social interaction metaphors for network connections", done: true },
        { name: "Create the quantum-enhanced network optimization", done: false },
        { name: "Develop the ternary packet prioritization system", done: false },
        { name: "Implement the network behavior prediction", done: false },
        { name: "Create the adaptive routing based on social patterns", done: false }
      ]
    },
    {
      name: "Actions Manager (Services)",
      category: "Specialized System Components",
      progress: 33,
      status: 'PENDING',
      description: "Service management system with action-based orchestration.",
      tasks: [
        { name: "Implement the service management framework", done: true },
        { name: "Create the action-based orchestration system", done: true },
        { name: "Develop the service dependency management", done: false },
        { name: "Implement the quantum-enhanced service optimization", done: false },
        { name: "Create the ternary service state tracking", done: false },
        { name: "Develop the service prediction system", done: false }
      ]
    },
    {
      name: "Open Interpreter Level Interface",
      category: "Natural Language Interface",
      progress: 50,
      status: 'PENDING',
      description: "Advanced natural language interface for system interaction.",
      tasks: [
        { name: "Implement the natural language understanding system", done: true },
        { name: "Create the command translation framework", done: true },
        { name: "Develop the context-aware processing", done: true },
        { name: "Implement the multi-turn conversation support", done: false },
        { name: "Create the intent recognition and disambiguation", done: false },
        { name: "Develop the language model integration", done: false }
      ]
    },
    {
      name: "Bio-RoboPi Code Conversion Tools",
      category: "Natural Language Interface",
      progress: 50,
      status: 'STABLE',
      description: "Tools for converting existing code to Bio-RoboPi assembler.",
      tasks: [
        { name: "Implement the code analysis system", done: true },
        { name: "Create the syntax translation framework", done: true },
        { name: "Develop the semantic conversion system", done: true },
        { name: "Implement the optimization for Bio-RoboPi features", done: false },
        { name: "Create the verification and testing framework", done: false },
        { name: "Develop the documentation generation system", done: false }
      ]
    },
    {
      name: "MoE (Mixture of Experts) System",
      category: "AI Integration & Training",
      progress: 66,
      status: 'STABLE',
      description: "Integration of multiple AI frameworks for enhanced capabilities.",
      tasks: [
        { name: "Implement the integration framework for multiple AI models", done: true },
        { name: "Create the routing system for task delegation", done: true },
        { name: "Develop the consensus mechanism for decision making", done: true },
        { name: "Implement the performance tracking and optimization", done: true },
        { name: "Create the knowledge sharing between models", done: false },
        { name: "Develop the fallback mechanisms for reliability", done: false }
      ]
    },
    {
      name: "Asyn Core OS IDE",
      category: "IDE and SDK Development",
      progress: 50,
      status: 'PENDING',
      description: "Integrated development environment for Bio-RoboPi development.",
      tasks: [
        { name: "Implement the code editing and navigation features", done: true },
        { name: "Create the syntax highlighting and code completion", done: true },
        { name: "Develop the debugging and profiling tools", done: true },
        { name: "Implement the project management features", done: false },
        { name: "Create the version control integration", done: false },
        { name: "Develop the documentation and help system", done: false }
      ]
    }
  ]);

  const [simulatingIndex, setSimulatingIndex] = useState<number | null>(null);

  // Triggers simulated compilation of an architectural block
  const handleSimulateBuild = (index: number) => {
    if (simulatingIndex !== null) return;
    setSimulatingIndex(index);
    const comp = components[index];
    
    onTriggerLog(
      'BLUEPRINT_AUDIT',
      `Initializing compilation scan for architectural component: "${comp.name}"`,
      'INFO'
    );

    let progressVal = comp.progress;
    const interval = setInterval(() => {
      progressVal += 10;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
        
        // Mark all tasks completed
        const updatedTasks = comp.tasks.map(t => ({ ...t, done: true }));
        setComponents(prev => prev.map((c, i) => i === index ? { 
          ...c, 
          progress: 100, 
          status: 'COMPLETED',
          tasks: updatedTasks
        } : c));
        
        setSimulatingIndex(null);
        onTriggerLog(
          'BLUEPRINT_AUDIT',
          `COMPILATION SUCCESS: ${comp.name} fully integrated into the ARIEL-NLC substrate core!`,
          'SUCCESS'
        );
        onUpdateSystemFidelity(0.4);
      } else {
        setComponents(prev => prev.map((c, i) => i === index ? { ...c, progress: progressVal, status: 'CONVERTING' } : c));
      }
    }, 400);
  };

  const handleToggleTask = (compIndex: number, taskIndex: number) => {
    setComponents(prev => {
      return prev.map((c, cIdx) => {
        if (cIdx === compIndex) {
          const updatedTasks = c.tasks.map((t, tIdx) => tIdx === taskIndex ? { ...t, done: !t.done } : t);
          const doneCount = updatedTasks.filter(t => t.done).length;
          const currentProgress = Math.round((doneCount / updatedTasks.length) * 100);
          return {
            ...c,
            tasks: updatedTasks,
            progress: currentProgress,
            status: currentProgress === 100 ? 'COMPLETED' : 'PENDING'
          };
        }
        return c;
      });
    });
  };

  // Group components for summary progress
  const categories = Array.from(new Set(components.map(c => c.category)));

  return (
    <div className="space-y-4" id="echofs-arch-container">
      <div className="flex justify-between items-center" id="echofs-header">
        <div>
          <span className="font-serif italic text-xs block opacity-60" id="lbl-echofs-meta">
            04. Dynamic Progress & ECHOFS Architecture Core
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-600 block mt-0.5" id="lbl-echofs-desc">
            Five-Layer verification pipeline tracking real-time Bio-RoboPi conversion milestones.
          </span>
        </div>
        <div className="flex bg-[#141414] text-[#E4E3E0] font-mono text-[9.5px] border border-[#141414]" id="tab-selectors">
          <button 
            id="btn-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`px-2 py-0.5 uppercase transition-all font-bold ${activeTab === 'blueprint' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
          >
            Blueprint
          </button>
          <button 
            id="btn-tab-timeline"
            onClick={() => setActiveTab('timeline')}
            className={`px-2 py-0.5 uppercase transition-all font-bold ${activeTab === 'timeline' ? 'bg-amber-500 text-[#141414]' : 'opacity-75 hover:opacity-100'}`}
          >
            Milestones
          </button>
        </div>
      </div>

      {activeTab === 'blueprint' ? (
        <div className="space-y-3" id="blueprint-panel">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5" id="blueprint-stats">
            {categories.map((cat, idx) => {
              const catComps = components.filter(c => c.category === cat);
              const avgProgress = Math.round(catComps.reduce((acc, c) => acc + c.progress, 0) / catComps.length);
              return (
                <div key={idx} className="bg-white border border-[#141414] p-1.5 font-mono text-[9px] flex flex-col justify-between" id={`stat-cat-${idx}`}>
                  <span className="opacity-60 truncate uppercase">{cat}</span>
                  <div className="flex justify-between items-end mt-1" id={`stat-cat-progress-${idx}`}>
                    <span className="font-bold text-xs">{avgProgress}%</span>
                    <span className="text-[7.5px] opacity-70">
                      {avgProgress === 100 ? 'SUCCESS' : avgProgress > 50 ? 'STABLE' : 'PENDING'}
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-1 mt-1 border border-[#141414]/10 overflow-hidden" id={`stat-progress-bar-wrap-${idx}`}>
                    <div className="bg-[#141414] h-full" style={{ width: `${avgProgress}%` }} id={`stat-progress-bar-${idx}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Layer Accordion */}
          <div className="border border-[#141414] bg-white divide-y divide-[#141414]" id="accordion-wrapper">
            {components.map((comp, compIdx) => {
              const isExpanded = expandedLayer === comp.name;
              return (
                <div key={compIdx} className={`transition-colors ${isExpanded ? 'bg-stone-50' : ''}`} id={`accordion-item-${compIdx}`}>
                  <div 
                    onClick={() => setExpandedLayer(isExpanded ? null : comp.name)}
                    className="p-2.5 flex items-center justify-between cursor-pointer font-mono text-[10.5px] select-none"
                    id={`accordion-trigger-${compIdx}`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1" id={`accordion-title-wrap-${compIdx}`}>
                      <Layers className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                      <div className="min-w-0" id={`accordion-header-text-${compIdx}`}>
                        <span className="font-bold truncate block">{comp.name}</span>
                        <span className="text-[8px] opacity-60 uppercase">{comp.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[9.5px] shrink-0" id={`accordion-action-wrap-${compIdx}`}>
                      <div className="flex items-center gap-1.5" id={`accordion-progress-row-${compIdx}`}>
                        <span className="font-semibold text-stone-700">{comp.progress}%</span>
                        <div className="w-16 bg-stone-200 h-1.5 border border-[#141414]/10 overflow-hidden" id={`accordion-progress-bar-wrap-${compIdx}`}>
                          <div className={`h-full ${comp.progress === 100 ? 'bg-emerald-600' : 'bg-amber-500'}`} style={{ width: `${comp.progress}%` }} />
                        </div>
                      </div>

                      <button
                        id={`btn-compile-comp-${compIdx}`}
                        disabled={comp.progress === 100 || simulatingIndex !== null}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateBuild(compIdx);
                        }}
                        className={`border border-[#141414] px-1.5 py-0.5 text-[8.5px] uppercase font-bold flex items-center gap-0.5 transition-all select-none ${
                          comp.progress === 100
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-500'
                            : simulatingIndex === compIdx
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-[#D1D0CC] hover:bg-stone-200 text-[#141414] disabled:opacity-40'
                        }`}
                      >
                        {simulatingIndex === compIdx ? (
                          <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                        ) : (
                          <Play className="w-2.5 h-2.5" />
                        )}
                        <span>{comp.progress === 100 ? 'Compiled' : simulatingIndex === compIdx ? 'Scanning' : 'Compile'}</span>
                      </button>

                      {isExpanded ? <ChevronUp className="w-3 h-3 text-stone-600" /> : <ChevronDown className="w-3 h-3 text-stone-600" />}
                    </div>
                  </div>

                  {/* Expanded Checklist details */}
                  {isExpanded && (
                    <div className="p-3 bg-white border-t border-[#141414]/10 font-mono text-[10px] space-y-2 text-stone-800" id={`accordion-details-${compIdx}`}>
                      <p className="italic leading-normal text-stone-600 pl-1 border-l-2 border-stone-400">
                        {comp.description}
                      </p>
                      
                      <div className="space-y-1" id={`accordion-checklist-${compIdx}`}>
                        <span className="text-[8px] font-bold block uppercase tracking-wide opacity-60">
                          Bio-RoboPi Conversion Checklist & Verification Rules
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5" id={`checklist-grid-${compIdx}`}>
                          {comp.tasks.map((task, valIdx) => (
                            <label 
                              key={valIdx} 
                              id={`task-label-${compIdx}-${valIdx}`}
                              className="flex items-start gap-1.5 p-1 bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all select-none cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={task.done}
                                id={`task-checkbox-${compIdx}-${valIdx}`}
                                onChange={() => handleToggleTask(compIdx, valIdx)}
                                className="mt-0.5 accent-amber-500 scale-90"
                              />
                              <span className={`leading-snug select-none ${task.done ? 'line-through text-stone-400 font-medium' : 'text-stone-800 font-bold'}`}>
                                {task.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border border-[#141414] bg-white p-3 font-mono space-y-3" id="timeline-panel">
          <div className="flex items-center gap-1.5 border-b border-[#141414]/10 pb-1.5" id="timeline-title-row">
            <Clock className="w-4 h-4 text-stone-700" id="icon-clock-milestones" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Implementation timeline roadmap</span>
          </div>

          <div className="space-y-4" id="timeline-flow-box">
            <div className="flex gap-3" id="phase-1-row">
              <div className="flex flex-col items-center shrink-0" id="phase-line-1">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center border border-[#141414]">01</div>
                <div className="w-px bg-stone-300 flex-1 my-1" />
              </div>
              <div className="text-[10px] space-y-1 pb-2" id="phase-1-content">
                <span className="font-bold underline text-stone-900 block uppercase">Phase 1: Core Architecture (Completed)</span>
                <p className="leading-relaxed text-stone-600">
                  Complete the DARK layer implementation. Implement core Bio-RoboPi assembler features. Initialize the basic file system structure. Develop initial system boot processes.
                </p>
              </div>
            </div>

            <div className="flex gap-3" id="phase-2-row">
              <div className="flex flex-col items-center shrink-0" id="phase-line-2">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center border border-[#141414]">02</div>
                <div className="w-px bg-stone-300 flex-1 my-1" />
              </div>
              <div className="text-[10px] space-y-1 pb-2" id="phase-2-content">
                <span className="font-bold text-stone-900 block uppercase">Phase 2: System Components (Active Verification Audit)</span>
                <p className="leading-relaxed text-stone-600 font-semibold">
                  Implement validation layers for HALO and DOM0. Spin up process-optimized components including virtualizing state machines like the 'Busy-Brain' and 'Social Manager'.
                </p>
              </div>
            </div>

            <div className="flex gap-3" id="phase-3-row">
              <div className="flex flex-col items-center shrink-0" id="phase-line-3">
                <div className="w-5 h-5 rounded-full bg-[#D1D0CC] text-[#141414] font-bold text-[9px] flex items-center justify-center border border-[#141414]">03</div>
                <div className="w-px bg-stone-300 flex-1 my-1" />
              </div>
              <div className="text-[10px] space-y-1 pb-2" id="phase-3-content">
                <span className="font-bold text-stone-700 block uppercase">Phase 3: Human-AI Collaboration HAVEN Network (Pending)</span>
                <p className="leading-relaxed text-stone-500">
                  Implement the interactive client boundaries. Perfect the natural language shell XSPELL allowing speech-to-intent mappings and live multi-agent logical diagnostics.
                </p>
              </div>
            </div>

            <div className="flex gap-3" id="phase-4-row">
              <div className="flex flex-col items-center shrink-0" id="phase-line-4">
                <div className="w-5 h-5 rounded-full bg-[#D1D0CC] text-[#141414] font-bold text-[9px] flex items-center justify-center border border-[#141414]">04</div>
              </div>
              <div className="text-[10px] space-y-1" id="phase-4-content">
                <span className="font-bold text-stone-700 block uppercase">Phase 4: Applications & Tools (Active Sandbox Testing)</span>
                <p className="leading-relaxed text-stone-500">
                  Construct and test the symbolic app framework. The prime objective is **DarkPaint**, representing the first AI-assisted symbolic ternary painting suite utilizing eAMM matrix code loops.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
