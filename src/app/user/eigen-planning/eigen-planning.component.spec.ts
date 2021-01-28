import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EigenPlanningComponent } from './eigen-planning.component';

describe('EigenPlanningComponent', () => {
  let component: EigenPlanningComponent;
  let fixture: ComponentFixture<EigenPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EigenPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EigenPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
