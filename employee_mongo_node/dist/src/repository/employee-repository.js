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
const EmployeeDTO = require("../dto/employee");
const employee_1 = require("../model/employee");
class EmployeeRepository {
    findEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employee_1.Employee.employeeModel.find();
                if (result !== null) {
                    const data = [];
                    for (const res of result) {
                        const emp = new EmployeeDTO.Employee(res.age, res.employeeName, res.employeeId);
                        data.push(emp);
                    }
                    return Promise.resolve(data);
                }
                else {
                    return Promise.reject("No Data Found");
                }
                return Promise.resolve(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employee_1.Employee.employeeModel.findOne({ "employeeId": id });
                //console.log(result);
                if (result !== null) {
                    const data = new EmployeeDTO.Employee(result.age, result.employeeName, result.employeeId);
                    return Promise.resolve(data);
                }
                else {
                    return Promise.reject("No Data Found");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    saveEmployee(id, name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employee_1.Employee.employeeModel.collection.insertOne({ "employeeId": id, "employeeName": name, "age": age });
                console.log(result.ops[0]);
                const data = new EmployeeDTO.Employee(result.ops[0].age, result.ops[0].employeeName, result.ops[0].employeeId);
                return Promise.resolve(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateEmployee(id, name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employee_1.Employee.employeeModel.collection.findOneAndUpdate({ "employeeId": id }, { $set: { "employeeId": id, "employeeName": name, "age": age } });
                return Promise.resolve(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=employee-repository.js.map