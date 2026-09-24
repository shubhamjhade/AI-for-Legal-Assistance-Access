import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGenAI } from '../hooks/useGenAI';
import * as geminiApi from '../lib/gemini';

vi.mock('../lib/gemini', () => ({
  generateLegalResponse: vi.fn(),
}));

describe('useGenAI Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGenAI());
    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('validates empty input', async () => {
    const { result } = renderHook(() => useGenAI());
    
    await act(async () => {
      await result.current.execute('Prompt', ['   ']);
    });

    expect(result.current.error).toBe('Input cannot be empty.');
    expect(result.current.isLoading).toBe(false);
    expect(geminiApi.generateLegalResponse).not.toHaveBeenCalled();
  });

  it('validates overly large input', async () => {
    const { result } = renderHook(() => useGenAI());
    const hugeString = 'a'.repeat(50001);
    
    await act(async () => {
      await result.current.execute('Prompt', [hugeString]);
    });

    expect(result.current.error).toContain('too long');
    expect(geminiApi.generateLegalResponse).not.toHaveBeenCalled();
  });

  it('successfully fetches data and updates state', async () => {
    vi.mocked(geminiApi.generateLegalResponse).mockResolvedValueOnce('Success Data');
    const { result } = renderHook(() => useGenAI());
    
    await act(async () => {
      await result.current.execute('Prompt', ['Valid input']);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.result).toBe('Success Data');
  });

  it('handles API errors gracefully', async () => {
    vi.mocked(geminiApi.generateLegalResponse).mockRejectedValueOnce(new Error('API Rate Limit'));
    const { result } = renderHook(() => useGenAI());
    
    await act(async () => {
      await result.current.execute('Prompt', ['Valid input']);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe('API Rate Limit');
  });
});
