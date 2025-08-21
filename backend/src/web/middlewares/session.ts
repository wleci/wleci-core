import session from "express-session";
import { Request } from "express";

/**
 * Session middleware configuration
 * Handles user sessions and session storage
 */
class SessionMiddleware {

    /**
     * Configure basic session middleware
     * @param secret - Session secret key
     * @returns Session middleware with basic configuration
     */
    public static basic(secret: string) {
        if (!secret || secret.length < 32) {
            throw new Error("Session secret must be at least 32 characters long");
        }

        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, // Set to true in production with HTTPS
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            },
            name: 'sessionId'
        });
    }

    /**
     * Configure session middleware for development
     * @param secret - Session secret key
     * @returns Session middleware with development settings
     */
    public static development(secret: string) {
        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            },
            name: 'dev-session'
        });
    }

    /**
     * Configure session middleware for production
     * @param secret - Session secret key
     * @param domain - Cookie domain
     * @returns Session middleware with production settings
     */
    public static production(secret: string, domain?: string) {
        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: true, // Requires HTTPS
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
                domain,
                sameSite: 'strict'
            },
            name: 'sessionId',
            proxy: true
        });
    }

    /**
     * Configure session with Redis store
     * @param secret - Session secret key
     * @param redisStore - Redis store instance
     * @returns Session middleware with Redis storage
     */
    public static withRedis(secret: string, redisStore: session.Store) {
        return session({
            secret,
            store: redisStore,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            },
            name: 'sessionId'
        });
    }

    /**
     * Configure session with custom options
     * @param options - Custom session options
     * @returns Session middleware with custom configuration
     */
    public static custom(options: session.SessionOptions) {
        return session(options);
    }

    /**
     * Configure session for API usage
     * @param secret - Session secret key
     * @returns Session middleware optimized for API
     */
    public static forApi(secret: string) {
        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour
                sameSite: 'strict'
            },
            name: 'api-session',
            genid: (_req: Request) => {
                // Generate custom session ID
                return `api-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            }
        });
    }
}

export default SessionMiddleware;
