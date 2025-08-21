import express from 'express';
import {
    HelmetMiddleware,
    MorganMiddleware,
    CompressionMiddleware,
    BodyParserMiddleware,
    CorsMiddleware,
    RateLimitMiddleware,
    CookieParserMiddleware
} from './middlewares';
import router from './router/router';
import MessageLogger from '../cli/messageLogger/messageLogger';

/**
 * Web server configuration for serving React build
 * Handles static files, locales, and SPA routing
 */
class WebServer {
    private app: express.Application;
    private logger: MessageLogger;

    constructor() {
        this.app = express();
        this.logger = new MessageLogger("WebServer");
        this.setupMiddlewares();
    }

    /**
     * Setup middlewares for serving React build
     */
    private setupMiddlewares(): void {
        // Security middleware
        this.app.use(HelmetMiddleware.basic());

        // Logging middleware
        this.app.use(MorganMiddleware.development());

        // Compression middleware
        this.app.use(CompressionMiddleware.configure());

        // CORS middleware
        this.app.use(CorsMiddleware.development());

        // Rate limiting middleware
        this.app.use(RateLimitMiddleware.development());

        // Body parsing middleware
        this.app.use(BodyParserMiddleware.json());
        this.app.use(BodyParserMiddleware.urlencoded());

        // Cookie parsing middleware
        this.app.use(CookieParserMiddleware.basic());

        // Serve static files for assets and locales
        const StaticMiddleware = require('./middlewares/static').default;

        // Serve React build directory (includes assets and other files)
        this.app.use(StaticMiddleware.forReactBuild('../../build-frontend'));

        // Use Express router for all page routing
        this.app.use('/', router);
    }

    /**
     * Get the Express application instance
     */
    getApp(): express.Application {
        return this.app;
    }

    /**
     * Start the web server
     * @param port - Port to listen on
     * @param callback - Optional callback when server starts
     */
    listen(port: number = 3000, callback?: () => void): void {
        this.app.listen(port, callback || (() => {
            this.logger.info(`Access your app at: http://localhost:${port}`);
        }));
    }
}
// Auto-start web server with delay to show after menu
setTimeout(() => {
    const webServer = new WebServer();
    webServer.listen();
}, 100); // Small delay to ensure menu shows first
