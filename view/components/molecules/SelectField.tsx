import FormField from "../atoms/FormField";
import { ENGINES, type Engine } from "domain/types/Engine";

type Props = {
  label: string;
  name: string;
  value: Engine;
  onChange: (value: Engine) => void;
};

export default function SelectField({ label, name, value, onChange }: Props) {
  return (
    <FormField label={label} name={name}>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as Engine)}
        className="w-full p-2 border rounded"
      >
        <option value={ENGINES.yoda}>Yoda</option>
        <option value={ENGINES.pirate}>Pirate</option>
      </select>
    </FormField>
  );
}
