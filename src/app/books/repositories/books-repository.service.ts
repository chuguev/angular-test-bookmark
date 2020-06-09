import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { BooksListResponse } from './books-repository.type';
import { BooksList } from '../services/books.type';

@Injectable({
  providedIn: 'root',
})
export class BooksRepositoryService {
  private readonly favoriteBooksIdsKey = 'favoriteBooksIds';

  constructor(private http: HttpClient, @Inject(BOOKS_LOCAL_REPOSITORY) private booksLocalRepository: Storage) {}

  /**
   * Получить список книг. Можно указать необходимый диапазон загружаемых книг.
   * @param startIndex - с какого индекса начинать загружать книги
   * @param count - количество загружаемых книг (максимальное число 40)
   */
  public getBooks(startIndex: number = 0, count: number = 10): Observable<BooksList> {
    const maxCount = 40;
    const maxResult = count > maxCount ? maxCount : count;

    return this.http
      .get<BooksListResponse>(`https://content.googleapis.com/books/v1/volumes?maxResults=${maxResult}&q=potter&startIndex=${startIndex}`)
      .pipe(this.mapResponseToBooksList(startIndex, count));
  }

  /**
   * Задать любимые книги
   * @param ids - идентификаторы любимых книг
   */
  public setFavoriteBooks(ids: string[]): void {
    this.booksLocalRepository.setItem(this.favoriteBooksIdsKey, JSON.stringify(ids));
  }

  /**
   * Получить список идентификатор любимых книг из локального хранилища
   */
  public getFavoriteBooksIdsFromStorage(): string[] {
    const storageIds: string | null = this.booksLocalRepository.getItem(this.favoriteBooksIdsKey);

    return storageIds ? JSON.parse(storageIds) : [];
  }

  /**
   * Преобразовать ответ от сервера в список книг
   */
  private mapResponseToBooksList(startIndex: number, count: number): OperatorFunction<BooksListResponse, BooksList> {
    return map(booksList => ({
      total: booksList.totalItems,
      count: count + startIndex,
      books: booksList.items.map(item => ({
        id: item.id,
        title: item.volumeInfo?.title,
        description: item.volumeInfo?.description,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        version: item.etag,
        favorite: false,
      })),
    }));
  }
}

/**
 * Локальный репозиторий книг
 */
export const BOOKS_LOCAL_REPOSITORY: InjectionToken<Storage> = new InjectionToken<Storage>('Books Local Repository', {
  providedIn: 'root',
  factory: () => localStorage,
});
