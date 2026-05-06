export default function DexDetailModal({ entry, photoUrl, onClose }) {
  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 사진 영역 */}
        {photoUrl ? (
          <div className="relative bg-black shrink-0">
            <img
              src={photoUrl}
              alt={entry.name}
              className="w-full max-h-52 object-contain"
            />
            {/* 사진 위 그라디언트 오버레이 */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-zinc-300 text-xl leading-none hover:bg-black/80 transition"
            >
              ×
            </button>
          </div>
        ) : (
          /* 사진 없을 때 헤더 */
          <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-950 px-5 pt-5 pb-3 shrink-0 flex items-center justify-between">
            <div className="text-4xl">{entry.icon}</div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-xl hover:bg-zinc-700 transition"
            >
              ×
            </button>
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="overflow-y-auto flex-1 px-5 pt-4 pb-6 space-y-5">
          {/* 타이틀 */}
          <div className="flex items-center gap-3">
            {photoUrl && <span className="text-3xl">{entry.icon}</span>}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">발견 완료</span>
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">{entry.name}</h2>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-zinc-800" />

          {/* 설명 */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">설명</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-300 pl-3">
              {entry.description}
            </p>
          </section>

          {/* 발생 과정 */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 rounded-full bg-teal-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">발생 과정</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-300 pl-3">
              {entry.formation}
            </p>
          </section>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-300 font-semibold py-3 transition text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
