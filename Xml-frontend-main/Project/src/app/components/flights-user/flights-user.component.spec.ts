import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsUserComponent } from './flights-user.component';

describe('FlightsUserComponent', () => {
  let component: FlightsUserComponent;
  let fixture: ComponentFixture<FlightsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
