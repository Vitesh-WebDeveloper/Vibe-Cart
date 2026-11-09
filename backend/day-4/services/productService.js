export const fetchProducts = ({ shouldFail = false } = {}) => {
  return new Promise((resolve, reject) => {
    const products = ["Phone", "Laptop"];

    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("Simulated failure"));
      }

      if (products.length === 0) {
        return reject(new Error("No products found"));
      }

      return resolve(products);
    }, 300);
  });
};
