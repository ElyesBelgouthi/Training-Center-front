import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsEditComponent } from './instructors-edit.component';

describe('InstructorsEditComponent', () => {
  let component: InstructorsEditComponent;
  let fixture: ComponentFixture<InstructorsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorsEditComponent]
    });
    fixture = TestBed.createComponent(InstructorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
