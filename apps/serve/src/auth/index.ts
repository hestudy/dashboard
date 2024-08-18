import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { bearerAuth } from "hono/bearer-auth";
import { generateIdFromEntropySize, Session, User } from "lucia";
import { db } from "../lib/db";
import { lucia } from "../lib/lucia";
import { userTable } from "../schema";
import { resSchema } from "../zodSchema";
import {
  jwtSchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "./schema";

const auth = new OpenAPIHono<{
  Variables: {
    payload: {
      user: User;
      session: Session;
    };
  };
}>();

const register = createRoute({
  method: "post",
  path: "/register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resSchema,
        },
      },
      description: "Registration successful",
    },
    400: {
      content: {
        "application/json": {
          schema: resSchema,
        },
      },
      description: "Invalid request",
    },
  },
  tags: ["auth"],
});

auth.openapi(register, async (c) => {
  const { email, password, confirmPassword } = await c.req.valid("json");

  if (password !== confirmPassword) {
    return c.json(
      {
        success: false,
        message: "Passwords do not match",
      },
      400
    );
  }

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .get();

  if (!!user) {
    return c.json({
      success: false,
      message: "User already exists",
    });
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);

  await db
    .insert(userTable)
    .values({
      id: userId,
      email,
      password_hash: passwordHash,
    })
    .run();

  return c.json(
    {
      success: true,
    },
    200
  );
});

const loginRoute = createRoute({
  method: "post",
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: jwtSchema,
        },
      },
      description: "Login successful",
    },
    400: {
      content: {
        "application/json": {
          schema: resSchema,
        },
      },
      description: "Invalid request",
    },
  },
  tags: ["auth"],
});

auth.openapi(loginRoute, async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .get();

  if (!user) {
    return c.json(
      {
        success: false,
        message: "User not found",
      },
      400
    );
  }

  const validPassword = await verify(user.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return c.json(
      {
        success: false,
        message: "Invalid password",
      },
      400
    );
  }

  const session = await lucia.createSession(user.id, {});

  return c.json(
    {
      data: {
        token: session.id,
      },
      success: true,
    },
    200
  );
});

const profileRoute = createRoute({
  method: "get",
  path: "/profile",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: profileSchema,
        },
      },
      description: "Profile fetched successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: resSchema,
        },
      },
      description: "Invalid request",
    },
  },
  tags: ["auth"],
  security: [
    {
      Bearer: [],
    },
  ],
});

auth.use(
  "/profile",
  bearerAuth({
    verifyToken: async (token, c) => {
      const payload = await lucia.validateSession(token);
      c.set("payload", payload);
      return !!payload.user?.id;
    },
  })
);

auth.openapi(profileRoute, async (c) => {
  const payload = c.get("payload");

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, payload.user.id))
    .get();

  if (!user) {
    return c.json(
      {
        success: false,
        message: "User not found",
      },
      400
    );
  }

  return c.json(
    {
      data: {
        id: user.id,
        email: user.email,
      },
      success: true,
    },
    200
  );
});

export default auth;
