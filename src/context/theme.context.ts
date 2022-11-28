import { createContext } from 'react';

interface ThemeContextState {
  themeContext: boolean;
  setThemeContext: (theme: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextState>({
  themeContext: true,
  setThemeContext: () => {},
});
