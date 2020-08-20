import { TestBed } from '@angular/core/testing';

import { VoterAuthGuard } from './voter-auth.guard';

describe('VoterAuthGuard', () => {
  let guard: VoterAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VoterAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
