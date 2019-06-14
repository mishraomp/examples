import * as nconf from "nconf";
import { Application } from "./app";
import { LoggerConfig } from "./config/flogger";
import { MongooseConfig } from "./config/mongoose-config";
import { Employee } from "./model/employee";

const handleUncaughtException = (err: any) => {
  if (err.errno === "EADDRINUSE") {
    console.error("Port  is already being used. Have you started the same Node JS instance twice? Try a different HTTP_PORT.");
    setTimeout(() => {
      process.exit(1);
    }, 500);
  } else {
    console.error("There was an uncaught exception.", err);
  }
};


try {
  nconf.argv().env();
  const port: number = 4201;
  LoggerConfig.initializeLogger();
  Application.initializeExpress(port);
  new MongooseConfig(); // initiate the db connection.
  new Employee();
  new LoggerConfig().appLogger.info("Server started listening on port " + port);
} catch (error) {
  console.error(error, "There were errors while initializing express, application will now exit.");
  process.exit(1);
}

process.on("unhandledRejection", (reason: any, p: any) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

process.on("uncaughtException", handleUncaughtException);
