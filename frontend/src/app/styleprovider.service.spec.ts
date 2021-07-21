import { TestBed } from '@angular/core/testing';

import { StyleProviderService } from './styleprovider.service';

describe('StyleproviderService', () => {
  let service: StyleProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
