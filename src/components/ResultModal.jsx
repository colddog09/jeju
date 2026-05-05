export default function ResultModal({ entry, probability, onClose }) {
  if (!entry) return null;
  const pct = Math.round((probability ?? 0) * 100);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-emerald-500/40 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-emerald-400 font-medium mb-1">
          새로운 발견! ({pct}% 일치)
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{entry.icon}</div>
          <div className="text-2xl font-bold text-white">{entry.name}</div>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          {entry.description}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2.5 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
