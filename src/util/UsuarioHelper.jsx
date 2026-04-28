export function gerarUsername(nome) {
    if (!nome || typeof nome !== 'string') return '';
    return nome
        .normalize('NFD') // remove acentos
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '') // remove especiais
        .replace(/\s+/g, '-'); // espaço -> hífen
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