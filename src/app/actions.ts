"use server";

import {
  getFuelPriceSuggestion as getAiSuggestion,
  type FuelPriceSuggestionInput,
  type FuelPriceSuggestionOutput,
} from "@/ai/flows/real-time-fuel-price-suggestions";

export async function getFuelPriceSuggestion(
  input: FuelPriceSuggestionInput
): Promise<FuelPriceSuggestionOutput> {
  try {
    const suggestion = await getAiSuggestion(input);
    return suggestion;
  } catch (error) {
    console.error("Error getting AI fuel price suggestion:", error);
    // In a real app, you might want to return a more specific error
    throw new Error("Failed to get suggestion from AI.");
  }
}
