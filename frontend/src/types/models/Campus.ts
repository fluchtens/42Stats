import { z } from "zod";

export const CampusSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  user_count: z.number(),
  student_count: z.number(),
  average_level: z.number(),
});

export type Campus = z.infer<typeof CampusSchema>;
