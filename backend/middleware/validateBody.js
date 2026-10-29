export const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: result.error.issues.map((issue) => ({
          field: issue.path.length
            ? issue.path.join(".")
            : "body",
          message: issue.message,
        })),
      });
    }

    // Controllers receive the validated, parsed data.
    req.body = result.data;

    return next();
  };
};