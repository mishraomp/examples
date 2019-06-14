import "reflect-metadata";
import * as nconf from "nconf";
import { Container } from "inversify";
export const container = new Container();

export class BootStrapper {
    public static initialize(): void {
        const env = nconf.get("NODE_ENV");
        console.log(env);
    }
}