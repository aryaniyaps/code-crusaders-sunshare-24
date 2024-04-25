import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z
      .string()
      // transform to number
      .transform((s) => parseInt(s))
      // make sure transform worked
      .pipe(z.number()),
    CORS_ORIGIN_URL: z.string().min(1),
    KRATOS_URL: z.string().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    PORT: process.env.PORT,
    CORS_ORIGIN_URL: process.env.CORS_ORIGIN_URL,
    KRATOS_URL: process.env.KRATOS_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  isServer: true,
});
