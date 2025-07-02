import { useState, useMemo } from "react";
import { ENGINES, type Engine } from "domain/types/Engine";
import type { Translation } from "domain/types/Translation";
import TextInputField from "../../view/components/molecules/TextInputField";
import SelectField from "view/components/molecules/SelectField";
import { PrimaryButton } from "view/components/atoms/Button";
import TranslatedResultBox from "view/components/molecules/TranslatedResultBox";
import {
  createYodaTranslationService,
  createPirateTranslationService,
} from "io/service/FunTranslationService";

export function TranslateForm({
  onSuccess,
}: {
  onSuccess: (t: Translation) => void;
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState<Engine>(ENGINES.yoda);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Memoize services by engine
  const services = useMemo(
    () => ({
      yoda: createYodaTranslationService(),
      pirate: createPirateTranslationService(),
    }),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const translation = await services[type].getTranslation(text);
      setResult(translation.contents.translated);
      onSuccess(translation);
    } catch {
      setResult("Something went wrong!");
    } finally {
      setLoading(false);
      setText("");
    }
  };

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInputField
            label="Text to Translate"
            name="text"
            value={text}
            onChange={setText}
          />
          <SelectField
            label="Translation Type"
            name="type"
            value={type}
            onChange={setType}
          />
          <PrimaryButton
            type="submit"
            disabled={loading || text.trim().length === 0}
          >
            {loading ? "Translating..." : "Translate"}
          </PrimaryButton>
          {result && <TranslatedResultBox result={result} />}
        </form>
      </div>
    </main>
  );
}
