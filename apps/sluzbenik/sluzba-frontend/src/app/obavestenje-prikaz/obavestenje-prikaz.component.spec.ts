import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjePrikazComponent } from './obavestenje-prikaz.component';

describe('ObavestenjePrikazComponent', () => {
  let component: ObavestenjePrikazComponent;
  let fixture: ComponentFixture<ObavestenjePrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObavestenjePrikazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObavestenjePrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
