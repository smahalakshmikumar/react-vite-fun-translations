import type { Translation } from "domain/types/Translation";
import TranslationHistoryItem from "./TranslationHistoryItem";
import { TextButton } from "./Button";


export function Sidebar({
  sidebarOpen,
  history,
  selectedIndex,
  setSelectedIndex,
  clearHistory,
}: {
  sidebarOpen: boolean;
  history: Translation[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
  clearHistory: () => void;
}) {
  return (
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
          <TranslationHistoryItem
            key={idx}
            translation={t}
            isSelected={selectedIndex === idx}
            onClick={() => {
              setSelectedIndex(idx);
            }}
          />
        ))}
      </ul>
      {history.length > 0 && (
        <TextButton onClick={clearHistory}>Clear history</TextButton>
      )}
    </aside>
  );
}
