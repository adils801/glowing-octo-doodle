'use server';

/**
 * @fileOverview Provides real-time fuel price suggestions using generative AI.
 *
 * - getFuelPriceSuggestion - A function that returns a fuel price suggestion.
 * - FuelPriceSuggestionInput - The input type for the getFuelPriceSuggestion function.
 * - FuelPriceSuggestionOutput - The return type for the getFuelPriceSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FuelPriceSuggestionInputSchema = z.object({
  fuelType: z.string().describe('The type of fuel (e.g., Petrol, Diesel, HOBC).'),
  historicalData: z
    .string()
    .describe(
      'Historical fuel price data as a JSON string. Each entry should include date and price.'
    ),
  currentMarketData: z
    .string()
    .describe(
      'Current market data as a JSON string. Include factors like crude oil prices, regional demand, and competitor pricing.'
    ),
});
export type FuelPriceSuggestionInput = z.infer<typeof FuelPriceSuggestionInputSchema>;

const FuelPriceSuggestionOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested fuel price based on AI analysis.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested price, including key factors considered.'
    ),
});
export type FuelPriceSuggestionOutput = z.infer<typeof FuelPriceSuggestionOutputSchema>;

export async function getFuelPriceSuggestion(
  input: FuelPriceSuggestionInput
): Promise<FuelPriceSuggestionOutput> {
  return fuelPriceSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fuelPriceSuggestionPrompt',
  input: {schema: FuelPriceSuggestionInputSchema},
  output: {schema: FuelPriceSuggestionOutputSchema},
  prompt: `You are an AI-powered fuel pricing expert. Analyze historical trends and current market data to suggest an optimal fuel price.

Fuel Type: {{{fuelType}}}

Historical Data: {{{historicalData}}}

Current Market Data: {{{currentMarketData}}}

Consider these factors to provide a data-driven suggested price and a clear explanation of your reasoning.

Output the suggested price as a number and provide a short explanation.
`,
});

const fuelPriceSuggestionFlow = ai.defineFlow(
  {
    name: 'fuelPriceSuggestionFlow',
    inputSchema: FuelPriceSuggestionInputSchema,
    outputSchema: FuelPriceSuggestionOutputSchema,
  },
  async input => {
    try {
      // Parse JSON strings into objects
      const historicalData = JSON.parse(input.historicalData);
      const currentMarketData = JSON.parse(input.currentMarketData);

      // Call the prompt with the parsed data
      const {output} = await prompt({
        ...input,
        historicalData: JSON.stringify(historicalData),
        currentMarketData: JSON.stringify(currentMarketData),
      });

      return output!;
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      throw new Error('Failed to parse historical or current market data.');
    }
  }
);
