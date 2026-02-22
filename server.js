import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG_FILE = path.join(__dirname, 'config.json');

app.use(cors());
app.use(express.json());

// Determine if we should serve static files from dist or root.
// In production, we'll serve from dist. For ease of local dev, we could serve from dist too.
app.use(express.static(path.join(__dirname, 'dist')));

// Basic Auth middleware
const auth = (req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // Admin credentials (from .env or default)
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'admin';

    if (login && password && login === adminUser && password === adminPass) {
        return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
};

// API routes
app.get('/api/config', (req, res) => {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const data = fs.readFileSync(CONFIG_FILE, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json({ theme: {}, content: {} });
        }
    } catch (error) {
        console.error("Config read error:", error);
        res.status(500).json({ error: 'Failed to read config' });
    }
});

app.post('/api/config', auth, (req, res) => {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(req.body, null, 2), 'utf8');
        res.json({ success: true });
    } catch (error) {
        console.error("Config write error:", error);
        res.status(500).json({ error: 'Failed to write config' });
    }
});

// Protect the admin page itself via Express if navigated to directly
app.get(['/admin', '/admin/', '/admin.html'], auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
