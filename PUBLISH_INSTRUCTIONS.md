# Publish to GitHub (one-time)

A browser tab should have opened to **create a GitHub token**.

## Do this once

1. **On the GitHub page that opened**
   - Name: leave as is or type `Communication-Skills-publish`
   - Expiration: 30 days or No expiration
   - Click **Generate token**
   - **Copy the token** (starts with `ghp_`)

2. **In Terminal, run** (paste your token where it says `YOUR_TOKEN`):

   ```bash
   cd "/Users/nikulsinhdabhi/Github/Communication Skills"
   export GITHUB_TOKEN=YOUR_TOKEN
   ./publish.sh
   ```

   Example (use your real token):

   ```bash
   export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
   ./publish.sh
   ```

3. **Enable GitHub Pages**
   - Open: https://github.com/nikulsinhdabhi/Communication-Skills (or your repo URL)
   - **Settings** → **Pages** → **Source**: Deploy from a branch
   - **Branch**: `main` → **Folder**: `/ (root)` → **Save**

Your site will be at: **https://YOUR_USERNAME.github.io/Communication-Skills/**

---

**Security:** The token is only in your terminal for that session. Don’t share it or commit it. You can delete the token later at https://github.com/settings/tokens
