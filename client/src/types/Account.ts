import { z } from "zod";

export const AccountSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
  image: z.string(),
  level: z.number(),
  campusId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
