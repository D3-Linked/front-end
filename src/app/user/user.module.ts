import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: 'table', component: TableComponent },

];

@NgModule({
  declarations: [TableComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    SharedModule
  ]
})
export class UserModule { }
