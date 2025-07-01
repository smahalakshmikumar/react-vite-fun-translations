import { useState, useEffect, useMemo } from "react";
import { TranslateForm } from "../translate/form";
import type { Translation } from "domain/types/Translation";
import { createFunTranslationService } from "io/service/FunTranslationService";

export default function Translate() {
  const [history, setHistory] = useState<Translation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reset, setReset] = useState(false); // boolean reset flag
  const service = useMemo(() => createFunTranslationService(), []);
  const historyStorageKey = "translation-history"

  const addToHistory = (translation: Translation) => {
    setHistory((prev) => [translation, ...prev]);
    setSelectedIndex(0); // newest item is at index 0
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(historyStorageKey);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history on change
  useEffect(() => {
    if (history.length === 0) {
      localStorage.removeItem(historyStorageKey);
    } else {
      localStorage.setItem(historyStorageKey, JSON.stringify(history));
    }
  }, [history]);

  // After reset flag is true, immediately set back to false
  useEffect(() => {
    if (reset) setReset(false);
  }, [reset]);

  const clearHistory = () => {
    setHistory([]);
    setReset(true); // trigger form reset
    service.clearCache();
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen overflow-hidden">
      {/* Mobile toggle */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-bold">Translator</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-3 py-1 bg-amber-400 text-white rounded"
        >
          {sidebarOpen ? "Close History" : "Show History"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-50 border-r p-4 overflow-y-auto w-full md:w-64 md:block 
          ${sidebarOpen ? "block" : "hidden"}
        `}
      >
        <h2 className="text-lg font-bold mb-4">Past Translations</h2>
        {history.length === 0 && (
          <p className="text-sm text-gray-500">No translations yet.</p>
        )}
        <ul className="space-y-2">
          {history.map((t, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSidebarOpen(false); // close on mobile tap
              }}
              className={`p-2 rounded cursor-pointer ${
                selectedIndex === idx
                  ? "bg-amber-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {t.contents.translated.slice(0, 40)}
            </li>
          ))}
        </ul>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="mt-4 text-xs text-red-500 hover:underline"
          >
            Clear history
          </button>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-xl mx-auto space-y-8">
          <TranslateForm
            onSuccess={addToHistory}
            reset={reset}
            service={service}
          />
        </div>
      </main>
    </div>
  );
}
