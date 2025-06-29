import { useState } from "react";
import Button from "view/components/Button";
import Input from "view/components/Input";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";

export function TranslateForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const service = createDefaultFunTranslationService();
      const translated = await service.getTranslation(text);
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
          placeholder="Enter the text to translate here"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
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
