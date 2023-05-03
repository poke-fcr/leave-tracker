import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveComponentComponent } from './update-leave-component.component';

describe('UpdateLeaveComponentComponent', () => {
  let component: UpdateLeaveComponentComponent;
  let fixture: ComponentFixture<UpdateLeaveComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLeaveComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeaveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
