const mongoose = require('mongoose');
const Product = require('./models/Product');
//You are importing the blueprint you just made in Product.js so the script knows what a "Product" looks like.

require('dotenv').config();
// This line unlocks your .env safe so the script can read your hidden MONGO_URI password to log into the database.

async function seed() {
  try{
    await mongoose.connect(process.env.MONGO_URI);

    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    await Product.deleteMany({});
// Delete everything currently inside the Products list.
//The {} means "apply to everything", no exceptions 

    await Product.insertMany(products);
    // Take this array of 20 items we just downloaded from FakeStore, check them against the rulebook to make sure they are valid, and save them into the cloud database.

    console.log(`Seeded ${products.length} products`);
  //Once the data is saved, it prints a success message 
    process.exit();
//it explicitly kills the script
  }
  catch (error) {
    console.error("Seed error:", error);
  // prints exactly why it failed (console.error)
    process.exit(1);
  // process.exit(1) (the 1 tells the computer "I am shutting down because something broke").
  }
}

seed();