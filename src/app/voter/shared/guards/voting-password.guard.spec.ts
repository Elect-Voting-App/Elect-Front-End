import { TestBed } from '@angular/core/testing';

import { VotingPasswordGuard } from './voting-password.guard';

describe('VotingPasswordGuard', () => {
  let guard: VotingPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VotingPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
