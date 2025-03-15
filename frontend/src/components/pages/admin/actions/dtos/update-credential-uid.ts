import { z } from "zod";

export const UpdateCredentialClientIdSchema = z.object({
  client_id: z.string().min(1, { message: "Client ID is required" }).max(100, { message: "Client ID must be between 1 and 100 characters" }),
});

export type UpdateCredentialClientId = z.infer<typeof UpdateCredentialClientIdSchema>;
