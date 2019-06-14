import { NextFunction, Request, Response } from "express";
import { LoggerConfig } from "./config/flogger";
import { EmployeeRepository } from "./repository/employee-repository";
export class EmployeeHandler {
    static getEmployees(request: Request, response: Response, next: NextFunction): void {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new EmployeeRepository().findEmployees().then((result) => {
            response.status(200).json(result);
        }).catch((error) => {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        });
    }
    static getEmployee(request: Request, response: Response, next: NextFunction): void {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new EmployeeRepository().findEmployee(request.params["id"]).then((result) => {
            response.status(200).json(result);
        }).catch((error) => {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        });

    }
    static createEmployee(request: Request, response: Response, next: NextFunction): void {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new EmployeeRepository().saveEmployee(request.body!.employeeId, request.body!.employeeName, request.body!.age).then((result) => {
            response.status(200).json(result);
        }).catch((error) => {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        });
    }
    static updateEmployee(request: Request, response: Response, next: NextFunction): void {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new EmployeeRepository().updateEmployee(request.body!.employeeId, request.body!.employeeName, request.body!.age).then((result) => {
            response.status(200).json(result);
        }).catch((error) => {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        });
    }
    static deleteEmployee(request: Request, response: Response, next: NextFunction): void {
        new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
        new EmployeeRepository().deleteEmployee(request.params["id"]).then((result) => {
            response.status(200).json();
        }).catch((error) => {
            if ("No Data Found" === error) {
                response.status(404).json();
            } else {
                console.log(error);
                response.status(500).json();
            }
        });
    }
}