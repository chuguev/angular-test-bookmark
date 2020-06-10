import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { BookListContainer } from './book-list.container';
import { BooksService } from '../../services/books.service';

describe('BookListContainer', () => {
  let component: BookListContainer;
  let fixture: ComponentFixture<BookListContainer>;
  let booksServiceStub: jasmine.SpyObj<BooksService>;

  beforeEach(() => {
    initialDependency();
  });

  beforeEach(async(() => {
    const mockComponents: any[] = [MatTabGroupMock, MatTabMock, AllBooksMock];

    TestBed.configureTestingModule({
      declarations: [BookListContainer, ...mockComponents],
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Инициализация зависимостей
   */
  function initialDependency(): void {
    booksServiceStub = jasmine.createSpyObj<BooksService>('BooksService', [
      'getBooks',
      'getFavoriteBooks',
      'getFavoriteBooks',
      'setFavoriteBook',
      'uploadMoreBooks',
      'isAllBooks',
      'isLoading',
      'isError',
    ]);
  }
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-tab-group',
  template: '<ng-content></ng-content>',
})
class MatTabGroupMock {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-tab',
  template: '<ng-content></ng-content>',
})
class MatTabMock {}

@Component({
  selector: 'bkmrk-books-list-with-search',
  template: '',
})
class AllBooksMock {
  @Input()
  public Books: any[];

  @Input()
  public IsAllBooksUpload: boolean;

  @Input()
  public IsLoading: boolean;
}
