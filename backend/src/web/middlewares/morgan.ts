import morgan from "morgan";
import { Request, Response } from "express";

/**
 * Morgan logging middleware configuration
 * Provides HTTP request logging
 */
class MorganMiddleware {

    /**
     * Configure Morgan middleware using config
     * @returns Morgan middleware
     */
    public static configure() {
        const config = globalThis.CONFIG?.webServer?.morgan;
        const appMode = globalThis.CONFIG?.application?.mode;
        if (!config) {
            throw new Error("Morgan configuration not found");
        }

        if (config.logErrorsOnly) {
            return this.errorsOnly();
        }

        switch (appMode) {
            case 'development':
                return this.development(config.skipHealthChecks);
            case 'production':
                return this.production(config.skipHealthChecks);
            default:
                return this.development(config.skipHealthChecks);
        }
    }

    /**
     * Configure Morgan for development environment
     * @param skipHealthChecks - Whether to skip health check logging
     * @returns Morgan middleware with detailed colored output
     */
    public static development(skipHealthChecks: boolean = true) {
        return morgan('dev', {
            skip: (req: Request, _res: Response) => {
                if (skipHealthChecks) {
                    return req.url === '/health' ||
                        req.url === '/favicon.ico' ||
                        req.url.startsWith('/static/');
                }
                return false;
            }
        });
    }

    /**
     * Configure Morgan for production environment
     * @param skipHealthChecks - Whether to skip health check logging
     * @returns Morgan middleware with combined log format
     */
    public static production(skipHealthChecks: boolean = true) {
        return morgan('combined', {
            skip: (req: Request, res: Response) => {
                // Skip successful requests in production to reduce log noise
                if (res.statusCode < 400) return true;

                if (skipHealthChecks) {
                    return req.url === '/health' || req.url === '/api/health';
                }
                return false;
            }
        });
    }

    /**
     * Configure Morgan with custom format
     * @returns Morgan middleware with custom log format
     */
    public static custom() {
        const customFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

        return morgan(customFormat, {
            skip: (req: Request, _res: Response) => {
                return req.url === '/health';
            }
        });
    }

    /**
     * Configure Morgan for API logging
     * @returns Morgan middleware optimized for API endpoints
     */
    public static forApi() {
        const apiFormat = ':method :url :status :response-time ms - :res[content-length]';

        return morgan(apiFormat, {
            skip: (req: Request, _res: Response) => {
                // Log all API requests but skip health checks
                return req.url === '/health' || req.url === '/api/health';
            }
        });
    }

    /**
     * Configure Morgan with JSON output
     * @returns Morgan middleware with JSON formatted logs
     */
    public static json() {
        morgan.token('json', (req: Request, res: Response) => {
            return JSON.stringify({
                method: req.method,
                url: req.url,
                status: res.statusCode,
                contentLength: res.get('content-length'),
                responseTime: res.get('X-Response-Time'),
                userAgent: req.get('user-agent'),
                ip: req.ip,
                timestamp: new Date().toISOString()
            });
        });

        return morgan(':json');
    }

    /**
     * Configure Morgan to log only errors
     * @returns Morgan middleware that logs only error responses
     */
    public static errorsOnly() {
        return morgan('combined', {
            skip: (_req: Request, res: Response) => {
                return res.statusCode < 400;
            }
        });
    }
}

export default MorganMiddleware;
