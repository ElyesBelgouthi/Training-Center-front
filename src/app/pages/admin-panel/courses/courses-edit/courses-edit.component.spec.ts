import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEditComponent } from './courses-edit.component';

describe('CoursesEditComponent', () => {
  let component: CoursesEditComponent;
  let fixture: ComponentFixture<CoursesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesEditComponent]
    });
    fixture = TestBed.createComponent(CoursesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
