"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("bunyan");
const RotatingFileStream = require("bunyan-rotating-file-stream");
let appLoggerOptions;
let httpLoggerOptions;
class LoggerConfig {
    constructor() {
        this.appLogger = Logger.createLogger(appLoggerOptions);
        this.reqRspLogger = Logger.createLogger(httpLoggerOptions);
    }
    static initializeLogger() {
        appLoggerOptions = {
            name: "employee_mongo_node",
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
                        path: "/home/isddev/log/employee_mongo_node.log",
                        period: "1d",
                        totalFiles: 10,
                        rotateExisting: true,
                        threshold: "10m",
                        totalSize: "20m",
                        gzip: true
                    })
                }
            ]
        };
        httpLoggerOptions = {
            name: "employee_mongo_node",
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
                        path: "/home/isddev/log/employee_mongo_node_reqrsp.log",
                        period: "1d",
                        totalFiles: 10,
                        rotateExisting: true,
                        threshold: "10m",
                        totalSize: "20m",
                        gzip: true
                    })
                }
            ]
        };
    }
}
exports.LoggerConfig = LoggerConfig;
const reqSerializer = (req) => {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    };
};
const resSerializer = (res) => {
    return {
        headers: res._headers,
        body: res.json,
        status: res.status
    };
};
//# sourceMappingURL=flogger.js.map