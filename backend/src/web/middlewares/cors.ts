import cors from "cors";

/**
 * CORS middleware configuration
 * Handles Cross-Origin Resource Sharing
 */
class CorsMiddleware {

    /**
     * Configure CORS middleware for development
     * @returns CORS middleware with permissive settings
     */
    public static development() {
        return cors({
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
            maxAge: 86400 // 24 hours
        });
    }

    /**
     * Configure CORS middleware for production
     * @param allowedOrigins - Array of allowed origins
     * @returns CORS middleware with restrictive settings
     */
    public static production(allowedOrigins: string[]) {
        return cors({
            origin: (origin, callback) => {
                // Allow requests with no origin (mobile apps, curl, etc.)
                if (!origin) return callback(null, true);

                if (allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['X-Total-Count'],
            maxAge: 3600 // 1 hour
        });
    }

    /**
     * Configure custom CORS middleware
     * @param options - Custom CORS options
     * @returns CORS middleware with custom settings
     */
    public static custom(options: cors.CorsOptions) {
        return cors(options);
    }

    /**
     * Configure CORS for API endpoints
     * @param apiOrigins - Allowed API origins
     * @returns CORS middleware optimized for API usage
     */
    public static forApi(apiOrigins: string[] = ['http://localhost:3000', 'http://localhost:3001']) {
        return cors({
            origin: apiOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'X-API-Key'
            ],
            exposedHeaders: [
                'X-Total-Count',
                'X-Page-Count',
                'X-Rate-Limit-Remaining'
            ],
            maxAge: 7200 // 2 hours
        });
    }
}

export default CorsMiddleware;
