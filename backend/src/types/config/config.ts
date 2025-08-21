export interface ApplicationConfig {
    name: string;
    version: string;
    author: string;
    mode: string;
}

export interface BodyParserConfig {
    json: {
        limit: string;
        strict: boolean;
        type: string;
    };
    urlencoded: {
        limit: string;
        extended: boolean;
        parameterLimit: number;
    };
    raw: {
        type: string;
        limit: string;
    };
}

export interface CompressionConfig {
    level: number;
    threshold: number;
    chunkSize: number;
    windowBits: number;
    memLevel: number;
}

export interface CookieParserConfig {
    secret: string | undefined;
    enableSigning: boolean;
}

export interface CorsConfig {
    allowedOrigins: string[];
    credentials: boolean;
    maxAge: number;
}

export interface HelmetConfig {
    enableHsts: boolean;
    hstsMaxAge: number;
}

export interface MorganConfig {
    skipHealthChecks: boolean;
    logErrorsOnly: boolean;
}

export interface RateLimitConfig {
    windowMs: number;
    max: number;
    skipSuccessfulRequests: boolean;
}

export interface SessionConfig {
    secret: string | undefined;
    maxAge: number;
    secure: boolean;
    domain: string | undefined;
}

export interface WebServerConfig {
    host: string;
    port: number;
    bodyParser: BodyParserConfig;
    compression: CompressionConfig;
    cookieParser: CookieParserConfig;
    cors: CorsConfig;
    helmet: HelmetConfig;
    morgan: MorganConfig;
    rateLimit: RateLimitConfig;
    session: SessionConfig;
}

export interface Config {
    application: ApplicationConfig;
    webServer: WebServerConfig;
}
