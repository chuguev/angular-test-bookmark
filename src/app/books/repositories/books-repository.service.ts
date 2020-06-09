import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { BooksListResponse } from './books-repository.type';
import { BooksList } from '../services/books.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksRepositoryService {
  constructor(private http: HttpClient) {}

  /**
   * Получить список книг. Можно указать необходимый диапазон загружаемых книг.
   * @param count - количество загружаемых книг (максимальное число 40)
   * @param startIndex - с какого индекса начинать загружать книги
   */
  public getBooks(count: number = 10, startIndex: number = 0): Observable<BooksList> {
    const maxCount = 40;
    count = count > maxCount ? maxCount : count;

    return this.http
      .get<BooksListResponse>(`https://content.googleapis.com/books/v1/volumes?maxResults=${count}&q=potter&startIndex=${startIndex}`)
      .pipe(this.mapResponseToBooksList(count, startIndex));
  }

  /**
   * Преобразовать ответ от сервера в список книг
   */
  private mapResponseToBooksList(count: number, startIndex: number): OperatorFunction<BooksListResponse, BooksList> {
    return map(booksList => ({
      total: booksList.totalItems,
      count: count + startIndex,
      books: booksList.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
        version: item.etag,
        favorite: false,
      })),
    }));
  }
}
