import { z } from "@hono/zod-openapi";

export const resSchema = z.object({
  success: z.boolean(),
  message: z.string().nullish(),
  data: z.object({}).nullish(),
});
