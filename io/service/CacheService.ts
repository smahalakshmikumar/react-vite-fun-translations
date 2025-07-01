import type { FunTranslationService } from "./FunTranslationService";
import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";

class CacheService implements FunTranslationService {
  private service: FunTranslationService;
  private cache: Map<string, Translation>;
  private storageKey = "translation-cache";

  constructor(service: FunTranslationService) {
    this.service = service;
    this.cache = new Map();

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const saved = localStorage?.getItem(this.storageKey);
      if (saved) {
        try {
          const parsed: [string, Translation][] = JSON.parse(saved);
          this.cache = new Map(parsed);
        } catch (e) {
          console.warn("Failed to parse cache:", e);
        }
      }
    }
  }

  clearCache() {
    this.cache.clear();
    try {
      localStorage?.removeItem(this.storageKey);
    } catch { }
  }


  async getTranslation(text: string, type: Engine): Promise<Translation> {
    const key = `${type}:${text.toLowerCase().trim()}`;
    if (this.cache.has(key)) {
      console.log("Cache hit:", key);
      return this.cache.get(key)!;
    }

    const translation = await this.service.getTranslation(text, type);
    this.cache.set(key, translation);

    // Save updated cache to localStorage
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(Array.from(this.cache.entries()))
    );

    return translation;
  }
}

export default CacheService;
