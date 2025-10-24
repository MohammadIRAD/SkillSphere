import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({ user: null as any, setUser: (u: any) => {} });

export const AuthProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
