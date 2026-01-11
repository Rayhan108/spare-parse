// src/hooks/useDarkMode.ts
"use client";

import { useTheme } from "@/context/ThemeContext";

export const useDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Helper classes for common patterns
  const themeClasses = {
    // Backgrounds
    bgPrimary: isDarkMode ? "bg-gray-900" : "bg-white",
    bgSecondary: isDarkMode ? "bg-gray-800" : "bg-gray-50",
    bgTertiary: isDarkMode ? "bg-gray-700" : "bg-gray-100",
    bgCard: isDarkMode ? "bg-gray-800" : "bg-white",
    bgHover: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50",

    // Text
    textPrimary: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
    textMuted: isDarkMode ? "text-gray-500" : "text-gray-400",

    // Borders
    borderPrimary: isDarkMode ? "border-gray-700" : "border-gray-200",
    borderSecondary: isDarkMode ? "border-gray-600" : "border-gray-300",

    // Shadows
    shadow: isDarkMode ? "shadow-gray-900/50" : "shadow-gray-200/50",

    // Input specific
    inputBg: isDarkMode ? "bg-gray-700" : "bg-gray-100",
    inputText: isDarkMode ? "text-white" : "text-black",
    inputPlaceholder: isDarkMode ? "placeholder:text-gray-400" : "placeholder:text-gray-500",

    // Dividers
    divider: isDarkMode ? "divide-gray-700" : "divide-gray-200",
  };

  // Combined class helper
  const cn = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  return {
    isDarkMode,
    toggleDarkMode,
    themeClasses,
    cn,
  };
};