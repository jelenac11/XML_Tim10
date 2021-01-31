import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDokumenataComponent } from './pregled-dokumenata.component';

describe('PregledDokumenataComponent', () => {
  let component: PregledDokumenataComponent;
  let fixture: ComponentFixture<PregledDokumenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledDokumenataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledDokumenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
