import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin/admin.component';

import { BedrijvenComponent } from './bedrijven/bedrijven/bedrijven.component';
import { AddBedrijfComponent } from './bedrijven/add-bedrijf/add-bedrijf.component';
import { EditBedrijfComponent } from './bedrijven/edit-bedrijf/edit-bedrijf.component';

import { LaadkadesComponent } from './laadkades/laadkades/laadkades.component';
import { AddLaadkadeComponent } from './laadkades/add-laadkade/add-laadkade.component';
import { EditLaadkadeComponent } from './laadkades/edit-laadkade/edit-laadkade.component';

import { LeveranciersComponent } from './leveranciers/leveranciers/leveranciers.component';
import { AddLeverancierComponent } from './leveranciers/add-leverancier/add-leverancier.component';
import { EditLEverancierComponent } from './leveranciers/edit-leverancier/edit-leverancier.component';
import { LeveringenComponent } from './leveringen/leveringen/leveringen.component';
import { AddLeveringComponent } from './leveringen/add-levering/add-levering.component';
import { EditLeveringComponent } from './leveringen/edit-levering/edit-levering.component';

const appRoutes: Routes = [
  { path: 'bedrijven', component: BedrijvenComponent },
  { path: 'addBedrijf', component: AddBedrijfComponent },
  { path: 'editBedrijf', component: EditBedrijfComponent },
  { path: 'laadkades', component: LaadkadesComponent },
  { path: 'addLaadkade', component: AddLaadkadeComponent },
  { path: 'editLaadkade', component: EditLaadkadeComponent },
  { path: 'leveringen', component: LeveringenComponent },
  { path: 'addLevering', component: AddLeveringComponent },
  { path: 'editLevering', component: EditLeveringComponent },
  { path: 'leveranciers', component: LeveranciersComponent },
  { path: 'addLeverancier', component: AddLeverancierComponent },
  { path: 'editLeverancier', component: EditLEverancierComponent },
];

@NgModule({
  declarations: [AdminComponent, BedrijvenComponent, AddBedrijfComponent, EditBedrijfComponent, LaadkadesComponent, AddLaadkadeComponent, EditLaadkadeComponent, LeveranciersComponent, AddLeverancierComponent, EditLEverancierComponent, LeveringenComponent, AddLeveringComponent, EditLeveringComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    SharedModule
  ]
})
export class AdminModule { }