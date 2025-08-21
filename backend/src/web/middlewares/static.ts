import express from 'express';
import path from 'path';

/**
 * Static middleware configuration
 * Serves React build files and static assets
 */
class StaticMiddleware {

    /**
     * Configure static middleware for React build
     * @param buildPath - Relative path to React build directory
     * @returns Express static middleware
     */
    public static forReactBuild(buildPath: string = '../../build-frontend') {
        const resolvedPath = path.resolve(__dirname, buildPath);
        
        return express.static(resolvedPath, {
            // Cache settings
            maxAge: process.env.NODE_ENV === 'production' ? '7d' : '1h',
            
            // ETag for cache validation
            etag: true,
            lastModified: true,
            
            // Index files
            index: false, // Don't serve index.html automatically - let router handle it
            
            // Set proper MIME types
            setHeaders: (res, filePath) => {
                if (filePath.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css; charset=utf-8');
                } else if (filePath.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                } else if (filePath.endsWith('.json')) {
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                } else if (filePath.endsWith('.svg')) {
                    res.setHeader('Content-Type', 'image/svg+xml');
                } else if (filePath.endsWith('.ico')) {
                    res.setHeader('Content-Type', 'image/x-icon');
                } else if (filePath.endsWith('.png')) {
                    res.setHeader('Content-Type', 'image/png');
                } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                    res.setHeader('Content-Type', 'image/jpeg');
                }
                
                // Security headers for static files
                if (process.env.NODE_ENV === 'production') {
                    res.setHeader('X-Content-Type-Options', 'nosniff');
                }
            },
            
            // Fallthrough - if file doesn't exist, continue to next middleware
            fallthrough: true
        });
    }

    /**
     * Configure static middleware for development
     * @param buildPath - Path to build directory
     * @returns Express static middleware with development settings
     */
    public static development(buildPath: string = '../../build-frontend') {
        const resolvedPath = path.resolve(__dirname, buildPath);
        
        return express.static(resolvedPath, {
            maxAge: '0',
            etag: false,
            lastModified: true,
            index: false,
            fallthrough: true
        });
    }

    /**
     * Configure static middleware for production
     * @param buildPath - Path to build directory
     * @returns Express static middleware with production settings
     */
    public static production(buildPath: string = '../../build-frontend') {
        const resolvedPath = path.resolve(__dirname, buildPath);
        
        return express.static(resolvedPath, {
            maxAge: '1y',
            etag: true,
            lastModified: true,
            index: false,
            immutable: true,
            fallthrough: true,
            setHeaders: (res, filePath) => {
                // Set proper MIME types and security headers
                if (filePath.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css; charset=utf-8');
                } else if (filePath.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                }
                
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
        });
    }
}

export default StaticMiddleware;