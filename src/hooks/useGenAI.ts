import { useState, useCallback, useRef } from 'react';
import { generateLegalResponse } from '../lib/gemini';
import DOMPurify from 'dompurify';

const MAX_REQUESTS_PER_MINUTE = 5;
const CHAR_LIMIT = 50000;

/**
 * Custom hook to handle GenAI interactions.
 * Features:
 * - Loading & Error states
 * - XSS Prevention (DOMPurify)
 * - Rate Limiting (Security & Efficiency)
 * - Payload Size Validation (Security)
 */
export function useGenAI() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Rate limiting tracking
  const requestTimestamps = useRef<number[]>([]);

  const execute = useCallback(async (prompt: string, inputs: string[]) => {
    // 1. Basic Empty Validation
    if (inputs.some(input => !input.trim())) {
      setError("Security / Validation: Input cannot be empty.");
      return;
    }

    // 2. Payload Size Limit (Security against DoS / Token exhaustion)
    const totalLength = inputs.reduce((acc, curr) => acc + curr.length, 0);
    if (totalLength > CHAR_LIMIT) {
      setError(`Security Limit: Input exceeds maximum allowed length of ${CHAR_LIMIT} characters.`);
      return;
    }

    // 3. Rate Limiting (Security & API cost control)
    const now = Date.now();
    // Filter timestamps from the last 60 seconds
    requestTimestamps.current = requestTimestamps.current.filter(t => now - t < 60000);
    
    if (requestTimestamps.current.length >= MAX_REQUESTS_PER_MINUTE) {
      setError("Security Limit: Too many requests. Please wait a minute before trying again to prevent abuse.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // 4. Record timestamp for rate limiting
      requestTimestamps.current.push(now);

      // 5. Input Sanitization (Defense in depth against Prompt Injection & XSS)
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
