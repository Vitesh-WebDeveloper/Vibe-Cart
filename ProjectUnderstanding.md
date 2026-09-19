All about Frontend : {
<!-- index.html -->
1. The Project starts with index.html, in the index.html file we have connected main.tsx, and took a root, so that what ever we write in main.tsx it will visible in UI.
<!-- index.css -->
1. We have connected index.css to tailwindcss , so that we can write the styling in the same page and same line of the code and in a simple way.


<!-- main.tsx -->
2. main.tsx file has connected with App folder so that what ever we write in App, it will be visible to Ui,(we consider App.tsx as index.html), we have done up to 3 files just because in index.html we cannot write react., and main reason of main.tsx is it create the virtual dom , then it changes the orginal dom, so it will be fast than js.

<!-- App.tsx -->
3. The actual ui shower and main connecter of all the files is App.tsx, in which we have used BrowserRouter so that we can seperate each of the files and return them , the files connected in App.tsx are :

import Home from "./components/Home"; // it works when ever the page opens, all the products in a grid.

import ProductDetail from "./components/ProductDetail"; // it a single product and its detailed details, and has a add to cart button(for single item viewer , who want to add the item to cart).

import NotFound from "./components/NotFound"; // if the user tries to seacrh for the item which is not existed then it works. and shows error.

import Navbar from "./components/Navbar"; // it has all about buttons of (logo,cart,login,signin )

import Cart from "./components/Cart"; // detailed about item add/delete/update and total. 

import Toast from "./components/Toast"; // it works to help the user , when ever he adds the product the notification arrives so the user will be relaxed.

import Login from "./components/Login"; // it is for the users who already signup before and want to login with the same email and password , which they used before.

import Signup from "./components/Signup"; // it is for the new users who is new for 'vibecart' and want to register his name, email and password, (one time) so that he will not waste his time for sinup again.(as he gets his own email and password later for login purpose).

(the App.tsx also have user persistant memory of cart and login,so that it will be very helpful for him even he refreashed the page or reopened the page).

<!-- types.ts -->
4. it a strict rules for products, that how the 'title' should be or how the 'price' etc.. , should be because the products come from fakestore api, so we need to make it as rules , so that we can use the products without any errors.

}

All About Backend : {
<!-- db.js -->
5. the Own mongodb server connector with our Own code.
}

<!-- server.js -->
6. it is like App.tsx but for backend, it has all the routes to it.
import productRoutes from './routes/productRoutes.js';
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; 

7. we wrote this for, how all Products should look like and how a single Product should look like, and when should they appear (i mean on which url ending ex : / and /:id)(
<!-- productModel.js -->
The product strict rule's how the how product should be like how the 'title' should be or how the 'price'etc...,  we create this rules in productschema, and the Products will be in 'Product' which follows the rules and add all the products to it.
<!-- seeder.js -->
as we dont have any Products in productModel = "Product", so this files fetch the fakestoreApi and takes the products and handover to our own thing called 'Product', now 'Product' has all the products and satisfies the rules even.
<!-- productController.js -->
this file is has 2 functions named 'getProducts' and 'getProductById'
getProducts function helps to print out every single product which has inside our own mongodb.
getProductById function helps to print out only single product which we need, to print only single product we used the id as refernce.
<!-- productRoutes.js -->
as per the productContoller.js we used to functions when the particualar function getsused that should work, but we didn't write when it use it on UI. the productRoutes has 2 things '/' and '/:id' it means it is about the page url, when '/' shows on url of the page then the 'getProducts' functions runs out, and 'getProductById' function runs when we clicked on one particular product then ui changes from '/' to '/:id'.
)

8. now we are writing the code for the login and signup(
<!-- userModel -->
it is the rule book for how User "name, email and password" look like.


)