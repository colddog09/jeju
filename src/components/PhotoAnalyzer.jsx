import { useRef } from "react";

export default function PhotoAnalyzer({
  previewUrl,
  status,
  message,
  onPickImage,
  imgRef,
  onImageLoaded,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onPickImage(file);
    e.target.value = ""; // allow re-selecting same file
  };

  const isAnalyzing = status === "analyzing";

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-zinc-100 mb-3 px-1">
        사진 분석
      </h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isAnalyzing}
        className="w-full rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 hover:bg-zinc-800/60 active:bg-zinc-800 transition px-4 py-6 text-center disabled:opacity-50"
      >
        <div className="text-3xl mb-1">📸</div>
        <div className="text-sm text-zinc-300">
          {previewUrl ? "다시 촬영하기" : "사진 촬영 / 업로드"}
        </div>
        <div className="text-xs text-zinc-500 mt-1">
          탭하면 후면 카메라가 열립니다
        </div>
      </button>

      {previewUrl && (
        <div className="mt-4 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <div className="relative">
            <img
              ref={imgRef}
              src={previewUrl}
              alt="업로드된 사진"
              onLoad={onImageLoaded}
              crossOrigin="anonymous"
              className="block w-full max-h-80 object-contain bg-black"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full border-4 border-zinc-600 border-t-emerald-400 animate-spin" />
                <div className="text-sm text-zinc-200">AI 분석 중...</div>
              </div>
            )}
          </div>
          {message && !isAnalyzing && (
            <div className="px-4 py-3 text-sm text-zinc-300 border-t border-zinc-800">
              {message}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
