export const ENGINES = {
    yoda: "yoda",
    pirate: "pirate",
} as const;

export type Engine = keyof typeof ENGINES;
