export default function DexDetailModal({ entry, photoUrl, onClose }) {
  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
        style={{
          background: "linear-gradient(180deg, #0c1f3d 0%, #0a1628 100%)",
          border: "1px solid rgba(14,165,233,0.2)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 사진 영역 */}
        {photoUrl ? (
          <div className="relative shrink-0" style={{ background: "#000" }}>
            <img
              src={photoUrl}
              alt={entry.name}
              className="w-full max-h-52 object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
              style={{ background: "linear-gradient(to top, #0c1f3d, transparent)" }} />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xl leading-none transition"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            >
              ×
            </button>
          </div>
        ) : (
          <div className="relative px-5 pt-6 pb-4 shrink-0 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #0c2d5e 0%, #0c1f3d 100%)" }}>
            <div className="text-4xl" style={{ filter: "drop-shadow(0 0 12px rgba(251,191,36,0.5))" }}>
              {entry.icon}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition"
              style={{ background: "rgba(14,165,233,0.15)", color: "#94a3b8" }}
            >
              ×
            </button>
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="overflow-y-auto flex-1 px-5 pt-4 pb-6 space-y-5">
          {/* 타이틀 */}
          <div className="flex items-center gap-3">
            {photoUrl && (
              <span className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.5))" }}>
                {entry.icon}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: "#fbbf24" }}>
                  ✓ 발견 완료
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">{entry.name}</h2>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px" style={{ background: "rgba(14,165,233,0.15)" }} />

          {/* 설명 */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: "#0ea5e9" }} />
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
                설명
              </h3>
            </div>
            <p className="text-sm leading-relaxed pl-3" style={{ color: "#cbd5e1" }}>
              {entry.description}
            </p>
          </section>

          {/* 발생 과정 */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: "#fbbf24" }} />
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
                발생 과정
              </h3>
            </div>
            <p className="text-sm leading-relaxed pl-3" style={{ color: "#cbd5e1" }}>
              {entry.formation}
            </p>
          </section>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl font-semibold py-3 transition text-sm active:scale-[0.98]"
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.2)",
              color: "#7dd3fc"
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
