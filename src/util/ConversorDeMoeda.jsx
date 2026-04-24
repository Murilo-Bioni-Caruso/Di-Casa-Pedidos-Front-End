export function formatarMoeda(valor = 0) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}