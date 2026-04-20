import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTheme, setTheme as persistTheme } from "@/lib/storage";
import jarvisBg from "@/assets/theme-jarvis.jpg";
import cyberBg from "@/assets/theme-cyber.jpg";
import galaxyBg from "@/assets/theme-galaxy.jpg";
import forestBg from "@/assets/theme-forest.jpg";
import sunsetBg from "@/assets/theme-sunset.jpg";

export type ThemeId = "jarvis" | "cyber" | "galaxy" | "forest" | "sunset";

export const THEMES: { id: ThemeId; label: string; bg: string }[] = [
  { id: "jarvis", label: "Jarvis HUD", bg: jarvisBg },
  { id: "cyber", label: "Cyber Neon", bg: cyberBg },
  { id: "galaxy", label: "Galaxy", bg: galaxyBg },
  { id: "forest", label: "Forest", bg: forestBg },
  { id: "sunset", label: "Sunset", bg: sunsetBg },
];

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => (getTheme() as ThemeId) || "jarvis");

  useEffect(() => {
    const found = THEMES.find((t) => t.id === theme) ?? THEMES[0];
    document.documentElement.setAttribute("data-theme", found.id);
    document.documentElement.classList.add("dark");
    document.body.style.setProperty("--theme-bg-image", `url(${found.bg})`);
    persistTheme(found.id);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>{children}</ThemeCtx.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
