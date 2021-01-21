import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveranciersComponent } from './leveranciers.component';

describe('LeveranciersComponent', () => {
  let component: LeveranciersComponent;
  let fixture: ComponentFixture<LeveranciersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeveranciersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveranciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
