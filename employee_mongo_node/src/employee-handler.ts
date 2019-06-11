import { Request, Response, NextFunction } from "express";
import { Employee } from "./model/employee";
import { LoggerConfig } from "./config/flogger";
export class EmployeeHandler {
    static async getEmployees(request: Request, response: Response, next: NextFunction):Promise<Employee[]>{
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        return Promise.resolve([]);
    }
    static async getEmployee(request: Request, response: Response, next: NextFunction):Promise<Employee>{
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        return Promise.resolve(new Employee());
    }
    static async createEmployee(request: Request, response: Response, next: NextFunction):Promise<Employee>{
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        return Promise.resolve(new Employee());
    }
    static async updateEmployee(request: Request, response: Response, next: NextFunction):Promise<Employee>{
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        return Promise.resolve(new Employee());
    }
    static async deleteEmployee(request: Request, response: Response, next: NextFunction):Promise<Employee>{
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        return Promise.resolve(new Employee());
    }
}