# VibeCart — Technical Audit

**Day 1 date:** 2026-10-28  
**Day 2 date:** 2026-10-29

## 1. Baseline results

The following results were recorded during the Day 1 baseline check, before the Day 2 changes.

| Check | Result | Evidence |
|---|---|---|
| Frontend production build | PASS | Vite built successfully in 4.50 seconds |
| Frontend lint | FAIL | 5 errors and 1 warning |
| Frontend tests | PASS | 2 files, 4 tests passed |
| Backend tests | FAIL | `npm test` exits with "Error: no test specified" |

These are the baseline results. The build, lint and test commands must be run again after changes to confirm the current state.

## 2. Frontend lint findings

The following findings were recorded during the baseline check:

- `src/App.tsx:128:6` — React effect has a missing `showToast` dependency.
- `src/components/Cart.tsx:72:21` — Explicit `any` type.
- `src/components/Home.tsx:24:10` — Unused `err` variable.
- `src/components/Login.tsx:64:19` — Explicit `any` type.
- `src/components/ProductDetail.tsx:34:16` — Unused `err` variable.
- `src/components/Signup.tsx:38:19` — Explicit `any` type.

No lint fixes were made during the baseline measurement. The current lint status must be checked again after any fixes.

## 3. Frontend test coverage

Passing test files during the baseline check:

- `src/utils/cartUtils.test.ts` — 2 tests.
- `src/components/Toast.test.tsx` — 2 tests.

These results establish that the existing tests passed at the time of the baseline check. They do not establish that authentication, checkout, backend cart handling or order creation is correct.

## 4. Backend and checkout audit

### Initial findings

**P0 — Client-supplied order prices**

`backend/controllers/orderController.js`: the controller can fall back to client-supplied order items when the database cart is empty and calculate the total using submitted prices.

**Risk:** A client may manipulate submitted product prices or order items. Order totals must be calculated from trusted server-side product data.

**Status:** Open — requires a verified fix and tests.

**P0 — Client-supplied cart fields**

`backend/controllers/cartController.js`: the original add-to-cart implementation accepts product fields from the client's request instead of resolving authoritative product details from the database.

**Risk:** A client may submit modified product information, including a price.

**Status:** Validation work is underway, but server-side product and price trust must still be addressed and verified.

**P1 — Frontend/backend cart integration**

The frontend cart uses browser `localStorage`. The frontend flow is not yet integrated with the database-backed cart endpoints.

**Status:** Open — integration and expected behavior need to be verified.

**P1 — Backend test suite missing**

The baseline backend `npm test` command exits with `Error: no test specified`.

**Status:** Open — meaningful automated backend tests need to be implemented and executed.

**P1 — Validation and security review**

Request validation, authorization, CORS and client-facing error handling require review. Day 2 work adds or updates request-validation middleware and authentication/cart schemas. Correct middleware order and actual HTTP responses still need to be verified.

**Status:** In progress.

**P2 — Documentation accuracy**

The README needs review for its React version, test coverage, setup instructions and production-readiness claims.

**Status:** Open.

## 5. Day 2 implementation progress

**Date:** 2026-10-29

The current working changes include the following files prepared for review:

- `backend/package.json`
- `backend/package-lock.json`
- `backend/middleware/validateBody.js`
- `backend/middleware/validateCartProduct.js`
- `backend/validation/authSchemas.js`
- `backend/validation/cartSchemas.js`
- `backend/routes/authRoutes.js`
- `backend/routes/cartRoutes.js`
- `backend/controllers/cartController.js`

These changes are intended to add request-body validation, apply validation to authentication and cart routes, check cart product requests, and enforce the per-product quantity limit.

The file changes and behavior must be reviewed before treating these items as complete.

### Day 2 review checklist

- [ ] Review the request-body validation middleware.
- [ ] Review the signup and login schemas.
- [ ] Review the cart schema and product-validation middleware.
- [ ] Confirm signup and login routes apply the correct validation middleware.
- [ ] Confirm cart routes apply authentication and validation in the correct order.
- [ ] Confirm invalid request bodies receive predictable `400 Bad Request` responses.
- [ ] Confirm unauthenticated requests to protected cart routes are rejected.
- [ ] Review the cart quantity-limit behavior.
- [ ] Run and record the relevant tests.
- [ ] Review the full staged Git diff before committing.

## 6. Cart quantity-limit rule

The intended rule is that a product's cart quantity must be a whole number from 1 through 10.

For an existing cart item, the server must reject an addition if the resulting total quantity would exceed 10.

Example:

- Existing quantity: 8
- Requested addition: 3
- Resulting quantity: 11
- Expected response: `400 Bad Request`
- Expected behavior: do not save the invalid quantity

The controller's quantity checks do not, by themselves, make client-provided product fields or prices trustworthy. Product details and prices must be resolved or verified using trusted server-side data.

**Status:** Implementation and behavior require review and testing.

## 7. Day 2 API test record

Record the actual status codes and outcomes after running these tests in a development environment.

| Test scenario | Expected result | Actual result |
|---|---|---|
| Signup with invalid input | `400 Bad Request` | Not recorded |
| Login with invalid input | `400 Bad Request` | Not recorded |
| Cart request without authentication | `401 Unauthorized` | Not recorded |
| Cart request with an invalid quantity | `400 Bad Request` | Not recorded |
| Adding a quantity that would exceed 10 | `400 Bad Request` | Not recorded |
| Request for an unknown product | `404 Not Found`, if handled by the current product-validation middleware | Not recorded |
| Valid request for a known product | Confirm the actual response defined by the route/controller | Not recorded |

These are expected outcomes, not evidence that the tests have passed. Update the actual-result column only after observing the API responses.

Use a development database and test account. Do not perform destructive tests against production data.

## 8. Security and secrets

- [ ] Rotate the MongoDB credentials if they were exposed.
- [ ] Rotate the JWT secret if it was exposed.
- [ ] Redeploy the backend with the updated credentials and secret.
- [ ] Verify backend database connectivity after rotation.
- [ ] Verify that a fresh login works after rotation.
- [ ] Check Git tracking and history for exposed secrets.
- [ ] Ensure environment files containing secrets are excluded from future commits.
- [ ] Verify that no secrets are included in the staged changes before committing or pushing.

**Known Git finding:** A previous `git ls-files .env backend/.env` check returned `.env`, indicating that the root `.env` file is tracked by Git. The backend `.env` was not listed by that check and was previously reported as ignored.

The root `.env` tracking issue must be investigated before pushing further changes. Removing a file from tracking does not remove it from earlier Git history. If live credentials were exposed, rotate them rather than relying only on removing the file.

Never record passwords, connection strings, tokens or other secret values in this audit.

## 9. Git review

- [x] Day 1 audit committed locally.
- [x] Day 2 files staged for review.
- [x] `git diff --cached --check` was run; it produced no output before the audit correction.
- [ ] Correct the audit formatting and stage the corrected version.
- [ ] Re-run `git diff --cached --check`.
- [ ] Review the complete staged diff.
- [ ] Review the root `.env` tracking issue before pushing.
- [ ] Resolve the previously reported remote/local history divergence safely.
- [ ] Commit the Day 2 changes only after the staged diff and tests have been reviewed.
- [ ] Push only after the Git history and secret-handling issues have been addressed.

Do not use a force push to bypass the remote/local history divergence. Fetch and inspect the commit graph before deciding how to reconcile it.

## 10. Outstanding actions

1. Finish reviewing the authentication, cart and order request flows.
2. Verify the Day 2 validation middleware, schemas and route order.
3. Test invalid requests and record the actual HTTP status codes.
4. Resolve the cart's client-trusted product fields and price issue.
5. Resolve the order controller's client-trusted price issue.
6. Add meaningful backend automated tests.
7. Re-run the frontend build, lint and existing tests.
8. Investigate the tracked root `.env` file and rotate exposed credentials.
9. Review the staged diff and resolve Git history divergence safely.
10. Update the README after implementation and test results are verified.

## 11. Day 1 and Day 2 completion checklist

### Day 1

- [x] Production build completed.
- [x] Existing frontend tests passed.
- [x] Backend test command executed and failure recorded.
- [x] Frontend lint findings recorded.
- [ ] Signup request flow fully traced.
- [ ] Login and JWT verification fully traced.
- [ ] Frontend cart storage and backend cart endpoints fully traced.
- [ ] Order creation and price calculation fully traced.
- [ ] Credential rotation verified.
- [ ] Git state and secret tracking reviewed.
- [ ] Interview explanations written.
- [ ] AI learning and job tracker updated.

### Day 2

- [ ] Validation middleware and schemas reviewed.
- [ ] Authentication and cart route integration verified.
- [ ] Quantity-limit implementation verified.
- [ ] API tests executed and actual HTTP codes recorded.
- [ ] Backend automated tests implemented and passing.
- [ ] Server-side product and price trust issues resolved.
- [ ] Staged changes reviewed.
- [ ] Security and Git checks completed.

**Audit rule:** Mark a checkbox complete only after the corresponding work or test has actually been performed and its result verified.
