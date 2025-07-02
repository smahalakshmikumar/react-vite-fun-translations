# Fun Translations Client App

This is a modern React-based client application for translating text using the [funtranslations.com](https://funtranslations.com/) API. It supports multiple translation engines, caching, and persistent history — all built with clean architecture principles and React best practices.

## What I've Built

- Users can **type any text** and select between two translation engines: **Yoda** and **Pirate**.
- Upon submitting, the app translates the text and **displays the translation on the same page**.
- A **side pane shows the translation history**, listing all past translations made during the session.
- The user can **clear the translation history**, which resets the app to its initial state.
- The app uses a **cache service** to avoid repeated API calls for the same input, improving performance and respecting API limits.
- Both the **translation cache and history are saved to local storage**, so they **persist across page refreshes**.
- The UI is **composed with atomic design principles**, separating components into atoms, molecules, and organisms for better modularity and maintainability.
- The app is built using **React Router**, **TypeScript**, and **Tailwind CSS** for styling.

## Architecture Highlights

- Clear separation between layers, with an `io` folder organized into:
  - **`repo`**: low-level API repositories handling direct data fetching.
  - **`service`**: services that wrap repositories and implement business logic (e.g., caching, translation,mock translation).
  - **`mock`**: mock implementations for testing and development without hitting the real API.
- The **`domain`** layer contains core models and services transforming raw data into meaningful domain objects.
- The **`view`** layer organizes React components following atomic design principles (atoms, molecules, organisms).
- Translation caching and history management are integrated via services and persisted in local storage.


## How to Run

```bash
npm install
npm run dev
```

## Potential Improvements

- Add more translation engines.

- Add user authentication to sync history across devices.

- Introduce unit and integration tests for all layers.
