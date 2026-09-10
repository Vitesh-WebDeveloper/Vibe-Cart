const mongoose = require("mongoose");

//i think we are doing the file like the before , 'Product.js' in which we wrote the kind of rules.isit? if yes for what sake, the products is done right why are this rules again.
const userSchema = new mongoose.Schema({
name : String,
email : {type : String, unique : true},
//here in object i understood everything except this 'unique : true' what is it?.
password : String,
});

module.exports = mongoose.model('User', userSchema);