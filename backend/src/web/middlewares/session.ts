import session from "express-session";
import { Request } from "express";

/**
 * Session middleware configuration
 * Handles user sessions and session storage
 */
class SessionMiddleware {

    /**
     * Configure session middleware using config
     * @returns Session middleware
     */
    public static configure() {
        const config = globalThis.CONFIG?.webServer?.session;
        const appMode = globalThis.CONFIG?.application?.mode;
        if (!config) {
            throw new Error("Session configuration not found");
        }

        if (!config.secret) {
            throw new Error("Session secret is required");
        }

        switch (appMode) {
            case 'development':
                return this.development(config.secret, config.maxAge);
            case 'production':
                return this.production(config.secret, config.domain, config.maxAge, config.secure);
            default:
                return this.development(config.secret, config.maxAge);
        }
    }

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
     * @param maxAge - Session max age in milliseconds
     * @returns Session middleware with development settings
     */
    public static development(secret: string, maxAge: number = 7 * 24 * 60 * 60 * 1000) {
        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge
            },
            name: 'dev-session'
        });
    }

    /**
     * Configure session middleware for production
     * @param secret - Session secret key
     * @param domain - Cookie domain
     * @param maxAge - Session max age in milliseconds
     * @param secure - Whether to use secure cookies
     * @returns Session middleware with production settings
     */
    public static production(secret: string, domain?: string, maxAge: number = 2 * 60 * 60 * 1000, secure: boolean = true) {
        return session({
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure, // Requires HTTPS
                httpOnly: true,
                maxAge,
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
