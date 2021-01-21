import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBedrijfComponent } from './add-bedrijf.component';

describe('AddBedrijfComponent', () => {
  let component: AddBedrijfComponent;
  let fixture: ComponentFixture<AddBedrijfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBedrijfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBedrijfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
