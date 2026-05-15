const BASE_URL = 'http://localhost:3001';

async function request(endpoint, options = {}) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.erro || `Erro ${resposta.status}`);
  }

  return resposta.json();
}

// ─── PRODUTOS ────────────────────────────────────────────
export const produtosApi = {
  listar: () =>
    request('/produtos'),

  criar: (produto) =>
    request('/produtos', { method: 'POST', body: JSON.stringify(produto) }),

  atualizar: (produto) =>
    request(`/produtos/${produto.id}`, { method: 'PUT', body: JSON.stringify(produto) }),

  remover: (id) =>
    request(`/produtos/${id}`, { method: 'DELETE' }),
};

// ─── USUÁRIOS ────────────────────────────────────────────
export const usuariosApi = {
  listar: () =>
    request('/usuarios'),

  criar: (usuario) =>
    request('/usuarios', { method: 'POST', body: JSON.stringify(usuario) }),

  atualizar: (usuario) =>
    request(`/usuarios/${usuario.id}`, { method: 'PUT', body: JSON.stringify(usuario) }),

  login: (credenciais) =>
    request('/usuarios/login', { method: 'POST', body: JSON.stringify(credenciais) }),
};

// ─── PEDIDOS ─────────────────────────────────────────────
export const pedidosApi = {
  listar: () =>
    request('/pedidos'),

  criar: (pedido) =>
    request('/pedidos', { method: 'POST', body: JSON.stringify(pedido) }),

    atualizarStatus: (id, status, horarioEntrega) =>
      request(`/pedidos/${id}`, { method: 'PUT', body: JSON.stringify({ status, horarioEntrega }) }),
  };

// ─── CONFIGURAÇÕES ───────────────────────────────────────
export const configuracoesApi = {
  obter: () =>
    request('/configuracoes'),

  atualizar: (configuracoes) =>
    request('/configuracoes', { method: 'PUT', body: JSON.stringify(configuracoes) }),
};