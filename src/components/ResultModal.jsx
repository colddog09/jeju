export default function ResultModal({ entry, probability, onClose }) {
  if (!entry) return null;
  const pct = Math.round((probability ?? 0) * 100);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 그라디언트 배너 */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-zinc-900 px-6 pt-8 pb-6 text-center border-b border-emerald-700/30">
          <div className="text-5xl mb-3 drop-shadow-[0_0_16px_rgba(16,185,129,0.6)]">
            {entry.icon}
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-3 py-1 mb-3">
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">New Discovery</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">{entry.name}</h2>
          <div className="text-xs text-emerald-400/80 mt-1">AI 일치도 {pct}%</div>
        </div>

        {/* 설명 */}
        <div className="bg-zinc-900 px-6 py-5">
          <p className="text-sm leading-relaxed text-zinc-300 text-center">
            {entry.description}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-bold py-3 transition text-sm tracking-wide"
          >
            도감에 추가됨 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
