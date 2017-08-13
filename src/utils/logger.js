var server = require("@cdm-logger/server");
var settings = {
    level: "info",
    mode: "short" // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};
var logger = server.ConsoleLogger.create("pubsub-implementations", settings);
logger.level('trace')
exports.logger = logger
