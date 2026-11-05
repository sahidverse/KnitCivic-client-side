"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "knit-civic-theme";

export function ThemeToggle() {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className="cursor-pointer rounded-full border-border/60 bg-card/50"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
      }}
    >
      {/* Visible state comes from the .dark class, so both icons are rendered
          and CSS decides which one shows (no hydration mismatch). */}
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}
