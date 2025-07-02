export const ENGINES = {
    yoda: "yoda",
    pirate: "pirate",
} as const;

export type Engine = (typeof ENGINES)[keyof typeof ENGINES];
