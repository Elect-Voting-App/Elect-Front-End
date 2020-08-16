import { TestBed } from '@angular/core/testing';

import { AdminPasswordGuard } from './admin-password.guard';

describe('AdminPasswordGuard', () => {
  let guard: AdminPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
