import { z } from "zod";

export const AccountSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
  image: z.string(),
  level: z.number(),
  campus_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
