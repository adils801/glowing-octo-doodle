// src/app/actions.ts

import { getFuelPriceSuggestion as getAiSuggestion } from "@/ai/flows/real-time-fuel-price-suggestions";
import type { FuelPriceSuggestionInput, FuelPriceSuggestionOutput } from "@/ai/flows/real-time-fuel-price-suggestions";

/**
 * Temporary fallback for AI suggestion
 */
export const fallbackSuggestion: FuelPriceSuggestionOutput = {
  suggestedPrice: 0,
  reasoning: "AI temporarily disabled",
};

/**
 * Example function to get AI fuel price suggestion safely
 * Uses the imported async function
 */
export async function fetchAiFuelSuggestion(
  input: FuelPriceSuggestionInput
): Promise<FuelPriceSuggestionOutput> {
  try {
    const result = await getAiSuggestion(input);
    return result;
  } catch (error) {
    console.error("Error fetching AI suggestion, returning fallback:", error);
    return fallbackSuggestion;
  }
}
