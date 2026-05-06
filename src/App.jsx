import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { DEX_ENTRIES } from "./data/dexEntries.js";
import { useTeachableModel } from "./hooks/useTeachableModel.js";
import DexDashboard from "./components/DexDashboard.jsx";
import PhotoAnalyzer from "./components/PhotoAnalyzer.jsx";
import ResultModal from "./components/ResultModal.jsx";
import DexDetailModal from "./components/DexDetailModal.jsx";

const CONFIDENCE_THRESHOLD = 0.7;
const STORAGE_KEY = "suwolbong:found:v1";

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const loadStoredMap = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const obj = JSON.parse(raw);
    return new Map(Object.entries(obj));
  } catch {
    return new Map();
  }
};

export default function App() {
  const [foundMap, setFoundMap] = useState(loadStoredMap);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [activeResult, setActiveResult] = useState(null);
  const [detailEntry, setDetailEntry] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [lastFoundId, setLastFoundId] = useState(null);
  const imgRef = useRef(null);

  const { predict, isPlaceholder } = useTeachableModel();

  useEffect(() => {
    try {
      const obj = Object.fromEntries(foundMap);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {
      // 용량 초과 등은 조용히 무시
    }
  }, [foundMap]);

  const handlePickImage = async (file) => {
    setStatus("analyzing");
    setMessage("");
    setActiveResult(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      setPreviewUrl(dataUrl);
    } catch {
      setStatus("done");
      setMessage("이미지를 읽지 못했습니다.");
    }
  };

  const handleImageLoaded = async () => {
    if (!imgRef.current) return;

    if (isPlaceholder) {
      setStatus("done");
      setMessage("⚠️ 모델 URL을 설정하세요 (src/hooks/useTeachableModel.js).");
      return;
    }

    try {
      // 확률 내림차순으로 정렬된 배열 반환
      const predictions = await predict(imgRef.current);
      // 미발견 항목 중 CONFIDENCE_THRESHOLD 이상인 것 우선 선택
      const unfoundBest = predictions.find((p) => {
        const e = DEX_ENTRIES.find((d) => d.name === p.className);
        return e && !foundMap.has(e.id) && p.probability >= CONFIDENCE_THRESHOLD;
      });
      const top = unfoundBest ?? predictions[0];
      if (top.probability >= CONFIDENCE_THRESHOLD) {
        const entry = DEX_ENTRIES.find((e) => e.name === top.className);
        if (entry) {
          const photo = previewUrl;
          setFoundMap((prev) => {
            const next = new Map(prev);
            next.set(entry.id, photo);
            return next;
          });
          setLastFoundId(entry.id);
          setTimeout(() => setLastFoundId(null), 800);
          confetti({ particleCount: 160, spread: 90, origin: { y: 0.35 } });
          setActiveResult({ entry, probability: top.probability });
          setMessage(`발견: ${entry.name}`);
        } else {
          setMessage(`"${top.className}" 클래스가 도감에 없습니다.`);
        }
      } else {
        setMessage("다시 한번 선명하게 찍어보세요.");
      }
    } catch (err) {
      setMessage(err.message || "분석 중 오류가 발생했습니다.");
    } finally {
      setStatus("done");
    }
  };

  const handleReset = () => {
    setFoundMap(new Map());
    setPreviewUrl(null);
    setStatus("idle");
    setMessage("");
    setActiveResult(null);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen text-white" style={{
      background: "linear-gradient(180deg, #0c1f3d 0%, #0a2a3d 40%, #0d1f2d 100%)"
    }}>
      {/* 헤더 */}
      <header className="relative overflow-hidden px-4 pt-10 pb-8">
        {/* 배경 장식: 파도 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)" }} />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-md mx-auto">
          {/* 상단 행: 라벨 + 초기화 버튼 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌊</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "#38bdf8" }}>
                Jeju · Suwolbong
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-95"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5"
              }}
            >
              <span className="text-sm">🗑️</span>
              <span className="text-[11px] font-semibold">초기화</span>
            </button>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
            <span style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              지질 도감 미션
            </span>
          </h1>
          <p className="text-xs mt-1" style={{ color: "#7dd3fc" }}>
            수월봉의 지질 구조를 촬영해 도감을 완성하세요
          </p>

          {/* 제주 장식 태그 */}
          <div className="flex gap-2 mt-3">
            {["🍊 한라봉", "🌋 화산섬", "🌊 세계지질공원"].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                style={{
                  background: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#7dd3fc"
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 물결 구분선 */}
      <div className="relative h-6 overflow-hidden -mt-2 mb-2">
        <svg viewBox="0 0 400 24" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,12 C100,24 300,0 400,12 L400,24 L0,24 Z"
            fill="rgba(14,165,233,0.08)" />
        </svg>
      </div>

      <main className="max-w-md mx-auto px-4 pb-16 space-y-8">
        <DexDashboard
          entries={DEX_ENTRIES}
          foundMap={foundMap}
          lastFoundId={lastFoundId}
          onTileClick={setDetailEntry}
        />
        <PhotoAnalyzer
          previewUrl={previewUrl}
          status={status}
          message={message}
          onPickImage={handlePickImage}
          imgRef={imgRef}
          onImageLoaded={handleImageLoaded}
        />
      </main>

      {/* 하단 장식 */}
      <div className="max-w-md mx-auto px-4 pb-8 text-center">
        <p className="text-[11px]" style={{ color: "#334155" }}>
          🌿 제주 수월봉 화산 지질트레일 · 유네스코 세계지질공원
        </p>
      </div>

      {/* 초기화 확인 모달 */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-modal-in"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              border: "1px solid rgba(239,68,68,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-8 pb-5 text-center">
              <div className="text-5xl mb-4">🗑️</div>
              <h2 className="text-lg font-extrabold text-white mb-2">도감 초기화</h2>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                발견한 모든 도감 기록과 사진이 삭제됩니다.<br />
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <div className="px-6 pb-8 flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                style={{
                  background: "rgba(148,163,184,0.1)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  color: "#94a3b8"
                }}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  color: "white"
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      <ResultModal
        entry={activeResult?.entry}
        probability={activeResult?.probability}
        onClose={() => setActiveResult(null)}
      />
      <DexDetailModal
        entry={detailEntry}
        photoUrl={detailEntry ? foundMap.get(detailEntry.id) : null}
        onClose={() => setDetailEntry(null)}
      />
    </div>
  );
}
