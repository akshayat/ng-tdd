import { TestBed } from '@angular/core/testing';

import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiCallService', () => {
  let service: ApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
