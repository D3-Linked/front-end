import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning/planning.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlanningComponent],
  imports: [CommonModule, SharedModule],
})
export class PlanningAdminModule {}
