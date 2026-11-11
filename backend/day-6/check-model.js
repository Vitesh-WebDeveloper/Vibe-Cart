
import PracticeProduct from "./models/PracticeProduct.js";

const checkModels = async () => {
  const product1 = new PracticeProduct({
    name: "Headphones",
    price: 1999,
    stock: 10
  });

  try {
    await product1.validate();
    console.log("Valid product!");
  } catch (error) {
    console.log(error.message);
  }

  const product2 = new PracticeProduct({
    name: 12345,
    price: "banana"
  });

  try {
    await product2.validate();
    console.log("Product accepted unexpectedly!");
  } catch (error) {
    console.log("Invalid product rejected!");
  }
};

checkModels();
