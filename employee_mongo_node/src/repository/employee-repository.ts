import * as EmployeeDTO from "../dto/employee";
import { Employee } from "../model/employee";
export class EmployeeRepository {

  public findEmployees(): Promise<any> {
    return new Promise((resolve, reject) => {
      Employee.employeeModel!.find().then((result) => {
        const data: any[] = [];
        for (const res of result) {
          const emp: Employee = new EmployeeDTO.Employee(res!.age, res!.employeeName, res!.employeeId);
          data.push(emp);
        }
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      })
    });
  }

  public findEmployee(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      Employee.employeeModel!.findOne({ "employeeId": id }).then((result) => {
        if (result !== null) {
          const data: Employee = new EmployeeDTO.Employee(result!.age, result!.employeeName, result!.employeeId);
          return resolve(data);
        } else {
          return reject("No Data Found");
        }
      }).catch((error) => {
        return reject(error);
      });
    });
  }

  public saveEmployee(id: string, name: string, age: number): Promise<any> {
    return new Promise((resolve, reject) => {
      Employee.employeeModel!.collection.insertOne({ "employeeId": id, "employeeName": name, "age": age }).then((result) => {
        const data: Employee = new EmployeeDTO.Employee(result.ops[0]!.age, result.ops[0]!.employeeName, result.ops[0]!.employeeId);
        return resolve(data);
      }).catch((error) => {
        return reject(error);
      })

    });
  }

  public updateEmployee(id: string, name: string, age: number): Promise<any> {
    return new Promise((resolve, reject) => {
      Employee.employeeModel!.collection.findOneAndUpdate({ "employeeId": id }, { $set: { "employeeId": id, "employeeName": name, "age": age } }).then((result) => {
        return resolve(result);
      }).catch((error) => {
        return reject(error);
      })
    })
  }

  public deleteEmployee(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Employee.employeeModel!.collection.findOneAndDelete({ "employeeId": id }).then((result) => {
        if (result !== null) {
          return resolve(result);
        } else {
          return reject("No Data Found");
        }
      }).catch((error) => {
        return reject(error);
      })
    });
  }
}