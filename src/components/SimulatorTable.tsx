import { useState, useEffect } from 'react';
import { Sliders, Zap, Award, Server, RefreshCw } from 'lucide-react';

interface SimulatorTableProps {
  currentLogicState: number;
  onTweakSimulation: (wattage: number, entropy: number, fidelity: number) => void;
}

export default function SimulatorTable({
  currentLogicState,
  onTweakSimulation,
}: SimulatorTableProps) {
  // Simulator configuration states
  const [wattage, setWattage] = useState(12);
  const [entropyThreshold, setEntropyThreshold] = useState(0.25);
  const [fidelityMultiplier, setFidelityMultiplier] = useState(99.2);

  // Sync state dynamic calculation
  useEffect(() => {
    // Generate simulated logical fidelity based on wattage and logic state
    // Ternary 0 represents "Unknown" / fallback, -1 is Prover, 1 is Verify response
    let baseFidelity = 99.2;
    if (currentLogicState === 0) {
      // Entropy high because unknown state is active
      baseFidelity = 84.1;
    } else if (currentLogicState === -1) {
      baseFidelity = 99.8;
    } else {
      baseFidelity = 99.4;
    }

    // Wattage correlation: lower than 8W reduces fidelity, higher than 50W does not increase further but wastes power.
    if (wattage < 8) {
      baseFidelity -= (8 - wattage) * 3.5;
    } else if (wattage > 60) {
      baseFidelity += 0.1;
    }

    // Entropy correlation: higher threshold = lower fidelity (more loose search bounds)
    baseFidelity -= (entropyThreshold - 0.1) * 6;

    // Bound it
    const finalFidelity = Math.max(10, Math.min(100, parseFloat(baseFidelity.toFixed(1))));
    setFidelityMultiplier(finalFidelity);

    // Bubble simulation changes up to App
    onTweakSimulation(wattage, entropyThreshold, finalFidelity);
  }, [wattage, entropyThreshold, currentLogicState, onTweakSimulation]);

  // Derived calculations
  const energyDelta = (350 / wattage).toFixed(1); // assumed reference standard is 350 Watts
  const compressionRatio = entropyThreshold < 0.3 ? '16:1 Comp' : entropyThreshold < 0.6 ? '24:1 Comp' : '32:1 Comp';
  const modelSize = entropyThreshold < 0.3 ? '32 MB (Core)' : entropyThreshold < 0.6 ? '24 MB (Dense)' : '16 MB (Hyper)';

  return (
    <div className="space-y-4" id="sim-table-container">
      <div className="flex justify-between items-end" id="sim-header">
        <div>
          <span className="font-serif italic text-xs block opacity-60" id="lbl-sbc-meta">
            03. SBC (Simulate-Before-Compress) Benchmarks
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-600 block mt-0.5" id="lbl-sbc-desc">
            Deterministic efficiency outputs derived from cold boot Axiomatics.
          </span>
        </div>
        <div className="bg-[#141414] text-[#E4E3E0] font-mono text-[10px] px-2 py-0.5 flex items-center gap-1" id="lbl-mode">
          <Zap className="w-3 h-3 text-amber-400" id="icon-zap" />
          <span>SIMULATOR {wattage < 8 ? 'LOW_PWR_BOUND' : 'OPTIMAL'}</span>
        </div>
      </div>

      <div className="border border-[#141414] overflow-hidden bg-white/40" id="table-wrapper">
        <table className="w-full text-left font-mono text-[11px] border-collapse" id="tbl-sbc">
          <thead>
            <tr className="border-b border-[#141414] opacity-50 bg-[#D1D0CC]/30 uppercase text-[9px] tracking-wider">
              <th className="p-2 font-normal">Metric</th>
              <th className="p-2 font-normal">Benchmark</th>
              <th className="p-2 font-normal text-right">Delta</th>
              <th className="p-2 font-normal pl-4">Empirical Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            <tr className="hover:bg-[#141414]/5 transition-colors" id="row-energy">
              <td className="p-2 font-bold flex gap-1.5 items-center">
                <Zap className="w-3 h-3 text-stone-700" id="icon-row-energy" />
                Energy Consumption
              </td>
              <td className="p-2 font-semibold">{wattage} Watts</td>
              <td className="p-2 text-right font-bold text-emerald-800">{energyDelta}x Gain</td>
              <td className="p-2 pl-4 text-xs opacity-80">eAMM matrix bypass. Standard GPU = 350W</td>
            </tr>

            <tr className="hover:bg-[#141414]/5 transition-colors" id="row-size">
              <td className="p-2 font-bold flex gap-1.5 items-center">
                <Server className="w-3 h-3 text-stone-700" id="icon-row-size" />
                Model Size
              </td>
              <td className="p-2 font-semibold">{modelSize}</td>
              <td className="p-2 text-right font-bold text-stone-800">{compressionRatio}</td>
              <td className="p-2 pl-4 text-xs opacity-80">Symbolic map layout, zero-weights overhead</td>
            </tr>

            <tr className="hover:bg-[#141414]/5 transition-colors" id="row-fidelity">
              <td className="p-2 font-bold flex gap-1.5 items-center">
                <Award className="w-3 h-3 text-stone-700" id="icon-row-fidelity" />
                Logical Fidelity
              </td>
              <td className="p-2 font-semibold">{fidelityMultiplier}%</td>
              <td className="p-2 text-right font-bold text-rose-800">
                {fidelityMultiplier >= 95 ? 'Det-Prec' : 'Unbounded'}
              </td>
              <td className="p-2 pl-4 text-xs opacity-80">
                {fidelityMultiplier < 80 ? 'Warning: Entropy hazard' : 'High-order multi-agent reasoning paths'}
              </td>
            </tr>

            <tr className="hover:bg-[#141414]/5 transition-colors" id="row-cost">
              <td className="p-2 font-bold flex gap-1.5 items-center">
                <RefreshCw className="w-3 h-3 text-stone-700" id="icon-row-cost" />
                Training Cost
              </td>
              <td className="p-2 font-semibold">$0.00</td>
              <td className="p-2 text-right font-bold text-emerald-800">Instant</td>
              <td className="p-2 pl-4 text-xs opacity-80">Axiomatic cold boot initialization, trainingless AGI</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Simulator Tweak Knobs */}
      <div className="border border-[#141414] p-3 bg-[#D1D0CC]/30 font-mono space-y-3" id="sim-tweaker-panel">
        <div className="flex items-center gap-1.5 border-b border-[#141414]/20 pb-1" id="tweak-panel-title">
          <Sliders className="w-3.5 h-3.5" id="icon-sliders" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Dynamic Controller Board</span>
        </div>

        <div className="grid grid-cols-2 gap-4" id="sliders-grid">
          <div className="space-y-1" id="slider-block-wattage">
            <div className="flex justify-between text-[9px] font-bold" id="slider-labels-wattage">
              <span>TARGET INTENSITY (WATTS)</span>
              <span className="text-stone-700">{wattage}W</span>
            </div>
            <input
              type="range"
              min="2"
              max="150"
              value={wattage}
              id="slider-wattage"
              onChange={(e) => setWattage(parseInt(e.target.value))}
              className="w-full accent-[#141414] h-1 bg-stone-300 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[7px] text-stone-500" id="slider-range-labels-wattage">
              <span>2W (Min State)</span>
              <span>150W (Max Probe)</span>
            </div>
          </div>

          <div className="space-y-1" id="slider-block-entropy">
            <div className="flex justify-between text-[9px] font-bold" id="slider-labels-entropy">
              <span>ENTROPIC BOUND COEFFICIENT</span>
              <span className="text-stone-700">{entropyThreshold} Threshold</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={entropyThreshold}
              id="slider-entropy"
              onChange={(e) => setEntropyThreshold(parseFloat(e.target.value))}
              className="w-full accent-[#141414] h-1 bg-stone-300 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[7px] text-stone-500" id="slider-range-labels-entropy">
              <span>0.05 (Rigid Proof)</span>
              <span>0.95 (Relaxed Entropy)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
