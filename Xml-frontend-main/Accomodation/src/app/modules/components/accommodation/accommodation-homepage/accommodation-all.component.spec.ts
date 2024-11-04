import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAllComponent } from './accommodation-all.component';

describe('AccommodationAllComponent', () => {
  let component: AccommodationAllComponent;
  let fixture: ComponentFixture<AccommodationAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
