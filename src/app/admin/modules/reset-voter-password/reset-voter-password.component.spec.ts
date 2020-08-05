import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetVoterPasswordComponent } from './reset-voter-password.component';

describe('ResetVoterPasswordComponent', () => {
  let component: ResetVoterPasswordComponent;
  let fixture: ComponentFixture<ResetVoterPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetVoterPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetVoterPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
