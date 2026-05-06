import DexTile from "./DexTile.jsx";

export default function DexDashboard({ entries, foundMap, onTileClick }) {
  const foundCount = foundMap.size;
  const pct = Math.round((foundCount / entries.length) * 100);

  return (
    <section>
      {/* 진행도 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-zinc-100 tracking-tight">도감</h2>
        <span className="text-sm font-semibold text-emerald-400">
          {foundCount} <span className="text-zinc-600 font-normal">/ {entries.length}</span>
        </span>
      </div>

      {/* 진행 바 */}
      <div className="h-1.5 w-full bg-zinc-800 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
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
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 px-4 py-3 text-center">
          <div className="text-lg font-bold text-emerald-300">🎉 도감 완성!</div>
          <div className="text-xs text-zinc-400 mt-0.5">6개 지질 구조를 모두 발견했습니다</div>
        </div>
      )}
    </section>
  );
}
