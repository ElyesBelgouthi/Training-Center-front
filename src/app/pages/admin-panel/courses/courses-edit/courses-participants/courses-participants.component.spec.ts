import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesParticipantsComponent } from './courses-participants.component';

describe('CoursesParticipantsComponent', () => {
  let component: CoursesParticipantsComponent;
  let fixture: ComponentFixture<CoursesParticipantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesParticipantsComponent]
    });
    fixture = TestBed.createComponent(CoursesParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
