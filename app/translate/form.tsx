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

  // Memoize translation services
  const services = useMemo(
    () => ({
      yoda: createYodaTranslationService(),
      pirate: createPirateTranslationService(),
    }),
    []
  );

  // Handle form submission to perform translation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Call the selected translation service
      const translation = await services[type].getTranslation(text);
      setResult(translation.contents.translated);
      onSuccess(translation);
    } catch {
      setResult("Something went wrong!"); // show error message
    } finally {
      setLoading(false);
      setText("");
    }
  };

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input field for text to translate */}
          <TextInputField
            label="Text to Translate"
            name="text"
            value={text}
            onChange={setText}
          />
          {/* Dropdown to select translation engine */}
          <SelectField
            label="Translation Type"
            name="type"
            value={type}
            onChange={setType}
          />
          {/* Submit button, disabled while loading or if text empty */}
          <PrimaryButton
            type="submit"
            disabled={loading || text.trim().length === 0}
          >
            {loading ? "Translating..." : "Translate"}
          </PrimaryButton>
          {/* Show translated result or error */}
          {result && <TranslatedResultBox result={result} />}
        </form>
      </div>
    </main>
  );
}
