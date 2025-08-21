import { Request, Response } from 'express';

/**
 * Kontroler strony 404 - Not Found
 */
const controller404 = (req: Request, res: Response): void => {
    // Ustaw status 404
    res.status(404);

    // Jeśli request oczekuje JSON, zwróć JSON error
    if (req.headers.accept?.includes('application/json')) {
        res.json({
            success: false,
            error: 'Not Found',
            message: 'The requested resource was not found',
            path: req.originalUrl,
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Przekieruj na /404 route w React
    res.redirect('/404');
};

export default controller404;
