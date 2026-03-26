# Deploy from GitHub Guide

This guide explains how to deploy this app from a GitHub repository.

Because this is a full-stack app (Node/Express API + React frontend), the easiest path is:

- Deploy the whole app on **Render** as a single Web Service, or
- Deploy backend and frontend separately (Render + Vercel/Netlify).

## Quick Option: GitHub Pages + GitHub Actions (Frontend)

If you want the simplest GitHub-native deployment:

1. Keep your backend deployed on Render (or any Node host).
2. Use GitHub Pages for the frontend.

This repo now includes:

- `.github/workflows/deploy-pages.yml`

### One-time setup

1. Push to `main`.
2. In GitHub repo settings:
   - **Settings -> Pages -> Build and deployment**
   - Source: **GitHub Actions**
3. Add repo variable:
   - **Settings -> Secrets and variables -> Actions -> Variables**
   - `BACKEND_URL=https://<your-backend-domain>`

After each push to `main`, frontend deploys automatically to:

- `https://<your-username>.github.io/<repo-name>/`

> Note: GitHub Pages cannot run your Node backend. It only serves static frontend files.

---

## 1) Push project to GitHub

1. Create a new GitHub repository.
2. In your local project root, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Make sure secrets are ignored:

- `.env`
- Firebase service-account JSON file

---

## 2) Required environment variables

Set these in your deployment platform (not in GitHub files):

- `JWT_SECRET`
- `FIREBASE_SERVICE_ACCOUNT` (recommended on cloud)
  - Value should be the service-account JSON as a single-line string.

Optional:

- `NODE_ENV=production`
- `PORT` (platform often provides this automatically)

---

## 3) Option A (Recommended): Deploy on Render from GitHub

### Create Web Service

1. Go to [Render](https://render.com/) and sign in.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repo.
4. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variables listed above.
6. Click **Create Web Service**.

### Why this works

- `npm run build` installs dependencies and builds frontend.
- `npm start` runs `backend/server.js`.
- Backend serves `frontend/dist` in production.

---

## 4) Firebase service account setup on Render

1. Open your downloaded Firebase admin JSON.
2. Convert to one-line JSON.
3. Add it to Render env var:
   - Key: `FIREBASE_SERVICE_ACCOUNT`
   - Value: `<one-line-json>`

PowerShell helper:

```powershell
(Get-Content .\your-service-account.json -Raw) | ConvertFrom-Json | ConvertTo-Json -Compress
```

---

## 5) Verify deployment

After deploy completes:

1. Open Render URL.
2. Sign up a new user.
3. Send message between two users.
4. Confirm:
   - Login/signup works
   - Real-time messages work
   - Firestore writes are visible in Firebase Console

---

## 6) Option B: Split deployment (advanced)

- Backend on Render/Railway/Fly
- Frontend on Vercel/Netlify

If you split:

1. Add backend URL to frontend env (for API and socket endpoint).
2. Configure CORS on backend for frontend domain.
3. Keep auth headers/cookies aligned across domains.

For this project, single-service Render deployment is simpler and less error-prone.

---

## 7) Common issues

- **Unauthorized / token missing**
  - Ensure latest auth changes are deployed.
  - Clear browser local storage and log in again.

- **Firebase credential errors**
  - Check `FIREBASE_SERVICE_ACCOUNT` formatting.
  - Confirm Firestore is enabled.

- **Socket not updating**
  - Ensure frontend and backend are on same deployed origin or correctly configured URL/proxy.

