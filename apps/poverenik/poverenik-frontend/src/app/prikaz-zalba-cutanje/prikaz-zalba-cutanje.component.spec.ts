import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje.component';

describe('PrikazZalbaCutanjeComponent', () => {
  let component: PrikazZalbaCutanjeComponent;
  let fixture: ComponentFixture<PrikazZalbaCutanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazZalbaCutanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazZalbaCutanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
