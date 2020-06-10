import { InjectionToken } from '@angular/core';

/**
 * Локальный репозиторий книг
 */
export const BOOKS_LOCAL_REPOSITORY: InjectionToken<Storage> = new InjectionToken<Storage>('Books Local Repository', {
  providedIn: 'root',
  factory: () => localStorage,
});
