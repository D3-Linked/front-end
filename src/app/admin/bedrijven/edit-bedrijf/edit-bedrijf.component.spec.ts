import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBedrijfComponent } from './edit-bedrijf.component';

describe('EditBedrijfComponent', () => {
  let component: EditBedrijfComponent;
  let fixture: ComponentFixture<EditBedrijfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBedrijfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBedrijfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
