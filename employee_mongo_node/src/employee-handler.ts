import { NextFunction, Request, Response } from "express";
import { LoggerConfig } from "./config/flogger";
import { EmployeeRepository } from "./repository/employee-repository";
export class EmployeeHandler {
    static async getEmployees(request: Request, response: Response, next: NextFunction): Promise<void> {
        //new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        try {
            const result = await new EmployeeRepository().findEmployees();
           // new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
            response.status(200).json(result);
        } catch (error) {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        }
    }
    static async getEmployee(request: Request, response: Response, next: NextFunction): Promise<void> {
        //new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        try {
            const result = await new EmployeeRepository().findEmployee(request.params["id"]);
            //  new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
            response.status(200).json(result);
        } catch (error) {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        }
    }
    static async createEmployee(request: Request, response: Response, next: NextFunction): Promise<void> {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        const result = await new EmployeeRepository().saveEmployee(request.body!.employeeId, request.body!.employeeName, request.body!.age);
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        response.status(200).json(result);

    }
    static async updateEmployee(request: Request, response: Response, next: NextFunction): Promise<void> {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        const result = await new EmployeeRepository().updateEmployee(request.body!.employeeId, request.body!.employeeName, request.body!.age);
        response.status(200).json(result);
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
    }
    static async deleteEmployee(request: Request, response: Response, next: NextFunction): Promise<void> {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
    }
}