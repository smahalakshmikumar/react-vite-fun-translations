/**
 * BaseTranslationRepo is a low-level repository responsible for
 * making HTTP requests to the translation API endpoint.
 */
class BaseTranslationRepo {
  private url: string;

  /**
   * @param url - The full URL of the translation API endpoint to call
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * Sends a POST request to the translation API with the given text.
   *
   * @param text - The text to translate
   * @returns A Promise resolving to the raw fetch Response object
   * @throws An Error if the HTTP response status is not OK (non-2xx)
   */
  async getTranslation(text: string) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text }), 
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error?.message || "Translation failed");
    }

    return response;
  }
}

export default BaseTranslationRepo;
