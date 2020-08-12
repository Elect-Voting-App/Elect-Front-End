import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterChangePasswordComponent } from './voter-change-password.component';

describe('VoterChangePasswordComponent', () => {
  let component: VoterChangePasswordComponent;
  let fixture: ComponentFixture<VoterChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
