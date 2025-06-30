import type { FunTranslationService } from "./FunTranslationService";
import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";

class CacheService implements FunTranslationService {
  private service: FunTranslationService;
  private cache: Map<string, Translation>;

  constructor(service: FunTranslationService) {
    this.service = service;
    this.cache = new Map();
  }

  async getTranslation(text: string, type: Engine): Promise<Translation> {
    const key = `${type}:${text.toLowerCase().trim()}`;
    if (this.cache.has(key)) {
      console.log("Cache hit:", key); //todo: remove later
      return this.cache.get(key)!;
    }

    const translation = await this.service.getTranslation(text, type);
    this.cache.set(key, translation);
    return translation;
  }
}

export default CacheService;
