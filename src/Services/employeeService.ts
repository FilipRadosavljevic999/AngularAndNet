import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/Model/employeeModel';
import {paths} from 'src/Services/path';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';
  
    constructor(private http: HttpClient) { }
  
    getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(paths.urlpath);
    }
  }