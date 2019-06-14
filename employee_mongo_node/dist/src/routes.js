"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const employee_handler_1 = require("./employee-handler");
exports.router = express.Router();
exports.router.get("/api/v1/employee", employee_handler_1.EmployeeHandler.getEmployees);
exports.router.get("/api/v1/employee/:id", employee_handler_1.EmployeeHandler.getEmployee);
exports.router.post("/api/v1/employee/", employee_handler_1.EmployeeHandler.createEmployee);
exports.router.put("/api/v1/employee/:id", employee_handler_1.EmployeeHandler.updateEmployee);
exports.router.delete("/api/v1/employee/:id", employee_handler_1.EmployeeHandler.deleteEmployee);
//# sourceMappingURL=routes.js.map