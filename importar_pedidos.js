
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:8080/pedidos';
const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
const JSON_PATH = path.join(__dirname, 'data', 'pedidos.json');

async function importar() {
    try {
        console.log('📖 Lendo arquivo JSON...');
        const data = fs.readFileSync(JSON_PATH, 'utf8');
        const pedidos = JSON.parse(data);
        
        // Pegar os próximos 100 (pulando os 300 já tentados)
        const pedidosParaImportar = pedidos.slice(300, 400);
        console.log(`🚀 Iniciando importação de ${pedidosParaImportar.length} pedidos para 09/06 e 10/06...`);

        for (const p of pedidosParaImportar) {
            const novoStatus = Math.random() > 0.1 ? 'entregue' : 'cancelado';
            
            // Gerar data entre 09/06 e 10/06
            const dia = Math.random() > 0.5 ? '09' : '10';
            const hora = String(Math.floor(Math.random() * 12) + 11).padStart(2, '0'); // entre 11h e 22h
            const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            const novaData = `2026-06-${dia}T${hora}:${min}:00.000Z`;

            const pedidoFormatado = {
                id: p.id + '-extra', // Adicionar sufixo para evitar duplicidade de ID
                dataHora: novaData,
                status: novoStatus,
                tipoEntrega: p.tipoEntrega,
                metodoPagamento: p.metodoPagamento,
                subtotal: p.subtotal,
                taxaEntrega: p.taxaEntrega,
                total: p.total,
                trocoPara: p.trocoPara,
                usuario: p.usuario,
                itens: p.itens.map(item => ({
                    quantidade: item.quantidade,
                    precoUnitario: item.precoUnitario,
                    produto: item.produto 
                }))
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pedidoFormatado)
                });

                if (response.ok) {
                    console.log(`✅ Pedido ${p.id} importado.`);
                } else {
                    const erro = await response.text();
                    console.error(`❌ Erro no pedido ${p.id}: ${erro}`);
                }
            } catch (e) {
                console.error(`💥 Falha de conexão ao importar ${p.id}`);
            }
        }

        console.log('\n✨ Processo finalizado!');
    } catch (err) {
        console.error('🔴 Erro crítico:', err.message);
    }
}

importar();
