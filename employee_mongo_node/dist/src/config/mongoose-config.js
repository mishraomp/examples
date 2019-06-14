"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class MongooseConfig {
    constructor() {
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 10,
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4 // Use IPv4, skip trying IPv6
        };
        //mongoose.set('debug', true);
        mongoose.connect('mongodb://localhost:27017/example', options).then(() => { console.log("connected"); }, err => { console.log("err", err); });
        this.con = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        this.con.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    get connection() {
        return this.con;
    }
}
exports.MongooseConfig = MongooseConfig;
//# sourceMappingURL=mongoose-config.js.map