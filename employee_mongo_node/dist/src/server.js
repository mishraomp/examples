"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const app_1 = require("./app");
const flogger_1 = require("./config/flogger");
const mongoose_config_1 = require("./config/mongoose-config");
const employee_1 = require("./model/employee");
const handleUncaughtException = (err) => {
    if (err.errno === "EADDRINUSE") {
        console.error("Port  is already being used. Have you started the same Node JS instance twice? Try a different HTTP_PORT.");
        setTimeout(() => {
            process.exit(1);
        }, 500);
    }
    else {
        console.error("There was an uncaught exception.", err);
    }
};
try {
    nconf.argv().env();
    const port = 4201;
    flogger_1.LoggerConfig.initializeLogger();
    app_1.Application.initializeExpress(port);
    new mongoose_config_1.MongooseConfig(); // initiate the db connection.
    new employee_1.Employee();
    new flogger_1.LoggerConfig().appLogger.info("Server started listening on port " + port);
}
catch (error) {
    console.error(error, "There were errors while initializing express, application will now exit.");
    process.exit(1);
}
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
process.on("uncaughtException", handleUncaughtException);
//# sourceMappingURL=server.js.map