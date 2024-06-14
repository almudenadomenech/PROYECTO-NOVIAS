import { TestBed } from '@angular/core/testing';

import { VestidosService } from './vestidos.service';

describe('VestidosService', () => {
  let service: VestidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
