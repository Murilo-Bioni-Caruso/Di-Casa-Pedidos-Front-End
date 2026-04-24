export function Input({ value, onChange, mask, ...props }) {

  const handleChange = (e) => {
    let valor = e.target.value;

    if (mask) {
      valor = mask(valor);
    }

    onChange(valor);
  };

  return (
    <input
      {...props}
      value={value || ''} // 👈 evita erro de uncontrolled
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none"
    />
  );
}