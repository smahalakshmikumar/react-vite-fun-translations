import type { Translation } from "domain/types/Translation";

interface TranslationHistoryItemProps {
  translation: Translation;
  isSelected: boolean;
  onClick: () => void;
}

export default function TranslationHistoryItem({
  translation,
  isSelected,
  onClick,
}: TranslationHistoryItemProps) {
  return (
    <li
      onClick={onClick}
      className={`p-2 rounded cursor-pointer ${
        isSelected ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      {translation.contents.translated.slice(0, 40)}
    </li>
  );
}
