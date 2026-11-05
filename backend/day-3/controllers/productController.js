let products = [
  { id: 1, name: "Headphones", price: 1999 },
  { id: 2, name: "Keyboard", price: 2499 }
];

export const getProducts = (req,res) => {

 return res.status(200).json({
    products: products
  });    
}

export const createProduct = (req,res) =>{
    const { name, price } = req.body;

  const nextId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct = {
    id: nextId,
    name: name.trim(),
    price: price
  };

  products.push(newProduct);

  return res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
}