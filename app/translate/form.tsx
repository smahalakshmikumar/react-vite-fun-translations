import { useEffect, useState } from "react";
import { ENGINES, type Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import type CacheService from "io/service/CacheService";
import { TranslateFormView } from "view/components/TranslateFormView";

export function TranslateForm({
  onSuccess,
  reset,
  service,
}: {
  onSuccess: (t: Translation) => void;
  reset: boolean;
  service: CacheService;
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState<Engine>(ENGINES.yoda);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reset) {
      setText("");
      setType(ENGINES.yoda);
      setResult(null);
      setLoading(false);
    }
  }, [reset]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const translated = await service.getTranslation(text, type);
      setResult(translated.contents.translated);
      onSuccess(translated);
    } catch {
      setResult("Something went wrong!");
    } finally {
      setLoading(false);
      setText("");
    }
  };

  return (
    <TranslateFormView
      text={text}
      setText={setText}
      type={type}
      setType={setType}
      loading={loading}
      result={result}
      onSubmit={handleSubmit}
    />
  );
}
