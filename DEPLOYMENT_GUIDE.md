# Phusha App - Deployment & Testing Guide

**Last Updated:** 2026-07-11  
**Status:** 🔴 **Ready to Deploy (Awaiting Node.js)**

---

## Prerequisites

### ✅ Completed
- [x] Source code organized and ready: `C:\Users\PC\Documents\phusha`
- [x] React 18.3 + TypeScript + Vite configured
- [x] Tailwind CSS + Emotion styling ready
- [x] Firebase configuration verified

### ❌ Blocking Issue
- [ ] **Node.js v18+ is NOT installed**
  - Required for: `npm install`, `npm run build`, `firebase deploy`
  - Status: **MUST BE INSTALLED TO PROCEED**

---

## Step 1: Install Node.js (REQUIRED)

### Windows Installation:
1. Visit **https://nodejs.org/en/download**
2. Download **LTS version** (v20.x recommended)
3. Run installer and follow prompts
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**Once Node.js is installed, proceed to Step 2.**

---

## Step 2: Prepare Firebase Credentials

Create `.env` file in `C:\Users\PC\Documents\phusha\` with:

```env
VITE_FIREBASE_API_KEY=AIzaSyB1KleiD-_wftMyGdoBTWdZtfM79HFZZ5E
VITE_FIREBASE_AUTH_DOMAIN=phusha-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=phusha-app
VITE_FIREBASE_STORAGE_BUCKET=phusha-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=575384244659
VITE_FIREBASE_APP_ID=1:575384244659:web:aecbb020514c9401bf3bc6
VITE_FIREBASE_MEASUREMENT_ID=G-DY9N39K9X2
```

---

## Step 3: Build & Deploy

### Via PowerShell:
```powershell
cd C:\Users\PC\Documents\phusha

# Install dependencies
npm install

# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase login  # (first time only)
firebase deploy --project phusha-app
```

### Expected Output:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/phusha-app/overview
Hosting URL: https://phusha-app.web.app
```

---

## Step 4: Verify Deployment

Once deployed, test at: **https://phusha-app.web.app**

### Test Checklist:
- [ ] Page loads without 404 error
- [ ] Navbar displays correctly
- [ ] All navigation links work
- [ ] Assets load (images, videos)
- [ ] No console errors (F12 → Console tab)
- [ ] Responsive design works (mobile view)
- [ ] Firebase integration active (if configured)

---

## Build Configuration

**vite.config.ts** setup:
- Entry: `index.html`
- Output: `dist/` folder
- Target browsers: Modern (ES2020+)
- Minification: Enabled for production

**tailwind.config.js**:
- Purges unused CSS in build
- Optimizes bundle size

---

## Troubleshooting

### Issue: `npm install` fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules/` and `package-lock.json`
- Retry: `npm install`

### Issue: `firebase deploy` fails
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`
- Verify logged in: `firebase login`
- Check project ID: `firebase projects:list`

### Issue: Page still shows 404
- Verify `dist/` folder exists after build
- Check `firebase.json` has correct `public` path: `"public": "dist"`
- Redeploy: `firebase deploy --project phusha-app`

---

## Project Structure

```
C:\Users\PC\Documents\phusha/
├── src/
│   ├── App.tsx              (Main component)
│   ├── main.tsx             (Entry point)
│   ├── index.css            (Global styles)
│   ├── components/
│   │   └── Navbar.tsx
│   └── pages/
│       ├── Auth.tsx
│       ├── Dashboard.tsx
│       ├── SongForm.tsx
│       ├── GeneratedDocs.tsx
│       ├── ContractAnalyzer.tsx
│       ├── KnowledgeHub.tsx
│       └── Quiz.tsx
├── public/                  (Static assets)
├── dist/                    (Generated after build)
├── package.json             (Dependencies)
├── vite.config.ts           (Build config)
├── tsconfig.json            (TypeScript config)
├── tailwind.config.js       (Styling config)
└── firebase.json            (Hosting config)
```

---

## Firebase Project Details

- **Project ID:** phusha-app
- **Region:** africa-south1 (Johannesburg, South Africa)
- **Hosting URL:** https://phusha-app.web.app
- **Auth Domain:** phusha-app.firebaseapp.com
- **Firestore:** Configured with South African region for low latency

---

## Next Steps After Deployment

1. **Test all pages** listed in test checklist
2. **Verify Firestore** integration if applicable
3. **Check auth flow** if authentication is enabled
4. **Monitor performance** via Firebase Console
5. **Review analytics** in Google Analytics

---

## Support

If deployment fails:
1. Check error messages carefully
2. Verify all prerequisites are met
3. Check Firebase Console for project health
4. Review build logs: `firebase deploy --debug`

---

**Ready to deploy!** Install Node.js and follow steps 1-4 above.
