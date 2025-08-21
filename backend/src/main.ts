import "@/config/CONFIG";
import "@/cli/menu/menu";
import WebServer from "@/web/web";

const webServer = new WebServer();
webServer.startWebServer();
