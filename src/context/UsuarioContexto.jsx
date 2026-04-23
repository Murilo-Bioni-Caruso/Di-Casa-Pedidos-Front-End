import { createContext, useContext, useState } from 'react';
import { UsuarioService } from '../service/UsuarioService';
import { useRestaurante } from './RestauranteContexto';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    UsuarioService.obterUsuario()
  );

  const { calcularDistancia, calcularTaxaEntrega } = useRestaurante();

  const salvarUsuario = (dadosUsuario) => {
    const usuarioCriado = UsuarioService.criarUsuario(
      dadosUsuario,
      calcularDistancia,
      calcularTaxaEntrega
    );

    const usuarioSalvo = UsuarioService.salvarUsuario(usuarioCriado);

    setUsuario(usuarioSalvo);
  };

  const limparUsuario = () => {
    UsuarioService.limparUsuario();
    setUsuario(null);
  };

  const calcularEntregaPreview = (endereco) => {
    return UsuarioService.criarUsuario(
      { endereco },
      calcularDistancia,
      calcularTaxaEntrega
    );
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        salvarUsuario,
        limparUsuario,
        calcularEntregaPreview
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error('useUsuario deve ser usado dentro de UsuarioProvider');
  }

  return context;
};