// TODO ДЕКОМПОЗИЦИЯ!!!!

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { BooksRepositoryService } from '../repositories/books-repository.service';
import { Book, BooksList } from './books.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksListSnapshot: BooksList;
  private booksList$: Observable<BooksList>;
  private uploadBook$: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private repository: BooksRepositoryService) {
    this.booksList$ = this.uploadBook$.pipe(
      scan((acc, el) => acc + el),
      tap(() => {
        this.isLoading$.next(true);
        this.isError$.next(false);
      }),
      switchMap(count =>
        this.repository.getBooks(10, count).pipe(
          tap(list => (this.booksListSnapshot = list)),
          catchError(error => {
            this.isLoading$.next(false);
            this.isError$.next(true);
            return of(this.booksListSnapshot);
          }),
        ),
      ),
      tap(() => {
        this.isLoading$.next(false);
        this.isError$.next(false);
      }),
      scan((acc: BooksList, el: BooksList) => {
        acc.books.push(...el.books);
        return acc;
      }),
      map(list => ({
        ...list,
        books: [...list.books],
      })),
      startWith({
        total: 0,
        count: 0,
        books: [],
      }),
    );
  }

  /**
   * Получить список книг
   */
  public getBooks(): Observable<Book[]> {
    return this.booksList$.pipe(map(list => list.books));
  }

  /**
   * Загрузить больше книг
   */
  public uploadMoreBooks(): void {
    const defaultCount = 10;
    const difference = this.booksListSnapshot.total - this.booksListSnapshot.count;
    const count = difference >= defaultCount ? defaultCount : difference - defaultCount;
    this.uploadBook$.next(count);
  }

  /**
   * Загружены все книги
   */
  public isAllBooks(): boolean {
    return this.booksListSnapshot.total === this.booksListSnapshot.count;
  }

  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public isError(): Observable<boolean> {
    return this.isError$.asObservable();
  }
}
