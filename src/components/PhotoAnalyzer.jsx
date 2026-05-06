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
    e.target.value = "";
  };

  const isAnalyzing = status === "analyzing";
  const isSuccess = message?.startsWith("발견:");
  const isError = message && !isSuccess && !message.startsWith("⚠️");

  return (
    <section>
      <h2 className="text-base font-bold text-zinc-100 tracking-tight mb-3">
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

      {/* 촬영 버튼 */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isAnalyzing}
        className={
          "w-full rounded-2xl px-4 py-5 text-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 " +
          (previewUrl
            ? "bg-zinc-900 border border-zinc-700 hover:border-zinc-600"
            : "bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-dashed border-zinc-700 hover:border-emerald-600/60 hover:bg-zinc-800/80")
        }
      >
        <div className="text-3xl mb-1">{previewUrl ? "🔄" : "📸"}</div>
        <div className="text-sm font-semibold text-zinc-200">
          {previewUrl ? "다시 촬영하기" : "사진 촬영 / 업로드"}
        </div>
        <div className="text-xs text-zinc-500 mt-0.5">
          탭하면 후면 카메라가 열립니다
        </div>
      </button>

      {/* 이미지 미리보기 */}
      {previewUrl && (
        <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
          <div className="relative">
            <img
              ref={imgRef}
              src={previewUrl}
              alt="업로드된 사진"
              onLoad={onImageLoaded}
              className="block w-full max-h-72 object-contain bg-black"
            />

            {/* 분석 중 오버레이 */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-zinc-700 border-t-emerald-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-lg">🔍</div>
                </div>
                <div className="text-sm font-semibold text-zinc-200">AI 분석 중...</div>
                <div className="text-xs text-zinc-500">잠시만 기다려주세요</div>
              </div>
            )}
          </div>

          {/* 결과 메시지 */}
          {message && !isAnalyzing && (
            <div className={
              "px-4 py-3 flex items-center gap-2 text-sm border-t " +
              (isSuccess
                ? "bg-emerald-950/50 border-emerald-900/50 text-emerald-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-400")
            }>
              <span>{isSuccess ? "✅" : isError ? "📷" : "⚠️"}</span>
              <span>{message.replace("발견: ", "발견! ")}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
