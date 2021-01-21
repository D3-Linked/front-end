import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaadkadesComponent } from './laadkades.component';

describe('LaadkadesComponent', () => {
  let component: LaadkadesComponent;
  let fixture: ComponentFixture<LaadkadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaadkadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaadkadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
