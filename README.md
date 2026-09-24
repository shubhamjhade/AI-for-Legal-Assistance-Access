# LegalEase AI

A comprehensive, GenAI-powered web application designed to democratize legal information. This solution empowers users to simplify complex legalese, compare contracts, identify hidden risks, and prepare for professional legal consultations.

## 🚀 Features (Problem Statement Alignment)

1. **Document Simplifier**: Uses LLMs to translate heavy legal jargon into accessible, bulleted plain English.
2. **Contract Comparator**: Automatically diffs two versions of a contract, highlighting material changes and missing clauses.
3. **Risk Analyzer**: Acts as an automated red-flag system for EULAs and contracts, extracting key obligations and hidden penalties.
4. **Consult Prep (New!)**: Helps users prepare for a lawyer consultation by generating executive summaries and critical strategic questions, maximizing billable hour efficiency.

## 🛡️ Security & Privacy (Safe Implementation)

* **Client-Side Processing**: The application is built entirely as a static SPA (Single Page Application). User documents are **never** sent to a proprietary centralized database.
* **Local API Key Storage**: The Google Gemini API key is required from the user via a secure settings modal and is stored exclusively in `localStorage`. 
* **XSS Prevention**: All markdown output from the LLM is rigorously sanitized using `DOMPurify` and `rehype-sanitize` before being injected into the DOM, neutralizing potential prompt-injection XSS vectors.
* **Payload Validation**: Hard limits are set on payload size (50,000 characters) to prevent browser DoS and token exhaustion attacks.

## ⚡ Efficiency

* **Code Splitting**: Employs `React.lazy` and `Suspense` to lazily load routes, drastically reducing the initial bundle size and improving Time to Interactive (TTI).
* **Memoization**: Uses `React.memo`, `useCallback`, and custom hooks (`useGenAI`) to prevent unnecessary component re-renders.

## ♿ Accessibility

* **Semantic HTML**: Fully utilizes semantic tags (`<main>`, `<header>`, `<section>`, `<article>`).
* **ARIA Standards**: Implements strict `aria-labels`, `aria-busy` (for loading states), `aria-hidden` (for decorative icons), and `role` attributes.
* **Keyboard Navigation**: Maintains logical tab indexing and visible focus rings.

## 🧪 Testing & Validation

* Tested with **Vitest** and **React Testing Library**.
* Includes comprehensive unit tests for custom hooks (`useGenAI`) and component integration tests (`ResultDisplay`).

## 💻 Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API (`@google/genai`)
- Vitest

## 🛠️ Local Development

\`\`\`bash
npm install
npm run dev
npm run test
\`\`\`
