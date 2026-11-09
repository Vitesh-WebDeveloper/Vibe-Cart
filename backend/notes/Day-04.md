# Day 4 - Promises and Async/Await

## 1. What is a Promise?
JavaScript object representing the eventual success or failure of an asynchronous operation.

## 2. What are the three states of a Promise?
1.pending state, 2.fullfilled state and 3.rejected state

## 3. What is resolve()?
Fulfills a Promise with a value.

## 4. What is reject()?
Rejects a Promise with a reason.

## 5. What is async?
Makes a function return a Promise.

## 6. What is await?
Waits for a Promise to settle before continuing inside the async function.

## 7. What is try/catch?
Handles thrown errors and rejected awaited Promises.

## 8. Why do database operations use async/await?
to run the code ayncrounously so we can fetch data and then perform the operations with the taken/got data.

## 9. What happens when an awaited Promise rejects?
When an awaited Promise rejects, the rejection is thrown inside the async function. A surrounding catch block can handle the error and return a suitable response.

## 10. What did I build today?
i have built an async/awat function, so we can test how it works, with our created array of products

## 11. What is a service file?
Holds reusable operations/business logic, separate from HTTP handling.