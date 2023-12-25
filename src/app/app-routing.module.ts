import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponentComponent } from 'src/app/employee-component/employee-component.component';
 
const routes: Routes = [
  { path: '', component: EmployeeComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
