import express from 'express';

// ========================================================================================
// CONTROLLERS IMPORTS
// ========================================================================================

// Public Controllers
import controllerPublicIndex from '../controllers/public';
import controllerPublicRobots from '../controllers/public/roobots';
import controllerPublicSitemap from '../controllers/public/sitemap';

// Auth Controllers
import controllerAuthLogin from '../controllers/auth/login';
import controllerAuthRegister from '../controllers/auth/register';

// Dashboard Controllers

// API Controllers


// Error Controllers
import controller404 from '../controllers/errors/404';

// ========================================================================================
// ROUTER INITIALIZATION
// ========================================================================================

const router = express.Router();

// ========================================================================================
// PUBLIC ROUTES (React SSR)
// ========================================================================================

router.get('/', controllerPublicIndex);
router.get('/404', controllerPublicIndex); // Serve React for 404 page
router.get('/robots.txt', controllerPublicRobots);
router.get('/sitemap.xml', controllerPublicSitemap);

// ========================================================================================
// AUTH ROUTES
// ========================================================================================

router.get('/auth/login', controllerAuthLogin);
router.post('/auth/login', controllerAuthLogin); // Handle login form submission
router.get('/auth/register', controllerAuthRegister);
router.post('/auth/register', controllerAuthRegister); // Handle register form submission

// ========================================================================================
// 404 HANDLER - Must be last route
// ========================================================================================

// Catch all unmatched routes and return 404
// But skip static assets - let them be handled by static middleware
router.use((req, res, next) => {
    // Skip 404 handling for static assets (let static middleware handle them)
    if (req.path.startsWith('/assets/') ||
        req.path.endsWith('.css') ||
        req.path.endsWith('.js') ||
        req.path.endsWith('.ico') ||
        req.path.endsWith('.png') ||
        req.path.endsWith('.jpg') ||
        req.path.endsWith('.svg')) {
        return next();
    }

    controller404(req, res);
});

export default router;
