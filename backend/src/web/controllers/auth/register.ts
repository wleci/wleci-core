import { Request, Response } from 'express';
import path from 'path';

/**
 * Controller for auth register page
 * Serves React app for registration functionality
 */
const controllerAuthRegister = (req: Request, res: Response): void => {
    // Check if request expects JSON (API call)
    const acceptsJson = req.headers.accept?.includes('application/json');

    if (acceptsJson) {
        // Handle register API logic here
        res.json({
            message: 'Register API endpoint',
            method: req.method,
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Serve React app for register page
    const frontendIndexPath = path.resolve(__dirname, '../../../../../build-frontend/index.html');
    res.sendFile(frontendIndexPath);
};

export default controllerAuthRegister;