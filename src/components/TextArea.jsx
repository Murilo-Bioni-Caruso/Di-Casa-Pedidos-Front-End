export function TextArea({
  placeholder,
  value,
  onChange
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded"
    />
  );
}