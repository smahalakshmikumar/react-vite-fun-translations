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

  // Load translation history from localStorage once on  mount
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
      // fallback: keep history empty if load fails
    }
    setSelectedIndex(-1); // reset selection on load
  }, []);

  // Helper to save current history state to localStorage
  const saveHistoryToStorage = (data: Translation[]) => {
    try {
      localStorage.setItem(historyStorageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Could not save history to localStorage:", error);
    }
  };

  // Add a new translation to history (newest first), update selection, and save
  const addToHistory = (translation: Translation) => {
    const updated = [translation, ...history];
    setHistory(updated);
    setSelectedIndex(0);
    saveHistoryToStorage(updated);
  };

  // Clear all history and reset selection, persist empty array
  const clearHistory = () => {
    setHistory([]);
    setSelectedIndex(-1);
    saveHistoryToStorage([]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen overflow-hidden">
      {/* Toggle button for sidebar visibility on mobile */}
      <MobileToggle
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      {/* Sidebar showing translation history and controls */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        history={history}
        selectedIndex={selectedIndex}
        setSelectedIndex={(index) => {
          setSelectedIndex(index);
          setSidebarOpen(false); // close sidebar on selection (mobile UX)
        }}
        clearHistory={clearHistory}
      />
      {/* Form to submit text for translation */}
      <TranslateForm onSuccess={addToHistory} />
    </div>
  );
}
