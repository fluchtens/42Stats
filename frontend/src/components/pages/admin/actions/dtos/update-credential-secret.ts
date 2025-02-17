import { z } from "zod";

export const UpdateCredentialClientSecretSchema = z.object({
  client_secret: z
    .string()
    .min(1, { message: "Client Secret is required" })
    .max(100, { message: "Client Secret must be between 1 and 100 characters" }),
});

export type UpdateCredentialClientSecret = z.infer<typeof UpdateCredentialClientSecretSchema>;
