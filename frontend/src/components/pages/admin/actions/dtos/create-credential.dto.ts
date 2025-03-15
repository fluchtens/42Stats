import { z } from "zod";

export const CreateCredentialSchema = z.object({
  provider: z.string().min(1, { message: "Provider is required" }).max(100, { message: "Provider must be between 1 and 100 characters" }),
  client_id: z.string().min(1, { message: "Client ID is required" }).max(100, { message: "Client ID must be between 1 and 100 characters" }),
  client_secret: z
    .string()
    .min(1, { message: "Client Secret is required" })
    .max(100, { message: "Client Secret must be between 1 and 100 characters" }),
});

export type CreateCredential = z.infer<typeof CreateCredentialSchema>;
