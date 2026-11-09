# Day 2 - HTTP and Express

## 1. What is HTTP?
Ans: HTTP stands for Hypertext Transfer Protocol. It is a communication protocol that allows a client (such as a browser) and a server to exchange requests and responses.

## 2. What is the difference between GET and POST?
Ans: GET means retrieving the entire/total existing data, and POST means adding the new data/things into the existing total data.

## 3. What are request and response?
Ans: request is the work/input sent my user to the server. and response is the output/answer sent from server to user.

## 4. What are headers and body?
Ans: Headers contain additional information about an HTTP request or response, such as content type and authentication information.The body contains the actual data being sent, such as a new product's name and price.

## 5. What is middleware?
Ans: the function which runs between request and responce.

## 6. Why do we use express.json()?
Ans: express.json() is middleware that parses incoming JSON request bodies and makes the parsed data available through req.body.

## 7. What is req.body?
Ans: req.body contains the parsed data submitted by the client in the request body. For example, when a client sends a new product, we can read its name and price using req.body.name and req.body.price.

## 8. Difference between 200, 201 and 400.
Ans: 200: request succesful, 201: new resource created and 400: invalid request.

## 9. What happens when I restart my practice API?
Ans: if i restart my practice api, then i will only see 2 products again, not the post request created one.

## 10. What did I build today?
Ans: i have created a server.js file in which i have used express to get http in json, then i created a temporary products object's in array. then i have used app.get to retrive/check all products. then i have used app.post to add new products.and i checked this using port 5001, in the postman application.