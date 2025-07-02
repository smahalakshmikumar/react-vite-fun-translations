import type { FunTranslationService } from "./FunTranslationService";
import type { Translation } from "domain/types/Translation";

/**
 * Decorator pattern: Wraps a translation service with caching functionality.
 */
class CacheTranslationService implements FunTranslationService {
  private service: FunTranslationService;
  private cache: Map<string, Translation>;
  private storageKey: string;

  constructor(service: FunTranslationService, engineType: string) {
    this.service = service;
    this.cache = new Map();
    this.storageKey = engineType;

    if (typeof localStorage !== "undefined") {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed: [string, Translation][] = JSON.parse(saved);
          this.cache = new Map(parsed);
        }
      } catch (e) {
        console.warn("Failed to load cache from localStorage:", e);
      }
    }
  }

  async getTranslation(text: string): Promise<Translation> {
    const key = text.toLowerCase().trim();
    const cached = this.cache.get(key);

    if (cached) {
      console.log("Cache hit:", key);
      return cached;
    }

    const translation = await this.service.getTranslation(text);
    this.cache.set(key, translation);

    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify(Array.from(this.cache.entries()))
        );
      } catch (e) {
        console.warn("Failed to persist cache to localStorage:", e);
      }
    }

    return translation;
  }
}

export default CacheTranslationService;
