# Deploying to GitHub Pages

This document provides instructions to deploy this application to GitHub Pages.

## Prerequisites

1.  You have a GitHub account.
2.  You have `git` installed on your machine.
3.  You have `node` and `npm` installed on your machine.

## Initial Setup

1.  **Install dependencies**:
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```
    This will install all the necessary packages, including `vite` for building the app and `gh-pages` for deployment.

2.  **Update `package.json`**:
    Open the `package.json` file and replace the `?` placeholders in the `homepage` field with your GitHub username and repository name.
    For example:
    ```json
    "homepage": "https://YourGitHubUsername.github.io/your-repo-name",
    ```

3.  **Update `vite.config.ts`**:
    Open the `vite.config.ts` file and replace the `?` placeholder in the `base` field with your repository name, enclosed in slashes.
    For example:
    ```typescript
    base: '/your-repo-name/'
    ```

## Deployment Steps

1.  **Create a GitHub Repository**:
    - Go to GitHub and create a new repository. Let's say you name it `your-repo-name`.
    - Do not initialize it with a README, license, or .gitignore file.

2.  **Push your code to GitHub**:
    In your project's terminal, run the following commands, replacing `YourGitHubUsername` and `your-repo-name` with your actual details:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YourGitHubUsername/your-repo-name.git
    git push -u origin main
    ```

3.  **Deploy the application**:
    Run the deployment script from your terminal:
    ```bash
    npm run deploy
    ```
    This command will first build the application into a `dist` folder, and then the `gh-pages` package will push the contents of `dist` to a new `gh-pages` branch in your repository.

4.  **Enable GitHub Pages**:
    - Go to your repository settings on GitHub.
    - Navigate to the "Pages" section in the left sidebar.
    - Under "Build and deployment", for the "Source", select "Deploy from a branch".
    - For the "Branch", select `gh-pages` and keep the folder as `/ (root)`.
    - Click "Save".

Your application should be live at the URL specified in your `package.json`'s `homepage` field within a few minutes.

## Important Note on Offline Functionality

The current service worker (`sw.js`) is configured to cache the original source files. After building the application for production, the file structure changes (e.g., JavaScript and CSS files get bundled and renamed with hashes for caching). To maintain the offline PWA functionality, `sw.js` needs to be updated to cache these new build artifacts.

This setup does not modify the original `sw.js` to keep changes minimal as requested. For the offline features to work in the deployed version, you will need to integrate a tool like [Workbox](https://developer.chrome.com/docs/workbox/) to generate a service worker that correctly caches the built files. A popular option for Vite projects is the [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) plugin.
