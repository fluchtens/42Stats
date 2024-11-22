import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
  poolMonth: z.string(),
  poolYear: z.string(),
  level: z.number(),
  blackholed: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
