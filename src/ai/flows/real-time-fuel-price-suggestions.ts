import { z } from "zod";

// Input schema
export const FuelPriceSuggestionInputSchema = z.object({
  fuelType: z.string(),
  historicalData: z.string(), // JSON string
  currentMarketData: z.string(), // JSON string
});

// Output schema
export const FuelPriceSuggestionOutputSchema = z.object({
  suggestedPrice: z.number(),
  reasoning: z.string(),
});

export type FuelPriceSuggestionInput = z.infer<typeof FuelPriceSuggestionInputSchema>;
export type FuelPriceSuggestionOutput = z.infer<typeof FuelPriceSuggestionOutputSchema>;

/**
 * Async function to get fuel price suggestion.
 * Temporary fallback while AI is disabled.
 */
export async function getFuelPriceSuggestion(
  input: FuelPriceSuggestionInput
): Promise<FuelPriceSuggestionOutput> {
  console.log("AI disabled fallback called with input:", input);

  return {
    suggestedPrice: 0, // numeric placeholder
    reasoning: "AI temporarily disabled",
  };

  // Future AI call example:
  // const result = await fetchAI(input);
  // return result;
}
