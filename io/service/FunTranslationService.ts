import type { Translation } from "domain/types/Translation";
import { ENGINES, type Engine } from "domain/types/Engine";
import BaseTranslationRepo from "../repo/BaseTranslationRepo";
import CacheService from "./CacheService";
import { fromDto } from "io/codec/fun-translation";
import { MockFunTranslationService } from "./MockTranslationService";

export interface FunTranslationService {
  getTranslation(text: string, type: Engine): Promise<Translation>;
}
export const FUN_TRANSLATIONS_BASE_URL = "https://api.funtranslations.com/translate/";

const translationURLs: Record<Engine, string> = {
  yoda: `${FUN_TRANSLATIONS_BASE_URL}yoda.json`,
  pirate: `${FUN_TRANSLATIONS_BASE_URL}pirate.json`,
};

class DefaultFunTranslationService implements FunTranslationService {
  private repos: Record<Engine, BaseTranslationRepo>;

  constructor() {
    this.repos = {
      yoda: new BaseTranslationRepo(translationURLs.yoda),
      pirate: new BaseTranslationRepo(translationURLs.pirate),
    };
  }

  async getTranslation(text: string, type: Engine = ENGINES.yoda): Promise<Translation> {
    const repo = this.repos[type];
    const response = await repo.getTranslation(text);
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }
    const data: Translation = await response.json();
    return data;
  }
}

const createFunTranslationService = () => {
  const baseService = new DefaultFunTranslationService();
  return new CacheService(baseService);
  //return new MockFunTranslationService(); to test with mock uncomment this 
};

export { DefaultFunTranslationService, createFunTranslationService };
