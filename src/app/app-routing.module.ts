import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security/security/security.component';
import { HomeComponent } from './user/home/home.component';
import { TableComponent } from './user/table/table.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'table', component: TableComponent},
  {path: 'login', component: SecurityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
