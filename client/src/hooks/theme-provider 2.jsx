"use client";

import { ThemeProvider as NextThemesProvider, useTheme as nextThemeHook } from "next-themes";

// Wrap the NextThemesProvider component and export it
export const ThemeProvider = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

// Re-export the correct useTheme hook from next-themes
export const useTheme = nextThemeHook;
