import { z } from "@hono/zod-openapi";
import { resSchema } from "../zodSchema";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const jwtSchema = resSchema.extend({
  data: z.object({
    token: z.string(),
  }),
});

export const profileSchema = resSchema.extend({
  data: z.object({
    id: z.string(),
    email: z.string(),
  }),
});
