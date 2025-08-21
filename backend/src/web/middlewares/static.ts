import express from 'express';
import path from 'path';
import { ServeStaticOptions } from 'serve-static';

/**
 * Static files middleware configuration
 * Serves React build and static assets
 */
class StaticMiddleware {
    /**
     * Configure static file serving for React build
     * @param buildPath - Path to the React build directory
     * @returns Express static middleware
     */
    static forReactBuild(buildPath: string = '../../../../build-frontend') {
        const absolutePath = path.resolve(__dirname, buildPath);

        return express.static(absolutePath, {
            maxAge: '1d', // Cache static assets for 1 day
            etag: true,
            lastModified: true,
            setHeaders: (res, filePath) => {
                // Set appropriate headers for different file types
                if (filePath.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'no-cache');
                } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
                    res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
                } else if (filePath.includes('/locales/')) {
                    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for translations
                }
            }
        });
    }

    /**
     * Configure static file serving for development
     * @param buildPath - Path to the build directory
     * @returns Express static middleware with development settings
     */
    static development(buildPath: string = '../../../../build-frontend') {
        const absolutePath = path.resolve(__dirname, buildPath);

        return express.static(absolutePath, {
            maxAge: 0, // No caching in development
            etag: false,
            lastModified: false
        });
    }

    /**
     * Configure static file serving for production
     * @param buildPath - Path to the build directory
     * @returns Express static middleware with production settings
     */
    static production(buildPath: string = '../../../../build-frontend') {
        const absolutePath = path.resolve(__dirname, buildPath);

        return express.static(absolutePath, {
            maxAge: '7d', // Cache for 7 days in production
            etag: true,
            lastModified: true,
            immutable: true,
            setHeaders: (res, filePath) => {
                // Aggressive caching for hashed assets
                if (filePath.match(/\.[a-f0-9]{8}\.(js|css)$/)) {
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
                } else if (filePath.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                }
            }
        });
    }

    /**
     * Configure fallback for SPA routing
     * Serves index.html for non-API routes
     * @param buildPath - Path to the build directory
     * @returns Express middleware for SPA fallback
     */
    static spaFallback(buildPath: string = '../../../../build-frontend') {
        const absolutePath = path.resolve(__dirname, buildPath);
        const indexPath = path.join(absolutePath, 'index.html');

        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // Skip API routes and file requests
            if (req.path.startsWith('/api') || req.path.includes('.')) {
                return next();
            }

            res.sendFile(indexPath, (err) => {
                if (err) {
                    next(err);
                }
            });
        };
    }

    /**
     * Configure locale-specific static serving
     * @param buildPath - Path to the build directory
     * @returns Express middleware for locale files
     */
    static forLocales(buildPath: string = '../../../../build-frontend') {
        const absolutePath = path.resolve(__dirname, buildPath);

        return express.static(path.join(absolutePath, 'locales'), {
            maxAge: '1h', // Cache translations for 1 hour
            etag: true,
            setHeaders: (res) => {
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
        });
    }

    /**
     * Configure custom static file serving
     * @param buildPath - Path to the build directory
     * @param options - Custom static options
     * @returns Express static middleware with custom settings
     */
    static custom(buildPath: string, options: ServeStaticOptions) {
        const absolutePath = path.resolve(__dirname, buildPath);
        return express.static(absolutePath, options);
    }
}

export default StaticMiddleware;
