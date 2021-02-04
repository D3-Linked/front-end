import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EigenProductenComponent } from './eigen-producten.component';

describe('EigenProductenComponent', () => {
  let component: EigenProductenComponent;
  let fixture: ComponentFixture<EigenProductenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EigenProductenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EigenProductenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
