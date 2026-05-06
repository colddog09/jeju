export default function DexTile({ entry, index, found, onClick }) {
  return (
    <div
      onClick={found ? onClick : undefined}
      className={
        "relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-200 select-none " +
        (found
          ? "bg-gradient-to-b from-zinc-800 to-zinc-900 border border-emerald-500/50 shadow-[0_0_20px_-6px_rgba(16,185,129,0.5)] cursor-pointer active:scale-95 hover:border-emerald-400/70 hover:shadow-[0_0_28px_-4px_rgba(16,185,129,0.6)]"
          : "bg-zinc-900/80 border border-zinc-800")
      }
    >
      {/* 번호 배지 */}
      <div className={
        "absolute top-2 left-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center " +
        (found ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-600")
      }>
        {index}
      </div>

      {/* 아이콘 */}
      <div className={
        "text-3xl leading-none mb-1.5 transition-all duration-300 " +
        (found ? "drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "grayscale opacity-25")
      }>
        {found ? entry.icon : "❓"}
      </div>

      {/* 이름 */}
      <div className={
        "text-[11px] text-center leading-tight font-medium " +
        (found ? "text-zinc-200" : "text-zinc-600")
      }>
        {found ? entry.name : "미발견"}
      </div>

      {/* 발견 시 하단 힌트 */}
      {found && (
        <div className="absolute bottom-1.5 right-2 text-[9px] text-emerald-500/70">
          ▶
        </div>
      )}
    </div>
  );
}
