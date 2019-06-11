import * as bodyParser from "body-parser";
import * as express from "express";
import * as methodOverride from "method-override";
import * as _ from "lodash";
import * as swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { BootStrapper } from "./config/bootstrapper";

export class Application {

  public static initializeExpress(port: number): void {
    BootStrapper.initialize();
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
    app.use(router);
    app.use(handleUnavailableResource);
    app.listen(port);
  }
  private static stringTrimmer(key: any, value: any): string {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  }
}
const handleJsonErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    let errorMessage;
    let exception;
    if (err instanceof SyntaxError) {
      errorMessage = "Invalid JSON. The passed JSON contains syntax errors and it can\'t be processed.";
      exception = "JsonSyntaxErrorException";

    } else if (err.type === "entity.too.large") {
      // tslint:disable-next-line:ban-comma-operator
      errorMessage = "The passed JSON is too large and it won\'t be processed. The submitted size is {" +
        // tslint:disable-next-line:no-unused-expression
        "length} bytes and the limit is {limit} bytes.", {
          length: _.get(err, "length", "-"),
          limit: _.get(err, "limit", "-")
        };
      exception = "JsonTooLargeException";

    } else {
      next(err);
      return;
    }
    const responseJson = {
      code: err.status,
      message: errorMessage,
      exception
    };
    res.status(err.status).json(responseJson);
  } else {
    next();
  }
};

const handleUnavailableResource = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorCode = 404;
  const  responseJson = {
    code: errorCode,
    message: "Resource not found."
  };
  res.status(errorCode).json(responseJson);
};
