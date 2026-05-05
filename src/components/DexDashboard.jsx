import DexTile from "./DexTile.jsx";

export default function DexDashboard({ entries, foundMap, onTileClick }) {
  const foundCount = foundMap.size;
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 className="text-lg font-semibold text-zinc-100">도감</h2>
        <span className="text-sm text-zinc-400">
          {foundCount} / {entries.length} 발견
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {entries.map((e) => (
          <DexTile
            key={e.id}
            entry={e}
            found={foundMap.has(e.id)}
            onClick={() => onTileClick(e)}
          />
        ))}
      </div>
    </section>
  );
}
