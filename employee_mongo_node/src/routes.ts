import * as express from "express";
import { EmployeeHandler } from "./employee-handler";
export const router = express.Router();

router.get("/api/v1/employee", EmployeeHandler.getEmployees);
router.get("/api/v1/employee/:id", EmployeeHandler.getEmployee);
router.post("/api/v1/employee/", EmployeeHandler.createEmployee);
router.put("/api/v1/employee/:id", EmployeeHandler.updateEmployee);
router.delete("/api/v1/employee/:id", EmployeeHandler.deleteEmployee);