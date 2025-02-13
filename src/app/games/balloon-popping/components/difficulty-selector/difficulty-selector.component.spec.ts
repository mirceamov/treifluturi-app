import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultySelectorComponent } from './difficulty-selector.component';

describe('DifficultySelectorComponent', () => {
  let component: DifficultySelectorComponent;
  let fixture: ComponentFixture<DifficultySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultySelectorComponent]
    });
    fixture = TestBed.createComponent(DifficultySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
