import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

/**
 * Rate limiting middleware configuration
 * Protects against abuse and DoS attacks
 */
class RateLimitMiddleware {

    /**
     * Configure basic rate limiting
     * @param windowMs - Time window in milliseconds
     * @param max - Maximum requests per window
     * @returns Rate limit middleware
     */
    public static basic(windowMs: number = 15 * 60 * 1000, max: number = 100) {
        return rateLimit({
            windowMs,
            max,
            message: {
                error: 'Too many requests from this IP, please try again later.',
                retryAfter: Math.ceil(windowMs / 1000)
            },
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req: Request, res: Response) => {
                res.status(429).json({
                    error: 'Rate limit exceeded',
                    message: 'Too many requests from this IP, please try again later.',
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }
        });
    }

    /**
     * Configure strict rate limiting for sensitive endpoints
     * @returns Strict rate limit middleware
     */
    public static strict() {
        return rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 5, // 5 requests per window
            message: {
                error: 'Too many attempts from this IP, please try again later.',
                retryAfter: 900 // 15 minutes
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: true
        });
    }

    /**
     * Configure rate limiting for API endpoints
     * @returns API rate limit middleware
     */
    public static forApi() {
        return rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 60, // 60 requests per minute
            message: {
                error: 'API rate limit exceeded',
                message: 'Too many API requests, please slow down.',
                retryAfter: 60
            },
            standardHeaders: true,
            legacyHeaders: false,
            keyGenerator: (req: Request) => {
                // Use API key or IP for rate limiting
                return req.headers['x-api-key'] as string || req.ip;
            }
        });
    }

    /**
     * Configure rate limiting for authentication endpoints
     * @returns Auth rate limit middleware
     */
    public static forAuth() {
        return rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 10, // 10 login attempts per window
            message: {
                error: 'Too many authentication attempts',
                message: 'Too many login attempts from this IP, please try again later.',
                retryAfter: 900
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: true,
            keyGenerator: (req: Request) => {
                // Rate limit by IP and username if provided
                const username = req.body?.username || req.body?.email;
                return username ? `${req.ip}-${username}` : req.ip;
            }
        });
    }

    /**
     * Configure lenient rate limiting for development
     * @returns Development rate limit middleware
     */
    public static development() {
        return rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 1000, // Very high limit for development
            message: {
                error: 'Development rate limit exceeded',
                message: 'Even in development, you are making too many requests.',
                retryAfter: 60
            },
            standardHeaders: true,
            legacyHeaders: false
        });
    }

    /**
     * Configure custom rate limiting
     * @param options - Custom rate limit options
     * @returns Custom rate limit middleware
     */
    public static custom(options: Partial<rateLimit.Options>) {
        return rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            ...options
        });
    }

    /**
     * Create rate limiter for file uploads
     * @returns Upload rate limit middleware
     */
    public static forUploads() {
        return rateLimit({
            windowMs: 60 * 60 * 1000, // 1 hour
            max: 10, // 10 uploads per hour
            message: {
                error: 'Upload rate limit exceeded',
                message: 'Too many file uploads, please try again later.',
                retryAfter: 3600
            },
            standardHeaders: true,
            legacyHeaders: false,
            skip: (req: Request) => {
                // Skip rate limiting for small files
                const contentLength = parseInt(req.headers['content-length'] || '0');
                return contentLength < 1024 * 1024; // Skip for files < 1MB
            }
        });
    }
}

export default RateLimitMiddleware;
