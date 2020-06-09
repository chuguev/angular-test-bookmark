import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, MonoTypeOperatorFunction, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, concatMap, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';

import { BooksRepositoryService } from '../repositories/books-repository.service';
import { Book, BooksList } from './books.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private uploadStep = 10;
  private initialBooksList: BooksList = {
    total: 0,
    count: 0,
    books: [],
  };
  private booksListSnapshot: BooksList;

  private booksList$: Observable<BooksList>;
  private favoriteBooksIds$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private uploadBook$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private repository: BooksRepositoryService) {
    this.booksList$ = this.getBooksListHandler();
  }

  /**
   * Получить список книг
   */
  public getBooks(): Observable<Book[]> {
    return this.booksList$.pipe(map(list => list.books));
  }

  /**
   * Получить список любимых книг
   */
  public getFavoriteBooks(): Observable<Book[]> {
    return this.booksList$.pipe(this.filterFavoriteBooks());
  }

  /**
   * Установить/снять книгу как любимую
   * @param book - книга
   */
  public setFavoriteBook(book: Book): void {
    let ids = this.favoriteBooksIds$.getValue();

    if (book.favorite) {
      ids.push(book.id);
    } else {
      ids = ids.filter(id => id !== book.id);
    }

    this.favoriteBooksIds$.next(ids);
  }

  /**
   * Загрузить больше книг
   */
  public uploadMoreBooks(): void {
    this.uploadBook$.next(this.getCount());
  }

  /**
   * Загружены все книги
   */
  public isAllBooks$(): Observable<boolean> {
    return this.booksList$.pipe(map(list => list.total === list.count));
  }

  /**
   * Статус загрузки списка книг
   */
  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  /**
   * Статус ошибки загрузки списка книг
   */
  public isError(): Observable<boolean> {
    return this.isError$.asObservable();
  }

  /**
   * Получить обработчик списка книг
   */
  private getBooksListHandler(): Observable<BooksList> {
    return combineLatest(this.favoriteBooksIds$, this.getBooksList()).pipe(this.updateFavoriteBooks(), shareReplay());
  }

  private updateFavoriteBooks(): OperatorFunction<[string[], BooksList], BooksList> {
    return map(([ids, booksList]) => ({
      ...booksList,
      books: booksList.books.map(book => ({
        ...book,
        favorite: ids.some(id => id === book.id),
      })),
    }));
  }

  /**
   * Получить список книг
   */
  private getBooksList(): Observable<BooksList> {
    return this.uploadBook$.pipe(
      this.calcCurrentStep(),
      this.changeStatusBeforeLoad(),
      concatMap(count => this.repository.getBooks(count, this.uploadStep).pipe(this.createBooksListSnapshot(), this.handleError())),
      this.reduceBooks(),
      this.changeStatusAfterLoad(),
      startWith(this.initialBooksList),
    );
  }

  /**
   * Высчитать текущий шаг. Pipeline
   */
  private calcCurrentStep(): MonoTypeOperatorFunction<number> {
    return scan((acc, el) => acc + el);
  }

  /**
   * Изменить статус перед загрузкой. Pipeline
   */
  private changeStatusBeforeLoad(): MonoTypeOperatorFunction<number> {
    return tap(() => {
      this.isLoading$.next(true);
      this.isError$.next(false);
    });
  }

  /**
   * Изменить статус после загрузки. Pipeline
   */
  private changeStatusAfterLoad(): MonoTypeOperatorFunction<BooksList> {
    return tap(() => {
      this.isLoading$.next(false);
      this.isError$.next(false);
    });
  }

  /**
   * Обработчик ошибки. Pipeline
   * Переключить статус загрузки и вернуть пустой список книг
   */
  private handleError(): OperatorFunction<any, BooksList> {
    return catchError(() => {
      this.isLoading$.next(false);
      this.isError$.next(true);
      return of({
        ...this.booksListSnapshot,
        books: [],
      });
    });
  }

  /**
   * Сделать слепок списка книг. Pipeline
   */
  private createBooksListSnapshot(): MonoTypeOperatorFunction<BooksList> {
    return tap(list => (this.booksListSnapshot = list));
  }

  /**
   * Объединить список книг. Pipeline
   */
  private reduceBooks(): MonoTypeOperatorFunction<BooksList> {
    return scan((acc: BooksList, el: BooksList) => {
      return {
        total: el.total,
        count: el.count,
        books: acc.books.concat(el.books),
      };
    }, this.initialBooksList);
  }

  /**
   * Отфильтровать любимые книги. Pipeline
   */
  private filterFavoriteBooks(): OperatorFunction<BooksList, Book[]> {
    return map(list => list.books.filter(book => book.favorite));
  }

  /**
   * Получить счетчик количества книг
   */
  private getCount(): number {
    const difference = this.booksListSnapshot.total - this.booksListSnapshot.count;

    return difference >= this.uploadStep ? this.uploadStep : difference - this.uploadStep;
  }
}
