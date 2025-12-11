export type ThemeType = "light" | "dark" | "system";

export interface ThemeOption {
    label: string;
    value: ThemeType;
    icon: string;
}

export interface UseThemeReturn {
    currentTheme: import("vue").Ref<ThemeType>;
    effectiveTheme: import("vue").Ref<"light" | "dark">;
    setTheme: (theme: ThemeType) => void;
    loadTheme: () => void;
    THEMES: {
        LIGHT: "light";
        DARK: "dark";
        SYSTEM: "system";
    };
}
