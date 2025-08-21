import { configDotenv } from "dotenv";
configDotenv(); // Load environment variables from the .env file

import type { Config } from "@/types/config/config";

const config: Config = {

    application: {
        name: process.env.APP_NAME || "WleciCore",
        version: process.env.APP_VERSION || "0.0.1",
        author: "Jakub Włosek <contact@wleci.com>",
        mode: process.env.APP_MODE || "Unknown"
    }

};

globalThis.CONFIG = {
    ...config
} as Config;
