import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHostComponent } from './reservation-host.component';

describe('ReservationHostComponent', () => {
  let component: ReservationHostComponent;
  let fixture: ComponentFixture<ReservationHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
