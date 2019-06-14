import * as EmployeeDTO from "../dto/employee";
import { Employee } from "../model/employee";
export class EmployeeRepository {

  public async findEmployees(): Promise<any> {
    try {
      const result: any[] = await Employee.employeeModel!.find();
      if (result !== null) {
        const data: any[] = [];
        for (const res of result) {
          const emp: Employee = new EmployeeDTO.Employee(res!.age, res!.employeeName, res!.employeeId);
          data.push(emp);
        }
        return Promise.resolve(data);
      } else {
        return Promise.reject("No Data Found");
      }
      return Promise.resolve(result);
    } catch (error) {
      console.log(error);
    }
  }
  public async findEmployee(id: String): Promise<any> {
    try {
      const result = await Employee.employeeModel!.findOne({ "employeeId": id });
      //console.log(result);
      if (result !== null) {
        const data: Employee = new EmployeeDTO.Employee(result!.age, result!.employeeName, result!.employeeId);
        return Promise.resolve(data);
      } else {
        return Promise.reject("No Data Found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async saveEmployee(id: string, name: string, age: number): Promise<any> {
    try {
      const result: any = await Employee.employeeModel!.collection.insertOne({ "employeeId": id, "employeeName": name, "age": age });
      console.log(result.ops[0]);
      const data: Employee = new EmployeeDTO.Employee(result.ops[0]!.age, result.ops[0]!.employeeName, result.ops[0]!.employeeId);
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
    }
  }
  public async updateEmployee(id: string, name: string, age: number): Promise<any> {
    try {
      const result = await Employee.employeeModel!.collection.findOneAndUpdate({ "employeeId": id }, { $set: { "employeeId": id, "employeeName": name, "age": age } });
      return Promise.resolve(result);
    } catch (error) {
      console.log(error);
    }
  }
}