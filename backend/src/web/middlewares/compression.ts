import compression from "compression";
import { Request, Response } from "express";

/**
 * Compression middleware configuration
 * Compresses response bodies for better performance
 */
class CompressionMiddleware {

    /**
     * Configure compression middleware
     * @param level - Compression level (optional, uses config if not provided)
     * @param threshold - Minimum response size to compress (optional, uses config if not provided)
     * @returns Compression middleware
     */
    public static configure(level?: number, threshold?: number) {
        const config = globalThis.CONFIG?.webServer?.compression;
        if (!config) {
            throw new Error("Compression configuration not found");
        }

        return compression({
            level: level || config.level,
            threshold: threshold || config.threshold,
            filter: this.shouldCompress,
            chunkSize: config.chunkSize,
            windowBits: config.windowBits,
            memLevel: config.memLevel
        });
    }

    /**
     * Determine if response should be compressed
     * @param req - Express request object
     * @param res - Express response object
     * @returns Boolean indicating if compression should be applied
     */
    private static shouldCompress(req: Request, res: Response): boolean {
        if (req.headers['wleci-x-no-compression']) {
            return false;
        }

        // Check content type
        const contentType = res.getHeader('content-type') as string;
        if (contentType) {
            const compressibleTypes = [
                'text/',
                'application/json',
                'application/javascript',
                'application/xml',
                'application/rss+xml',
                'application/atom+xml',
                'image/svg+xml'
            ];

            return compressibleTypes.some(type => contentType.includes(type));
        }

        return compression.filter(req, res);
    }
}

export default CompressionMiddleware;
