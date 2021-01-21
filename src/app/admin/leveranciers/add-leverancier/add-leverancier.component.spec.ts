import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeverancierComponent } from './add-leverancier.component';

describe('AddLeverancierComponent', () => {
  let component: AddLeverancierComponent;
  let fixture: ComponentFixture<AddLeverancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeverancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeverancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
