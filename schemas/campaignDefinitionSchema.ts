// /var/www/praxis/schemas/campaignDefinitionSchema.ts

import { z } from 'zod';

// Define the schema for the campaign definition form
export const campaignDefinitionSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  audience: z.string().min(1, "Audience is required"),
  target: z.string().min(1, "Target action is required"),
  intent: z.string().min(1, "Intent is required"),
  location: z.string().min(1, "Location is required"),
});

// Optional: Define a TypeScript type based on the schema
// export type CampaignDefinition = z.infer<typeof campaignDefinitionSchema>;
