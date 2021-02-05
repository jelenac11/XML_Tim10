import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajPrikazComponent } from './izvestaj-prikaz.component';

describe('IzvestajPrikazComponent', () => {
  let component: IzvestajPrikazComponent;
  let fixture: ComponentFixture<IzvestajPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzvestajPrikazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
