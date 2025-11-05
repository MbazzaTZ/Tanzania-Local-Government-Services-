# ===============================================================
# Phase 8.5 – GitHub + Vercel Auto-Sync Script
# ===============================================================
Write-Host "🚀 Starting Phase 8.5 – GitHub + Vercel Sync" -ForegroundColor Cyan

$ErrorActionPreference = "Stop"

# 1️⃣ Ensure we are in a git repo
if (-not (Test-Path ".git")) {
    Write-Host "⚙️ Initializing new Git repository..."
    git init
}

# 2️⃣ Check for remote origin
$remoteCheck = git remote get-url origin 2>$null
if (-not $remoteCheck) {
    $githubRepo = Read-Host "Enter your GitHub repo URL (e.g., https://github.com/MbazzaTZ/Tanzania-Local-Government-Services-.git)"
    git remote add origin $githubRepo
    Write-Host "✅ Remote origin added."
} else {
    Write-Host "🔗 Using existing remote: $remoteCheck"
}

# 3️⃣ Stage and commit all files
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$phase = "Phase 8.5"
$commitMsg = "AutoSync $phase update @ $timestamp"
git commit -m "$commitMsg" 2>$null

# 4️⃣ Set branch to main
git branch -M main

# 5️⃣ Push to GitHub
Write-Host "📤 Pushing code to GitHub..."
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed successfully to GitHub main branch."
} else {
    Write-Host "⚠️ Push failed — check authentication or remote URL."
}

# 6️⃣ Deploy to Vercel
if (Get-Command "vercel" -ErrorAction SilentlyContinue) {
    Write-Host "🚀 Deploying to Vercel production..."
    vercel --prod --yes
} else {
    Write-Host "⚠️ Vercel CLI not found. Install via: npm install -g vercel"
}

Write-Host "`n---------------------------------------------"
Write-Host "✅ Auto-sync completed."
Write-Host "Your GitHub and Vercel environments are now up to date."
Write-Host "---------------------------------------------"
