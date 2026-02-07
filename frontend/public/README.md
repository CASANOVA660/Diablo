# Public Assets Folder

This folder contains static assets that are served directly by Vite.

## How to Use Images

### 1. Place your images here
Put any static images (logos, icons, placeholders, etc.) in this `public` folder.

### 2. Reference them in your code
Use absolute paths starting with `/`:

```jsx
// ✅ Correct - Files in public folder
<img src="/logo.png" alt="Logo" />
<img src="/images/hero.jpg" alt="Hero" />
<img src="/placeholder.svg" alt="Placeholder" />

// ❌ Wrong - Don't use relative paths
<img src="./logo.png" alt="Logo" />
```

### 3. Folder Structure Example
```
public/
  ├── logo.png
  ├── favicon.ico
  ├── placeholder.svg
  └── images/
      ├── hero.jpg
      ├── about.jpg
      └── contact.jpg
```

## Important Notes

1. **Product Images**: Product images are stored in the database and served from the backend (`/uploads/` folder). They are uploaded through the admin panel.

2. **Static Assets**: Only put static assets here that don't change (logos, icons, etc.)

3. **Build Process**: Files in `public` are copied to the build output as-is during `npm run build`

4. **Path Reference**: Always use `/` at the start (not `./` or `../`)

## Current Usage in Code

The codebase references:
- `/placeholder.svg` - Used as fallback for product images
- External URLs - Product images from database (stored as full URLs)








