import { useState, useCallback } from 'react';
import { generateLegalResponse } from '../lib/gemini';
import DOMPurify from 'dompurify';

/**
 * Custom hook to handle GenAI interactions.
 * Provides loading states, error handling, and basic input sanitization (Security & Efficiency).
 */
export function useGenAI() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executes the prompt using the Gemini API.
   * @param {string} prompt - The main prompt instruction.
   * @param {string[]} inputs - Array of user inputs to append to the prompt.
   */
  const execute = useCallback(async (prompt: string, inputs: string[]) => {
    // Input validation (Security: limit payload size and prevent empty submissions)
    if (inputs.some(input => !input.trim())) {
      setError("Input cannot be empty.");
      return;
    }

    const totalLength = inputs.reduce((acc, curr) => acc + curr.length, 0);
    if (totalLength > 50000) {
      setError("Input is too long. Please restrict to 50,000 characters to ensure optimal performance.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Basic sanitization of inputs before sending to AI to prevent injection logic
      const sanitizedInputs = inputs.map(input => DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }));
      
      let fullPrompt = prompt;
      sanitizedInputs.forEach((input, index) => {
        fullPrompt += `\n\n--- Input ${index + 1} ---\n${input}`;
      });

      const response = await generateLegalResponse(fullPrompt);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, execute, reset };
}
