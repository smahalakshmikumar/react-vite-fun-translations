type Props = {
  label: string;
  name: string;
  children: React.ReactNode;
};

export default function FormField({ label, name, children }: Props) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}
