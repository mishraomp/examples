"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");
const _ = require("lodash");
const swaggerUi = require("swagger-ui-express");
const routes_1 = require("./routes");
const bootstrapper_1 = require("./config/bootstrapper");
class Application {
    static initializeExpress(port) {
        bootstrapper_1.BootStrapper.initialize();
        const app = express();
        const swaggerDocument = require("../swagger.json");
        app.use(express.json({ reviver: this.stringTrimmer }));
        app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(bodyParser.json({ limit: "16mb" }));
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: "10kb"
        }));
        app.use(handleJsonErrors);
        app.use(methodOverride());
        app.use(routes_1.router);
        app.use(handleUnavailableResource);
        app.listen(port);
    }
    static stringTrimmer(key, value) {
        if (typeof value === "string") {
            return value.trim();
        }
        return value;
    }
}
exports.Application = Application;
const handleJsonErrors = (err, req, res, next) => {
    if (err) {
        let errorMessage;
        let exception;
        if (err instanceof SyntaxError) {
            errorMessage = "Invalid JSON. The passed JSON contains syntax errors and it can\'t be processed.";
            exception = "JsonSyntaxErrorException";
        }
        else if (err.type === "entity.too.large") {
            // tslint:disable-next-line:ban-comma-operator
            errorMessage = "The passed JSON is too large and it won\'t be processed. The submitted size is {" +
                // tslint:disable-next-line:no-unused-expression
                "length} bytes and the limit is {limit} bytes.", {
                length: _.get(err, "length", "-"),
                limit: _.get(err, "limit", "-")
            };
            exception = "JsonTooLargeException";
        }
        else {
            next(err);
            return;
        }
        const responseJson = {
            code: err.status,
            message: errorMessage,
            exception
        };
        res.status(err.status).json(responseJson);
    }
    else {
        next();
    }
};
const handleUnavailableResource = (req, res, next) => {
    const errorCode = 404;
    const responseJson = {
        code: errorCode,
        message: "Resource not found."
    };
    res.status(errorCode).json(responseJson);
};
//# sourceMappingURL=app.js.map