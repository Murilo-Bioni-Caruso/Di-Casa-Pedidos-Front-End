export function gerarUsername(nome) {
    if (!nome || typeof nome !== 'string') return '';
    return nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}

export function gerarSenha(tamanho = 8) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
        senha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return senha;
}

export function validarSenha(senha, confirmarSenha) {
    if (!senha) return 'Senha não informada';
    if (senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
    if (senha !== confirmarSenha) return 'As senhas não coincidem';
    return null;
}

// Retorna { nivel: 'fraca' | 'media' | 'forte', texto, cor, largura }
export function analisarForcaSenha(senha) {
    if (!senha) return null;

    let pontos = 0;
    if (senha.length >= 6) pontos++;
    if (senha.length >= 10) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) return { nivel: 'fraca',  texto: 'Fraca',  cor: '#ef4444', largura: '33%'  };
    if (pontos <= 3) return { nivel: 'media',  texto: 'Média',  cor: '#f59e0b', largura: '66%'  };
    return              { nivel: 'forte', texto: 'Forte',  cor: '#22c55e', largura: '100%' };
}