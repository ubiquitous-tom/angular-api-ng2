import { TestBed, inject } from '@angular/core/testing';

import { CreateAccountService } from './create-account.service';

describe('CreateAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateAccountService]
    });
  });

  it('should be created', inject([CreateAccountService], (service: CreateAccountService) => {
    expect(service).toBeTruthy();
  }));
});
