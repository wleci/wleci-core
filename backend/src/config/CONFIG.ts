import { configDotenv } from "dotenv";
configDotenv(); // Load environment variables from the .env file

import type { Config } from "../types/config/config";

const config: Config = {

    application: {
        name: process.env.APP_NAME || "WleciCore",
        version: process.env.APP_VERSION || "0.0.1",
        author: "Jakub Włosek <contact@wleci.com>",
        mode: process.env.APP_MODE || "development"
    },

    webServer: {
        host: process.env.WEB_SERVER_HOST || "localhost",
        port: parseInt(process.env.WEB_SERVER_PORT || "5000", 10),
        bodyParser: {
            json: {
                limit: process.env.BODY_PARSER_JSON_LIMIT || "1mb",
                strict: true,
                type: "application/json"
            },
            urlencoded: {
                limit: process.env.BODY_PARSER_URLENCODED_LIMIT || "1mb",
                extended: true,
                parameterLimit: 1000
            },
            raw: {
                type: "application/octet-stream",
                limit: process.env.BODY_PARSER_RAW_LIMIT || "1mb"
            }
        },
        compression: {
            level: parseInt(process.env.COMPRESSION_LEVEL || "6", 10),
            threshold: parseInt(process.env.COMPRESSION_THRESHOLD || "1024", 10),
            chunkSize: 1024,
            windowBits: 15,
            memLevel: 8
        },
        cookieParser: {
            secret: process.env.COOKIE_PARSER_SECRET,
            enableSigning: !!process.env.COOKIE_PARSER_SECRET
        },
        cors: {
            allowedOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
            credentials: process.env.CORS_CREDENTIALS !== 'false',
            maxAge: parseInt(process.env.CORS_MAX_AGE || "86400", 10)
        },
        helmet: {
            enableHsts: process.env.HELMET_ENABLE_HSTS !== 'false',
            hstsMaxAge: parseInt(process.env.HELMET_HSTS_MAX_AGE || "31536000", 10)
        },
        morgan: {
            skipHealthChecks: process.env.MORGAN_SKIP_HEALTH_CHECKS !== 'false',
            logErrorsOnly: process.env.MORGAN_LOG_ERRORS_ONLY === 'true'
        },
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
            max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
            skipSuccessfulRequests: process.env.RATE_LIMIT_SKIP_SUCCESSFUL !== 'false'
        },
        session: {
            secret: process.env.SESSION_SECRET,
            maxAge: parseInt(process.env.SESSION_MAX_AGE || "86400000", 10),
            secure: process.env.SESSION_SECURE === 'true',
            domain: process.env.SESSION_DOMAIN
        }
    }

};

globalThis.CONFIG = {
    ...config
} as Config;
