import type { Translation } from "domain/types/Translation";
import BaseTranslationRepo from "../repo/BaseTranslationRepo";
import CacheTranslationService from "./CacheTranslationService";

export interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

export const FUN_TRANSLATIONS_BASE_URL =
  "https://api.funtranslations.com/translate/";

// Implementation of the translation service using BaseTranslationRepo
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

// Factory function to create cached Yoda translation service
export const createYodaTranslationService = () =>
  new CacheTranslationService(
    new FunTranslationServiceImpl(
      `${FUN_TRANSLATIONS_BASE_URL}yoda.json`,
      "Yoda API"
    ),
    "translation-cache-yoda"
  );

// Factory function to create cached Pirate translation service
export const createPirateTranslationService = () =>
  new CacheTranslationService(
    new FunTranslationServiceImpl(
      `${FUN_TRANSLATIONS_BASE_URL}pirate.json`,
      "Pirate API"
    ),
    "translation-cache-pirate"
  );
