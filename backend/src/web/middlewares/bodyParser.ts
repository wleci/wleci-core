import express from "express";

/**
 * Body parser middleware configuration
 * Handles JSON and URL-encoded request bodies
 */
class BodyParserMiddleware {

    /**
     * Configure JSON body parser
     * @param limit - Maximum request body size (optional, uses config if not provided)
     * @returns Express middleware
     */
    public static json(limit?: string): express.RequestHandler {
        const config = globalThis.CONFIG?.webServer?.bodyParser?.json;
        if (!config) {
            throw new Error("Body parser configuration not found");
        }
        return express.json({
            limit: limit || config.limit,
            strict: config.strict,
            type: config.type
        });
    }

    /**
     * Configure URL-encoded body parser
     * @param limit - Maximum request body size (optional, uses config if not provided)
     * @param extended - Use extended parsing (optional, uses config if not provided)
     * @returns Express middleware
     */
    public static urlencoded(limit?: string, extended?: boolean): express.RequestHandler {
        const config = globalThis.CONFIG?.webServer?.bodyParser?.urlencoded;
        if (!config) {
            throw new Error("Body parser configuration not found");
        }
        return express.urlencoded({
            limit: limit || config.limit,
            extended: extended !== undefined ? extended : config.extended,
            parameterLimit: config.parameterLimit
        });
    }

    /**
     * Configure raw body parser for specific content types
     * @param type - Content type to parse (optional, uses config if not provided)
     * @param limit - Maximum request body size (optional, uses config if not provided)
     * @returns Express middleware
     */
    public static raw(type?: string, limit?: string): express.RequestHandler {
        const config = globalThis.CONFIG?.webServer?.bodyParser?.raw;
        if (!config) {
            throw new Error("Body parser configuration not found");
        }
        return express.raw({
            type: type || config.type,
            limit: limit || config.limit
        });
    }
}

export default BodyParserMiddleware;
