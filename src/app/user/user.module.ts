import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EigenPlanningComponent } from './eigen-planning/eigen-planning.component';


const appRoutes: Routes = [
  { path: 'table', component: TableComponent },
  { path: 'userlevering', component: EigenPlanningComponent },

];

@NgModule({
  declarations: [TableComponent, HomeComponent, EigenPlanningComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    SharedModule
  ]
})
export class UserModule { }
