import { createContext, useContext, ReactNode, useEffect } from "react";
import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/usereduxHooks";
import {
  toggleTheme as toggleThemeAction,
  setTheme as setThemeAction,
} from "../../../features/authorization/store/user.slice";

interface ThemeContextProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: ThemeContextProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.user.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme && savedTheme !== theme) {
      dispatch(setThemeAction(savedTheme));
    }
  }, [dispatch]);

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const customTheme = {
    button: {
      defaultProps: {
        color: theme === "dark" ? "blue-gray" : "blue",
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MaterialThemeProvider value={customTheme}>
        {children}
      </MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};
