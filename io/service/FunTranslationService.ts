import type { Translation } from "domain/types/Translation";
import BaseTranslationRepo from "../repo/BaseTranslationRepo";
import CacheTranslationService from "./CacheTranslationService";

export interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

export const FUN_TRANSLATIONS_BASE_URL =
  "https://api.funtranslations.com/translate/";

class FunTranslationServiceImpl implements FunTranslationService {
  private repo: BaseTranslationRepo;
  private label: string;

  constructor(endpoint: string, label: string) {
    this.repo = new BaseTranslationRepo(endpoint);
    this.label = label;
  }

  async getTranslation(text: string): Promise<Translation> {
    const response = await this.repo.getTranslation(text);
    if (!response.ok) {
      throw new Error(`${this.label} error: ${response.statusText}`);
    }
    return await response.json();
  }
}

// Factory
export const createYodaTranslationService = () =>
  new CacheTranslationService(
    new FunTranslationServiceImpl(
      `${FUN_TRANSLATIONS_BASE_URL}yoda.json`,
      "Yoda API"
    ),
    "translation-cache-yoda"
  ); // Decorator

export const createPirateTranslationService = () =>
  new CacheTranslationService(
    new FunTranslationServiceImpl(
      `${FUN_TRANSLATIONS_BASE_URL}pirate.json`,
      "Pirate API"
    ),
    "translation-cache-pirate"
  ); // Decorator
