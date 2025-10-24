import React from 'react';

export const ThemeProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return <div className="theme-root">{children}</div>;
};

export default ThemeProvider;
