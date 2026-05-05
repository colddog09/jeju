export default function DexDetailModal({ entry, photoUrl, onClose }) {
  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-zinc-900 border border-zinc-700 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 사진 */}
        {photoUrl && (
          <div className="relative bg-black shrink-0">
            <img
              src={photoUrl}
              alt={entry.name}
              className="w-full max-h-56 object-contain"
            />
            <div className="absolute top-3 right-3">
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* 내용 */}
        <div className="overflow-y-auto p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{entry.icon}</span>
            <div>
              <div className="text-xs text-emerald-400 font-medium mb-0.5">발견 완료</div>
              <h2 className="text-xl font-bold text-white">{entry.name}</h2>
            </div>
          </div>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
              설명
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {entry.description}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
              발생 과정
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {entry.formation}
            </p>
          </section>

          {!photoUrl && (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-2.5 transition text-sm"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
