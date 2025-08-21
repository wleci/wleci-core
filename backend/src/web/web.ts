import express from "express";
import MessageLogger from "@/cli/messageLogger/messageLogger";
import {
    HelmetMiddleware,
    MorganMiddleware,
    CompressionMiddleware,
    BodyParserMiddleware,
    SessionMiddleware,
    CorsMiddleware,
    RateLimitMiddleware,
    CookieParserMiddleware
} from "./middlewares";

class WebServer {

    private logger: MessageLogger;

    constructor() {
        const app = express();
        this.logger = new MessageLogger("WebServer");
    }

    private loadMiddlewares(app: express.Application) {
        // 1. Security headers (should be first)
        app.use(HelmetMiddleware.development());

        // 2. CORS (before other middlewares that might send responses)
        app.use(CorsMiddleware.development());

        // 3. Request logging
        app.use(MorganMiddleware.development());

        // 4. Rate limiting (early to prevent abuse)
        app.use(RateLimitMiddleware.development());

        // 5. Cookie parsing
        app.use(CookieParserMiddleware.basic());

        // 6. Session handling (after cookie parser)
        app.use(SessionMiddleware.development(process.env.SESSION_SECRET || "dev-secret-key-change-in-production-please"));

        // 7. Compression (before body parsing for better performance)
        app.use(CompressionMiddleware.configure());

        // 8. Body parsing (should be after compression)
        app.use(BodyParserMiddleware.json());
        app.use(BodyParserMiddleware.urlencoded());
    }

    private loadRoutes(app: express.Application) {
        app.get("/", (req, res) => {
            res.send("Hello Worlds!");
        });
    }

    public startWebServer() {
        const app = express();
        this.loadMiddlewares(app);
        this.loadRoutes(app);
        app.listen(3000, () => {
            setTimeout(() => {
                this.logger.info("Server is running on http://localhost:3000");
            }, 100);
        });
    }

}

export default WebServer;
