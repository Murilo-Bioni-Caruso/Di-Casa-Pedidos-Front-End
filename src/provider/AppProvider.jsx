import { CarrinhoProvider } from "../context/CarrinhoContexto";
import { PedidoProvider } from "../context/PedidoContexto";
import { RestauranteProvider } from "../context/RestauranteContexto";
import { UsuarioProvider } from "../context/UsuarioContexto";


export const AppProvider = ({ children }) => {
  return (
    <RestauranteProvider>
      <UsuarioProvider>
        <PedidoProvider>
          <CarrinhoProvider>
            {children}
          </CarrinhoProvider>
        </PedidoProvider>
      </UsuarioProvider>
    </RestauranteProvider>
  );
};