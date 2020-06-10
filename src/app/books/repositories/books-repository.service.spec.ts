import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BooksRepositoryService } from './books-repository.service';
import { BOOKS_LOCAL_REPOSITORY } from './books-storage-token';

describe('BooksRepositoryService', () => {
  let service: BooksRepositoryService;
  let storageStub: jasmine.SpyObj<Storage>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    initDependency();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BOOKS_LOCAL_REPOSITORY,
          useValue: storageStub,
        },
      ],
    });
    service = TestBed.inject(BooksRepositoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Должен быть создан', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Инициализация зависимостей
   */
  function initDependency(): void {
    storageStub = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);
  }
});
