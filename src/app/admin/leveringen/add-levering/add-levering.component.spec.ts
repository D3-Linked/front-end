import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeveringComponent } from './add-levering.component';

describe('AddLeveringComponent', () => {
  let component: AddLeveringComponent;
  let fixture: ComponentFixture<AddLeveringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeveringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeveringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
