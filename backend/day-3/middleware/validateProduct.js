
export const validateProduct = (req, res, next) => {

  // Get name and price from the request body
  const { name, price } = req.body;

  // Check whether the product information is valid
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

  // If validation succeeds, continue to the controller
  return next();
};
