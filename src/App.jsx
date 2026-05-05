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
  // Map<entryId, photoUrl> — stores both found state and captured photo
  const [foundMap, setFoundMap] = useState(() => new Map());
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | analyzing | done
  const [message, setMessage] = useState("");
  const [activeResult, setActiveResult] = useState(null);
  const [detailEntry, setDetailEntry] = useState(null); // entry clicked in dex
  const imgRef = useRef(null);

  const { predict, isPlaceholder } = useTeachableModel();

  const handlePickImage = (file) => {
    if (previewUrl) {
      // 도감에 저장된 URL은 해제하지 않음
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
      console.warn(
        "[수월봉 도감] MODEL_URL이 설정되어 있지 않습니다. src/hooks/useTeachableModel.js를 수정하세요.",
      );
      setStatus("done");
      setMessage(
        "⚠️ 모델 URL을 설정하세요 (src/hooks/useTeachableModel.js의 MODEL_URL).",
      );
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
          confetti({ particleCount: 140, spread: 80, origin: { y: 0.4 } });
          setActiveResult({ entry, probability: top.probability });
          setMessage(`발견: ${entry.name}`);
        } else {
          setMessage(
            `예측된 클래스 "${top.className}"가 도감에 없습니다. 모델 클래스 이름을 확인하세요.`,
          );
        }
      } else {
        setMessage("다시 한번 선명하게 찍어보세요.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "분석 중 오류가 발생했습니다.");
    } finally {
      setStatus("done");
    }
  };

  const handleTileClick = (entry) => {
    setDetailEntry(entry);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            수월봉 지질 도감
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            지질 구조를 촬영해 도감을 채워보세요.
          </p>
        </header>

        <DexDashboard
          entries={DEX_ENTRIES}
          foundMap={foundMap}
          onTileClick={handleTileClick}
        />

        <PhotoAnalyzer
          previewUrl={previewUrl}
          status={status}
          message={message}
          onPickImage={handlePickImage}
          imgRef={imgRef}
          onImageLoaded={handleImageLoaded}
        />
      </div>

      {/* 발견 직후 팝업 */}
      <ResultModal
        entry={activeResult?.entry}
        probability={activeResult?.probability}
        onClose={() => setActiveResult(null)}
      />

      {/* 도감 타일 탭 시 상세 모달 */}
      <DexDetailModal
        entry={detailEntry}
        photoUrl={detailEntry ? foundMap.get(detailEntry.id) : null}
        onClose={() => setDetailEntry(null)}
      />
    </div>
  );
}
