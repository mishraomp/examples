export class Employee {
  age?: number;
  employeeName?: string;
  employeeId?: string;
  constructor(age: number,
    employeeName: string,
    employeeId: string) {
    this.age = age;
    this.employeeId = employeeId;
    this.employeeName = employeeName;

  }
}