import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend .env
const backendEnv = `PORT=5000
MONGODB_URI=mongodb+srv://nader:na123456789@achref.g1rxg8d.mongodb.net/diablo?retryWrites=true&w=majority&appName=achref
JWT_SECRET=diablo-secret-key-2025-change-in-production
NODE_ENV=development
`;

// Frontend .env
const frontendEnv = `VITE_API_URL=http://localhost:5000/api
`;

// Create backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env');
fs.writeFileSync(backendEnvPath, backendEnv);
console.log('✅ Created backend/.env');

// Create frontend .env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
fs.writeFileSync(frontendEnvPath, frontendEnv);
console.log('✅ Created frontend/.env');

console.log('\n🎉 Environment files created successfully!');
console.log('You can now run: npm run install-all && npm run dev-backend (in one terminal) && npm run dev-frontend (in another)');



