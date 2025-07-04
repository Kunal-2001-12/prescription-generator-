'use server';

/**
 * @fileOverview Abbreviates a prescription using common medical abbreviations and standard phrases.
 *
 * - abbreviatePrescription - A function that handles the prescription abbreviation process.
 * - AbbreviatePrescriptionInput - The input type for the abbreviatePrescription function.
 * - AbbreviatePrescriptionOutput - The return type for the abbreviatePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AbbreviatePrescriptionInputSchema = z.object({
  dosage: z.string().describe('The dosage of the medication (e.g., 500mg).'),
  frequency: z.string().describe('The frequency of the medication (e.g., twice daily).'),
  route: z.string().describe('The route of administration (e.g., oral).'),
  instructions: z.string().describe('Any special instructions for the patient.'),
});
export type AbbreviatePrescriptionInput = z.infer<typeof AbbreviatePrescriptionInputSchema>;

const AbbreviatePrescriptionOutputSchema = z.object({
  abbreviatedInstructions: z.string().describe('The abbreviated prescription instructions.'),
});
export type AbbreviatePrescriptionOutput = z.infer<typeof AbbreviatePrescriptionOutputSchema>;

export async function abbreviatePrescription(
  input: AbbreviatePrescriptionInput
): Promise<AbbreviatePrescriptionOutput> {
  return abbreviatePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'abbreviatePrescriptionPrompt',
  input: {schema: AbbreviatePrescriptionInputSchema},
  output: {schema: AbbreviatePrescriptionOutputSchema},
  prompt: `You are a helpful assistant that helps doctors abbreviate prescription instructions using common medical abbreviations and standard phrases.

  Given the following information, please generate abbreviated instructions:

  Dosage: {{{dosage}}}
  Frequency: {{{frequency}}}
  Route: {{{route}}}
  Instructions: {{{instructions}}}

  Abbreviated Instructions:`,
});

const abbreviatePrescriptionFlow = ai.defineFlow(
  {
    name: 'abbreviatePrescriptionFlow',
    inputSchema: AbbreviatePrescriptionInputSchema,
    outputSchema: AbbreviatePrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
