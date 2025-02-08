import { z } from "zod";

export const SessionSchema = z.object({
  sessionId: z.string(),
  data: z.object({
    cookie: z.object({
      originalMaxAge: z.number(),
      expires: z.string(),
      secure: z.boolean(),
      httpOnly: z.boolean(),
      path: z.string(),
      sameSite: z.string(),
    }),
    user: z.object({
      id: z.number(),
    }),
    deviceInfo: z.object({
      ip: z.string(),
      browser: z.string(),
      os: z.string(),
      device: z.string(),
    }),
  }),
  current: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;
