# Phusha App - Automated Deployment Script
# Run this script once Node.js is installed
# Requires: Node.js v18+ and Firebase CLI

# Verify prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Cyan

$nodeVersion = & node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Install from: https://nodejs.org/en/download" -ForegroundColor Yellow
    exit 1
}

$npmVersion = & npm --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm is not available" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "✓ npm: $npmVersion" -ForegroundColor Green

# Check Firebase CLI
$firebaseVersion = & firebase --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nWARNING: Firebase CLI not found. Installing globally..." -ForegroundColor Yellow
    npm install -g firebase-tools
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install Firebase CLI" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`nStarting deployment process..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Step 1: Install dependencies
Write-Host "[1/4] Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Step 2: Build production bundle
Write-Host "`n[2/4] Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Production build complete" -ForegroundColor Green

# Verify dist folder
if (!(Test-Path "dist")) {
    Write-Host "ERROR: dist folder not created" -ForegroundColor Red
    exit 1
}
$distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "  Bundle size: $([Math]::Round($distSize, 2)) MB" -ForegroundColor Gray

# Step 3: Deploy to Firebase
Write-Host "`n[3/4] Deploying to Firebase Hosting..." -ForegroundColor Cyan
firebase deploy --project phusha-app
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Firebase deploy failed" -ForegroundColor Red
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Run 'firebase login' to authenticate" -ForegroundColor Gray
    Write-Host "  2. Verify project exists: 'firebase projects:list'" -ForegroundColor Gray
    Write-Host "  3. Try again with: 'firebase deploy --project phusha-app'" -ForegroundColor Gray
    exit 1
}
Write-Host "✓ Deployment complete" -ForegroundColor Green

# Step 4: Verify deployment
Write-Host "`n[4/4] Verifying deployment..." -ForegroundColor Cyan
$hostingUrl = "https://phusha-app.web.app"
Write-Host "✓ Hosting URL: $hostingUrl" -ForegroundColor Green

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit: $hostingUrl" -ForegroundColor White
Write-Host "2. Test the app in your browser" -ForegroundColor White
Write-Host "3. Check browser console (F12) for errors" -ForegroundColor White
Write-Host "4. Monitor Firebase Console: https://console.firebase.google.com/project/phusha-app" -ForegroundColor White

Write-Host "`n" -ForegroundColor Green
