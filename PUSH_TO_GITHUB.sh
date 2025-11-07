#!/bin/bash

echo "🚀 DEFRA Design History - Push to GitHub"
echo "========================================"
echo ""
echo "Step 1: Create a GitHub repository"
echo "-----------------------------------"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: defra-blog-btms"
echo "3. Description: DEFRA Design History system using Strapi CMS"
echo "4. Choose Public or Private"
echo "5. ⚠️  DO NOT check 'Add README', '.gitignore', or 'license'"
echo "6. Click 'Create repository'"
echo ""
read -p "Press ENTER once you've created the repository..."
echo ""
echo "Step 2: Enter your GitHub username"
echo "-----------------------------------"
read -p "GitHub username: " GITHUB_USERNAME
echo ""
echo "Step 3: Connecting to GitHub"
echo "----------------------------"

# Add remote
git remote add origin "https://github.com/${GITHUB_USERNAME}/defra-blog-btms.git" 2>/dev/null || \
git remote set-url origin "https://github.com/${GITHUB_USERNAME}/defra-blog-btms.git"

# Rename branch to main
git branch -M main

echo ""
echo "Step 4: Pushing to GitHub"
echo "-------------------------"
echo "You'll be asked for your GitHub credentials..."
echo ""

# Push to GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your code is now on GitHub!"
    echo ""
    echo "View your repository at:"
    echo "https://github.com/${GITHUB_USERNAME}/defra-blog-btms"
    echo ""
    echo "Next steps:"
    echo "1. Follow QUICK_START.md to run the project"
    echo "2. Share the repo with your team"
    echo "3. Plan deployment using DEPLOYMENT.md"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo ""
    echo "1. Wrong username - Run this script again"
    echo "2. Need to authenticate - Use a Personal Access Token instead of password"
    echo "   Create one at: https://github.com/settings/tokens"
    echo "3. Repository already exists with different content"
    echo ""
    echo "For help, see: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories"
fi

