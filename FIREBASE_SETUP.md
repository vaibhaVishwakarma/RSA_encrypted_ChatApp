# Firebase Setup Guide

This guide walks you through setting up Firebase Firestore as the database for the MERN Chat App.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (or **"Create a project"**)
3. Enter a project name (e.g., `mern-chat-app`)
4. (Optional) Enable Google Analytics
5. Click **"Create project"** and wait for it to be ready

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** for development (you can add security rules later)
4. Select a Firestore location (choose one close to your users)
5. Click **"Enable"**

## Step 3: Get Service Account Credentials

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Go to the **"Service accounts"** tab
4. Click **"Generate new private key"** → **"Generate key"**
5. A JSON file will download — **keep this file secure and never commit it to git**

## Step 4: Configure Environment Variables

Create a `.env` file in the **root** of your project (same level as `package.json`).

### Option A: Local Development (using JSON file path)

1. Place the downloaded service account JSON file in your project (e.g., `backend/firebase-service-account.json`)
2. Add to `.env`:

```env
# Firebase - Local development
GOOGLE_APPLICATION_CREDENTIALS=./backend/firebase-service-account.json

# JWT (required for auth)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Option B: Production (using JSON string)

For platforms like Render, Vercel, or Heroku where you can't upload files:

1. Open the downloaded JSON file
2. Minify it to a single line (remove all line breaks and extra spaces)
3. Add to your environment variables:

```env
# Firebase - Production (JSON as string)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}

# JWT (required for auth)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**To create the single-line JSON string:**
- **Windows (PowerShell):** `(Get-Content firebase-service-account.json -Raw) -replace '\s+', ' '`
- **Mac/Linux:** `cat firebase-service-account.json | jq -c .`

## Step 5: Add `.env` to `.gitignore`

Ensure your `.env` file and service account JSON are never committed:

```
.env
*.json
!package.json
!package-lock.json
backend/firebase-service-account.json
```

## Step 6: Firestore Security Rules (Recommended for Production)

In Firebase Console → Firestore Database → Rules, use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Server uses Admin SDK - bypasses these rules
    // These rules apply only to direct client access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Since this app uses the Firebase Admin SDK on the backend, all database access goes through your server. The rules above block direct client access to Firestore.

## Collections Created Automatically

The app will create these Firestore collections when you use it:

- **users** — User accounts (fullName, username, password, gender, profilePic)
- **messages** — Encrypted chat messages (senderId, receiverId, message, publicKey, privateKey)
- **conversations** — Chat threads (participants, participantsKey, messages array)

## Troubleshooting

### "Firebase credentials not found"
- Ensure either `FIREBASE_SERVICE_ACCOUNT` or `GOOGLE_APPLICATION_CREDENTIALS` is set
- For `GOOGLE_APPLICATION_CREDENTIALS`, use the absolute path to the JSON file

### "Permission denied" errors
- Verify your service account has the "Cloud Datastore User" or "Firebase Admin" role
- Check that Firestore is enabled in your Firebase project

### Connection works locally but not in production
- Use `FIREBASE_SERVICE_ACCOUNT` with the minified JSON string for hosted platforms
- Ensure no extra quotes or escaping issues in the JSON string
