import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaadkadeComponent } from './add-laadkade.component';

describe('AddLaadkadeComponent', () => {
  let component: AddLaadkadeComponent;
  let fixture: ComponentFixture<AddLaadkadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLaadkadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLaadkadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
