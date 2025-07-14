import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="btn btn-ghost btn-sm rounded-full"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
} 