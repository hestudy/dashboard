import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { webcrypto } from "node:crypto";
import auth from "./auth";
import { cors } from "hono/cors";

globalThis.crypto = webcrypto as Crypto;

const app = new OpenAPIHono().basePath("/api");

app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/auth", auth);

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/api/doc" }));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
