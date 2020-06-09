import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BooksService } from '../../services/books.service';
import { Book } from '../../services/books.type';

/**
 * Контейнер списка книг
 */
@Component({
  selector: 'bkmrk-book-list-container',
  templateUrl: './book-list.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListContainer implements OnInit {
  private books$: Observable<Book[]>;
  private favoriteBooks$: Observable<Book[]>;
  private isLoadingBooks$: Observable<boolean>;
  private isErrorBooks$: Observable<boolean>;
  private isAllBooksUpload$: Observable<boolean>;

  constructor(private booksService: BooksService) {}

  get Books$(): Observable<Book[]> {
    return this.books$;
  }

  get FavoriteBooks$(): Observable<Book[]> {
    return this.favoriteBooks$;
  }

  get IsAllBooksUpload$(): Observable<boolean> {
    return this.isAllBooksUpload$;
  }

  get IsLoadingBooks$(): Observable<boolean> {
    return this.isLoadingBooks$;
  }

  get IsErrorBooks$(): Observable<boolean> {
    return this.isErrorBooks$;
  }

  /**
   * Инициализация параметров страницы
   */
  public ngOnInit(): void {
    this.initialPageParameters();
  }

  /**
   * Загрузить дополнительный список книг
   */
  public uploadMoreBooks(): void {
    this.booksService.uploadMoreBooks();
  }

  /**
   * Обновить статус любимой книги
   * @param book - книга для обновления
   */
  public updateFavoriteBook(book: Book): void {
    this.booksService.setFavoriteBook(book);
  }

  /**
   * Инициализация параметров страницы
   */
  private initialPageParameters(): void {
    this.books$ = this.booksService.getBooks();
    this.favoriteBooks$ = this.booksService.getFavoriteBooks();
    this.isLoadingBooks$ = this.booksService.isLoading();
    this.isErrorBooks$ = this.booksService.isError();
    this.isAllBooksUpload$ = this.booksService.isAllBooks$();
  }
}
