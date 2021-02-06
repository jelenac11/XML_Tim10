import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentPretragaComponent } from './dokument-pretraga.component';

describe('DokumentPretragaComponent', () => {
  let component: DokumentPretragaComponent;
  let fixture: ComponentFixture<DokumentPretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumentPretragaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
