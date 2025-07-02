import FormField from "../atoms/FormField";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export default function TextInputField({
  label,
  name,
  value,
  onChange,
}: Props) {
  return (
    <FormField label={label} name={name}>
      <textarea
        id={name}
        name={name}
        className="w-full p-3 border rounded resize-none"
        rows={4}
        placeholder="Enter text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </FormField>
  );
}
