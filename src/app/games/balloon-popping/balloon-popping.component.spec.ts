import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonPoppingComponent } from './balloon-popping.component';

describe('BalloonPoppingComponent', () => {
  let component: BalloonPoppingComponent;
  let fixture: ComponentFixture<BalloonPoppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalloonPoppingComponent]
    });
    fixture = TestBed.createComponent(BalloonPoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
