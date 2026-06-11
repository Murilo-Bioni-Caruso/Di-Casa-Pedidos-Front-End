import { LayoutDashboard, Package, Settings, Tags, UtensilsCrossed } from "lucide-react";
import { LINKS } from "../rotas/Links";

 export const layoutNavegacaoAdmin = [
    { caminho: LINKS.ADMIN, label: 'Dashboard', icone: LayoutDashboard },
    { caminho: LINKS.ADMIN_PRODUTOS, label: 'Cardápio', icone: UtensilsCrossed },
    { caminho: LINKS.ADMIN_PEDIDOS, label: 'Pedidos', icone: Package },
    { caminho: LINKS.ADMIN_CATEGORIAS, label: 'Categorias', icone: Tags },
    { caminho: LINKS.ADMIN_CONFIGURACOES, label: 'Configurações', icone: Settings }
  ];