import compression from "compression";
import { Request, Response } from "express";

/**
 * Compression middleware configuration
 * Compresses response bodies for better performance
 */
class CompressionMiddleware {

    /**
     * Configure compression middleware
     * @param level - Compression level (0-9)
     * @param threshold - Minimum response size to compress
     * @returns Compression middleware
     */
    public static configure(level: number = 6, threshold: number = 1024) {
        return compression({
            level,
            threshold,
            filter: this.shouldCompress,
            chunkSize: 1024,
            windowBits: 15,
            memLevel: 8
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
