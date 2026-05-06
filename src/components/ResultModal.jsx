export default function ResultModal({ entry, probability, onClose }) {
  if (!entry) return null;
  const pct = Math.round((probability ?? 0) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 배너 */}
        <div className="px-6 pt-10 pb-7 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #0c2d5e 0%, #1a1a0f 50%, #3d1a00 100%)",
            borderBottom: "1px solid rgba(251,191,36,0.3)"
          }}>
          {/* 배경 빛번짐 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)" }} />
          </div>

          <div className="relative">
            <div className="text-6xl mb-4" style={{ filter: "drop-shadow(0 0 20px rgba(251,191,36,0.6))" }}>
              {entry.icon}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.4)"
              }}>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#fbbf24" }}>
                ✨ New Discovery
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{entry.name}</h2>
            <div className="text-xs mt-2" style={{ color: "#7dd3fc" }}>
              AI 일치도 <span className="font-bold" style={{ color: "#38bdf8" }}>{pct}%</span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="px-6 py-6"
          style={{ background: "linear-gradient(180deg, #0f172a 0%, #0a1628 100%)" }}>
          <p className="text-sm leading-relaxed text-center" style={{ color: "#cbd5e1" }}>
            {entry.description}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-xl font-bold py-3 transition-all text-sm tracking-wide active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
              color: "#0a1628"
            }}
          >
            도감에 추가됨 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
