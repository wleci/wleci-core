import { Request, Response } from 'express';
import path from 'path';


const controllerPublicIndex = (req: Request, res: Response): void => {
    // Sprawdź czy request chce JSON
    const acceptsJson = req.headers.accept?.includes('application/json');

    if (acceptsJson) {
        res.json({
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Zwróć HTML z React
    const frontendIndexPath = path.resolve(__dirname, '../../../../../build-frontend/index.html');
    res.sendFile(frontendIndexPath);
};

export default controllerPublicIndex;
