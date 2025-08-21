import cookieParser from "cookie-parser";

/**
 * Cookie parser middleware configuration
 * Parses cookies from request headers
 */
class CookieParserMiddleware {

    /**
     * Configure cookie parser middleware
     * @param secret - Secret key for signed cookies
     * @param options - Cookie parser options
     * @returns Cookie parser middleware
     */
    public static configure(secret?: string, options?: cookieParser.CookieParseOptions) {
        const defaultOptions: cookieParser.CookieParseOptions = {
            decode: decodeURIComponent,
            ...options
        };

        return cookieParser(secret, defaultOptions);
    }

    /**
     * Configure cookie parser with signed cookies support
     * @param secret - Secret key for signing cookies
     * @returns Cookie parser middleware with signing support
     */
    public static withSigning(secret: string) {
        if (!secret || secret.length < 32) {
            throw new Error("Cookie signing secret must be at least 32 characters long");
        }

        return cookieParser(secret, {
            decode: decodeURIComponent
        });
    }

    /**
     * Configure basic cookie parser without signing
     * @returns Basic cookie parser middleware
     */
    public static basic() {
        return cookieParser();
    }
}

export default CookieParserMiddleware;
