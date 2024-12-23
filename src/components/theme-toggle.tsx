import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-8 h-8 flex items-center justify-center hover:bg-[#003087]/5 dark:hover:bg-white/5 rounded-full transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-[#003087] dark:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-[#003087] dark:text-white" />
      )}
    </button>
  );
}
