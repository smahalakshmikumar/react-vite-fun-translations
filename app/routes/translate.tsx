import { useState, useEffect, useMemo } from "react";
import { TranslateForm } from "../translate/form";
import type { Translation } from "domain/types/Translation";
import { createFunTranslationService } from "io/service/FunTranslationService";
import { MobileToggle } from "view/components/MobileToggle";
import { Sidebar } from "view/components/SideBar";

export default function Translate() {
  const [history, setHistory] = useState<Translation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reset, setReset] = useState(false); // boolean reset flag
  const service = useMemo(() => createFunTranslationService(), []);
  const historyStorageKey = "translation-history";

  const addToHistory = (translation: Translation) => {
    setHistory((prev) => [translation, ...prev]);
    setSelectedIndex(0); // newest item is at index 0
  };

  useEffect(() => {
    const saved = localStorage.getItem(historyStorageKey);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (history.length === 0) {
      localStorage.removeItem(historyStorageKey);
    } else {
      localStorage.setItem(historyStorageKey, JSON.stringify(history));
    }
  }, [history]);

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
      <MobileToggle
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        history={history}
        selectedIndex={selectedIndex}
        setSelectedIndex={(index) => {
          setSelectedIndex(index);
          setSidebarOpen(false);
        }}
        clearHistory={clearHistory}
      />
      <TranslateForm onSuccess={addToHistory} reset={reset} service={service} />
    </div>
  );
}
