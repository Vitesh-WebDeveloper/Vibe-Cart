import { z } from "zod";

const productIdSchema = z.union([
  z
    .number()
    .int()
    .min(1)
    .max(999999999)
    .transform(String),

  z.string().regex(
    /^[1-9]\d{0,8}$/,
    "Product ID must be a positive numeric ID"
  ),
]);

export const addToCartSchema = z.strictObject({
  productId: productIdSchema,

  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  price: z
    .number()
    .min(0)
    .max(1000000),

  image: z
    .httpUrl()
    .max(2048),

  quantity: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional(),
});