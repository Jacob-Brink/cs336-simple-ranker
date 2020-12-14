import { TestBed } from '@angular/core/testing';

import { RankerServiceService } from './ranker-service.service';

describe('RankerServiceService', () => {
  let service: RankerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
