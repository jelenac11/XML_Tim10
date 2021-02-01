import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiDokumentiComponent } from './moji-dokumenti.component';

describe('MojiDokumentiComponent', () => {
  let component: MojiDokumentiComponent;
  let fixture: ComponentFixture<MojiDokumentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiDokumentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojiDokumentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
