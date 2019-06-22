import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { EmployeeResource } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) {

  }
  getEmployeeList(): Observable<HttpResponse<EmployeeResource[]>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // tslint:disable-next-line: max-line-length
      }),
      observe: 'response' as 'body'
    };
    return this.http.get<HttpResponse<EmployeeResource[]>>
      (`/api/v1/employee`, httpOptions)
      .pipe(map(httpResponse => {
        return httpResponse;
      }));

  }
  createEmployee(e: EmployeeResource): Observable<HttpResponse<EmployeeResource>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // tslint:disable-next-line: max-line-length
      }),
      observe: 'response' as 'body'
    };
    return this.http.post<HttpResponse<EmployeeResource>>
      (`/api/v1/employee`, e, httpOptions)
      .pipe(map(httpResponse => {
        return httpResponse;
      }));

  }

  updateEmployee(e: EmployeeResource): Observable<HttpResponse<EmployeeResource>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // tslint:disable-next-line: max-line-length
      }),
      observe: 'response' as 'body'
    };
    return this.http.put<HttpResponse<EmployeeResource>>
      (`/api/v1/employee/${e.employeeId}`, e, httpOptions)
      .pipe(map(httpResponse => {
        return httpResponse;
      }));

  }
  deleteEmployee(e: EmployeeResource): Observable<HttpResponse<EmployeeResource>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // tslint:disable-next-line: max-line-length
      }),
      observe: 'response' as 'body'
    };
    return this.http.delete<HttpResponse<EmployeeResource>>
      (`/api/v1/employee/${e.employeeId}`, httpOptions)
      .pipe(map(httpResponse => {
        return httpResponse;
      }));

  }

}
