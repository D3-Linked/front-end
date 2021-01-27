import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { RouterModule, Routes } from '@angular/router';

import { SecurityComponent } from './security/security/security.component';
import { SecurityModule } from './security/security.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';

import { AdminModule } from '../app/admin/admin.module';
import { AdminComponent } from '../app/admin/admin/admin.component';
import { UserModule } from '../app/user/user.module';
import { TableComponent } from './user/table/table.component';

import {PlanningComponent} from './planning-admin/planning/planning.component'
import { PlanningAdminModule } from './planning-admin/planning-admin.module';

const appRoutes: Routes = [
  { path: 'login', component: SecurityComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'planningAdmin', component: PlanningComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    SecurityModule,
    AdminModule,
    UserModule,
    PlanningAdminModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

