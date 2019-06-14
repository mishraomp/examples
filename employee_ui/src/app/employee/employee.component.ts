import { Component, OnInit } from '@angular/core';
import { EmployeeResource } from '../models';
import { Observable } from 'rxjs';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../services';
import { first } from 'rxjs/operators';
@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  selectedEmployee: EmployeeResource;
  cols: any[];
  employees: EmployeeResource[];
  newEmployee: boolean;
  employee: EmployeeResource;
  displayDialog: boolean;
  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.cols = [
      { field: 'employeeId', header: 'Employee ID' },
      { field: 'employeeName', header: 'Employee Name' },
      { field: 'age', header: 'Employee Age' }
    ];
  }

  async ngOnInit() {
    console.log(new Date());
    this.employees = await this.getDataFromService();
    console.log(new Date());
  }

  private getDataFromService(): any {
    return new Promise((resolve, reject) => {
      this.employeeService.getEmployeeList().pipe(first())
        .subscribe(resource => {
          return resolve(resource.body);
        }, error => {
          console.log(error);
          return resolve([]);
        });
    });

  }

  private addEmployee(em: EmployeeResource): any {
    return new Promise((resolve, reject) => {
      this.employeeService.createEmployee(em).pipe(first())
        .subscribe(resource => {
          return resolve(resource.body);
        }, error => {
          console.log(error);
          return reject();
        });
    });

  }
  private updateEmployee(em: EmployeeResource): any {
    return new Promise((resolve, reject) => {
      this.employeeService.updateEmployee(em).pipe(first())
        .subscribe(resource => {
          return resolve(resource.body);
        }, error => {
          console.log(error);
          return reject();
        });
    });

  }
  private deleteEmployee(em: EmployeeResource): any {
    return new Promise((resolve, reject) => {
      this.employeeService.deleteEmployee(em).pipe(first())
        .subscribe(resource => {
          return resolve(resource.body);
        }, error => {
          console.log(error);
          return reject();
        });
    });

  }
  showDialogToAdd() {
    this.newEmployee = true;
    this.employee = new EmployeeResource();
    this.displayDialog = true;
  }

  async save() {
    const employees = [...this.employees];
    if (this.newEmployee) {
      await this.addEmployee(this.employee);
    } else {
      await this.updateEmployee(this.employee);
    }
    console.log(new Date());
    this.employees = await this.getDataFromService();
    console.log(new Date());
    this.employee = null;
    this.displayDialog = false;
  }

  async delete() {
    await this.deleteEmployee(this.selectedEmployee);
    console.log(new Date());
    this.employees = await this.getDataFromService();
    console.log(new Date());
    this.employee = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEmployee = false;
    this.employee = this.cloneEmployee(event.data);
    this.displayDialog = true;
  }

  cloneEmployee(e: EmployeeResource): EmployeeResource {
    const employee = new EmployeeResource();
    if (e !== undefined) {
      for (const prop of Object.keys(e)) {
        employee[prop] = e[prop];
      }
    }
    return employee;
  }
}
