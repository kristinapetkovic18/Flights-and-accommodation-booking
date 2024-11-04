import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationViewAllComponent } from './accommodation-view-all.component';

describe('AccommodationViewAllComponent', () => {
  let component: AccommodationViewAllComponent;
  let fixture: ComponentFixture<AccommodationViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
