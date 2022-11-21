import { TestBed } from '@angular/core/testing';

import { SendtoformService } from './sendtoform.service';

describe('SendtoformService', () => {
  let service: SendtoformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendtoformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
