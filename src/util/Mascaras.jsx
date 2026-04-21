export function formatarTelefone(valor) {
  // remove tudo que não é número
  const numeros = valor.replace(/\D/g, '');

  // aplica máscara
  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
}

export function aceitaApenasLetras(valor){
    return valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}