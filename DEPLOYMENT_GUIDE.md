# Deployment Guide for TemaMumtaza.id (cPanel)

This guide explains how to safely deploy your Next.js application to cPanel while keeping your secrets secure.

## 1. Security Verification (Already Done)
Your project is already configured **securely**:
- The `.gitignore` file includes `.env*`.
- This means your actual `OPENROUTER_API_KEY` will **NEVER** be pushed to GitHub.
- If hackers inspect your GitHub repo, they will only see `.env.example` (which is empty/safe).

## 2. Setting up cPanel

Since your secrets aren't in GitHub, you must manually give them to cPanel.

1. **Log in to cPanel** and go to **"Setup Node.js App"**.
2. **Create Application**:
   - **Node.js Version:** Select **20.x** or **18.x** (Next.js requires modern Node).
   - **Application Mode:** `Production`.
   - **Application Root:** `temamumtaza` (or your preferred folder).
   - **Application Startup File:** `server.js` (The file we just created).
   - **Run npm install:** Click the button to install dependencies.
3. **Environment Variables** (Crucial Step):
   - Look for the "Environment Variables" section in the Node.js App page.
   - Click "Add Variable".
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** (Paste your actual key here)
   - *Add another if needed:*
     - **Name:** `NODE_ENV`
     - **Value:** `production`

## 3. Building the App

In cPanel, "Run npm install" usually only installs dependencies. You often need to run the **build command** manually via the terminal or a hook.

**Option A: Via cPanel Terminal (Recommended)**
1. Go to the cPanel main page -> **Terminal**.
2. Navigate to your app folder: `cd temamumtaza`
3. Run the build command:
   ```bash
   npm run build
   ```
   *Note: If cPanel complains about memory, you might need to increase memory limits or build locally and upload the `.next` folder via FTP (but try building on server first).*
4. Once built, go back to "Setup Node.js App" and click **Restart Application**.

## 4. Updates Workflow

When you push new code to GitHub:
1. Go to cPanel -> **Git Version Control**.
2. **Pull** the latest changes to your repository path.
3. Go to **Terminal** -> `cd temamumtaza` -> `npm run build` (only if you changed code structure/dependencies).
4. Go to **Setup Node.js App** -> **Restart Application**.

## Summary
- **Secrets:** Safe. They live in cPanel "Environment Variables", not in files.
- **Server:** Uses `server.js` entry point for better cPanel compatibility.
