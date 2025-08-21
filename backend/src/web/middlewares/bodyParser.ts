import express from "express";

/**
 * Body parser middleware configuration
 * Handles JSON and URL-encoded request bodies
 */
class BodyParserMiddleware {

    /**
     * Configure JSON body parser
     * @param limit - Maximum request body size
     * @returns Express middleware
     */
    public static json(limit: string = "1mb"): express.RequestHandler {
        return express.json({
            limit,
            strict: true,
            type: "application/json"
        });
    }

    /**
     * Configure URL-encoded body parser
     * @param limit - Maximum request body size
     * @param extended - Use extended parsing
     * @returns Express middleware
     */
    public static urlencoded(limit: string = "1mb", extended: boolean = true): express.RequestHandler {
        return express.urlencoded({
            limit,
            extended,
            parameterLimit: 1000
        });
    }

    /**
     * Configure raw body parser for specific content types
     * @param type - Content type to parse
     * @param limit - Maximum request body size
     * @returns Express middleware
     */
    public static raw(type: string = "application/octet-stream", limit: string = "1mb"): express.RequestHandler {
        return express.raw({
            type,
            limit
        });
    }
}

export default BodyParserMiddleware;
