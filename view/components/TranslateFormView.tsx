import { ENGINES, type Engine } from "domain/types/Engine";
import { PrimaryButton } from "./Button";
import FormField from "./FormField";

type TranslateFormViewProps = {
  text: string;
  setText: (value: string) => void;
  type: Engine;
  setType: (value: Engine) => void;
  loading: boolean;
  result: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function TranslateFormView({
  text,
  setText,
  type,
  setType,
  loading,
  result,
  onSubmit,
}: TranslateFormViewProps) {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField label="Text to Translate">
            <textarea
              className="w-full p-3 border rounded resize-none"
              rows={4}
              placeholder="Enter text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </FormField>
          <FormField label="Translation Type">
            <select
              value={type}
              onChange={(e) => {
                const value = e.target.value;
                if (value === ENGINES.yoda || value === ENGINES.pirate) {
                  setType(value as Engine);
                }
              }}
              className="w-full p-2 border rounded"
            >
              <option value={ENGINES.yoda}>Yoda</option>
              <option value={ENGINES.pirate}>Pirate</option>
            </select>
          </FormField>
          <PrimaryButton
            type="submit"
            disabled={loading || text.trim().length === 0}
          >
            {loading ? "Translating..." : "Translate"}
          </PrimaryButton>
          {result && (
            <div className="p-4 border border-amber-400 bg-amber-50 rounded">
              <strong>Translated:</strong> {result}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
