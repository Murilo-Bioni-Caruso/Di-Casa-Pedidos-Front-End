export function Select({
  value,
  onChange,
  options
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}