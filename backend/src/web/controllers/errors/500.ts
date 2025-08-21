import { Request, Response } from 'express';
import path from 'path';

/**
 * Kontroler strony 500 - Internal Server Error
 */
const controller500 = (err: any, req: Request, res: Response, _next: any): void => {
    // Log błędu do konsoli (w produkcji użyj proper loggera)
    console.error('🚨 Server Error:', {
        error: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Ustaw status 500
    res.status(500);

    // Jeśli request oczekuje JSON, zwróć JSON error
    if (req.headers.accept?.includes('application/json')) {
        res.json({
            success: false,
            error: 'Internal Server Error',
            message: 'Something went wrong on our end',
            ...(process.env.NODE_ENV === 'development' && {
                details: err.message,
                stack: err.stack
            }),
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Inaczej renderuj React aplikację (która pokaże stronę 500)
    const frontendIndexPath = path.resolve(__dirname, '../../../../../build-frontend/index.html');
    res.sendFile(frontendIndexPath);
};

export default controller500;
