import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeveringComponent } from './edit-levering.component';

describe('EditLeveringComponent', () => {
  let component: EditLeveringComponent;
  let fixture: ComponentFixture<EditLeveringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeveringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeveringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
