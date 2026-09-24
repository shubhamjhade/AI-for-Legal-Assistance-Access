import { GoogleGenAI } from '@google/genai';

export async function generateLegalResponse(prompt: string, context?: string): Promise<string> {
  const apiKey = localStorage.getItem('gemini_api_key');
  
  if (!apiKey) {
    // Mock response for fallback
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `**[SIMULATED RESPONSE - PLEASE CONFIGURE API KEY]**\n\nBased on your query, here is a mock analysis of the provided legal text:\n\n1. **Simplified Concept:** This document appears to be a standard agreement.\n2. **Key Obligations:** Party A must deliver services, Party B must pay.\n3. **Potential Risks:** Standard limitation of liability clauses present.\n\n*Note: Add your Google Gemini API key in settings for real GenAI analysis.*`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const fullPrompt = context 
      ? `System: You are an expert legal assistant AI designed to help laypeople understand complex legal information. Do not provide professional legal advice, but summarize, clarify, and identify risks.\n\nContext:\n${context}\n\nTask:\n${prompt}`
      : `System: You are an expert legal assistant AI designed to help laypeople understand complex legal information.\n\nTask:\n${prompt}`;
      
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text || "";
  } catch (error) {
    console.error("GenAI Error:", error);
    throw new Error("Failed to generate AI response. Please check your API key and try again.");
  }
}
