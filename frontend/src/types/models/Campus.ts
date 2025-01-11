import { z } from "zod";

export const CampusSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  userCount: z.number(),
  studentCount: z.number(),
  averageLevel: z.number(),
});

export type Campus = z.infer<typeof CampusSchema>;
