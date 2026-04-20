import { createContext, useContext, useState, useEffect } from 'react';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario-dicasa');
    return salvo ? JSON.parse(salvo) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario-dicasa', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario-dicasa');
    }
  }, [usuario]);

  const salvarUsuario = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  const limparUsuario = () => {
    setUsuario(null);
    localStorage.removeItem('usuario-dicasa');
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        salvarUsuario,
        limparUsuario
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