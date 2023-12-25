import { Injectable } from '@angular/core';
import { Employee } from 'src/Model/employeeModel';
import { EmployeeModelForShow } from 'src/Model/employeeModelForShow';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHoursService {

  constructor() { }

  calculateTotalHoursForEmployees(employees: Employee[]): EmployeeModelForShow[] {
    const employeeMap = new Map<string, number>();

   
    for (const employee of employees) {
      const hours = this.calculateTotalHours(employee);
      if (employeeMap.has(employee.EmployeeName)) {
        employeeMap.set(employee.EmployeeName, employeeMap.get(employee.EmployeeName)! + hours);
      } else {
        employeeMap.set(employee.EmployeeName, hours);
      }
    }


    const result: EmployeeModelForShow[] = [];
    employeeMap.forEach((hours, name) => {
      result.push({ EmployeeName: name, TotalHoursWorked: hours });
    });

    return result.sort((a, b) => b.TotalHoursWorked - a.TotalHoursWorked);
  }

  private calculateTotalHours(employee: Employee): number {
    const startTime = new Date(employee.StarTimeUtc);
    const endTime = new Date(employee.EndTimeUtc);
    return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)); 
  }
}