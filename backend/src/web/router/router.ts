import express from 'express';
import path from 'path';

const router = express.Router();

// Path to React build
const buildPath = path.resolve(__dirname, '../../../../build-frontend');

// Main route - serve React app
router.get('/', (_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// 404 handler - must be last
router.use((req, res, next) => {
    // For API routes, return JSON 404
    if (req.path.startsWith('/api')) {
        res.status(404).json({
            error: 'API endpoint not found',
            path: req.path,
            method: req.method
        });
        return;
    }

    // For file requests with extensions, let static middleware handle it
    if (req.path.includes('.')) {
        return next();
    }

    // For all other routes, serve React app (React Router will handle 404)
    res.sendFile(path.join(buildPath, 'index.html'));
});


export default router;
