import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Employee } from 'src/Model/employeeModel';
import { EmployeeService } from 'src/Services/employeeService';
import { EmployeeHoursService } from 'src/Services/employeeHoursService';
import { EmployeeModelForShow } from 'src/Model/employeeModelForShow';
import { Chart, ChartType, ChartDataset, ChartOptions } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})
export class EmployeeComponentComponent implements OnInit {
  employees: Employee[] = [];
  employeeShow: EmployeeModelForShow[] = [];
  backgrounColorChart: string[] = [];
  @ViewChild('pieChart') pieChartRef!: ElementRef;
  public chart: any;
  constructor(private employeeService: EmployeeService,
    private employeeHoursService: EmployeeHoursService,
    private elementRef: ElementRef) {
   
   }

  ngOnInit(): void {
    
    this.loadEmployees();
    
    
  }
  
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (dataAboutEmployee) => {
        this.employees = dataAboutEmployee;
        this.calculateEmployeeHours();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  calculateEmployeeHours(): void {
    this.employeeShow = this.employeeHoursService.calculateTotalHoursForEmployees(this.employees);
    this.employeeShow.forEach(employee => {
      if (employee.EmployeeName === null) {
        employee.EmployeeName = "Other";
      }
    });
    this.renderPieChart()
  }
  renderPieChart(): void {
    const pieChartRef = this.elementRef.nativeElement.querySelector(`#pieChart`);;
      for(let i=0;i<this.employeeShow.length;i++){
        this.backgrounColorChart.push(this.generateRandomRGB())
      }
      const names = this.employeeShow.map((employee) => employee.EmployeeName);
      const hoursWorked = this.employeeShow.map((employee) => employee.TotalHoursWorked);
      const totalHours = hoursWorked.reduce((acc, val) => acc + val, 0);

      new Chart(pieChartRef, {
        type: 'pie',
        data: {
          labels: names,
          datasets: [
            {
              data: hoursWorked.map((hours) => ((hours / totalHours) * 100).toFixed(2).toString()),
              backgroundColor: this.backgrounColorChart,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            
            legend: {
              display: true,
              position:"bottom" 
            },
            tooltip: {
              enabled: true 
            }, 
            datalabels: {
              color: '##ff0000', 
              formatter: (value: any) => {
                return value.toFixed(2) ;
              },
              font: {
                weight: 'bold' 
              }
            }
          }
        },
        
           
          
        
      });
    
  }
  generateRandomRGB(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
}
