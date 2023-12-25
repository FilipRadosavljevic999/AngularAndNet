import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import {EmployeeService } from 'src/Services/employeeService'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    EmployeeService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
