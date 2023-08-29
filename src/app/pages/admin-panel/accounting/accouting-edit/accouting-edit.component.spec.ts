import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutingEditComponent } from './accouting-edit.component';

describe('AccoutingEditComponent', () => {
  let component: AccoutingEditComponent;
  let fixture: ComponentFixture<AccoutingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccoutingEditComponent]
    });
    fixture = TestBed.createComponent(AccoutingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
