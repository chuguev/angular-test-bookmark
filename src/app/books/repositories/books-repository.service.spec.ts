import { TestBed } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

fdescribe('BooksRepositoryService', () => {
  let service: BooksRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksRepositoryService);
  });

  it('Должен быть создан', () => {
    expect(service).toBeTruthy();
  });
});
