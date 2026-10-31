# 🎮 It'sKiruHere - Game Developer Portfolio

A clean, authentic portfolio website matching [kiru.my.canva.site/itiskiruhere](https://kiru.my.canva.site/itiskiruhere/) with a grayish-white aesthetic, crisp typography, and ready for GitHub Pages.

---

## 🚀 Quick Start (Run Locally)

Runs directly with Node.js built-ins — no external dependencies needed!

### Method 1: Double-click
Double-click `start-portfolio.bat` in this folder.

### Method 2: Command Line
```bash
node server.js
```
Open your browser at: **[http://localhost:3000](http://localhost:3000)**

---

## 🎨 Design & Visual Features

- **Grayish-White Theme**: Clean background (`#f4f5f7`), pure white cards (`#ffffff`), and charcoal text (`#1e293b` / `#475569`) matching the original Canva layout.
- **Zero Gradient Noise**: Flat, modern, high-contrast, professional game developer portfolio.
- **Seamless Line Strip**: A dedicated horizontal repeating line banner (`.seamless-bg-stripe`) under the navigation bar configured with `background-repeat: repeat-x`.
- **Pure Visitor Experience**: All editor bars, viewer/owner badges, and PIN prompts have been removed. The website looks 100% authentic to visitors.
- **Easy Maintenance**: Whenever you want to add or modify projects, art, or case studies, simply provide the image and data in chat and it will be updated directly in the codebase!

---

## 🖼️ How to Add Your Seamless Background Image

To use your seamless background design image:
1. Save your image as:
   `assets/seamless-bg.png`
2. That's it! It will automatically repeat seamlessly in a horizontal line across the banner on all pages.

---

## 🌐 Deploying to GitHub Pages

This project is 100% static-ready for GitHub Pages:

```bash
git init
git add .
git commit -m "Kiru portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

1. Go to repository **Settings** → **Pages**.
2. Select **Source**: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`.
3. Click **Save** — your live website is ready!
