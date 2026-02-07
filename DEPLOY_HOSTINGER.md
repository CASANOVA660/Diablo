# Deploy Full Website to Hostinger

This guide deploys both the **React frontend** and **Node.js backend** so the whole site runs on Hostinger.

---

## Important: Hostinger plan requirements

- **Frontend**: Any Hostinger plan (static files go in `public_html`).
- **Backend (Node.js)**: You need either:
  - **Hostinger VPS**, or
  - A **shared/Business** plan that includes **Node.js** (check in hPanel under "Advanced" or "Node.js").

If your plan does **not** support Node.js, you have two options:

1. **Upgrade to VPS** and follow the full guide below, or  
2. **Keep shared hosting**: deploy only the **frontend** on Hostinger and host the **backend** on a free service (e.g. [Render](https://render.com) or [Railway](https://railway.app)), then point the frontend to that backend URL (see step 2 below).

---

## Quick path: Business plan with Node.js

If your plan supports **Node.js** (e.g. Business), use this order:

1. **Domain**: Finish **"Verify email to register domain"** (click "More info" and use the link sent to your email) so **dia-blo.com** is active.
2. **Setup**: Click **Setup** on your Business plan and complete the wizard (link the domain **dia-blo.com** to this hosting).
3. **Node.js app** (backend):
   - In hPanel go to **Advanced** → **Node.js** (or **Websites** → your site → **Node.js**).
   - **Create application**:
     - **Application root**: e.g. `node_app` or `backend` (note the full path Hostinger shows).
     - **Node version**: 18 or 20.
     - **Start command**: `node server.js` (or `npm start` if your `package.json` has a start script).
   - **Environment variables** (in the Node.js app settings):  
     `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`. Use the same values as your local `backend/.env`.  
     (Do **not** put secrets in Git.)
   - **Upload backend**: In File Manager, go to the **application root** folder (e.g. `domains/dia-blo.com/node_app`). Upload **all contents** of your local **`backend`** folder (e.g. `server.js`, `package.json`, `controllers/`, `models/`, `routes/`, `middleware/`, `scripts/`). Do **not** upload `node_modules` or `.env`; Hostinger will run `npm install` from the uploaded `package.json`.
   - **Start** the application and note the **Application URL** (e.g. `https://dia-blo.com:3000` or a subdomain like `https://api.dia-blo.com`). This is your **backend URL**.
4. **Frontend API URL**:
   - Create **`frontend/.env.production`** with:
     ```env
     VITE_API_URL=https://YOUR_NODE_APP_URL/api
     ```
     Use the **Application URL** from step 3 (no trailing slash). Example: `https://dia-blo.com:3000` or `https://api.dia-blo.com`.
   - Build: `cd frontend` → `npm run build`.
5. **Upload frontend**: In File Manager open **`public_html`**. Upload the **contents** of **`frontend/dist`** (so `index.html` and `assets/` are inside `public_html`). Upload **`public_html_htaccess`** and rename it to **`.htaccess`**.
6. **MongoDB Atlas**: **Network Access** → Add **0.0.0.0/0** so Hostinger can connect. **Database Access**: user with read/write to your DB.
7. **Create admin**: After the Node app is running, call once:
   ```bash
   curl -X POST "https://YOUR_NODE_APP_URL/api/admin/register" -H "Content-Type: application/json" -d "{\"username\":\"achref\",\"email\":\"achref@diablo.com\",\"password\":\"YOUR_STRONG_PASSWORD\"}"
   ```
   Or use the same from Postman. Then log in at `https://dia-blo.com/admin/login`.

If anything in the Node.js panel is different (e.g. “Application root” or “Start command”), follow the labels in your hPanel; the idea is: **backend code in the app root, env vars set, start command = `node server.js`**, then use the given app URL as `VITE_API_URL`.

---

## Step 1: Prepare backend for production

1. In **MongoDB Atlas**:
   - **Network Access**: Add `0.0.0.0/0` (allow from anywhere) so Hostinger can connect.
   - Keep your database user and connection string.

2. On your PC, in the project folder, create a production env file for the backend (you will copy these values into Hostinger later):

   **`backend/.env.production`** (do not commit this; add to .gitignore):

   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@achref.xxxxx.mongodb.net/achref?retryWrites=true&w=majority
   JWT_SECRET=your-very-long-random-secret-key-change-this
   ```

   Replace `YOUR_USER`, `YOUR_PASSWORD`, and the cluster URL with your real MongoDB Atlas values. Use a long random string for `JWT_SECRET`.

---

## Step 2: Set the production API URL (frontend)

The frontend must call your **live backend** URL.

- **If backend will run on Hostinger** (VPS or Node.js app):  
  Use the URL Hostinger gives for your Node app (e.g. `https://api.yourdomain.com` or `https://yourdomain.com:5000`). You can set this after the backend is deployed.

- **If backend will run elsewhere** (e.g. Render):  
  Use that URL (e.g. `https://your-app.onrender.com`).

Create **`frontend/.env.production`**:

```env
VITE_API_URL=https://YOUR_BACKEND_URL/api
```

Replace `YOUR_BACKEND_URL` with the real URL (no trailing slash). Example: `https://api.yourdomain.com` or `https://diablo-backend.onrender.com`.

---

## Step 3: Build the frontend

On your PC, in the project root:

```bash
cd frontend
npm ci
npm run build
```

This creates **`frontend/dist`** with the production site.

---

## Step 4: Deploy frontend to Hostinger (public_html)

1. Log in to **Hostinger hPanel** → **Websites** → your site → **File Manager**.
2. Go to **`public_html`**.
3. Remove any default `index.html` if you want your app to be the main site.
4. Upload **all contents** of **`frontend/dist`** into `public_html` (so `index.html`, `assets/`, etc. are directly inside `public_html`).
5. Upload the **`.htaccess`** file from the project root (see below) into `public_html` so React Router works.  
   - If File Manager hides dotfiles, name it `htaccess.txt`, upload, then rename to `.htaccess`.

Your domain (e.g. `https://yourdomain.com`) will now serve the React app.

---

## Step 5: Deploy backend on Hostinger

### Option A: Hostinger VPS

1. In hPanel, open your **VPS** and note **IP**, **SSH user**, and **password**.
2. Connect via SSH (e.g. PuTTY on Windows):
   ```bash
   ssh root@YOUR_VPS_IP
   ```
3. Install Node.js (e.g. 18.x):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Create app directory and upload project (or clone from GitHub):
   ```bash
   mkdir -p /var/www/diablo-backend
   cd /var/www/diablo-backend
   ```
   - Either clone your repo and copy only the **backend** folder contents here, or upload via SFTP (FileZilla) the contents of your local **backend** folder.
5. Install dependencies and set env:
   ```bash
   npm install
   nano .env
   ```
   Paste your production env (PORT, MONGODB_URI, JWT_SECRET, NODE_ENV=production). Save and exit.
6. Run with a process manager so it keeps running:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name diablo-api
   pm2 save
   pm2 startup
   ```
7. (Optional) Put **Nginx** in front so the API is available at `https://api.yourdomain.com` and uses SSL. Point Nginx to `http://127.0.0.1:5000` and configure SSL with Let’s Encrypt.

Then set **`VITE_API_URL`** in `frontend/.env.production` to `https://api.yourdomain.com` (or `https://yourdomain.com` if you use the same domain with a path), rebuild the frontend, and re-upload `dist` to `public_html`.

### Option B: Hostinger Node.js (if your plan has it)

1. In hPanel go to **Advanced** → **Node.js** (or similar).
2. Create a new Node.js application:
   - **Application root**: path where you will upload the backend (e.g. `backend` or `node-app`).
   - **Start command**: `node server.js` (or `npm start` if your package.json has it).
   - **Environment variables**: Add `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `PORT` (use the port Hostinger assigns).
3. Upload your **backend** folder contents (all files from `backend/`: `server.js`, `package.json`, `controllers/`, `models/`, `routes/`, etc.) to that application root (via File Manager or SFTP).
4. Start the application. Note the public URL (e.g. `https://yourdomain.com:3000` or a subdomain).
5. Set **`VITE_API_URL`** in `frontend/.env.production` to that URL + `/api` (e.g. `https://api.yourdomain.com/api`), rebuild frontend, and re-upload `dist` to `public_html`.

---

## Step 6: CORS and security

In **backend**, ensure CORS allows your frontend origin. In `server.js` you have:

```js
app.use(cors());
```

For production you can restrict:

```js
app.use(cors({ origin: ['https://yourdomain.com', 'https://www.yourdomain.com'] }));
```

Replace with your real domain(s). Restart the backend after changes.

---

## Step 7: Create admin user on production

After the backend is running on Hostinger, create the admin user **once**:

- **If you have SSH** (VPS):  
  ```bash
  cd /var/www/diablo-backend
  node scripts/createAdmin.js
  ```
- **If you only have the API**:  
  Call the register endpoint (e.g. with Postman or curl):
  ```bash
  curl -X POST https://YOUR_BACKEND_URL/api/admin/register \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"achref\",\"email\":\"achref@diablo.com\",\"password\":\"ach123456789\"}"
  ```

Use a strong password in production.

---

## Checklist

- [ ] MongoDB Atlas: Network Access allows `0.0.0.0/0`
- [ ] `backend/.env` or Hostinger env: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`
- [ ] `frontend/.env.production`: `VITE_API_URL=https://YOUR_BACKEND_URL/api`
- [ ] Frontend built: `cd frontend && npm run build`
- [ ] Contents of `frontend/dist` uploaded to Hostinger `public_html`
- [ ] `.htaccess` in `public_html` for SPA routing
- [ ] Backend deployed (VPS or Node.js app) and running
- [ ] CORS allows your frontend domain
- [ ] Admin user created on production
- [ ] Test: open `https://yourdomain.com`, login, cart, checkout

---

## Quick reference: build and upload frontend only

If you only change the frontend and backend is already live:

```bash
cd frontend
npm run build
```

Then upload the **contents** of `frontend/dist` to Hostinger **public_html** (overwrite existing files). No need to touch the backend unless you changed it.
