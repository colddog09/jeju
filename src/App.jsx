import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { DEX_ENTRIES } from "./data/dexEntries.js";
import { useTeachableModel } from "./hooks/useTeachableModel.js";
import DexDashboard from "./components/DexDashboard.jsx";
import PhotoAnalyzer from "./components/PhotoAnalyzer.jsx";
import ResultModal from "./components/ResultModal.jsx";
import DexDetailModal from "./components/DexDetailModal.jsx";

const CONFIDENCE_THRESHOLD = 0.7;

export default function App() {
  const [foundMap, setFoundMap] = useState(() => new Map());
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [activeResult, setActiveResult] = useState(null);
  const [detailEntry, setDetailEntry] = useState(null);
  const imgRef = useRef(null);

  const { predict, isPlaceholder } = useTeachableModel();

  const handlePickImage = (file) => {
    if (previewUrl) {
      const isStored = [...foundMap.values()].includes(previewUrl);
      if (!isStored) URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("analyzing");
    setMessage("");
    setActiveResult(null);
  };

  const handleImageLoaded = async () => {
    if (!imgRef.current) return;

    if (isPlaceholder) {
      setStatus("done");
      setMessage("⚠️ 모델 URL을 설정하세요 (src/hooks/useTeachableModel.js).");
      return;
    }

    try {
      const top = await predict(imgRef.current);
      if (top.probability >= CONFIDENCE_THRESHOLD) {
        const entry = DEX_ENTRIES.find((e) => e.name === top.className);
        if (entry) {
          const photo = previewUrl;
          setFoundMap((prev) => {
            const next = new Map(prev);
            next.set(entry.id, photo);
            return next;
          });
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

  return (
    <div className="min-h-screen bg-[#0d0d14] text-zinc-100">
      {/* 헤더 */}
      <header className="relative overflow-hidden px-4 pt-10 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 to-transparent pointer-events-none" />
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌋</span>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              Suwolbong
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            지질 도감 미션
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            지질 구조를 촬영해 도감을 완성하세요
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-12 space-y-8">
        <DexDashboard
          entries={DEX_ENTRIES}
          foundMap={foundMap}
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
