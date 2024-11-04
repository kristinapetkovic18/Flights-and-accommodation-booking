import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationHomepageComponent } from './accommodation-homepage.component';

describe('AccommodationHomepageComponent', () => {
  let component: AccommodationHomepageComponent;
  let fixture: ComponentFixture<AccommodationHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
