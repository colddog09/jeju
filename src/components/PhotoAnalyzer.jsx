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
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-base font-bold tracking-tight" style={{ color: "#f1f5f9" }}>
          📸 사진 분석
        </h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.2)",
            color: "#7dd3fc"
          }}>
          AI 인식
        </span>
      </div>

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
        className="w-full rounded-2xl px-4 py-5 text-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
        style={previewUrl ? {
          background: "rgba(15,23,42,0.8)",
          border: "1px solid rgba(51,65,85,0.6)"
        } : {
          background: "linear-gradient(145deg, #0f2942 0%, #0c1f3d 100%)",
          border: "2px dashed rgba(14,165,233,0.4)"
        }}
      >
        <div className="text-3xl mb-1">{previewUrl ? "🔄" : "📷"}</div>
        <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
          {previewUrl ? "다시 촬영하기" : "사진 촬영 / 업로드"}
        </div>
        <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>
          {previewUrl ? "새 사진으로 다시 분석합니다" : "탭하면 후면 카메라가 열립니다"}
        </div>
      </button>

      {/* 이미지 미리보기 */}
      {previewUrl && (
        <div className="mt-3 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(51,65,85,0.5)", background: "#020617" }}>
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
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: "rgba(0,0,0,0.8)" }}>
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-t-transparent animate-spin"
                    style={{ borderColor: "rgba(14,165,233,0.3)", borderTopColor: "#0ea5e9" }} />
                  <div className="absolute inset-0 flex items-center justify-center text-lg">🔍</div>
                </div>
                <div className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>AI 분석 중...</div>
                <div className="text-xs" style={{ color: "#64748b" }}>잠시만 기다려주세요</div>
              </div>
            )}
          </div>

          {/* 결과 메시지 */}
          {message && !isAnalyzing && (
            <div
              className="px-4 py-3 flex items-center gap-2 text-sm"
              style={isSuccess ? {
                background: "rgba(251,191,36,0.1)",
                borderTop: "1px solid rgba(251,191,36,0.2)",
                color: "#fbbf24"
              } : {
                background: "rgba(15,23,42,0.8)",
                borderTop: "1px solid rgba(51,65,85,0.4)",
                color: "#94a3b8"
              }}
            >
              <span>{isSuccess ? "✅" : isError ? "📷" : "⚠️"}</span>
              <span>{message.replace("발견: ", "발견! ")}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
