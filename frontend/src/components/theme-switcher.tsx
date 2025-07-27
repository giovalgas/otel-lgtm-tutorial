import { ChevronDown, Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { metrics } from "@opentelemetry/api";

type Theme = "light" | "dark" | "system";

const meter = metrics.getMeter("theme-usage");
const themeCounter = meter.createUpDownCounter("theme.usage", {
    description: "Tracks the number of users using each theme",
});

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") as Theme | null;
            return storedTheme || "system";
        }
        return "system";
    });

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);            
        } else {
            root.classList.add(theme);
        }
    }, [theme]);
    
    useEffect(() => {
        themeCounter.add(1, { theme });
        
        return () => {
            themeCounter.add(-1, { theme });
        };
    }, [theme]);

    const isLight =
        theme === "light" ||
        (theme === "system" &&
            !window.matchMedia("(prefers-color-scheme: dark)").matches);

    return { theme, setTheme, handleThemeChange, isLight };
};

const ThemeToggle = () => {
    const { isLight, handleThemeChange } = useTheme();

    return (
        <button
            onClick={() => handleThemeChange(isLight ? "dark" : "light")}
            className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        >
            {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
    );
};

// Full theme switcher with dropdown
const ThemeSwitcher = () => {
    const { theme, handleThemeChange } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".theme-switcher")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const getThemeIcon = (currentTheme: Theme) => {
        switch (currentTheme) {
            case "light":
                return <Sun className="h-5 w-5" />;
            case "dark":
                return <Moon className="h-5 w-5" />;
            case "system":
                return <Laptop className="h-5 w-5" />;
        }
    };

    const getThemeLabel = (currentTheme: Theme): string => {
        return {
            light: "Light",
            dark: "Dark",
            system: "System",
        }[currentTheme];
    };

    return (
        <div className="relative theme-switcher">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-[120px]"
                aria-label="Change theme"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <div className="flex items-center gap-2">
                    {getThemeIcon(theme)}
                    <span>{getThemeLabel(theme)}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-1 w-full rounded-md border border-border bg-popover shadow-md z-10">
                    <ul className="py-1" role="listbox" aria-label="Select theme">
                        <li
                            role="option"
                            aria-selected={theme === "light"}
                            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${theme === "light" ? "bg-accent text-accent-foreground" : ""}`}
                            onClick={() => handleThemeChange("light")}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handleThemeChange("light")}
                        >
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                        </li>
                        <li
                            role="option"
                            aria-selected={theme === "dark"}
                            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${theme === "dark" ? "bg-accent text-accent-foreground" : ""}`}
                            onClick={() => handleThemeChange("dark")}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handleThemeChange("dark")}
                        >
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                        </li>
                        <li
                            role="option"
                            aria-selected={theme === "system"}
                            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${theme === "system" ? "bg-accent text-accent-foreground" : ""}`}
                            onClick={() => handleThemeChange("system")}
                            tabIndex={0}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleThemeChange("system")
                            }
                        >
                            <Laptop className="h-4 w-4" />
                            <span>System</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export { ThemeSwitcher, ThemeToggle, useTheme };