import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsHomepageComponent } from './flights-homepage.component';

describe('FlightsHomepageComponent', () => {
  let component: FlightsHomepageComponent;
  let fixture: ComponentFixture<FlightsHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
