//This file is the "brain" that handles the database logic (fetching products) and sends the JSON response back to the client.

import Product from '../models/productModel.js';
// @desc    Fetch all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
//When you write an empty object {}, you are explicitly telling MongoDB: "Apply zero filters. Go to the Products collection and bring me back every single product you have."
// If you only wanted to fetch products that cost $100, you would write .find({ price: 100 }). Since this is the "Get All Products" route, we use {} to fetch everything.
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
// @desc    Fetch single product by FakeStore id
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
//findOne() tells the database to stop searching as soon as it finds the first match.

// req.params.id is the dynamic ID the user typed into the URL (for example, if the URL is /api/products/5, req.params.id is 5).

// By writing { id: req.params.id }, you are telling MongoDB: "Look through the database and find the one product whose id field exactly matches the ID from the URL."
    const product = await Product.findOne({ id: req.params.id });
    if (product) {
      res.status(200).json(product);
    } else {
        //why is the number changing one time we wrote as 500 and now it is 404, why like that is that our wish we can write any number except 200 as i understood 200 is for succesful printings.
        res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};