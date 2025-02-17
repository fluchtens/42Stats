import { z } from "zod";

export const CredentialSchema = z.object({
  id: z.number(),
  provider: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
  expire_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Credential = z.infer<typeof CredentialSchema>;
