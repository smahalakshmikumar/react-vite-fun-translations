import { useState, useEffect } from "react";
import { TranslateForm } from "../translate/form";
import type { Translation } from "domain/types/Translation";
import { MobileToggle } from "view/components/molecules/MobileToggle";
import { Sidebar } from "view/components/organisms/SideBar";

export default function Translate() {
  const [history, setHistory] = useState<Translation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const historyStorageKey = "translation-history";

  // Load history from localStorage once on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(historyStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.warn("Could not load history from localStorage:", error);
      // fallback: just keep history empty
    }
    setSelectedIndex(-1);
  }, []);

  const saveHistoryToStorage = (data: Translation[]) => {
    try {
      localStorage.setItem(historyStorageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Could not save history to localStorage:", error);
    }
  };

  // addToHistory
  const addToHistory = (translation: Translation) => {
    const updated = [translation, ...history];
    setHistory(updated);
    setSelectedIndex(0);
    saveHistoryToStorage(updated);
  };

  // clearHistory
  const clearHistory = () => {
    setHistory([]);
    setSelectedIndex(-1);
    saveHistoryToStorage([]);
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
      <TranslateForm onSuccess={addToHistory} />
    </div>
  );
}
