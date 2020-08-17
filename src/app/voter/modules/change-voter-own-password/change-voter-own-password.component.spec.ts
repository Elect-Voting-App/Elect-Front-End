import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVoterOwnPasswordComponent } from './change-voter-own-password.component';

describe('ChangeVoterOwnPasswordComponent', () => {
  let component: ChangeVoterOwnPasswordComponent;
  let fixture: ComponentFixture<ChangeVoterOwnPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeVoterOwnPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeVoterOwnPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
