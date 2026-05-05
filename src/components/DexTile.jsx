export default function DexTile({ entry, found, onClick }) {
  return (
    <div
      onClick={found ? onClick : undefined}
      className={
        "aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 transition " +
        (found
          ? "bg-zinc-800 border-emerald-500/60 shadow-[0_0_24px_-8px_rgba(16,185,129,0.6)] cursor-pointer active:scale-95 hover:bg-zinc-700"
          : "bg-zinc-900 border-zinc-800")
      }
    >
      <div
        className={
          "text-4xl leading-none mb-2 transition " +
          (found ? "" : "grayscale opacity-30")
        }
      >
        {entry.icon}
      </div>
      <div
        className={
          "text-xs text-center leading-tight " +
          (found ? "text-white font-medium" : "text-zinc-500")
        }
      >
        {found ? entry.name : "???"}
      </div>
      {found && (
        <div className="text-[10px] text-emerald-400 mt-1">탭하여 보기</div>
      )}
    </div>
  );
}
