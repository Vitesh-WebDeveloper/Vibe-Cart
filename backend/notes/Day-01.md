server.js
    |
    v
Load application configuration
    |
    v
Connect to MongoDB
    |
    v
Create Express application
    |
    v
Configure CORS and JSON parsing
    |
    v
Register health check
    |
    v
Register API routes
    |
    v
404 handler
    |
    v
Start listening on port

(Notice that the database connection is started before the Express app is created, but is not awaited; record this distinction.)

1Q: Why do we need Node.js for VibeCart?
Ans: because if we use normal js, we cannot write or use backend.if we use node.js we can connect our files to server

2Q: What is the difference between Node.js and Express?
Ans: node.js is A JavaScript runtime environment, ans express is the framework of node.js(but honestly i dont know the use of it)

3Q: Why do we install packages using npm?
Ans: because instead of doing a long process to install, run etc.. we have a prebuild thing call npm which has all the pacakges written before itself, so that we can use the npm in terminal to use it easily, ex : npm install, npm run dev etc..

4Q: Why does server.js import connectDB?  
Ans: because connectDB is the function where we extract the mongodb url, which we kept it as secret in .env file.
and the main file is connectDB, if their is no connectDB backend will not work at all, as we need to definetly connect the mongodb to server.

5Q: What does express.json() do?  
Ans: it converts the upcoming express string or array into json format.

6Q: What is the purpose of /api/health?  
Ans: its a easy way to check the status of the backend, that is it working well or good or not, if everything runs good, it shows status: ok, if something wrong it shows status:error

7Q: Why do we register a 404 handler after the actual routes?
Ans: because it checks every routes which ever we have written, if some error in the routes or we are logging the wrong npm, it will hit the error. if everything is well and good then only the 404 error wont work, it will go to next line.

8Q: What is the problem with starting the HTTP server before confirming the database connection?
Ans: //honestly i dont knew the answer, but u woulod definetly like to know it or understand it when i reach to this topic