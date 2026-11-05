# Day 3 - Routes, Controllers and Middleware

## 1. What is a route?
A route defines how the server responds to a particular HTTP method and URL.

Example:
app.get("/products", getProducts);
app.post("/products", createProduct);

- GET /products → retrieve products.
- POST /products → create a product.
Same URL, different HTTP methods, different behavior. 

## 2. What is a controller?
A controller contains the application logic for handling a request and usually sends the response.

Example:
export const getProducts = (req, res) => {
  return res.status(200).json({
    products: products
  });
};

Here, getProducts is a controller function.

## 3. What is middleware?
the middle task done between req and res

## 4. What is next()?
next() passes control to the next middleware or handler in the Express request pipeline.

It does not simply execute the next line of JavaScript.

Example:
app.post(
  "/products",
  validateProduct,
  createProduct
);

Inside validateProduct:
if (invalid) {
  return res.status(400).json({
    message: "Invalid product"
  });
}

next();

If valid:

next() → createProduct

If invalid:

res.status(400) → request ends without reaching createProduct.

Also, next() can pass control to error-handling middleware when used as next(error).

## 5. What is the difference between routes and controllers?
routes says what file should run at the time of particular route time. controllers runs the code and gives output(the contoller runs only the routes selected functions or etc.. only).
(Remember this simple distinction:
Routes
The traffic director

Decides which middleware/controller should handle the request.
Controller
The worker

Performs the required application logic and sends the response.)

## 6. Why do we separate backend code into files?
to be structed file, no confusing and errors.

## 7. What happens when POST /api/products is requested?
adds new product in the existing products list.

## 8. What happens if middleware sends 400 instead of calling next()?
it hits an error message, in the console as we already instructed as 'Please provide a valid name and positive price.'
(When middleware executes:
return res.status(400).json({
  message: "Invalid product"
});

- The client receives HTTP 400.
- The response is sent.
- The controller is not executed through the normal chain.
- The request is finished.
One clarification: Express does not automatically print this message in the console. The client receives it; console output requires logging separately.)

## 9. What is the responsibility of server.js?
The responsibility of server.js is call express and checks the port working or not, and server.js is main code as if server.js wont work succesfully, then the entire backend stops working. as it is the starting point of backend.

## 10. What did I build today?
I have created a day-3 folder first, then in the folder i created a file named 'server.js'. in server.js i have imported the express, and imported the productRoutes.js. then i have created the folder named 'routes', in routes folder i have created a file named 'productRoutes.js'. this use of this file is what ever the route user click it says other imported file to perform the task. the task performers are present in 'productController.js'. and before that we use middleware for validating the product,then product Controller to show outputs.




POST /api/products
        |
        v
server.js
        |
        v
productRoutes.js
        |
        v
validateProduct.js
        |
        | Valid?
        |
    YES |       NO
        |        |
        v        v
      next()   400 Error
        |
        v
productController.js
        |
        v
    201 Created