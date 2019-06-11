import * as Logger from "bunyan";
import * as nconf from "nconf";
import * as RotatingFileStream from "bunyan-rotating-file-stream";
let appLoggerOptions: Logger.LoggerOptions;
let httpLoggerOptions: Logger.LoggerOptions;
export class LoggerConfig {
  public appLogger = Logger.createLogger(appLoggerOptions);
  public reqRspLogger = Logger.createLogger(httpLoggerOptions);

  public static initializeLogger(): void {
    appLoggerOptions = {
      name: nconf.get("employee_mongo_node"),
      serializers: Logger.stdSerializers,
      src: true,
      streams: [
        {
          level: Logger.TRACE,
          stream: process.stdout
        },
        {
          level: Logger.TRACE,
          stream: new RotatingFileStream({
            path: nconf.get("/home/isddev/log/employee_mongo_node.log"), // log to a file,
            period: "1d",          // daily rotation
            totalFiles: 10,        // keep up to 10 back copies
            rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
            threshold: "10m",      // Rotate log files larger than 10 megabytes
            totalSize: "20m",      // Don't keep more than 20mb of archived log files
            gzip: true
          })
        }
      ]
    };
    httpLoggerOptions = {
      name: nconf.get("MICRO_SERVICE_CODE"),
      src: true,
      serializers: {
        req: reqSerializer,
        res: resSerializer
      },
      streams: [
        {
          level: Logger.TRACE,
          stream: process.stdout
        },
        {
          level: Logger.TRACE,
          stream: new RotatingFileStream({
            path: nconf.get("/home/isddev/log/employee_mongo_node_reqrsp.log"), // log to a file,
            period: "1d",          // daily rotation
            totalFiles: 10,        // keep up to 10 back copies
            rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
            threshold: "10m",      // Rotate log files larger than 10 megabytes
            totalSize: "20m",      // Don't keep more than 20mb of archived log files
            gzip: true
          })
        }
      ]
    };
  }

}

const reqSerializer = (req: any) => {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  };
};

const resSerializer = (res: any) => {
  return {
    headers: res._headers,
    body: res.json,
    status: res.status
  };
};
