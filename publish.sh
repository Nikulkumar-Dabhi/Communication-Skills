#!/bin/bash
# Publish to GitHub. Either:
# A) Set a token, then run:  export GITHUB_TOKEN=your_token  && ./publish.sh   (script will create repo and push)
# B) Create the repo at https://github.com/new?name=Communication-Skills first, then run: ./publish.sh

set -e
cd "$(dirname "$0")"
REPO="Communication-Skills"

if [ -n "$GITHUB_TOKEN" ] || [ -n "$GH_TOKEN" ]; then
  TOKEN="${GITHUB_TOKEN:-$GH_TOKEN}"
  echo "Using GitHub token to create repo and push..."

  # Get username from API
  USERNAME=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/user | grep -o '"login": *"[^"]*"' | head -1 | sed 's/.*: *"\(.*\)"/\1/')
  if [ -z "$USERNAME" ]; then
    echo "Could not get GitHub username. Check your token (scope: repo)."
    exit 1
  fi
  echo "GitHub user: $USERNAME"

  # Create repo (idempotent: 422 = repo already exists, which is OK)
  HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos -d "{\"name\":\"$REPO\",\"description\":\"Communication Skills guide with chapters, videos, and summaries\",\"private\":false}")
  if [ "$HTTP" = "201" ]; then
    echo "Created repository: $USERNAME/$REPO"
  elif [ "$HTTP" = "422" ]; then
    echo "Repository $USERNAME/$REPO already exists."
  else
    echo "Unexpected response creating repo: HTTP $HTTP"
    exit 1
  fi

  git remote remove origin 2>/dev/null || true
  git remote add origin "https://${USERNAME}:${TOKEN}@github.com/${USERNAME}/${REPO}.git"
  git push -u origin main

  # Switch remote to normal URL (no token in URL)
  git remote set-url origin "https://github.com/${USERNAME}/${REPO}.git"
  echo ""
  echo "Pushed to https://github.com/${USERNAME}/${REPO}"
else
  USERNAME="Nikulkumar-Dabhi"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/${USERNAME}/${REPO}.git"
  git push -u origin main
  echo ""
  echo "Pushed. Enable Pages: Settings → Pages → Deploy from branch → main → / (root)"
  echo "Site: https://${USERNAME}.github.io/${REPO}/"
fi

echo ""
echo "Enable GitHub Pages: repo → Settings → Pages → Source: Deploy from a branch → main → / (root)"
echo "Live site: https://${USERNAME}.github.io/${REPO}/"
