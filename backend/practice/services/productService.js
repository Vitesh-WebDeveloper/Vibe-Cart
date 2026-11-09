let products = [
  { id: 1, name: "Phone", price: 20000 },
  { id: 2, name: "Laptop", price: 55000 }
];

// Small delay to simulate an asynchronous operation
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// GET: retrieve all products
export const getAllProducts = async ({ shouldFail = false } = {}) => {
  await wait(100);

  if (shouldFail) {
    throw new Error("Simulated failure");
  }

  return products;
};

// POST: add a new product
export const addProduct = async (productData) => {
  await wait(100);

  const nextId =
    products.length > 0
      ? Math.max(...products.map(product => product.id)) + 1
      : 1;

  const newProduct = {
    id: nextId,
    name: productData.name.trim(),
    price: productData.price
  };

  products.push(newProduct);

  return newProduct;
};
