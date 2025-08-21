import { Request, Response } from 'express';
import path from 'path';

/**
 * Controller for auth login page
 * Serves React app for login functionality
 */
const controllerAuthLogin = (req: Request, res: Response): void => {
    // Check if request expects JSON (API call)
    const acceptsJson = req.headers.accept?.includes('application/json');

    if (acceptsJson) {
        // Handle login API logic here
        res.json({
            message: 'Login API endpoint',
            method: req.method,
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Serve React app for login page
    const frontendIndexPath = path.resolve(__dirname, '../../../../../build-frontend/index.html');
    res.sendFile(frontendIndexPath);
};

export default controllerAuthLogin;