import { AlertCircle } from 'lucide-react';
import { NaoEncontrado } from '../components/NaoEncontrado';
import { LINKS } from '../rotas/Links';

export function NaoEncontradoPage() {
  return (
    <NaoEncontrado
      titulo='Página não encontrada'
      mensagem='A página que você está procurando não existe.'
      textoBotao='Voltar ao Cardápio'
      linkBotao={LINKS.HOME}
      icone={AlertCircle}
    />
  );
}
