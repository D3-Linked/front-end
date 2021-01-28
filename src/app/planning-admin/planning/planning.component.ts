import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Laadkade } from 'src/app/models/laadkade.model';
import { Leverancier } from 'src/app/models/leverancier.model';
import { Levering } from 'src/app/models/levering.model';
import { Product } from 'src/app/models/product.model';
import { Schedule } from 'src/app/models/schedule.model';
import { PlanningAdminService } from '../planning-admin.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  schedules: Schedule[] = null;
  laadkades: Laadkade[] = null;
  leveranciers: Leverancier[] = null;

  selectedTab: number = 0;

  selectedSchedule: Schedule = null;
  newPlanning: Schedule = null;
  newLevering: Levering = null;
  newProduct: Product = null;

  leveringenOfSchedule: Levering[] = null;
  productenOfLevering: Product[] = null;

  planningAdded: boolean = false;
  leveringAdded: boolean = false;
  productAdded: boolean = false;

  addScheduleForm = this.fb.group({
    code: [''],
    datum: [''],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID,
  });

  addLeveringForm = this.fb.group({
    omschrijving: [''],
    laadkadeID: [''],
    scheduleID: [''],
    leverancierID: [''],
    //isCompleet: false,
  });

  addProductForm = this.fb.group({
    naam: [''],
    leveringID: [''],
  });

  constructor(
    private planningService: PlanningAdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.planningService.getSchedules().subscribe((result) => {
      this.schedules = result;
    });
  }

  getProductenByLeveringID(id: number) {
    this.planningService.getProductenByLeveringId(id).subscribe((result) => {
      this.productenOfLevering = result;
    });
  }

  goToDetails(scheduleID: number) {
    this.planningService.getScheduleById(scheduleID).subscribe((result) => {
      this.selectedSchedule = result;
    });
    this.planningService
      .getLeveringenByScheduleId(scheduleID)
      .subscribe((result) => {
        this.leveringenOfSchedule = result;
      });
    setTimeout(() => {
      this.selectedTab = 1;
    }, 300);
  }

  backToAll(event) {
    if (event == 0) {
      this.selectedSchedule = null;
      this.productenOfLevering = null;
      this.selectedTab = 0;
    }
    this.selectedTab = event;
  }

  viewProducts(id: number) {
    this.getProductenByLeveringID(id);
  }

  hideProducts() {
    this.productenOfLevering = null;
  }

  onSubmit() {
    this.addScheduleForm.value['code'] = parseInt(
      this.addScheduleForm.value['code']
    );
    this.addScheduleForm.value['userID'] = parseInt(
      this.addScheduleForm.value['userID']
    );
    this.addScheduleForm.value['datum'] = new Date(
      this.addScheduleForm.value['datum']
    );

    this.planningService
      .addSchedule(this.addScheduleForm.value)
      .subscribe((result) => {
        this.newPlanning = result;
      });
    this.planningAdded = true;

    this.planningService.getLaadkades().subscribe((result) => {
      this.laadkades = result;
    });

    this.planningService.getLeveranciers().subscribe((result) => {
      this.leveranciers = result;
    });
  }

  onLeveringSubmit() {
    this.addLeveringForm.value['laadkadeID'] = parseInt(
      this.addLeveringForm.value['laadkadeID']
    );
    this.addLeveringForm.value['scheduleID'] = this.newPlanning.scheduleID;
    this.addLeveringForm.value['leverancierID'] = parseInt(
      this.addLeveringForm.value['leverancierID']
    );

    this.planningService
      .addLevering(this.addLeveringForm.value)
      .subscribe((result) => {
        this.newLevering = result;
      });
    this.leveringAdded = true;
  }

  onSubmitProduct() {
    this.addProductForm.value['leveringID'] = this.newLevering.leveringID;

    this.planningService
      .addProduct(this.addProductForm.value)
      .subscribe((result) => {
        this.newProduct = result;
      });
    this.productAdded = true;
    this.addProductForm.reset();
  }

  makeNewLevering(){
    this.addLeveringForm.reset();
    this.leveringAdded = false;
  }

  scheduleReady(){
    this.selectedTab = 0;
  }
}
