import { TestBed } from '@angular/core/testing';

import { VestidosFiestaService } from './vestidos-fiesta.service';

describe('VestidosFiestaService', () => {
  let service: VestidosFiestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestidosFiestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
