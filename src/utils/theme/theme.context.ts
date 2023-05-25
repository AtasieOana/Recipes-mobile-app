import { createContext } from "react";
import { themes } from "./theme";

export const ThemeContext = createContext({
  theme: themes.purple,
  chooseThemeSchema: (_newTheme: any) => {},
});
