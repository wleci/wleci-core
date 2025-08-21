import morgan from "morgan";
import { Request, Response } from "express";

/**
 * Morgan logging middleware configuration
 * Provides HTTP request logging
 */
class MorganMiddleware {

    /**
     * Configure Morgan for development environment
     * @returns Morgan middleware with detailed colored output
     */
    public static development() {
        return morgan('dev', {
            skip: (req: Request, res: Response) => {
                // Skip logging for health checks and static assets
                return req.url === '/health' ||
                    req.url === '/favicon.ico' ||
                    req.url.startsWith('/static/');
            }
        });
    }

    /**
     * Configure Morgan for production environment
     * @returns Morgan middleware with combined log format
     */
    public static production() {
        return morgan('combined', {
            skip: (req: Request, res: Response) => {
                // Skip successful requests in production to reduce log noise
                return res.statusCode < 400;
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
            skip: (req: Request, res: Response) => {
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
            skip: (req: Request, res: Response) => {
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
            skip: (req: Request, res: Response) => {
                return res.statusCode < 400;
            }
        });
    }
}

export default MorganMiddleware;
