import React, { useContext } from 'react';

type ThemeProps = {
  dark?: boolean;
  backgroundColor?: string;
};

export const ThemeProvider = React.createContext<ThemeProps>({ dark: false });

export const useTheme = () => useContext(ThemeProvider);

export default ({
  theme,
  children,
}: React.PropsWithChildren<{ theme: ThemeProps }>) => (
  <ThemeProvider.Provider value={theme}>{children}</ThemeProvider.Provider>
);
