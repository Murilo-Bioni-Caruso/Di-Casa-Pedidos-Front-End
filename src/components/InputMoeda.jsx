import { formatarMoeda } from '../util/ConversorDeMoeda';

export function InputMoeda({ value = 0, onChange, ...props }) {

  const handleChange = (e) => {
    const valor = e.target.value;

    // pega só números
    const numero = Number(valor.replace(/\D/g, '')) / 100;

    onChange(numero);
  };

  return (
    <input
      {...props}
      type="text"
      value={formatarMoeda(value)}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  );
}