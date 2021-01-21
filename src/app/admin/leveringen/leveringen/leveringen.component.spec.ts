import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveringenComponent } from './leveringen.component';

describe('LeveringenComponent', () => {
  let component: LeveringenComponent;
  let fixture: ComponentFixture<LeveringenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeveringenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveringenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
