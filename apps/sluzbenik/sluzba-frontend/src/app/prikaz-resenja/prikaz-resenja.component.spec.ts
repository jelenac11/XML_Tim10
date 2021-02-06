import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazResenjaComponent } from './prikaz-resenja.component';

describe('PrikazResenjaComponent', () => {
  let component: PrikazResenjaComponent;
  let fixture: ComponentFixture<PrikazResenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazResenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazResenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
