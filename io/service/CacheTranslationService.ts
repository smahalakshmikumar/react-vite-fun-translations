import type { FunTranslationService } from "./FunTranslationService";
import type { Translation } from "domain/types/Translation";

/**
 * CacheTranslationService is a decorator that adds caching functionality
 * around any FunTranslationService implementation.
 * 
 * It caches translations in memory and persists them in localStorage to
 * avoid redundant API calls for the same text input.
 */
class CacheTranslationService implements FunTranslationService {
  private service: FunTranslationService;
  private cache: Map<string, Translation>;
  private storageKey: string;

  /**
   * Creates a new CacheTranslationService wrapping the provided service.
   * @param service The underlying translation service to wrap
   * @param engineType A unique key to identify the translation engine (used as localStorage key)
   */
  constructor(service: FunTranslationService, engineType: string) {
    this.service = service;
    this.cache = new Map();
    this.storageKey = engineType;

    // Load any persisted cache from localStorage on initialization
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

  /**
   * Gets the translation for the given text.
   * If the translation is cached, returns it immediately.
   * Otherwise, fetches from the underlying service and caches the result.
   * 
   * @param text The input text to translate
   * @returns A Promise resolving to the Translation result
   */
  async getTranslation(text: string): Promise<Translation> {
    // Normalize the input text to lowercase and trim whitespace for cache key
    const key = text.toLowerCase().trim();

    // Try to retrieve from cache
    const cached = this.cache.get(key);
    if (cached) {
      console.log("Cache hit:", key);
      return cached;
    }

    // Cache miss: call the underlying service
    const translation = await this.service.getTranslation(text);

    // Store the new translation in cache
    this.cache.set(key, translation);

    // Persist the updated cache back to localStorage
    if (typeof localStorage !== "undefined") {
      try {
        // Serialize Map entries as an array for JSON storage
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
