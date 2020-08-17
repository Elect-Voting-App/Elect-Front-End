import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAdminOwnPasswordComponent } from './change-admin-own-password.component';

describe('ChangeAdminOwnPasswordComponent', () => {
  let component: ChangeAdminOwnPasswordComponent;
  let fixture: ComponentFixture<ChangeAdminOwnPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAdminOwnPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAdminOwnPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
