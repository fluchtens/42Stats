import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image: z.string(),
  pool_month: z.string(),
  pool_year: z.string(),
  level: z.number(),
  blackholed: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
