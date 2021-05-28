import { TestBed } from '@angular/core/testing';

import { EventsGuardGuard } from './events-guard.guard';

describe('EventsGuardGuard', () => {
  let guard: EventsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
