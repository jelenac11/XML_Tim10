import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku.component';

describe('PrikazZalbaNaOdlukuComponent', () => {
  let component: PrikazZalbaNaOdlukuComponent;
  let fixture: ComponentFixture<PrikazZalbaNaOdlukuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazZalbaNaOdlukuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazZalbaNaOdlukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
