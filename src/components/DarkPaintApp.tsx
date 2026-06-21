import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Sparkles, 
  Trash2, 
  Cpu, 
  Play, 
  HelpCircle, 
  Terminal, 
  Activity, 
  ShieldAlert, 
  RotateCcw,
  Square,
  Circle,
  TrendingUp,
  LineChart,
  Eraser
} from 'lucide-react';

interface StrokePoint {
  x: number;
  y: number;
  colorState: -1 | 0 | 1;
  thickness: number;
}

interface DarkPaintAppProps {
  onTriggerLog: (source: string, message: string, level: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL') => void;
}

export default function DarkPaintApp({ onTriggerLog }: DarkPaintAppProps) {
  const [colorState, setColorState] = useState<-1 | 0 | 1>(1); // -1 = black, 0 = undefined gray, 1 = Amber Yellow
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(4);
  const [painting, setPainting] = useState(false);
  const [cmdInput, setCmdInput] = useState('');
  const [shapePrediction, setShapePrediction] = useState<string>('UNKNOWN MATRIX FIELD');
  const [symmetryMode, setSymmetryMode] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingPoints = useRef<StrokePoint[]>([]);

  // Setup initial canvas dimensions and dark matrix grid
  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use responsive sizes based on container size, but clear it beautifully
    canvas.width = 460;
    canvas.height = 240;

    // Fill background with elegant dark charcoal color matching MIIDreamOS visual standards
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw high-density grid pattern
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#222222';
    const spacing = 15;
    for (let x = 0; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Centered label indicating safe sandbox mode
    ctx.fillStyle = '#E4E3E0';
    ctx.font = '9px monospace';
    ctx.opacity = 0.3;
    ctx.fillText('eAMM-D_PAINT // TERNARY REASONING VECTOR AREA', 14, 20);
    ctx.opacity = 1.0;
  };

  const getHexColor = (state: -1 | 0 | 1) => {
    switch(state) {
      case 1: return '#F59E0B'; // Bright Amber Yellow
      case -1: return '#06B6D4'; // Cosmic Neon Black / Teal Loop
      default: return '#78716C'; // Unverified Gray
    }
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setPainting(true);
    draw(e);
  };

  const stopDraw = () => {
    setPainting(false);
    // When brush stops, run a mock symbolic evaluation of the recognized shape!
    analyzeDrawing();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!painting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    const currentStrokeColor = isEraser ? '#141414' : getHexColor(colorState);
    ctx.strokeStyle = currentStrokeColor;

    // Normal path
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = currentStrokeColor;
    ctx.fill();

    // Store points for analysis
    drawingPoints.current.push({ x, y, colorState, thickness: brushSize });

    // Symmetry Mode (mirrors actions across X axis to produce gorgeous mandalas automatically)
    if (symmetryMode) {
      const mirrorX = canvas.width - x;
      ctx.beginPath();
      ctx.arc(mirrorX, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = currentStrokeColor;
      ctx.fill();
      drawingPoints.current.push({ x: mirrorX, y, colorState, thickness: brushSize });
    }
  };

  // Predicts shapes procedurally from points
  const analyzeDrawing = () => {
    const pts = drawingPoints.current;
    if (pts.length < 5) return;

    let totalX = 0, totalY = 0;
    pts.forEach(p => { totalX += p.x; totalY += p.y; });
    const centerX = totalX / pts.length;
    const centerY = totalY / pts.length;

    // Standard deviation ratio to see if it's a line or circle
    let distSum = 0;
    pts.forEach(p => {
      distSum += Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
    });
    const avgDist = distSum / pts.length;

    let variance = 0;
    pts.forEach(p => {
      const d = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
      variance += Math.pow(d - avgDist, 2);
    });
    const stDev = Math.sqrt(variance / pts.length);

    let recognized = 'COMPLEX AXIOM CHAINS';
    if (stDev < 4.5) {
      recognized = 'SHANNON STABLE CIRCLE';
    } else if (pts.length > 30) {
      recognized = 'HELIX CORE DOUBLE-WAVE';
    } else {
      recognized = 'SYMBOLIC ALIGNED VECTOR';
    }

    setShapePrediction(recognized);
  };

  // Co-design generator drawing standard templates procedurally
  const handleAiGenerateCoDesign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initCanvas();
    onTriggerLog('CO_DESIGN', 'Initiating matrix-symmetry procedural mapping...', 'INFO');

    // Draw some incredibly geometric and beautiful loops representing eAMM mathematics
    ctx.lineWidth = 1.5;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Draw swirling golden ratio logic vectors
    for(let r = 8; r < 90; r += 6) {
      ctx.strokeStyle = getHexColor(colorState);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2 * (r / 90));
      ctx.stroke();

      // Mirror lines across
      ctx.strokeStyle = '#78716C';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - r, cy - r);
      ctx.lineTo(cx + r, cy + r);
      ctx.stroke();
    }

    onTriggerLog('CO_DESIGN', 'Constructed perfect Golden Ratio ternary vector mandala. Divergence index = 0.00.', 'SUCCESS');
    setShapePrediction('GOLDEN RATIO MANDALA');
  };

  // Handle specialized command prompts
  const handleCommandDraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const cmd = cmdInput.toLowerCase().trim();
    onTriggerLog('DARKPAINT_CLI', `Interpreting symbolic intent: "${cmdInput}"`, 'INFO');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setTimeout(() => {
      if (cmd.includes('spiral')) {
        // Spiral drawing
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        let angle = 0;
        let radius = 2;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        ctx.moveTo(cx, cy);
        for(let i = 0; i < 150; i++) {
          angle = 0.1 * i;
          radius = 0.6 * i;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        onTriggerLog('DARKPAINT_CLI', 'Successfully plotted logarithmic logic spiral.', 'SUCCESS');
        setShapePrediction('LOGARITHMIC INTENSITY VECTOR');
      } else if (cmd.includes('circuit') || cmd.includes('grid')) {
        // Draw circuit trace lines
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(30, 120);
        ctx.lineTo(150, 120);
        ctx.lineTo(190, 80);
        ctx.lineTo(340, 80);
        ctx.lineTo(380, 140);
        ctx.stroke();

        ctx.fillStyle = '#78716C';
        ctx.beginPath();
        ctx.arc(30, 120, 5, 0, Math.PI * 2);
        ctx.arc(380, 140, 5, 0, Math.PI * 2);
        ctx.fill();

        onTriggerLog('DARKPAINT_CLI', 'Successfully rendered bare-metal Tesla silicon substrate trace.', 'SUCCESS');
        setShapePrediction('SILICON SUBSTRATE SCHEMATIC');
      } else if (cmd.includes('clear')) {
        initCanvas();
        drawingPoints.current = [];
        onTriggerLog('DARKPAINT_CLI', 'Graphics register vector bounds cleared.', 'INFO');
      } else {
        onTriggerLog('DARKPAINT_CLI', `Failed context parsing for intent "${cmd}". Defaulting to random neural layout...`, 'WARNING');
        // Random lines
        ctx.strokeStyle = getHexColor(colorState);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
    }, 200);

    setCmdInput('');
  };

  return (
    <div className="space-y-4" id="darkpaint-root-box">
      <div className="flex justify-between items-center" id="darkpaint-header-row">
        <div>
          <span className="font-serif italic text-xs block opacity-60" id="lbl-dpaint-meta">
            05. DarkPaint: Interactive AI-Assisted Symbolic Graphics
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-600 block mt-0.5">
            Ternary color vectors (-1, 0, 1) synchronized for real-time Bio-RoboPi pattern prediction.
          </span>
        </div>
        <div className="bg-amber-500 text-[#141414] font-mono text-[10px] px-2 py-0.5 font-bold" id="lbl-dpaint-status">
          ACTIVE DESIGN CANVAS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/40 p-3 border border-[#141414]" id="paint-panel-layout">
        
        {/* Left Toolbar controller board */}
        <div className="space-y-3 font-mono text-[10.5px]" id="dpaint-controls">
          <div>
            <span className="text-[8px] font-bold block uppercase opacity-60">Active Paint Tool</span>
            <div className="grid grid-cols-2 gap-1 mt-1 font-mono" id="tool-selectors">
              <button
                id="btn-active-tool-brush"
                onClick={() => {
                  setIsEraser(false);
                  onTriggerLog('DARKPAINT', 'Brush mode activated.', 'INFO');
                }}
                className={`p-1 border flex items-center justify-center gap-1.5 text-center transition-all duration-350 ease-in-out h-[30px] font-bold cursor-pointer ${
                  !isEraser ? 'bg-[#141414] text-white border-[#141414]' : 'bg-stone-200 border-stone-400 text-stone-700 hover:bg-stone-300'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span className="text-[8px]">BRUSH</span>
              </button>
              <button
                id="btn-active-tool-eraser"
                onClick={() => {
                  setIsEraser(true);
                  onTriggerLog('DARKPAINT', 'Eraser mode activated. Output redirected to matrix background (#141414).', 'INFO');
                }}
                className={`p-1 border flex items-center justify-center gap-1.5 text-center transition-all duration-350 ease-in-out h-[30px] font-bold cursor-pointer ${
                  isEraser ? 'bg-[#141414] text-white border-[#141414]' : 'bg-stone-200 border-stone-400 text-stone-700 hover:bg-stone-300'
                }`}
              >
                <Eraser className="w-3 h-3" />
                <span className="text-[8px]">ERASER</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-[8px] font-bold block uppercase opacity-60">Ternary Colors Selector</span>
            <div className="grid grid-cols-3 gap-1 mt-1" id="ternary-color-selectors">
              <button 
                id="btn-color-state-1"
                onClick={() => {
                  setColorState(1);
                  setIsEraser(false);
                  onTriggerLog('DARKPAINT', 'Amber Yellow color vector selected.', 'INFO');
                }}
                className={`p-1 border flex flex-col items-center justify-between text-center transition-all h-[54px] cursor-pointer ${
                  (!isEraser && colorState === 1) ? 'bg-amber-500 text-stone-900 border-[#141414]' : 'bg-stone-200 border-stone-400'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-amber-500 border border-black/40" />
                <span className="text-[7.5px] font-bold leading-none">[1] AMBER</span>
              </button>

              <button 
                id="btn-color-state-0"
                onClick={() => {
                  setColorState(0);
                  setIsEraser(false);
                  onTriggerLog('DARKPAINT', 'Neutral gray color vector selected.', 'INFO');
                }}
                className={`p-1 border flex flex-col items-center justify-between text-center transition-all h-[54px] cursor-pointer ${
                  (!isEraser && colorState === 0) ? 'bg-stone-600 text-stone-100 border-[#141414]' : 'bg-stone-200 border-stone-400'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-stone-500 border border-black/40" />
                <span className="text-[7.5px] font-bold leading-none">[0] UNKNOWN</span>
              </button>

              <button 
                id="btn-color-state-neg1"
                onClick={() => {
                  setColorState(-1);
                  setIsEraser(false);
                  onTriggerLog('DARKPAINT', 'Cosmic cyan color vector selected.', 'INFO');
                }}
                className={`p-1 border flex flex-col items-center justify-between text-center transition-all h-[54px] cursor-pointer ${
                  (!isEraser && colorState === -1) ? 'bg-cyan-600 text-cyan-100 border-[#141414]' : 'bg-stone-200 border-stone-400'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-cyan-500 border border-black/40" />
                <span className="text-[7.5px] font-bold leading-none">[-1] COSMIC</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-[8px] font-bold block uppercase opacity-60">Brush Thickness Parameters</span>
            <div className="flex gap-1.5 items-center mt-1" id="thickness-control">
              <input 
                type="range"
                min="1"
                max="12"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-stone-300 h-1 rounded"
              />
              <span className="font-bold shrink-0">{brushSize}px</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#141414]/15" id="symmetry-toggle-area">
            <label className="flex items-center gap-1.5 cursor-pointer leading-none">
              <input 
                type="checkbox"
                checked={symmetryMode}
                onChange={() => setSymmetryMode(!symmetryMode)}
                className="accent-amber-500"
              />
              <span className="font-bold text-[9.5px]">Symmetry Axis Mirror active</span>
            </label>
            <p className="text-[7.5px] opacity-75 mt-0.5 leading-normal">
              Self-balancing mathematical canvas. Ensures zero spatial entropy drift.
            </p>
          </div>

          {/* AI Helper triggers */}
          <div className="space-y-1.5 pt-1.5 border-t border-[#141414]/15" id="paint-ai-utils-area">
            <button
              id="btn-ai-codesign"
              onClick={handleAiGenerateCoDesign}
              className="w-full border border-[#141414] bg-[#141414] hover:bg-stone-800 text-amber-400 font-bold transition-colors py-1.5 text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none"
            >
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              AI Co-Design Construct
            </button>

            <button
              id="btn-clear-canvas"
              onClick={() => {
                initCanvas();
                drawingPoints.current = [];
                onTriggerLog('DARKPAINT', 'Canvas reset. Structural matrix grid initiated.', 'INFO');
              }}
              className="w-full border border-stone-400 bg-stone-200 hover:bg-stone-300 transition-colors py-1 text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none text-stone-700"
            >
              <Trash2 className="w-2.5 h-2.5" />
              Reset graphics
            </button>
          </div>

          {/* Pattern recognition analysis HUD */}
          <div className="p-2 bg-[#141414] text-[#E4E3E0] rounded-xs space-y-1 text-[9px]" id="shape-analyzer-hud">
            <span className="text-amber-400 font-bold block uppercase tracking-wider">SYM_PATTERNS ANALYZER</span>
            <div id="predicted-vector">
              <span className="opacity-60 block">RECOGNIZED VECTOR AXIOM:</span>
              <span className="font-bold block tracking-wider text-[11px] font-mono select-all text-lime-400">
                {shapePrediction}
              </span>
            </div>
          </div>
        </div>

        {/* Central Painting Canvas Area representing client container */}
        <div className="md:col-span-3 flex flex-col justify-between space-y-2" id="canvas-column">
          <div className="border border-[#141414] bg-stone-900 overflow-hidden relative cursor-crosshair shadow-sm select-none" id="canvas-card">
            <canvas 
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onMouseMove={draw}
              className="block max-w-full w-full object-cover"
              id="dpaint-main-canvas"
            />
          </div>

          {/* Interactive drawing engine CLI */}
          <form onSubmit={handleCommandDraw} className="flex border border-[#141414] bg-white mt-1" id="paint-cli-form">
            <span className="bg-[#141414] text-[#E4E3E0] font-mono text-[8px] px-2 py-1 uppercase inline-flex items-center shrink-0 font-bold" id="paint-prompt">
              PAINT_CLI:$
            </span>
            <input 
              type="text"
              id="paint-cli-input"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="Inject graphics command (e.g., 'spiral of intensity 12', 'circuit matrix')"
              className="flex-1 px-3 py-1 font-mono text-[10.5px] bg-transparent focus:outline-hidden"
            />
            <button 
              type="submit"
              id="btn-paint-cli-submit"
              className="bg-[#141414] text-[#E4E3E0] hover:bg-stone-800 transition-colors px-3 font-bold text-[9px] uppercase"
            >
              Plot
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
