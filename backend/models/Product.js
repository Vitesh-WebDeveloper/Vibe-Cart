const mongoose = require('mongoose');
// You are importing the Mongoose tool. Mongoose is the translator that lets JavaScript talk to MongoDB.

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number },
});
//You are creating a JavaScript object that acts as a strict checklist. Notice how title is set to String (text) and price is set to Number. If your React frontend accidentally tries to send a price of "Free" (a string), Mongoose will reject it and protect your database.

module.exports = mongoose.model('Product', productSchema);
// module.exports = ...: By default, files in Node.js cannot see each other's code. This line packages your new rulebook up and "exports" it, allowing other files (like your seed script) to import and use it.
// This single line does magic. It takes your strict rulebook (productSchema) and hands it to a MongoDB worker (mongoose.model).