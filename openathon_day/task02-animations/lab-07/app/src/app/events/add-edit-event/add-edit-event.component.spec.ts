import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditEventComponent } from './add-edit-event.component';

describe('AddEditEventComponent', () => {
  let component: AddEditEventComponent;
  let fixture: ComponentFixture<AddEditEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
