import { useCallback, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

// TODO: Replace with your Teachable Machine "shareable link" URL.
// Get it at https://teachablemachine.withgoogle.com → Export Model → Upload (shareable link).
// The trailing slash is required.
export const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/FAnL5HNVpH/";

const isPlaceholder = (url) => !url || url.includes("REPLACE_ME");

export function useTeachableModel() {
  const modelRef = useRef(null);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(async () => {
    if (modelRef.current) return modelRef.current;
    if (isPlaceholder(MODEL_URL)) {
      const err = new Error(
        "모델 URL을 설정하세요 (src/hooks/useTeachableModel.js의 MODEL_URL).",
      );
      setLoadError(err.message);
      throw err;
    }
    const model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json",
    );
    modelRef.current = model;
    return model;
  }, []);

  const predict = useCallback(
    async (imageElement) => {
      const model = await load();
      const predictions = await model.predict(imageElement);
      return predictions.reduce(
        (best, p) => (p.probability > best.probability ? p : best),
        { className: "", probability: 0 },
      );
    },
    [load],
  );

  return { predict, loadError, isPlaceholder: isPlaceholder(MODEL_URL) };
}
