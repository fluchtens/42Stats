import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  difficulty: z.number(),
});

export type Project = z.infer<typeof ProjectSchema>;
