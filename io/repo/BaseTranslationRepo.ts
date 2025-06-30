class BaseTranslationRepo {
    private url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
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
  