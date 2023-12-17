import { TestBed } from '@angular/core/testing';

import { Order2Service } from './order2.service';

describe('Order2Service', () => {
  let service: Order2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Order2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
