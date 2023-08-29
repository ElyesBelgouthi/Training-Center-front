import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutingListComponent } from './accouting-list.component';

describe('AccoutingListComponent', () => {
  let component: AccoutingListComponent;
  let fixture: ComponentFixture<AccoutingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccoutingListComponent]
    });
    fixture = TestBed.createComponent(AccoutingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
