"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flogger_1 = require("./config/flogger");
const employee_repository_1 = require("./repository/employee-repository");
class EmployeeHandler {
    static getEmployees(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
            try {
                const result = yield new employee_repository_1.EmployeeRepository().findEmployees();
                // new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
                response.status(200).json(result);
            }
            catch (error) {
                if ("No Data Found" === error) {
                    response.status(404).json();
                }
                else {
                    console.log(error);
                    response.status(500).json();
                }
            }
        });
    }
    static getEmployee(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
            try {
                const result = yield new employee_repository_1.EmployeeRepository().findEmployee(request.params["id"]);
                //  new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
                response.status(200).json(result);
            }
            catch (error) {
                if ("No Data Found" === error) {
                    response.status(404).json();
                }
                else {
                    console.log(error);
                    response.status(500).json();
                }
            }
        });
    }
    static createEmployee(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            new flogger_1.LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
            const result = yield new employee_repository_1.EmployeeRepository().saveEmployee(request.body.employeeId, request.body.employeeName, request.body.age);
            new flogger_1.LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
            response.status(200).json(result);
        });
    }
    static updateEmployee(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            new flogger_1.LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
            const result = yield new employee_repository_1.EmployeeRepository().updateEmployee(request.body.employeeId, request.body.employeeName, request.body.age);
            response.status(200).json(result);
            new flogger_1.LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        });
    }
    static deleteEmployee(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            new flogger_1.LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
            new flogger_1.LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
        });
    }
}
exports.EmployeeHandler = EmployeeHandler;
//# sourceMappingURL=employee-handler.js.map