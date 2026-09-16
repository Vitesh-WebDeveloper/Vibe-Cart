//this file is for as we have created the Product in 'productModel.js' but we dont have any products inside it so we are sending the products from the fetch api, and we have called our own server.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';

dotenv.config();
connectDB();

const importData = async () => {

try {

const response = await fetch('https://fakestoreapi.com/products');

const products = await response.json();

await Product.deleteMany(); // Clear old data to prevent duplicates

await Product.insertMany(products); // Bulk insert

console.log('Products Imported to MongoDB!');

process.exit();

} catch (error) {

console.error(`Error: ${error.message}`);

process.exit(1);

}

};

importData();

// Run node seeder.js in your terminal to populate your cloud database in one go.

