export default function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      {children}
    </div>
  );
}
