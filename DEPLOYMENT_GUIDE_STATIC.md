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

## 2. Generate the Build (Lakukan di Laptop Anda)
**JANGAN lakukan di cPanel.** Lakukan di terminal VS Code laptop Anda sendiri.

Jalankan perintah ini:
```bash
npm run build
```
Tunggu sampai selesai. Perintah ini akan membuat folder baru bernama `out` di dalam folder project Anda. Folder `out` ini berisi website versi statis (HTML/CSS/JS) yang siap tayang.

## 3. Upload to cPanel
1. Buka **cPanel File Manager**.
2. Masuk ke folder `public_html`.
3. **Hapus semua file** yang ada di situ (bersihkan dulu).
4. Di laptop Anda, buka folder `out`.
5. **Select All** (pilih semua file di dalam folder out) -> Klik kanan -> **Compress/Zip**.
6. Upload file zip tersebut ke cPanel `public_html`.
7. Di cPanel, klik kanan file zip -> **Extract**.
8. **PENTING:** Pastikan file `proxy_chat.php` ada di situ.

## 4. Verify
- Go to `https://temamumtaza.id`.
- The site should load fast.
- Go to "Explore" section and test the chat. It will call `temamumtaza.id/proxy_chat.php`.

## Summary of Changes
- **Frontend:** Converted to Static (`output: 'export'`).
- **Chat:** Converted from Node.js API to PHP (`proxy_chat.php`).
- **Deploy:** Just drag-and-drop the `out` folder contents.
