import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLEverancierComponent } from './edit-leverancier.component';

describe('EditLEverancierComponent', () => {
  let component: EditLEverancierComponent;
  let fixture: ComponentFixture<EditLEverancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLEverancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLEverancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
