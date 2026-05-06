import DexTile from "./DexTile.jsx";

export default function DexDashboard({ entries, foundMap, onTileClick }) {
  const foundCount = foundMap.size;
  const pct = Math.round((foundCount / entries.length) * 100);

  return (
    <section>
      {/* 진행도 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold tracking-tight" style={{ color: "#f1f5f9" }}>
            🗺️ 도감
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
            탭해서 자세히 보기
          </p>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold" style={{ color: "#fbbf24" }}>
            {foundCount}
          </span>
          <span className="text-sm font-normal" style={{ color: "#475569" }}>
            {" "}/ {entries.length}
          </span>
          <p className="text-[11px]" style={{ color: "#64748b" }}>{pct}% 완성</p>
        </div>
      </div>

      {/* 진행 바 */}
      <div className="h-2 w-full rounded-full mb-4 overflow-hidden"
        style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.15)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #0ea5e9 0%, #fbbf24 60%, #f97316 100%)"
          }}
        />
      </div>

      {/* 타일 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {entries.map((e, i) => (
          <DexTile
            key={e.id}
            entry={e}
            index={i + 1}
            found={foundMap.has(e.id)}
            onClick={() => onTileClick(e)}
          />
        ))}
      </div>

      {foundCount === entries.length && (
        <div className="mt-4 rounded-2xl px-4 py-4 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(249,115,22,0.15) 100%)",
            border: "1px solid rgba(251,191,36,0.4)"
          }}>
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-base font-bold" style={{ color: "#fbbf24" }}>도감 완성!</div>
          <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
            수월봉의 6개 지질 구조를 모두 발견했습니다
          </div>
        </div>
      )}
    </section>
  );
}
