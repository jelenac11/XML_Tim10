import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodnosenjeZalbeNaCutanjeComponent } from './podnosenje-zalbe-na-cutanje.component';

describe('PodnosenjeZalbeNaCutanjeComponent', () => {
  let component: PodnosenjeZalbeNaCutanjeComponent;
  let fixture: ComponentFixture<PodnosenjeZalbeNaCutanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodnosenjeZalbeNaCutanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodnosenjeZalbeNaCutanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
