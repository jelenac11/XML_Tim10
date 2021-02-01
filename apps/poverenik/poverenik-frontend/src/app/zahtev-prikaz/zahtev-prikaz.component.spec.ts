import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevPrikazComponent } from './zahtev-prikaz.component';

describe('ZahtevPrikazComponent', () => {
  let component: ZahtevPrikazComponent;
  let fixture: ComponentFixture<ZahtevPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevPrikazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
