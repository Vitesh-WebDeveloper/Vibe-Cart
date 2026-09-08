const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function seed() {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    await Product.deleteMany({});
    await Product.insertMany(products);
    
    console.log(`Seeded ${products.length} products`);
    process.exit();
  }
  catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();