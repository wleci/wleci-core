import helmet from "helmet";

/**
 * Helmet middleware configuration
 * Provides security headers and protections
 */
class HelmetMiddleware {

    /**
     * Configure basic helmet security middleware
     * @returns Helmet middleware with default security settings
     */
    public static basic() {
        return helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"]
                }
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            }
        });
    }

    /**
     * Configure helmet for development environment
     * @returns Helmet middleware with relaxed settings for development
     */
    public static development() {
        return helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            hsts: false
        });
    }

    /**
     * Configure helmet for production environment
     * @returns Helmet middleware with strict security settings
     */
    public static production() {
        return helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                    upgradeInsecureRequests: []
                }
            },
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            },
            noSniff: true,
            frameguard: { action: 'deny' },
            xssFilter: true
        });
    }

    /**
     * Configure helmet for API endpoints
     * @returns Helmet middleware optimized for API usage
     */
    public static forApi() {
        return helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'none'"],
                    connectSrc: ["'self'"]
                }
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true
            },
            noSniff: true,
            frameguard: { action: 'deny' },
            xssFilter: true
        });
    }

    /**
     * Configure custom helmet middleware
     * @param options - Custom helmet options
     * @returns Helmet middleware with custom settings
     */
    public static custom(options: Parameters<typeof helmet>[0]) {
        return helmet(options);
    }
}

export default HelmetMiddleware;
