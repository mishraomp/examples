"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const nconf = require("nconf");
const inversify_1 = require("inversify");
exports.container = new inversify_1.Container();
class BootStrapper {
    static initialize() {
        const env = nconf.get("NODE_ENV");
        console.log(env);
    }
}
exports.BootStrapper = BootStrapper;
//# sourceMappingURL=bootstrapper.js.map