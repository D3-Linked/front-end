import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaadkadeComponent } from './edit-laadkade.component';

describe('EditLaadkadeComponent', () => {
  let component: EditLaadkadeComponent;
  let fixture: ComponentFixture<EditLaadkadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLaadkadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLaadkadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
