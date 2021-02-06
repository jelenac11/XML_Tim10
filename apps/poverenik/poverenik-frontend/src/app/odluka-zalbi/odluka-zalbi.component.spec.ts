import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdlukaZalbiComponent } from './odluka-zalbi.component';

describe('OdlukaZalbiComponent', () => {
  let component: OdlukaZalbiComponent;
  let fixture: ComponentFixture<OdlukaZalbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdlukaZalbiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdlukaZalbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
