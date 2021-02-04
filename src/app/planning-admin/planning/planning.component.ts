import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    code: 0,
    datum: ['', Validators.required],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID,
  });


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get fromDate() {
    return this.range.get('start').value;
  }
  get toDate() {
    return this.range.get('end').value;
  }

  startDate: string;
  endDate: string;

  
  addLeveringForm = this.fb.group({
    omschrijving: [''],
    laadkadeID: ['', Validators.required],
    scheduleID: [''],
    leverancierID: ['', Validators.required],
    isCompleet: false,
  });

  addProductForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
    leveringID: [''],
  });

  constructor(
    private planningService: PlanningAdminService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  getSchedulesByDateRange() {
    this.startDate = this.datePipe.transform(
      new Date(this.fromDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    console.log(this.startDate);
    this.endDate = this.datePipe.transform(
      new Date(this.toDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    console.log(this.endDate);
    this.planningService
      .getSchedulesByDateRange(this.startDate, this.endDate)
      .subscribe((result) => {
        this.schedules = result;
        console.log(result);
      });
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

    if (this.addScheduleForm.value['opmerking'] == '') {
      this.addScheduleForm.value['opmerking'] = 'Geen opmerkingen';
    }

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

    if (this.addLeveringForm.value['omschrijving'] == '') {
      this.addLeveringForm.value['omschrijving'] = 'Geen omschrijving gegeven';
    }

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

  makeNewLevering() {
    this.addLeveringForm.reset();
    this.leveringAdded = false;
  }

  scheduleReady() {
    this.selectedTab = 0;
  }
}
