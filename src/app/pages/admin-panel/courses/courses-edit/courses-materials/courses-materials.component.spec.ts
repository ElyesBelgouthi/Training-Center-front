import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMaterialsComponent } from './courses-materials.component';

describe('CoursesMaterialsComponent', () => {
  let component: CoursesMaterialsComponent;
  let fixture: ComponentFixture<CoursesMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesMaterialsComponent]
    });
    fixture = TestBed.createComponent(CoursesMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
