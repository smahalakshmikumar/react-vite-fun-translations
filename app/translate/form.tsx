import { useMemo, useState } from "react";
import Button from "view/components/Button";
import Input from "view/components/Input";
import type { Engine } from "domain/types/Engine";
import { createFunTranslationService } from "io/service/FunTranslationService";

export function TranslateForm() {
  const [text, setText] = useState("");
  const [type, setType] = useState<Engine>("yoda");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const service = useMemo(() => createFunTranslationService(), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const translated = await service.getTranslation(text, type);
      setResult(translated.contents.translated);
    } catch (err) {
      setResult("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col items-start gap-6">
        <Input
          className="w-full"
          placeholder="Enter the text to translate here"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Choose Translation:</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Engine)}
            className="p-2 border rounded"
          >
            <option value="yoda">Yoda</option>
            <option value="pirate">Pirate</option>
          </select>
        </label>
        <Button
          type="submit"
          className="p-3 border border-amber-400 bg-amber-50 rounded-md"
        >
          {loading ? "Translating..." : "Translate"}
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-amber-100 border border-amber-400 rounded-md">
            <strong>Translated:</strong> {result}
          </div>
        )}
      </fieldset>
    </form>
  );
}
