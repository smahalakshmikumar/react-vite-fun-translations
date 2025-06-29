
class YodaTranslationRepo {
  async getTranslation(text: string) {
    const response = await fetch(
      "https://api.funtranslations.com/translate/yoda.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ text }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error?.message || "Translation failed");
    }

    return response;
  }
}

export default YodaTranslationRepo;
