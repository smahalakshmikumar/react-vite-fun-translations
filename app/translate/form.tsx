import { useEffect, useState } from "react";
import { ENGINES, type Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import type CacheService from "io/service/CacheService";

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

  // Reset form when reset changes to true
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
    } catch (err) {
      setResult("Something went wrong!");
    } finally {
      setLoading(false);
      setText(""); // clear input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-semibold">Text to Translate</label>
        <textarea
          className="w-full p-3 border rounded resize-none"
          rows={4}
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Translation Type</label>
        <select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            if (value === ENGINES.yoda || value === ENGINES.pirate) {
              setType(value);
            }
          }}
          className="w-full p-2 border rounded"
        >
          <option value={ENGINES.yoda}>Yoda</option>
          <option value={ENGINES.pirate}>Pirate</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-amber-400 text-white rounded disabled:opacity-50"
        disabled={loading || text.trim().length === 0}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {result && (
        <div className="p-4 border border-amber-400 bg-amber-50 rounded">
          <strong>Translated:</strong> {result}
        </div>
      )}
    </form>
  );
}
