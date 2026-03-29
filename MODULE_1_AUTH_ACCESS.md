# Module 1: Authentication and Access Control

## Why this module exists
This module answers: **who is the user and should they be allowed to access a route?**

It handles signup/login/logout, JWT generation, and protected-route checks.

## Main files in this module
- [`backend/controllers/auth.controller.js`](backend/controllers/auth.controller.js)
- [`backend/middleware/protectRoute.js`](backend/middleware/protectRoute.js)
- [`backend/utils/generateToken.js`](backend/utils/generateToken.js)
- [`backend/controllers/user.controller.js`](backend/controllers/user.controller.js)
- [`backend/routes/auth.routes.js`](backend/routes/auth.routes.js)
- [`backend/routes/user.routes.js`](backend/routes/user.routes.js)
- [`frontend/src/context/AuthContext.jsx`](frontend/src/context/AuthContext.jsx)
- [`frontend/src/utils/api.js`](frontend/src/utils/api.js)

## Basic workflow (step-by-step)
1. User fills signup/login form in frontend.
2. Frontend sends credentials to `/api/auth/signup` or `/api/auth/login`.
3. Backend validates user data and password.
4. Backend creates JWT token and sets cookie + returns token in response.
5. Frontend stores auth data and token in local storage helper.
6. For protected APIs, frontend attaches token in headers.
7. `protectRoute` verifies JWT and injects user into `req.user`.
8. Route runs only if token is valid.

## How this works technically (simple terms)
- **JWT** is like a signed identity card. Server signs it, client sends it back.
- **Middleware** (`protectRoute`) is a gatekeeper that checks the card before route logic executes.
- **Auth context** keeps current user in frontend state so pages know if user is logged in.

## Inputs and outputs
- Input: username/password and auth token
- Output: authenticated user object, access granted/denied

## Common failure points
- Token missing or expired
- Wrong JWT secret in environment
- Frontend not sending auth headers
- Cookie blocked in some mobile browsers

## Counter questions (for viva/discussion)
1. Why use JWT instead of storing session state on server memory?
2. What is the role of middleware in Express auth flow?
3. Why does mobile sometimes fail with cookie-only auth?
4. How would you implement token refresh securely?
5. What changes if we move to OAuth login (Google/GitHub)?

## Counter questions: detailed answers
### 1) Why use JWT instead of storing session state on server memory?
JWT is stateless. The server can verify a token using a secret key without storing per-user session rows in memory. This helps when deploying multiple backend instances because any instance can validate the token.  
With memory sessions, scaling usually needs sticky sessions or a shared session store (like Redis).  
Trade-off: token revocation is harder, so expiry and refresh strategy become important.

### 2) What is the role of middleware in Express auth flow?
Middleware runs before the controller and centralizes route protection. `protectRoute` checks token presence, verifies signature, decodes user identity, and attaches `req.user`.  
Controllers then focus only on business logic, not repetitive auth checks. This keeps code cleaner and easier to maintain.

### 3) Why does mobile sometimes fail with cookie-only auth?
Mobile browsers may enforce stricter cookie policies (especially around `SameSite`, `Secure`, and cross-site contexts). In some setups the cookie is not sent with API requests, causing “No token provided.”  
A robust pattern is using both cookie and bearer header fallback, which this project already supports.

### 4) How would you implement token refresh securely?
Use short-lived access tokens and longer-lived refresh tokens:
- Access token: small lifetime (e.g., 10-20 min)
- Refresh token: httpOnly cookie, rotated regularly
- `/refresh` endpoint issues new access token only after refresh validation
- Store refresh token metadata/hash server-side for revocation
This reduces risk if access token leaks and allows safe session continuity.

### 5) What changes if we move to OAuth login (Google/GitHub)?
Password verification moves to the provider. Your backend receives verified identity from OAuth callback and maps it to local user records.  
You still typically issue your own JWT for internal API authorization.  
So authentication source changes, but authorization flow in your app remains similar.

## Conclusive summary
This module establishes identity and enforces access boundaries. JWT + middleware design keeps the backend scalable and code modular. For production-grade security, token lifecycle (expiry, refresh, revocation) is the most critical enhancement area.

