"use client";

// Realistic Alpha Edge trading dashboard mockup.
// Replace this component with a <video> element once you have a screen recording:
//   <video autoPlay muted loop playsInline className="w-full h-full object-cover">
//     <source src="/alpha-edge-demo.mp4" type="video/mp4" />
//   </video>

const holdings = [
  { ticker: "NVDA", name: "NVIDIA Corp", alloc: 28.4, change: +4.18, value: "£35,450" },
  { ticker: "AAPL", name: "Apple Inc", alloc: 22.1, change: +0.82, value: "£27,600" },
  { ticker: "MSFT", name: "Microsoft", alloc: 18.7, change: -0.34, value: "£23,340" },
  { ticker: "TSLA", name: "Tesla Inc", alloc: 14.2, change: +2.61, value: "£17,720" },
  { ticker: "SPY",  name: "S&P 500 ETF", alloc: 16.6, change: +0.41, value: "£20,740" },
];

const chartPoints = [
  [0, 88], [30, 82], [60, 75], [80, 79], [110, 68],
  [140, 60], [165, 55], [195, 42], [220, 48], [250, 35],
  [280, 28], [310, 32], [340, 20], [370, 15], [400, 18],
  [430, 10], [460, 8], [490, 12], [520, 6],
];

function buildPath(pts: number[][]): string {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

export function AlphaDashboard() {
  const line = buildPath(chartPoints);
  const area = `${line} L 520 100 L 0 100 Z`;

  return (
    <div className="w-full h-full bg-[#0c0c10] text-white overflow-hidden flex flex-col select-none">

      {/* Top nav */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2563eb] flex items-center justify-center">
            <span className="text-[9px] font-black text-white">α</span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight">Alpha Edge</span>
        </div>
        <div className="flex gap-5">
          {["Portfolio", "Analysis", "Signals", "Alerts"].map((t) => (
            <span key={t} className={`text-[11px] cursor-pointer ${t === "Portfolio" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px]">T</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">

        {/* Left — chart + stats */}
        <div className="flex-1 flex flex-col px-5 pt-4 pb-3 min-w-0">

          {/* Portfolio value */}
          <div className="mb-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Portfolio Value</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[28px] font-bold tracking-tight leading-none">£124,850</span>
              <span className="text-[12px] text-emerald-400 font-medium">▲ +2.4% today</span>
              <span className="text-[11px] text-zinc-500">+18.7% YTD</span>
            </div>
          </div>

          {/* Time range tabs */}
          <div className="flex gap-3 mb-2">
            {["1D","1W","1M","3M","YTD","1Y"].map((r) => (
              <button key={r} className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${r === "1M" ? "bg-[#2563eb]/20 text-[#2563eb]" : "text-zinc-500 hover:text-zinc-300"}`}>
                {r}
              </button>
            ))}
          </div>

          {/* SVG area chart */}
          <div className="flex-1 min-h-0 relative">
            <svg
              viewBox="0 0 520 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              ))}
              <path d={area} fill="url(#areaGrad)" />
              <path d={line} stroke="#2563eb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Current value dot */}
              <circle cx="520" cy="6" r="3" fill="#2563eb" />
            </svg>
          </div>
        </div>

        {/* Right — holdings */}
        <div className="w-56 border-l border-white/5 flex flex-col flex-shrink-0">
          <div className="px-4 pt-4 pb-2 border-b border-white/5">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Holdings</p>
          </div>
          <div className="flex-1 overflow-auto">
            {holdings.map((h) => (
              <div key={h.ticker} className="px-4 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-semibold text-white">{h.ticker}</span>
                  <span className={`text-[11px] font-medium ${h.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {h.change >= 0 ? "+" : ""}{h.change}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500">{h.name}</span>
                  <span className="text-[10px] text-zinc-400">{h.value}</span>
                </div>
                {/* Allocation bar */}
                <div className="mt-1.5 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563eb] rounded-full"
                    style={{ width: `${h.alloc}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom signal bar */}
      <div className="flex items-center gap-6 px-5 py-2.5 border-t border-white/5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-zinc-400">3 buy signals active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] text-zinc-400">TradingView synced</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span className="text-[10px] text-zinc-500">Last updated 2 min ago</span>
        </div>
      </div>
    </div>
  );
}
