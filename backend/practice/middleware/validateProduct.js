
export const validateProduct = (req, res, next) => {
  const { name, price } = req.body ?? {};

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message: "Please provide a valid name and positive price."
    });
  }

  return next();
};
