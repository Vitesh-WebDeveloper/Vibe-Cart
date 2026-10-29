import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .max(254, "Email must not exceed 254 characters")
  .pipe(z.email());

const signupPasswordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .refine(
    (password) => Buffer.byteLength(password, "utf8") <= 72,
    "Password must not exceed 72 UTF-8 bytes"
  );

const loginPasswordSchema = z
  .string()
  .min(1, "Password is required")
  .refine(
    (password) => Buffer.byteLength(password, "utf8") <= 72,
    "Password must not exceed 72 UTF-8 bytes"
  );

export const signupSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name must not exceed 80 characters"),

  email: emailSchema,

  password: signupPasswordSchema,
});

export const loginSchema = z.strictObject({
  email: emailSchema,
  password: loginPasswordSchema,
});