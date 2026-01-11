// src/providers/ThemeProvider.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { ConfigProvider, theme as antdTheme, App as AntdApp } from "antd";
import { ThemeContext } from "@/context/ThemeContext";
import { getAntdTheme } from "@/theme/ant-theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("darkMode");
    
    // Only check stored mode, not system preference (to keep light as default)
    const shouldBeDark = storedMode === "true";
    setIsDarkMode(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newMode;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ConfigProvider
        theme={{
          // ✅ Use dark algorithm ONLY for dark mode
          ...(isDarkMode && { algorithm: antdTheme.darkAlgorithm }),
          // ✅ Get the correct theme based on mode
          ...getAntdTheme(isDarkMode),
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};