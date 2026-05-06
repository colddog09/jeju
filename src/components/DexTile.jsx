export default function DexTile({ entry, index, found, newlyFound, onClick }) {
  return (
    <div
      onClick={found ? onClick : undefined}
      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-colors duration-300 select-none ${newlyFound ? "animate-tile-found" : ""}`}
      style={found ? {
        background: "linear-gradient(145deg, #1e3a5f 0%, #0f2942 100%)",
        border: "1px solid rgba(251,191,36,0.5)",
        boxShadow: newlyFound
          ? "0 0 32px -4px rgba(251,191,36,0.6), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 0 20px -4px rgba(251,191,36,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        cursor: "pointer"
      } : {
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(51,65,85,0.6)"
      }}
    >
      {/* 번호 배지 */}
      <div
        className={`absolute top-2 left-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${newlyFound ? "animate-badge-pop" : ""}`}
        style={found ? {
          background: "rgba(251,191,36,0.2)",
          color: "#fbbf24"
        } : {
          background: "rgba(51,65,85,0.5)",
          color: "#475569"
        }}
      >
        {index}
      </div>

      {/* 아이콘 */}
      <div
        className={`text-3xl leading-none mb-1.5 ${newlyFound ? "animate-icon-reveal" : "transition-all duration-300"}`}
        style={found ? {
          filter: "drop-shadow(0 0 8px rgba(251,191,36,0.5))"
        } : {
          filter: "grayscale(1)",
          opacity: 0.2
        }}
      >
        {found ? entry.icon : "❓"}
      </div>

      {/* 이름 */}
      <div
        className="text-[11px] text-center leading-tight font-medium"
        style={{ color: found ? "#e2e8f0" : "#334155" }}
      >
        {found ? entry.name : "미발견"}
      </div>

      {/* 발견 시 하단 힌트 */}
      {found && (
        <div className="absolute bottom-1.5 right-2 text-[9px]" style={{ color: "#fbbf24" }}>
          ▶
        </div>
      )}

      {/* 발견 시 상단 빛번짐 */}
      {found && (
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(251,191,36,0.06) 0%, transparent 100%)" }} />
      )}
    </div>
  );
}
