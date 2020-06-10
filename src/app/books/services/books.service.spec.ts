import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { BooksRepositoryService } from '../repositories/books-repository.service';

describe('BooksService', () => {
  let service: BooksService;
  let booksRepositoryStub: jasmine.SpyObj<BooksRepositoryService>;

  beforeEach(() => {
    initDependency();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BooksRepositoryService,
          useValue: booksRepositoryStub,
        },
      ],
    });
    service = TestBed.inject(BooksService);
  });

  it('Должен быть создан', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Инициализация зависимостей
   */
  function initDependency(): void {
    booksRepositoryStub = jasmine.createSpyObj<BooksRepositoryService>('BooksRepositoryService', [
      'getBooks',
      'setFavoriteBooks',
      'getFavoriteBooksIdsFromStorage',
    ]);
  }
});
