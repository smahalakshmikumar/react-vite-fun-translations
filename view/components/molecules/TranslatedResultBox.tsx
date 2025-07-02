type Props = {
  result: string;
};

export default function TranslatedResultBox({ result }: Props) {
  return (
    <div className="p-4 border border-amber-400 bg-amber-50 rounded">
      <strong>Translated:</strong> {result}
    </div>
  );
}
