import * as mongoose from "mongoose";
import { Employee } from "../model/employee";

export class MongooseConfig {
    private con: mongoose.Connection;

    constructor() {
        const options: any = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        //mongoose.set('debug', true);
        mongoose.connect('mongodb://localhost:27017/example', options).then(() => { console.log("connected") },
            err => { console.log("err", err); });
        this.con = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        this.con.on('error', console.error.bind(console, 'MongoDB connection error:'));
        new Employee();//instantiate the Employee Model.
    }
    get connection() {
        return this.con;
    }
}