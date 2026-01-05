# Deployment Guide: Static Export + PHP (cPanel)

Since your cPanel does not support Node.js, we have converted the project to a **Static Site** backed by a **Single PHP Script** for the AI Agent.

## 1. Safety First: The API Key
The file `public/proxy_chat.php` contains your OpenRouter logic.
By default, the key is set to `'YOUR_OPENROUTER_API_KEY_HERE'`.

**To make it secure:**
1. Open `public/proxy_chat.php` locally.
2. Replace `'YOUR_OPENROUTER_API_KEY_HERE'` with your actual key from `.env`.
3. (Optional but Recommended) On cPanel, use File Manager to edit this file *after* upload so the key isn't in your local git if possible, OR:
   - Create a file outside `public_html` (e.g. `/home/username/secret_config.php`) with:
     ```php
     <?php return ['OPENROUTER_API_KEY' => 'sk-or-v1-...']; ?>
     ```
   - Then edit `proxy_chat.php` to load it:
     ```php
     $config = include('/home/username/secret_config.php');
     $apiKey = $config['OPENROUTER_API_KEY'];
     ```

## 2. Generate the Build
Run this command in your terminal:
```bash
npm run build
```
This will create an `out` folder. This folder contains your entire website as static HTML/CSS/JS files.

## 3. Upload to cPanel
1. Go to cPanel File Manager -> `public_html`.
2. **Delete everything** currently in `public_html` (if empty/fresh).
3. Open the `out` folder on your computer.
4. **Select All** files inside `out` -> Compress/Zip them.
5. Upload the zip to `public_html`.
6. Extract the zip.
7. **Ensure `proxy_chat.php` is there.** (It should be, because it was in `public` folder).

## 4. Verify
- Go to `https://temamumtaza.id`.
- The site should load fast.
- Go to "Explore" section and test the chat. It will call `temamumtaza.id/proxy_chat.php`.

## Summary of Changes
- **Frontend:** Converted to Static (`output: 'export'`).
- **Chat:** Converted from Node.js API to PHP (`proxy_chat.php`).
- **Deploy:** Just drag-and-drop the `out` folder contents.
