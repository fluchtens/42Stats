import { z } from "zod";

export const SessionSchema = z.object({
  primary_id: z.string(),
  session_id: z.string(),
  creation_date: z.string(),
  expiry_date: z.string(),
  current: z.boolean(),
  attributes: z.object({
    ip: z.string(),
    browser: z.string(),
    os: z.string(),
    device: z.string(),
  }),
});

export type Session = z.infer<typeof SessionSchema>;
