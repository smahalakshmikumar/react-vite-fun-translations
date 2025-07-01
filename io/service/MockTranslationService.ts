import type { Translation } from "domain/types/Translation";
import mockYodaTranslation from "io/mocks/api.funtranslations.com_translate_yoda.json.json";
import type { FunTranslationService } from "./FunTranslationService";

export class MockFunTranslationService implements FunTranslationService {
    async getTranslation(): Promise<Translation> {
        return mockYodaTranslation;
    }
}

